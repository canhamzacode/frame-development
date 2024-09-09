import { getFrameHtmlResponse } from "@coinbase/onchainkit/core";
import { NextResponse, NextRequest } from "next/server";

async function handleRequest(req: NextRequest) {
  
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Good Job!!',
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/components/landingpage`,
        },
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/advanced`,
      })
    )
}


export async function POST(req: NextRequest): Promise<Response> {
  return handleRequest(req)
}