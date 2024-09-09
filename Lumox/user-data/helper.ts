export async function postLum0xTestFrameValidation(fid: number, path: string) {
    fetch('https://testnetapi.lum0x.com/frame/validation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            farcasterFid: fid,
            frameUrl: `${process.env.BASE_URL}/api/${path}`
        })
      });
} 