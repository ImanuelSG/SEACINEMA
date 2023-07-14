import bcrypt from 'bcrypt';
import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server';

export async function POST (request: Request){
    const body = await request.json();
    const { username,name,password} = body;
    const age = parseInt(body.age);
    const hashedpassword = await bcrypt.hash(password , 12);

    const user = await prisma.user.create({
        data:{
            name,username,age,hashedpassword
        }
    })
    return NextResponse .json(user);
}   
