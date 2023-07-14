import prisma from "@/app/libs/prismadb"

interface Iparams{
    movieId?:number;
    time?:number;
}
export default async function getSoldSeats(params:Iparams){
    try{
        const {movieId,time} = params
        if (time === undefined) {
            // Handle the case where time is undefined
            throw new Error("Invalid time parameter");
          }
        
        const watchdatetime = new Date(Number(time));
                 
        const soldseat = await prisma.transaction.findMany({
            where:{movieId:Number(movieId),watchdatetime
            },
            select:{
                seats: true
            }   
        })
        
        if(!soldseat){
            return []
        }
        return soldseat.map((transaction) => transaction.seats);
    }catch(error){
        throw new Error("Server Error")

    }

}