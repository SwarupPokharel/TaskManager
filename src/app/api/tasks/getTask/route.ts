import { Task } from '@/lib/models';
import { mongoConnection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await mongoConnection();
        const { employee } = await req.json();
        if (!employee) {
            return new NextResponse(JSON.stringify({ error: "Employee name is required" }), { status: 400 });
        }
        const tasks = await Task.find({ employeeList: employee });
        return NextResponse.json(tasks);
    } catch (error) {
        return NextResponse.json(JSON.stringify(
            { message: error instanceof Error ? error.message : error }),
            { status: 500 }
        )
    }
}