/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class UserServiceController {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientProxy) {}

  @MessagePattern('get_user')
  async getUser(@Payload() message: any) {
    const id = message.value ?? message;
    const order = await firstValueFrom(this.orderClient.send('get_order', id));
    return { id, name: 'Shaishab', order };
  }

  @EventPattern('user_registered')
  handleUserRegistered(@Payload() data: any) {
    console.log('User registered:', data);
  }
}
