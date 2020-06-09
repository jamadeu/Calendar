import { inject, injectable } from 'tsyringe';
import { isBefore, isAfter, subMinutes, addMinutes } from 'date-fns';
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

    const schedule = await this.scheduleRepository.create({
      start,
      end,
      info,
    });
    return schedule;
  }
}

export default CreateSchedule;
