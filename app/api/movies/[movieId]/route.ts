import prisma from '@/app/libs/prismadb';

interface Params {
  movieId: number;
}

export  async function POST({ params }: { params: Params }) {
  const { movieId } = params;

  if (!movieId) {
    throw new Error('Movie ID not provided');
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: BigInt(movieId) },
    });

    if (!movie) {
      throw new Error('Movie not found');
    }

    return movie;
  } catch (error) {
    console.error('Error retrieving movie:', error);
    throw new Error('Failed to retrieve movie');
  }
}
