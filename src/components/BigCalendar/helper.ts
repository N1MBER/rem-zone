import { compareDates } from '../../utils/date/date';
import { Job } from '../../types/timetable';

export type BigCalendarEvent<TYPE> = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource: TYPE;
  resourceId?: number | string;
};

export type BigCalendarResource = {
  resourceId: number | string;
  resourceTitle: string;
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
  const start = new Date(started_at);
  const end = new Date(ended_at);
  const allDay = !compareDates(start, end);
  return {
    id: item.id,
    title: description,
    start,
    end,
    allDay,
    resourceId: sortId,
    resource: item,
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
  Object.keys(object).forEach((key) => {
    array.push({
      items: object[key].items,
      group: {
        resourceId: key,
        resourceTitle: object[key].title,
      },
    });
  });

  return array;
};
