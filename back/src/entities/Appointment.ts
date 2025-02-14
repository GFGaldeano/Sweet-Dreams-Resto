import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Status } from "../interfaces/IAppointment";
import { User } from "./User";

@Entity({
  name: "appointments"
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "varchar", length: 5, nullable: false })
  time: string;


  @Column({ type: "varchar", length: 10, nullable: false, default: Status.Active })
  status: Status;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;



  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'userId' })
  user: User;
}