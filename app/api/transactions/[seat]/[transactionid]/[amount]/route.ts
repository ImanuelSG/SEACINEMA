import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface Params {
  seat: number;
  transactionid: string;
  amount: number;
}

export async function DELETE({ params }: { params: Params }) {
    console.log(params)
  const { seat, transactionid ,amount} = params;

  if (!seat) {
    throw new Error('seat not provided');
  }

  try {
    const user = await getCurrentUser();
    if(!user || !user.balance){throw new Error('Movie not found')};
    const transaction = await prisma.transaction.findUnique({
      where: { id:transactionid
        
      }
    });

    if (!transaction) {
      throw new Error('Movie not found');
    }
    if (!transaction) {
        console.error('Transaction not found');
        return;
      }
  
      const updatedSeats = transaction.seats.filter((s) => s !== seat);
  
      await prisma.transaction.update({
        where: { id: transactionid },
        data: { seats: updatedSeats },
      });
      await prisma.user.update({
        where:{id: user.id

        },data:{
            balance: user.balance+Math.abs(amount)
        }

      })
  
    } catch (error) {
      console.error('Failed to delete seat:', error);
    
  }
}
