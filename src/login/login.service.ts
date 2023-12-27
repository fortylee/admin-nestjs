import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginService {
  async login(req: LoginDto) {
    const { userName, passWord } = req;
    return req
  }
  create(createLoginDto: LoginDto) {
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
