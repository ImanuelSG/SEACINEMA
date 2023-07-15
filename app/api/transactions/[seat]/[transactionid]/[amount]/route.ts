import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

interface Iparams {
  
  seat: number;
  amount: number;
  transactionid: string;
  
}

export async function DELETE(request:NextRequest,  {params} : {params :Iparams }) {
  
  const seat = params.seat
  const amount = params.amount
  const transactionid = params.transactionid
  if (!seat) {
    throw new Error('seat not provided');
  }

    const user = await getCurrentUser();
    if(!user || !user.balance)
      {throw new Error('User not found')};
    const transaction = await prisma.transaction.findUnique({
      where: { id:transactionid
        
      }
    });

    if (!transaction) {
      return NextResponse.json({error:'Internal Server Error'}, {status : 200});
    }
      const updatedSeats = transaction.seats.filter((s) => s !== Number(seat));
  
      await prisma.transaction.update({
        where: { id: transactionid },
        data: { seats: updatedSeats },
      });
      await prisma.user.update({
        where:{id: user.id

        },data:{
            balance: user.balance+Math.abs(Number(amount))
        }

      })
      return NextResponse.json({user}, {status : 200})
}
