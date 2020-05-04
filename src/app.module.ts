import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { ProductModule } from './modules/product/product.module'

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
