import { UserRole } from 'src/enums/user-role.enum';
import { UserStatus } from 'src/enums/user-status.enum';
import { BmiAssessment } from 'src/modules/bmi-assessment/entities/bmi-assessment.entity';
import { Auth } from 'src/providers/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20 })
  role: UserRole;

  @Column({ length: 10 })
  status: UserStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Auth, (auth) => auth.user)
  tokens: Auth[];

  @OneToMany(() => BmiAssessment, (assessment) => assessment.student)
  assessments: BmiAssessment[];
}
