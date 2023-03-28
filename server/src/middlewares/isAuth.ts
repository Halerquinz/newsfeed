import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

interface UserPayload {
  userId: string
}

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(400).json('Not authorization')
    }
    const token = authHeader.split(' ')[1];
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'thuc_tap_co_so') as UserPayload
    } catch (error) {
        let msg
        if (error instanceof Error) {
            msg = error.message
        }
        return res.status(402).json({ status: 'fail', msg })
    }
    if (!decodedToken) {
        return res.status(400).json({ status: 'fail', msg: 'Token is incorrect' })
    }
    req.userId = decodedToken.userId;
    next();
};
