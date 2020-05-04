import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import * as uuid from 'uuid'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export type User = any
const saltRounds = 10

@Injectable()
export class UserService {
  private readonly users: User[] = []

  findAll(): User[] {
    return this.users
  }

  async findOne(username: string): Promise<User> {
    return this.users.find((i) => i.username === username)
    // if (!existedUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    // return existedUser
  }

  async register(name: string, username: string, password: string) {
    const existedUser = await this.findOne(username)
    // console.log(existedUser, name, username, password)
    if (!existedUser) {
      const newUser = {
        _id: uuid(),
        name,
        username,
        password: bcrypt.hashSync(password, saltRounds)
      }
      this.users.push(newUser)
      return newUser
    }
    throw new HttpException('Username has been taken', HttpStatus.CONFLICT)
  }

  async login(username: string, password: string) {
    // eslint-disable-next-line max-len
    const existedUser = await this.users.find((i) => i.username === username && bcrypt.compareSync(password, i.password))
    if (!existedUser) throw new HttpException('Username or password is incorrect', HttpStatus.NOT_FOUND)
    else {
      const privateKey = 'mySecretKey'
      const token = jwt.sign(
        // eslint-disable-next-line no-underscore-dangle
        { userID: existedUser._id },
        privateKey
      )
      return { token }
    }
  }
}
