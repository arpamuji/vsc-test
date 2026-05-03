import { Request, Response } from 'express';

const check = (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
};

export default { check };
