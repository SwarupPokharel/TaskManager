import { Employee } from '@/lib/models';
import { mongoConnection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

await mongoConnection();

// GET individual post

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        const employee = await Employee.findById(id);
        return new NextResponse(JSON.stringify({ employee }));
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
        const employee = await Employee.findByIdAndUpdate(id, data, { new: true });
        return new NextResponse(JSON.stringify({ employee }));
    } catch (error) {
        return new NextResponse(JSON.stringify(
            { message: error instanceof Error ? error.message : String(error) }),
            { status: 500 });
    }
}

// DELETE method

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    try {
        await Employee.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify({ message: 'Employee deleted' }));
    } catch (error) {
        return new NextResponse(JSON.stringify(
            { message: error instanceof Error ? error.message : String(error) }),
            { status: 500 });
    }
}