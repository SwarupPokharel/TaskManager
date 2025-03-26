import { mongoConnection } from '@/lib/db';
import { User } from '@/lib/models';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

mongoConnection();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, password, email } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });

        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User Created Successfully.",
            success: true,
            savedUser,
        });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        )
    }

}
