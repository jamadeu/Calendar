import { getRepository, Repository } from 'typeorm';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import IFindAllInDayDTO from '@modules/schedules/dtos/IFindAllInDayDTO';
import IFindAllInMonthDTO from '@modules/schedules/dtos/IFindAllInMonthDTO';
import Schedule from '@modules/schedules/typeorm/entities/Schedule';

class ScheduleRepository implements IScheduleRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    // TODO
  }

  public async update(schedule: Schedule): Promise<Schedule> {
    // TODO
  }

  public async findAllInDay({
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<Schedule[]> {
    // TODO
  }

  public async findAllInMonth({
    month,
    year,
  }: IFindAllInMonthDTO): Promise<Schedule[]> {
    // TODO
  }
}

export default ScheduleRepository;
