import Motor from "@/app/lib/(models)/Motor"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const motorData = body.formData;
    
    await Motor.create(motorData);

    return NextResponse.json({message: "Motor Created"}, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Error Creating Motor", error}, { status: 500 })
  }
}

export async function GET() {
  try {
    const motores = await Motor.find()

    return NextResponse.json(motores, {status: 200})
  } catch (error) {
    return NextResponse.json({ message: "Error fetching Motores", error}, { status: 500 })
  }
}
