import { AssessmentLevel } from 'src/enums/bmi-assessment.enum';
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
export class BmiAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  height: number;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2 })
  bmi: number;

  @Column({ length: 30 })
  assessment: AssessmentLevel;
  @ManyToOne(() => User, (user) => user.assessments, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'student_id' })
  student: User;

  @ManyToOne(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'evaluator_id' })
  evaluator: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
