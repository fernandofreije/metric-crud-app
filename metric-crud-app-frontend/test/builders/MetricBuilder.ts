import { DateTime } from 'luxon';
import { Metric } from '../../src/models/Metric';
import { Builder } from './Builder';

export class MetricBuilder extends Builder<Metric> {

  protected entity: Metric = {
    id: "Some uuid",
    name: "Some name",
    value: 299,
    createdAt: DateTime.now().toJSDate()
  };

}

