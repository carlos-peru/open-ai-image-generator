import { NextResponse } from "next/server";
import openAI from "@/lib/openAI";

const NUMBER_OF_IMAGES = 1;
const IMAGE_SIZE = "256x256";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt || !prompt.trim()) {
    return NextResponse.json(
      {
        error: "Invalid prompt",
      },
      { status: 400 }
    );
  }

  try {
    const response = await openAI.createImage({
      prompt,
      n: NUMBER_OF_IMAGES,
      size: IMAGE_SIZE,
    });
    const { url } = response.data.data[0];

    return NextResponse.json({
      url,
    });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);

      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);

      return NextResponse.json(
        { error: "An error occurred during your request." },
        {
          status: 500,
        }
      );
    }
  }
}
