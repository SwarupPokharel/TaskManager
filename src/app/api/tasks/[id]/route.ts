import { Task } from '@/lib/models';
import { mongoConnection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

await mongoConnection();

// GET individual post

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        const task = await Task.findById(id);
        return new NextResponse(JSON.stringify({ task }));
    } catch (error) {
        return new NextResponse(JSON.stringify(
            { message: error instanceof Error ? error.message : String(error) }),
            { status: 500 });
    }
}

// PUT method

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    const data = await request.json();
    try {
        const task = await Task.findByIdAndUpdate(id, data, { new: true });
        return new NextResponse(JSON.stringify({ task }));
    } catch (error) {
        return new NextResponse(JSON.stringify(
            { message: error instanceof Error ? error.message : String(error) }),
            { status: 500 });
    }
}