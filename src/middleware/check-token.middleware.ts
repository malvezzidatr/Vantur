// Importe os módulos necessários
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET);

        next();
      } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
      }
    } else {
      res.status(401).json({ message: 'Token não fornecido' });
    }
  }
}
