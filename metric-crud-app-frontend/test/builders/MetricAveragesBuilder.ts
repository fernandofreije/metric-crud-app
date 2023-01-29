import { MetricAverages } from '../../src/models/MetricAverages';
import { Builder } from './Builder';

export class MetricAveragesBuilder extends Builder<MetricAverages> {

  protected entity: MetricAverages = {
   oneMinuteAgo: {value: 1, total: 1},
   oneHourAgo: {value: 2, total: 2},
   oneDayAgo: {value: 3, total: 3}
  };

}

