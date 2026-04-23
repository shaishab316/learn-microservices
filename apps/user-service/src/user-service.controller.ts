// apps/user-service/src/user-service.controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  @MessagePattern({ cmd: 'get_user' })
  getUser(id: number) {
    return { id, name: 'Shaishab' };
  }

  @EventPattern('user_registered')
  handleUserRegistered(@Payload() data: any) {
    console.log('User registered:', data);
  }
}
