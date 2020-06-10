import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear } from 'date-fns';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import IFindALlInDayDTO from '@modules/schedules/dtos/IFindAllInDayDTO';
import IFindAllInMonthDTO from '@modules/schedules/dtos/IFindAllInMonthDTO';
import Schedule from '@modules/schedules/typeorm/entities/Schedule';

class FakeScheduleRepository implements IScheduleRepository {
  private schedules: Schedule[] = [];

  public async create({
    start,
    end,
    info,
  }: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = new Schedule();
    Object.assign(schedule, { id: uuid, start, end, info });
    this.schedules.push(schedule);
    return schedule;
  }

  public async update(schedule: Schedule): Promise<Schedule> {
    const findIndex = this.schedules.findIndex(
      checkSchedule => checkSchedule.id === schedule.id,
    );
    this.schedules[findIndex] = schedule;
    return schedule;
  }

  public async findAllInDay({
    day,
    month,
    year,
  }: IFindALlInDayDTO): Promise<Schedule[]> {
    return this.schedules.filter(schedule => {
      return (
        getDate(schedule.start) === day &&
        getMonth(schedule.start) === month &&
        getYear(schedule.start) === year
      );
    });
  }

  public async findAllInMonth({
    month,
    year,
  }: IFindAllInMonthDTO): Promise<Schedule[]> {
    return this.schedules.filter(schedule => {
      return (
        getMonth(schedule.start) + 1 === month &&
        getYear(schedule.start) === year
      );
    });
  }
}

export default FakeScheduleRepository;
