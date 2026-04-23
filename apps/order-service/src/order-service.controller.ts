import { OrderDto } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  @MessagePattern({ cmd: 'get_order' })
  getOrder(@Payload() id: number): OrderDto {
    if (id > 100) {
      throw new RpcException({ message: 'Order not found', status: 404 });
    }

    return { id, product: 'Laptop', userId: 1 };
  }
}
