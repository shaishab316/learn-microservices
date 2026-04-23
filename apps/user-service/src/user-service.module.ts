import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';

@Module({
  imports: [],
  controllers: [UserServiceController],
})
export class UserServiceModule {}
