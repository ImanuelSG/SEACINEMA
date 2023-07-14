
import getMovies from "./actions/getMovies";
import Container from "./components/Container";
import MovieCard from "./components/MovieCard";

export default async function Home() {
  const movies = await getMovies();
  return (
    <Container>
      <div className="text-center font-bold text-5xl pt-10">Explore Our Movies</div>
      <div className="
      pt-20
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-5
      gap-20
     ">
{movies.map((movie:any) => {
  return(
    <MovieCard key={movie.id} data={movie}/>
  )
})}
      </div>
    </Container>
  )
}
