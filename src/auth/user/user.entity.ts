import { Project } from 'src/project/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { AccountStatus } from '../account-status.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  dob: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: AccountStatus.ACTIVE })
  account_status: AccountStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  account_create_date: Date;

  @OneToMany((_type) => Project, (project) => project.user, { eager: true })
  project: Project[];
}
