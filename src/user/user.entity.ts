import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from "src/auth/roles.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  roles: string;
}
