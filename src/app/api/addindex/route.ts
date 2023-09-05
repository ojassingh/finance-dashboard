import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    
    const body = await req.json();
    const email = await body.email
    const name = await body.name
    const index = await body.index

    const prisma = new PrismaClient();

    const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

  
      let userId;
  
      if (existingUser) {
        userId = existingUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: email,
            name: name,
          },
        });
  
        userId = newUser.id;
      }
  
      // Add article to the user
      const newIndex = await prisma.index.create({
        data: {
          index: index,
        },
      });

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          indeces: {
            connect: {
                id: newIndex.id
            },
          },
        },
      });

    return NextResponse.json({ newIndex : newIndex}, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error found" }, { status: 500 });
  }
}