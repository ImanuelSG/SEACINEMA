import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';

export async function POST (request: Request){
    const body = await request.json();
    const user = await getCurrentUser();
    
    if(!user || user.balance == null){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
    
    const realamount = Math.abs(parseInt(body.amount))

    if (realamount> user.balance){
        return NextResponse.json({ error: 'Insufficient Balance' }, { status: 500 })
    }
    const transaction = await prisma.transaction.create({
        data:
             {user: {connect: {id:user.id}} 
            ,amount: parseInt(body.amount),
            seats: [],
            watchdatetime: null,
            totalprice: 0,
            reservedate: new Date((new Date()).setTime((new Date()).getTime() + (7 * 60 * 60 * 1000))) }}
    )
    await prisma.user.update({
        where:{
            username:user.username,
        },
        data:{
            balance: user.balance + parseInt( body.amount)
        }
    })
    return NextResponse.json({transaction}, {status : 200})
}