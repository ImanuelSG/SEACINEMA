import prisma from "@/app/libs/prismadb"
import { NextRequest, NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getMoviesbyId from '@/app/actions/getMoviebyId';

interface Iparams{
    movieId: number;
    watchtime: number;
}
export async function POST (request: NextRequest, {params} : {params:Iparams}){
    const body =  await request.text()

    if(!body){
    
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
    const seats = JSON.parse(body) as number[]
    const user = await getCurrentUser()

    const movie = await getMoviesbyId(params)

    if(!user){
        return NextResponse.json({ error: 'No User Exsist' }, { status: 500 })
    }
    if(!movie)
    {  
        return NextResponse.json({ error: 'Movie doesnt exsist' }, { status: 500 })
    }
    if(user.age < movie.age_rating)
    {   
        return NextResponse.json({ error: 'You are not old enough' }, { status: 500 })
    }
    const totalprice=movie.ticket_price*seats.length
    if( user.balance == null ||user.balance < totalprice )
    {   
        return NextResponse.json({ error: 'Insufficient Balance' }, { status: 500 })
    }
    const transaction = await prisma.transaction.create({
        data:{
            amount:-(movie?.ticket_price),
            movie:{connect:{id:movie.id}},
            user:{connect:{id:user.id}},
            seats,
            reservedate:new Date(),
            totalprice:-(totalprice),
            watchdatetime:new Date(Number(params.watchtime))
        }
    })
    await prisma.user.update({
        where:{
            username:user.username
        },
        data:{
           balance: user.balance - totalprice
        }
    })
    return NextResponse.json(user);
}
    
