import type { NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies';
import { firebaseAdmin } from '../../services/firebaseAdmin';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const cookies = nookies.get(undefined, 'token');
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    
        // the user is authenticated!
        const { uid, email } = token;
    
        // FETCH STUFF HERE!! 🚀
    
        return res.status(200).json(token);
      } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        // ctx.res.writeHead(302, { Location: '/login' });
        // ctx.res.end();
    
        // `as never` prevents inference issues
        // with InferGetServerSidePropsType.
        // The props returned here don't matter because we've
        // already redirected the user.
        return res.status(401);
      }
    
  }