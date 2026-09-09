import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken, extractTokenFromHeader } from './jwt';
import type { DecodedToken } from './types';

export interface NextApiRequestWithAuth extends NextApiRequest {
  user?: DecodedToken;
  // Replace jsonwebtoken with jose:
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const { payload } = await jwtVerify(token, secret);

}

export const authMiddleware = (handler: (req: NextApiRequestWithAuth, res: NextApiResponse) => Promise<void> | void) => {
  return async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

