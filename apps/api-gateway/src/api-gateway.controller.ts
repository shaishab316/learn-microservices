import { Controller, Get, HttpException, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy,
  ) {}

  @Get('user')
  getUser() {
    return this.client.send({ cmd: 'get_user' }, 1);
  }

  @Get('register')
  register() {
    this.client.emit('user_registered', { id: 1, name: 'Shaishab' });
    return { status: 'ok' };
  }

  @Get('order/:id')
  getOrder(@Param('id') id: string) {
    return this.orderClient.send({ cmd: 'get_order' }, +id).pipe(
      catchError((err: Error & { status?: number }) => {
        throw new HttpException(err.message, err.status ?? 500);
      }),
    );
  }
}
