import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';

export async function POST (request: Request){
    const body = await request.json();
    const user = await getCurrentUser();
    if(!user || user.balance==null){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    const transaction = await prisma.transaction.create({
        data:
             {user: {connect: {id:user.id}} 
            ,amount: parseInt(body.amount),
            seats: [],
            watchdatetime: null,
            totalprice: 0,
            reservedate: new Date() }}
    )
    await prisma.user.update({
        where:{
            username:user.username,
        },
        data:{
            balance: user.balance + parseInt(body.amount)
        }
    })

    return NextResponse.json({transaction}, {status : 200})
}