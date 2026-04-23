/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OrderDto, UserDto } from '@app/shared';
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

  @MessagePattern({ cmd: 'get_user' })
  async getUser(@Payload() id: number): Promise<UserDto & { order: OrderDto }> {
    const order = await firstValueFrom(
      this.orderClient.send({ cmd: 'get_order' }, id),
    );
    return { id, name: 'Shaishab', order };
  }

  @EventPattern('user_registered')
  handleUserRegistered(@Payload() data: any) {
    console.log('User registered:', data);
  }
}
