import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: `userName不能为空！` })
  userName: string;

  @IsNotEmpty({ message: `passWord不能为空！` })
  passWord: string;
}
