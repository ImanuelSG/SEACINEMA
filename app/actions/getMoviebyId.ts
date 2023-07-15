import prisma from "@/app/libs/prismadb"
interface Iparams{
    movieId?: number;
}

export default async function getMoviesbyId(params:Iparams
){
    try{
        const { movieId } = params
        const movie = await prisma.movie.findUnique({
            where:{
                id : Number(movieId)
            }
        })
        if (!movie){
            return null;
        }
        return movie
    } catch(error:any){
        throw new Error(error)
    }
}