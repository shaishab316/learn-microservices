import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserServiceController } from './user-service.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [process.env.KAFKA_BROKER ?? 'kafka:9092'],
            },
            consumer: {
              groupId: 'order-consumer-gateway-client',
            },
          },
        }),
      },
    ]),
  ],
  controllers: [UserServiceController],
})
export class UserServiceModule {}
