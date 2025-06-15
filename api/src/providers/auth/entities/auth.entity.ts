import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'refresh_token', length: 255 })
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.tokens, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'expire_at' })
  expireAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
