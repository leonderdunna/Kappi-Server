import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from 'src/stats/stats.service';
import { Stats } from '../stats/stats.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User,Stats])],
    providers:[UserService, StatsService],
    controllers:[UserController]
})
export class UserModule {}
