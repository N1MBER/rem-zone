import { Job } from '../../types/timetable';

export type BigCalendarEvent<TYPE> = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: TYPE;
  resourceId?: number | string;
};

export type BigCalendarResource = {
  id: number | string;
  title: string;
};

type JobGroup = {
  items: BigCalendarEvent<Job>[];
  group: BigCalendarResource;
};

export const convertJobToEvent = (
  item: Job,
  sortId?: number | string
): BigCalendarEvent<Job> => {
  const { started_at, ended_at, description } = item;
  return {
    title: description,
    start: new Date(started_at),
    end: new Date(ended_at),
    resourceId: sortId,
  };
};

export const getUniqueJobGroup = (items: Job[]): JobGroup[] => {
  const object: Record<
    string,
    {
      items: BigCalendarEvent<Job>[];
      title: string;
    }
  > = {};
  const array: JobGroup[] = [];
  items.forEach((item) => {
    if (item.master?.pk) {
      if (object[item.master?.pk]) {
        object[item.master?.pk].items.push(
          convertJobToEvent(item, item.master?.pk)
        );
      } else {
        object[item.master?.pk] = {
          items: [convertJobToEvent(item, item.master?.pk)],
          title: item.master?.last_name,
        };
      }
    } else if (object.none) {
      object.none.items.push(convertJobToEvent(item, 'none'));
    } else {
      object.none = {
        items: [convertJobToEvent(item, 'none')],
        title: 'Не определены',
      };
    }
  });

  return array;
};
