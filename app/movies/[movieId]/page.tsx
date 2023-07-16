import getMoviesbyId from "@/app/actions/getMoviebyId";
import { redirect } from "next/navigation";
import movieClient from "./movieClient";
import MovieClientButton from "./movieClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
interface Iparams{
    movieId? : number;
}
const MoviePage = async ({params} : {params:Iparams}) => {
    const user = await getCurrentUser()
    const movie = await getMoviesbyId(params)
    if(!movie){
        redirect("/")}
    const formattedPrice = movie?.ticket_price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    
    const {
        title,
        description,
        release_date,
        poster_url,
        age_rating,
        
      } = movie;

      const date = new Date((new Date()).setTime((new Date()).getTime() + (7 * 60 * 60 * 1000)));
      const dateAt11 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 4, 0, 0);
      const dateAt14= new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0, 0);
      const dateAt17= new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0, 0);
        const dateAt20 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0);

    return ( <div className="container mx-auto py-8 " >
    <div className="flex flex-col ">
    <div className=" font-bold text-4xl text-center">BUY YOUR TICKETS </div>
<div className=" font-bold  my-6 text-8xl text-red-600 text-center" >NOW!</div>
      <div className="w-full flex items-center justify-center">
        <img src={poster_url} alt={title} className="w-72 h-auto" />
      </div>
      <div className="  md:py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-4 text-2xl">&quot;{description}&quot;</p>
        <div className="flex flex-row mt-10">
  <div className="flex flex-col items-center mb-4 flex-grow border-r-4 border-slate-950 pr-4">
    <span className="font-bold text-xl">Release Date</span>
    <span className="text-green-700 font-bold text-lg">{release_date}</span>
  </div>
  <div className="flex flex-col items-center mb-4 flex-grow border-r-4 border-slate-950 pr-4">
    <span className="font-bold text-xl">Age Rating</span>
    <span className="text-green-700 font-bold text-lg">{age_rating}+</span>
  </div>
  <div className="flex flex-col items-center mb-4 flex-grow">
    <span className="font-bold text-xl">Ticket Price</span>
    <span className="text-green-700 font-bold text-lg">{formattedPrice}</span>
  </div>
</div>



<div className="text-xl font-bold py-5"> {date.toDateString()}</div>
<div className="flex flex-row justify-center">
<MovieClientButton path={`/${movie.id}/${dateAt11.getTime()}`} time="11:00" currentTime={date.getTime()} showTime={dateAt11.getTime()+ (7 * 60 * 60 * 1000)} user={user?(user):(null)}/>
<MovieClientButton path={`/${movie.id}/${dateAt14.getTime()}`} time="14:00"currentTime={date.getTime()} showTime={dateAt14.getTime()+ (7 * 60 * 60 * 1000) } user={user?(user):(null)}/>
<MovieClientButton path={`/${movie.id}/${dateAt17.getTime()}`} time="17:00" currentTime={date.getTime()} showTime={dateAt17.getTime()+ (7 * 60 * 60 * 1000) } user={user?(user):(null)}/>
<MovieClientButton path={`/${movie.id}/${dateAt20.getTime()}`} time="20:00" currentTime={date.getTime()} showTime={dateAt20.getTime()+ (7 * 60 * 60 * 1000)} user={user?(user):(null)}/>

</div>


      </div>
    </div>
  </div>
);
};

 
export default MoviePage;