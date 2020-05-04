import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      // Bearer token
      const token = req && req.headers.authorization.split(' ')[1]
      const privateKey = 'mySecretKey'
      if (!token) {
        return false
      }
      jwt.verify(token, privateKey, (err, decode) => {
        if (err) { throw err }
        req.userID = decode.userID
      })
      return true
    } catch (err) {
      return false
    }
  }
}
