import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {

    const body =
      await request.json();

    const {
      name,
      email,
      company,
      message,
    } = body;

    // Basic Validation
    if (
      !name ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields",
        },

        {
          status: 400,
        }
      );
    }

    // Simulate API Delay
    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          1200
        )
    );

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully",
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong",
      },

      {
        status: 500,
      }
    );
  }
}