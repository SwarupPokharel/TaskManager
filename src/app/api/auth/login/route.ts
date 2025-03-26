import { mongoConnection } from '../../../../lib/db';
import { User } from '../../../../lib/models';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

type ErrorResponse = {
    error: string,
}

mongoConnection();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json<ErrorResponse>({ error: "User does not exist." }, { status: 400 });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json<ErrorResponse>({ error: "The password is incorrect." }, { status: 401 });
        }
        const tokenData = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
        };
        const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });
        const response = NextResponse.json({ message: "Login Succsssful.", success: true, status: 200, jwtToken });
        response.cookies.set("token", jwtToken, {
            httpOnly: true,
        })
        return response;
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        )

    }
}


