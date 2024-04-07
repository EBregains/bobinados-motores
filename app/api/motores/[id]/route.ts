import Motor from "@/app/lib/(models)/Motor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: String }}) {
  try {
    const { id } = params;
  
    const motor = await Motor.findOne({ _id: id });
    return NextResponse.json({motor}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "Error fetching Motor", error}, {status: 500})
  }
}