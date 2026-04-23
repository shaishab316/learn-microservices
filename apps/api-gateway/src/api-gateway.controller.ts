import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get('user')
  getUser() {
    return this.client.send({ cmd: 'get_user' }, 1);
  }

  @Get('register')
  register() {
    this.client.emit('user_registered', { id: 1, name: 'Shaishab' });
    return { status: 'ok' };
  }
}
