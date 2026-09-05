import { NextApiRequest, NextApiResponse } from 'next';
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

export interface NextApiRequestWithAuth extends NextApiRequest {
  user?: DecodedToken;
}

/**
