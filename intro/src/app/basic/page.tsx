import { getFrameMetadata } from '@coinbase/onchainkit/frame'
import type { Metadata } from 'next'

const frameMetadata = getFrameMetadata({
    buttons: [
        {
            label: "Welcome",
            // postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/welcome`
        },
        // {
        //     label: "Button 2",
        //     postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/button-2`
        // },
    ],
    image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`
    },
    postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/advanced`,
})


export const metadata: Metadata = {
  title: 'First Frame',
  description: 'Simple Frame example',
  openGraph: {
    title: 'First Frame',
    description: 'Simple Frame example',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`],
  },
  other: {
    ...frameMetadata,
  },
}

export default function Home() {
    return (
        <h1>Hello</h1>
    );
}