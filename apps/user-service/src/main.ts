/* eslint-disable @typescript-eslint/await-thenable */
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';
import { ClientKafka } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: { brokers: [process.env.KAFKA_BROKER ?? 'kafka:9092'] },
        consumer: { groupId: 'user-consumer-server' },
      },
    },
  );

  const orderClient = app.get<ClientKafka>('ORDER_SERVICE');
  await orderClient.subscribeToResponseOf('get_order');

  await app.listen();
}
bootstrap();
