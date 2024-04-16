import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStage } from "./project-stage.enum";
import { ProjectStatus } from "./project-status.enum";
import { User } from "src/auth/user/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    project_name: string;

    @Column({ default: "" })
    project_details: string;

    @Column({ default: "0" })
    project_value: string;

    @Column({ default: "0" })
    paid_amount: string;

    @Column()
    project_stage: ProjectStage;

    @Column()
    project_status: ProjectStatus;

    @Column({ default: "0" })
    refund_amount: string;

    @Column({ default: "" })
    payment_ids: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    address: string;

    @CreateDateColumn({ type: 'timestamptz' })
    start_date: Date;

    @ManyToOne((_type) => User, (user) => user.project, {eager: false})
    @Exclude({ toPlainOnly: true })
    user: User;
}