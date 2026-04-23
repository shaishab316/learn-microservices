import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './api-gateway.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TerminusModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [process.env.KAFKA_BROKER ?? 'kafka:9092'],
            },
            consumer: {
              groupId: 'user-consumer-gateway',
            },
          },
        }),
      },
      {
        name: 'ORDER_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [process.env.KAFKA_BROKER ?? 'kafka:9092'],
            },
            consumer: {
              groupId: 'order-consumer-gateway',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AppController, HealthController],
})
export class AppModule {}
