import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

export default async function getTickets() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        movieId: {
          not: null,
        },
      },
      orderBy: {
        reservedate: 'desc',
      },
    });
    return transactions || [];
  } catch (error: any) {
    console.error('Failed to retrieve transactions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
