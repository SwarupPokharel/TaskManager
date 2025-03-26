import { Task } from '@/lib/models';
import { mongoConnection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    await mongoConnection();
    try {
        const tasks = await Task.find();
        return NextResponse.json(tasks);

    } catch (error) {
        return NextResponse.json(JSON.stringify(
            { message: error instanceof Error ? error.message : error }),
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    await mongoConnection();
    const data = await request.json();
    console.log(data);
    try {
        const tasks = await Task.create(data);
        return NextResponse.json({ tasks }, { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error instanceof Error ? error.message : "Error occurred" }),
            { status: 500 });
    }
}