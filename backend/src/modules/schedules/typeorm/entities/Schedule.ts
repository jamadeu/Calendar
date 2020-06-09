import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  info: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
