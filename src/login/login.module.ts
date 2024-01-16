import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController, RegisterController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [LoginController, RegisterController],
  providers: [LoginService],
})
export class LoginModule {}
