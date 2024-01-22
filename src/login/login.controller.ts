import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthDto } from './dto/login.dto';

/**
 * @classdesc 注册类
 * @Get 注册界面的图形验证码
 * @Post 注册账号的主要逻辑
 */
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: LoginService) {}

  private captchaText: string

  /**
   * @desc 注册账号的主要逻辑
   * @param req{ userName, passWord }
   */
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() req: AuthDto): Promise<object> {
    let response: {
      message: string;
      status: HttpStatus;
    } | {};
    response = {}
    await this.registerService.register(req).then((code: number):void => {
        if (code === 0) {
          response = {
            message: `账号已存在，请更换`,
            status: HttpStatus.FORBIDDEN,
          };
        } else if (code === 1) {
          response = {
            message: `注册成功`,
            status: HttpStatus.OK,
          };
        } else if (code === 2) {
          response = {
            message: `注册失败`,
            status: HttpStatus.FORBIDDEN,
          };
        }
      }).catch(() => {
        throw new Error('服务异常，请稍后重试！');
      });
    return response;
  }

  /**
   * @desc 注册界面的图形验证码
   */
  @Get()
  async captcha(@Res() res: any): Promise<void> {
    const captcha = this.registerService.captcha()
    res.send(captcha.data);
    this.captchaText = captcha.text;
  }
}

/**
 * 登录
 */
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() req: AuthDto): Promise<string> {
    return this.loginService.login(req);
  }
}
