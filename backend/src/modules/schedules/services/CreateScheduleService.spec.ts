import AppError from '@shared/errors/AppError';
import { isEqual } from 'date-fns';
import FakeScheduleRepository from '@modules/schedules/repositories/fakes/FakeScheduleRepository';
import CreateScheduleService from './CreateScheduleService';

let fakeScheduleRepository: FakeScheduleRepository;
let createSchedule: CreateScheduleService;

describe('CreateSchedule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fakeScheduleRepository = new FakeScheduleRepository();
    createSchedule = new CreateScheduleService(fakeScheduleRepository);
  });

  it('be able to create a new schedule', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 1, 9).getTime();
    });

    const schedule = await createSchedule.execute({
      start: new Date(2020, 6, 2, 10),
      end: new Date(2020, 6, 2, 11),
      info: 'info',
    });

    expect(schedule).toHaveProperty('id');
    expect(isEqual(schedule.start, new Date(2020, 6, 2, 10))).toBeTruthy();
    expect(isEqual(schedule.end, new Date(2020, 6, 2, 11))).toBeTruthy();
    expect(schedule.info).toBe('info');
  });

  it('not be able to create a new schedule on past dates', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 1, 9).getTime();
    });

    await expect(
      createSchedule.execute({
        start: new Date(2020, 5, 30, 10),
        end: new Date(2020, 5, 30, 11),
        info: 'info',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able to create a new schedule in same tame with another one', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 1, 9).getTime();
    });

    await createSchedule.execute({
      start: new Date(2020, 6, 2, 10),
      end: new Date(2020, 6, 2, 11),
      info: 'info',
    });

    await expect(
      createSchedule.execute({
        start: new Date(2020, 6, 2, 8),
        end: new Date(2020, 6, 2, 11),
        info: 'info',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
