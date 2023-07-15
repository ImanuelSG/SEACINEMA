import getSoldSeats from "@/app/actions/getSoldSeats";
import PaymentClient from "./paymentClient";
import getMoviesbyId from "@/app/actions/getMoviebyId";
import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface Iparams {
    movieId?: number;
    time: number;
  }
const PaymentPage = async ({params} :{params: Iparams}) => {
    const soldseats = await getSoldSeats(params);
    const {movieId, time} = params
    const movie = await getMoviesbyId(params)
    const user = await getCurrentUser()
    if(!movie || !movieId || !user){
        redirect('/')
        
    }

    return ( <PaymentClient soldSeats={soldseats} movietitle={movie?.title}
        currentuser={user} time = {Number(time)} movieId={movieId}
    />);
}
 
export default PaymentPage;