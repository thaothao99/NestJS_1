import {
  Controller, Get, Post, HttpCode, Body, Param
} from '@nestjs/common'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  users() {
    return this.userService.findAll()
  }

  @Get('user/:username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username)
  }

  @HttpCode(204)
  @Post('auth/register')
  async register(@Body('name') name: string, @Body('username') username: string, @Body('password') password: string) {
    return this.userService.register(name, username, password)
  }

  @Post('/auth/login')
  login(@Body('username') username: string, @Body('password') password: string) {
    return this.userService.login(username, password)
  }
}
