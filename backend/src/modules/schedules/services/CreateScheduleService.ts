import { inject, injectable } from 'tsyringe';
import { isBefore, getDate, getMonth, getYear } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import Schedule from '@modules/schedules/typeorm/entities/Schedule';

interface IRequest {
  start: Date;
  end: Date;
  info: string;
}

@injectable()
class CreateSchedule {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
  ) {}

  public async execute({ start, end, info }: IRequest): Promise<Schedule> {
    if (isBefore(start, Date.now())) {
      throw new AppError('You can not create a schedule on past dates');
    }

    const checkIfDateIsInRange = (
      date: Date,
      startDate: Date,
      endDate: Date,
    ): boolean => {
      return date >= startDate && date <= endDate;
    };

    const day = getDate(start);
    const month = getMonth(start);
    const year = getYear(start);
    const schedulesInDay = await this.scheduleRepository.findAllInDay({
      day,
      month,
      year,
    });
    schedulesInDay.forEach(schedule => {
      if (
        checkIfDateIsInRange(start, schedule.start, schedule.end) ||
        checkIfDateIsInRange(end, schedule.start, schedule.end)
      ) {
        throw new AppError('Schedule is unavailable');
      }
    });

    const schedule = await this.scheduleRepository.create({
      start,
      end,
      info,
    });
    return schedule;
  }
}

export default CreateSchedule;
