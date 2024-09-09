import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
import { serveStatic } from 'frog/serve-static'
import { createNeynar } from 'frog/middlewares';
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }


const neynar = createNeynar({ apiKey: 'NEYNAR_FROG_FM' })

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  hub: pinata(),
  title: 'Frog Frame',
})
  .use(
    neynar.middleware({ features: ['interactor', 'cast'] }),
  )

app.frame('/', (c) => {
  const { buttonValue, inputText, status, frameData, verified } = c

  const {fid} = frameData || {};
  console.log(frameData);
  console.log("Fid: ", fid);


  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fid?.toString()}`
            : 'Welcome!'}
        </div>
      </div>
    ),
    intents: [
      <Button value="apples">Apples</Button>,
      <Button value="profile" action='/profile'>Profile</Button>,
    ],
  })
})

app.frame("/profile", (c) => {
  const { buttonValue, inputText, status, frameData, verified } = c

  const {username, followerCount, pfpUrl} = c.var.interactor || {};

  const {fid} = frameData || {};
  console.log(frameData);
  console.log("Fid: ", fid);

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            display: 'flex',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          <>Greetings {username}! You have {followerCount} followers.
          <img style={{height: 200, width: 200}} src={pfpUrl} alt="Profile Picture" />
          </>
        </div>
      </div>
    ),
    intents: [
     <Button value="back" action='/'>Back</Button>,
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
