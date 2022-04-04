import { timeTablePropColor } from '../../components/TimeTable/types';
import { generateRandomValue } from '../../utils';

export const getRandomColor = () => {
  return timeTablePropColor[generateRandomValue(timeTablePropColor.length)];
};
