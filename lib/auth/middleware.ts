import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from '@/lib/auth/middleware';

import { verifyToken, extractTokenFromHeader } from './jwt';
import { DecodedToken } from './types';

// Extend NextApiRequest to include user
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
//import authMiddleware from '@/lib/auth/middleware';

export interface NextApiRequestWithAuth extends NextApiRequest {
  user?: DecodedToken;
}

// vausing praising error
