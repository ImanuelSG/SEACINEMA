'use client'
import { Movie } from "@prisma/client";
import { useRouter } from "next/navigation";


interface MovieCardProps{
    data: Movie;
    onAction?: (id:string) => void;
}
const MovieCard : React.FC<MovieCardProps>= ({
    data,
    onAction
}) => {
    const router = useRouter();
    const handlePush = () => {
        router.push(`/movies/${data.id}`,{scroll:true});
          router.refresh()
        };
      
    return (
        <>
        <div onClick={() =>handlePush()} className="col-span-1 cursor-pointer group ">
            <div className="flex flex-col gap-2 group-hover:scale-110 transition border-2 rounded-xl shadow-md">
                <div className="w-full relative overflow-hidden rounded-xl ">
        <img src={data.poster_url} alt={data.title} className=" object-cover  w-full "></img>
        <div className="px-1">
    <div className="text-center text-lg font-bold Fwelmt-2 px-2 truncate">{data.title}
    </div>
    <div className="text-center text-md mt-2 text-red-500 font-semibold">{data.age_rating}+ 
    </div>
    <div className="text-center text-base mt-3 mb-2 font-semibold">{data.ticket_price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}</div>
    </div></div></div></div>  </>);
    
}
 
export default MovieCard;