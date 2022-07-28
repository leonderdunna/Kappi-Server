
import {  HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
    constructor(private userService: UserService) {

    }
    async use( req: Request, res: Response, next: NextFunction) {
        if (!await this.userService.verify(req.body.user))
            throw new HttpException('Benutzer ungültig', HttpStatus.FORBIDDEN)
        next();
    }
}
