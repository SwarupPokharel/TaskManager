import { Employee } from '@/lib/models';
import { mongoConnection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

await mongoConnection();
export async function GET() {
    try {
        const employees = await Employee.find();
        return NextResponse.json(employees);

    } catch (error) {
        return NextResponse.json(JSON.stringify(
            { message: error instanceof Error ? error.message : error }),
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    try {
        const employees = await Employee.create(data);
        return new NextResponse(JSON.stringify({ employees }))
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: error instanceof Error ? error.message : "Error occurred" }),
            { status: 500 });
    }
}