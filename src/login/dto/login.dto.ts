import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @IsNotEmpty({ message: `请输入正确的账号` })
  @IsString({ message: `请输入字符串` })
  userName: string;

  @IsNotEmpty({ message: `请输入正确的密码` })
  passWord: string;
}
