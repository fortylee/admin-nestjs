import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: `账号` })
  user_name: string;

  @Column({ comment: `密码` })
  pass_word: string;
}
