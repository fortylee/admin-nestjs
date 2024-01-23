import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Register, Login } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/login.entity';
import * as bcrypt from 'bcryptjs';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  /**
   * @desc 注册账号
   * @param req{ userName, passWord }
   * @return number { 0 = 账号已存在，1 = 注册成功，2 = 注册失败 }
   */
  async register(req: Register): Promise<number> {
    // 查询账号存不存在数据库中
    const query = await this.userRepository
      .createQueryBuilder('queryUser')
      .where('queryUser.user_name = :name', { name: req.username })
      .getOne();
    let result: number;
    if (query === null) {
      // 不存在，将数据插入数据库中
      const add = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(UserInfo)
        .values([
          {
            user_name: req.username,
            pass_word: this.encryption(req.passwordOne),
          },
        ])
        .execute();
      // 判断是否插入数据成功，1 = 成功；2 = 失败
      result = add?.raw?.['affectedRows'] === 1 ? 1 : 2;
    } else {
      // 账号存在，0 = 账号已存在
      result = 0;
    }
    return result;
  }

  // 登录 todo
  async login(req: Login): Promise<string> {
    let msg = '';
    const account = await this.userRepository.find({
      where: {
        user_name: req.userName,
      },
    });
    // 查找账号是否在数据库存在
    if (account) {
      msg = '账号不存在';
    } else {
      msg = '账号存在';
    }
    return msg;
  }

  /**
   * @desc 使用 svg-captcha 生成图形验证码
   * @data svg 路径
   * @text 验证码文字
   * @returns { data, text }
   */
  captcha(): { data: string; text: string } {
    // svg 配置
    const options = {
      size: 4,
      noise: 1,
      color: true,
      background: '#666',
      width: 100,
      height: 40,
      fontSize: 60,
    };
    const captcha = svgCaptcha.create(options);
    return {
      data: captcha.data,
      text: captcha.text.toLowerCase(),
    };
  }

  /**
   * @desc 对密码进行加密处理
   */
  encryption(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
