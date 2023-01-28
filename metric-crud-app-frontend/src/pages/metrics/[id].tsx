import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { Metric } from '../../models/Metric'
import { BackendHttpDriver } from '../../repositories/drivers/BackendHttpDriver'
import { HttpMetricRepository } from '../../repositories/HttpMetricRepository'


export default function MetricDetailsPage({ metric }: { metric: Metric }) {

  return (
    <Layout>
      <span key={metric.id}>{metric.name} -  {metric.value}</span>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{ metric: Metric }> = async ({ query }) => {
  const metric = await new HttpMetricRepository(new BackendHttpDriver()).get({ metricId: query.id as string })

  return {
    props: {
      metric,
    },
  }
}


