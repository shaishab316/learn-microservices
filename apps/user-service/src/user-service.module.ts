import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'redis', port: 6379 },
      },
    ]),
  ],
  controllers: [UserServiceController],
})
export class UserServiceModule {}
