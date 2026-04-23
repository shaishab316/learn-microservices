import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './api-gateway.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'redis', port: 6379 },
      },
    ]),
  ],
  controllers: [AppController, HealthController],
})
export class AppModule {}
