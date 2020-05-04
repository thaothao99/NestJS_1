import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
  getPublic() {
    return 'public content'
  }

  getProtected(userID: string) {
    return `private content of ${userID}`
  }
}
