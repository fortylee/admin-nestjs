import { Equals, IsNotEmpty, Length } from 'class-validator';

export class Register {
  @IsNotEmpty({ message: `username不能为空！` })
  @Length(1, 10, { message: `username的长度应在1到10之间！` })
  username: string;

  @IsNotEmpty({ message: `passwordOne不能为空！` })
  passwordOne: string;

  @IsNotEmpty({ message: `passwordTwo不能为空！` })
  passwordTwo: string;

  @IsNotEmpty({ message: `verify不能为空！` })
  verify: string;
}
export class Login {
  @IsNotEmpty({ message: `userName不能为空！` })
  userName: string;

  @IsNotEmpty({ message: `passWord不能为空！` })
  passWord: string;

  @IsNotEmpty({ message: `verify不能为空！` })
  verify: string;
}
