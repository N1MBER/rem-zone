import { DonutItem as ChartDonutItem } from '../../components/Charts/ChartDonut/ChartDonut';
import { Props as AnalyticInfo } from './AnalyticCard/AnalyticCard';

export type AnalyticData = {
  worklogData?: ChartDonutItem[] | boolean;
  analytic?: Required<AnalyticInfo> | boolean;
};
