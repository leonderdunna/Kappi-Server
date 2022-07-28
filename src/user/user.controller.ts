import { Body, Controller, Delete, Get, Post, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { StatsService } from 'src/stats/stats.service';

import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private statsService: StatsService) { }

    @Get('all')
    getUsers(): Promise<string[]> {
        return this.userService.findAll()
    }

    @Get()
    async verify(@Body() body, @Param() params) {
        return await this.userService.verify(body.user)
    }

    @Post()
    addUser(@Body() body): Promise<boolean> {
        return this.userService.addUser(body.user)
    }
    @Delete()
    async deleteUser(@Body() body) {
         return this.userService.deleteUser(body.user)
    }

    @Put()
    async updateUser(@Body() body) {
        if(body.neuesPasswort==undefined){
            throw new HttpException('Kein neues Passwort angegeben',HttpStatus.BAD_REQUEST)
        }
      return this.userService.updateUser(body.user,body.neuesPasswort)
    }

}
