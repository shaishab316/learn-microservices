/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { OrderDto } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  @MessagePattern('get_order')
  getOrder(@Payload() message: any): OrderDto {
    const id = message.value ?? message;
    if (id > 100) {
      throw new RpcException({ message: 'Order not found', status: 404 });
    }
    return { id, product: 'Laptop', userId: 1 };
  }
}
