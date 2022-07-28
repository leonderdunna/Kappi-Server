import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cards } from './cards/card.entity';
import { Package } from './packages/package.entity';
import { CardsModule } from './cards/cards.module';
import { PackagesModule } from './packages/packages.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

import { Stats } from './stats/stats.entity';

import { StatsModule } from './stats/stats.module';
import { SettingsController } from './settings/settings.controller';
import { VerifyMiddleware } from './middleware/verify.middleware';
import { UserService } from './user/user.service';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'karteikarten',
      entities: [Cards, Package, User, Stats],
      synchronize: true
    }),
    CardsModule,
    PackagesModule,
    UserModule,
    StatsModule,
    TypeOrmModule.forFeature([User])

  ],
  providers: [UserService],
  controllers: [SettingsController],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyMiddleware)
      .exclude(
        { path: 'user/all', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.POST })
      .forRoutes('user')
  }
}
