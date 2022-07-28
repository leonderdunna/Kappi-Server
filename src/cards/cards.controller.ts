import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StatsService } from 'src/stats/stats.service';
import { UserService } from 'src/user/user.service';
import { Cards } from './card.entity';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {

    constructor(private cardsService: CardsService,
        private userService: UserService, private statsService: StatsService) { }

    @Get()
    async getCards(@Body() body): Promise<any> {
        if (!await this.userService.verify(body.user)) {
            throw new HttpException('Benutzer ungültig',HttpStatus.FORBIDDEN)
        
        }
        console.log(await this.userService.verify(body.user))
        return true
    }

    @Get(':id')
    getCard(@Param() params): Promise<Cards> {
        return this.cardsService.findOne(params.id)
    }

    @Post('')
    addCard(@Body() body): any {
        console.log(body)
        // return this.cardsService.add(body.card)

    }

    @Put('')
    update(@Body() body): void {
        this.cardsService.update(body.card)
    }

    @Delete(':id')
    deleteCard(@Param() params): void {
        this.cardsService.deleteCard(params.id)
        this.statsService.deleteByCard(params.id)
    }

}
