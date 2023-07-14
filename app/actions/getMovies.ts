import prisma from "@/app/libs/prismadb";

export default async function getMovies(){
    try{
    const movies = await prisma.movie.findMany()
    return movies;
} catch (error:any){
    throw new Error(error);
}}