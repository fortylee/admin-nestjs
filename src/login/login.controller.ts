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
import * as svgCaptcha from 'svg-captcha';

/**
 * 注册
 */
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: LoginService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() req: AuthDto): Promise<object> {
    let msg: {
      message: string;
      status: HttpStatus;
    } = {
      message: '',
      status: 200,
    };
    await this.registerService.register(req).then((code) => {
        if (code === 0) {
          msg = {
            message: `账号已存在，请更换`,
            status: HttpStatus.FORBIDDEN,
          };
        } else if (code === 1) {
          msg = {
            message: `注册成功`,
            status: HttpStatus.OK,
          };
        } else if (code === 2) {
          msg = {
            message: `注册失败`,
            status: HttpStatus.FORBIDDEN,
          };
        }
      })
      .catch(() => {
        throw new Error('服务异常');
      });
    return msg;
  }

  @Get()
  async captcha(@Res() res: any) {
    const options = {
      size: 4,
      noise: 1,
      color: true,
      background: '#666',
    }
    const captcha = svgCaptcha.create(options);
    // res.setHeader('Content-type', 'image/svg+xml');
    console.log(captcha.text);
    res.send(captcha.data);
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
