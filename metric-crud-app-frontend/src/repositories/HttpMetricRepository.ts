import { Metric } from "../models/Metric";
import { MetricAverages } from "../models/MetricAverages";
import { ConsoleLogger } from "../util/logger/ConsoleLogger";
import { Logger } from "../util/logger/Logger";
import { HttpDriver } from "./drivers/HttpDriver";
import { MetricRepository } from "./MetricRepository";

export class HttpMetricRepository implements MetricRepository {
  public constructor(private driver: HttpDriver, private logger: Logger = new ConsoleLogger()) {}

  public getAll: MetricRepository['getAll'] = async () => {
    try {
      const metrics = await this.driver.get<Metric[]>(`/metric?sort=timeline`);

      return metrics;
    } catch (e) {
      this.logger.error(e);

      throw new Error(`There was an error trying to get metrics`);
    }
  }

  public get: MetricRepository['get'] = async ({metricId}) => {
    try {
      const metric = await this.driver.get<Metric>(`/metric/${metricId}`);

      return metric;
    } catch (e) {
      this.logger.error(e);

      throw new Error(`There was an error trying to get the metric`);
    }
  }

  public post: MetricRepository['post'] = async ({name, value}) => {
    try {
      await this.driver.post(`/metric`, {
        body: { name, value },
      })

    } catch (e) {
      this.logger.error(e);

      throw new Error(`There was an error trying to create the metric`);
    }
  }

  public getAverages: MetricRepository['getAverages'] = async () => {
    try {
      const averages = await this.driver.get<MetricAverages>(`/metric/averages`);

      return averages;
    } catch (e) {
      this.logger.error(e);

      throw new Error(`There was an error trying to get the averages`);
    }
  }

}

