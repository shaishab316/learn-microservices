import { OrderDto } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  @MessagePattern({ cmd: 'get_order' })
  getOrder(@Payload() id: number): OrderDto {
    return { id, product: 'Laptop', userId: 1 };
  }
}
