import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import IFindAllInDayDTO from '@modules/schedules/dtos/IFindAllInDayDTO';
import IFindAllInMonthDTO from '@modules/schedules/dtos/IFindAllInMonthDTO';
import Schedule from '@modules/schedules/typeorm/entities/Schedule';

export default interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  update(schedule: Schedule): Promise<Schedule>;
  findAllInDay(data: IFindAllInDayDTO): Promise<Schedule[]>;
  findAllInMonth(date: IFindAllInMonthDTO): Promise<Schedule[]>;
}
