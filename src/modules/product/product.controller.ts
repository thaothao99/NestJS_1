import {
  Controller, Get, UseGuards, Req
} from '@nestjs/common'
import { ProductService } from './product.service'
import { AuthGuard } from '../../common/auth.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/public')
  getPublic() {
    return this.productService.getPublic()
  }

  @UseGuards(AuthGuard)
  @Get('/protected')
  getProtected(@Req() req: any) {
    return this.productService.getProtected(req.userID)
  }
}
