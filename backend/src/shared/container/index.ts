import { container } from 'tsyringe';

import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import ScheduleRepository from '@modules/schedules/typeorm/repositories/ScheduleRepository';

container.registerSingleton<IScheduleRepository>(
  'ScheduleRepository',
  ScheduleRepository,
);
