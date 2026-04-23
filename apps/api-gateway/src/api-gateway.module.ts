import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './api-gateway.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TerminusModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.get('REDIS_HOST') as string,
            port: config.get<number>('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'ORDER_SERVICE',
        useFactory: (config: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.get('REDIS_HOST') as string,
            port: config.get<number>('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController, HealthController],
})
export class AppModule {}
