import dotenv from 'dotenv';
dotenv.config();

import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { pinata } from 'frog/hubs';
import { Lum0x } from 'lum0x-sdk';
import { serveStatic } from 'frog/serve-static';
import { handle } from 'frog/vercel';

// Initialize Lum0x SDK
Lum0x.init(process.env.NEXT_PUBLIC_LUMOX_API_KEY as string);

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: pinata(),
  title: 'Frog Frame'
});

app.frame('/', (c) => {
  const { frameData, verified } = c;

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundSize: '100% 100%',
          display: 'flex',
          backgroundColor: '#331b19',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          text: '#fff'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '10px'
          }}
        >
          {/* <h1 style={{
            color: "white",
            fontSize: 60,
          }}>Create AI Generated BIO Description</h1> */}
          <h1
            style={{
              color: 'white',
              fontSize: 60
            }}
          >
            Get Farcaster Recent Cast
          </h1>
        </div>
        <div
          style={{
            marginY: 'auto',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            height: 50
          }}
        >
          <img
            src={`https://a1f5-105-113-18-97.ngrok-free.app/lumox-logo.png`}
            width={50}
            height={50}
            alt="lumox logo"
          />
          <h1 style={{ color: 'white' }}>Powered By LUMOX</h1>
        </div>
      </div>
    ),
    action: '/profile',
    intents: [
      <Button value="profile">Get Recent Casts</Button>
      // <TextInput placeholder='FID' />,
      // <Button action='submit' value='Submit'>Submit FID</Button>
    ]
  });
});

app.frame('/profile', async (c) => {
  const { frameData } = c;
  let userData: any = {};

  // if (frameData?.inputText && frameData?.buttonIndex === 2){
  //     let res = await Lum0x.farcasterUser.getUserByFids({
  //       fids: frameData.inputText.toString()
  //     });
  //   console.log("Response From Lum0x", res);
  //   // search for the fid from the input text
  // }

  // let userRes = await Lum0x.farcasterUser.getUserByFids({
  //   fids: frameData?.fid + ""
  // });
  // console.log("User Response From Lum0x", userRes.users[0]);
  // userData = userRes.users[0];

  let userRecentCast = await Lum0x.farcasterCast.getRecentCast({
    viewer_fid: frameData?.fid,
    limit: 2
  });

  // console.log("User Recent Cast", userRecentCast.result.casts);

  // Extract the text from each cast and store in recentCastTexts array
  let recentCastTexts: string[] = userRecentCast.result.casts.map(
    (cast: { text: string }) => cast.text
  );

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundSize: '100% 100%',
          display: 'flex',
          backgroundColor: '#331b19',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          text: '#fff'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <img
            src={userData?.pfp_url}
            width={120}
            height={120}
            style={{
              borderRadius: '50%'
            }}
            alt="lumox logo"
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                color: 'white',
                fontSize: 40
              }}
            >
              {userData?.username}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
              {/* <h1 style={{text: 30, }}>Farcaster Recent Cast</h1> */}
              {recentCastTexts.map((castText, index) => (
                <p key={index} style={{ color: 'white', fontSize: 30 }}>
                  {castText.length > 20 ? `${castText.slice(0, 20)} ...` : castText}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginY: 'auto',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            height: 50
          }}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_SITE_URL}/lumox-logo.png`}
            width={50}
            height={50}
            alt="lumox logo"
          />
          <h1 style={{ color: 'white' }}>Powered By LUMOX</h1>
        </div>
      </div>
    ),
    intents: [<Button action="/">Reset</Button>]
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined';
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development';
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
