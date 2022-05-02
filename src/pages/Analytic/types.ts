// import { Item as ChartColumnItem } from '../../components/Charts/ChartColumn/ChartColumn';
// import { RadarItem as ChartRadarItem } from '../../components/Charts/ChartRadar/ChartRadar';
import { DonutItem as ChartDonutItem } from '../../components/Charts/ChartDonut/ChartDonut';
import { Props as AnalyticInfo } from './AnalyticCard/AnalyticCard';

export type AnalyticData = {
  worklogData: ChartDonutItem[];
  analytic: Required<AnalyticInfo>;
};
