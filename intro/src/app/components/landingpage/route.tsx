import {ImageResponse} from "next/og";
import "@/app/globals.css";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        return new ImageResponse(
            (<div style={{
            height: '100%',
            width: '100%',}} className="w-full h-full bg-red-300">
                Textting
            </div>),{
                width: 1200,
                height: 630,
            }
        );
    } catch (error: any) {
        console.log(`${error.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}