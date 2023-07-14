import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb"
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth/jwt/types"{
  interface JWT {
    id: string;
    name: string;
    username: string ;
    age: number;
  }
}

declare module "next-auth"{
  interface Session{
    user:{
      id: string;
      name: string;
      age:number;
      username:string;
    }

  }
  interface User{
    id: string;
    name: string;
    username: string ;
    age: number;
    hashedpassword:string;
    balance:number | null;
  }
}



export const authOptions : AuthOptions=  ({
    adapter : PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
          name: 'credentials',
        credentials: {
          // Specify the fields used for authentication
          username: { label: "Username", type: "text", placeholder: "Enter your username" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials){
          if (!credentials?.username || !credentials?.password) {
              throw new Error ('Invalid credentials');
          }
          const user = await prisma.user.findUnique({
              where: {
                  username: credentials.username,
              }
          })
          if (!user){
              throw new Error ('No User Exsists.')
          }
          const correcpassword = await bcrypt.compare(credentials.password,user.hashedpassword)
          if (!correcpassword){
              throw new Error ('Password incorrect')
          }
          return user;
        }
      }),
    ],
    callbacks:
    {async jwt({token,user}
      ){
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.username = user.username;
          token.age = user.age;
        }
        return token;
      },
      async session({ session, token}) {
        session.user.id=token.id
        session.user.name=token.name
        session.user.username=token.username;
        session.user.age=token.age
        return session
      }
      
    },
    pages:{
      signIn: '/'
    },
    debug: process.env.NODE_ENV == 'development',
    session:{
      strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export default NextAuth(authOptions)