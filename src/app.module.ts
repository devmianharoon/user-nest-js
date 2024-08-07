import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/data/user.entity';



@Module({
  imports: [UserModule , 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal : true,
        envFilePath : ".local.env"
        // envFilePath : "prod.env"

      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User],
        synchronize: configService.get<boolean>('DATABASE_SYNC'),
        logging : true,
      }),
      inject: [ConfigService],
    }), 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
