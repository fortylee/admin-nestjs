import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/login.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}
  // 注册账号
  async register(req: AuthDto): Promise<number> {
    // 查询账号存不存在数据库中
    const query = await this.userRepository
      .createQueryBuilder('queryUser')
      .where('queryUser.user_name = :name', { name: req.userName })
      .getOne();
    let result: number;
    if (query === null) {
      // 不存在，将数据插入数据库中
      const add = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(UserInfo)
        .values([{ user_name: req.userName, pass_word: req.passWord }])
        .execute();
      // 判断是否插入数据成功
      result = add?.raw?.affectedRows === 1 ? 1 : 2;
    } else {
      // 存在，return
      result = 0;
    }
    return result;
  }

  // 登录
  async login(req: AuthDto): Promise<object> {
    const account = await this.userRepository.find({
      where: {
        user_name: req.userName,
      },
    });
    // 查找账号是否在数据库存在
    if (!account?.[0]?.user_name) {
      throw new HttpException('账号不存在！', HttpStatus.FORBIDDEN);
    }
    return req;
  }
}