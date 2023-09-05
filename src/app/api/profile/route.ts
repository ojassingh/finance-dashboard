import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const email = await body.email;
    const name = await body.name;

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

    const articles = await prisma.user.findUnique({
      where: { id: userId },
      include: { articles: true },
    });

    const indeces = await prisma.user.findUnique({
        where: { id: userId },
        include: { indeces: true },
      });


    return NextResponse.json({articles: articles, indeces: indeces}, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error found" }, { status: 500 });
  }
}
