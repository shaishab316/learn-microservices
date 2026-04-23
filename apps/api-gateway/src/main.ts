/* eslint-disable @typescript-eslint/await-thenable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api-gateway.module';
import { ClientKafka } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const userClient = app.get<ClientKafka>('USER_SERVICE');
  const orderClient = app.get<ClientKafka>('ORDER_SERVICE');

  await userClient.subscribeToResponseOf('get_user');
  await orderClient.subscribeToResponseOf('get_order');

  await userClient.connect();
  await orderClient.connect();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
