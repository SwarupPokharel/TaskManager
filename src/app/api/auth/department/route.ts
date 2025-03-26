import { Department } from '@/lib/models';
import { mongoConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

await mongoConnection();
export async function GET() {
    try {
        const departments = await Department.find();
        return NextResponse.json(departments);

    } catch (error) {
        return NextResponse.json(JSON.stringify(
            { message: error instanceof Error ? error.message : error }),
            { status: 500 }
        )
    }
}