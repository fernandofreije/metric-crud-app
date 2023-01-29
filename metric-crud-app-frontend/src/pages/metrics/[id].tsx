import { GetServerSideProps } from 'next'
import ButtonLink from '../../components/common/ButtonLink'
import Layout from '../../components/common/Layout'
import MetricDetailsCard from '../../components/metrics/MetricDetailsCard'
import { Metric } from '../../models/Metric'
import { BackendHttpDriver } from '../../repositories/drivers/BackendHttpDriver'
import { HttpMetricRepository } from '../../repositories/HttpMetricRepository'


export default function MetricDetailsPage({ metric }: { metric: Metric }) {

  return (
    <Layout navContent={<ButtonLink href={`/metrics/new`}> Create new metric </ButtonLink>}>
      <h1 css={{ margin: '0 2rem' }}>Metric Details</h1>
      <MetricDetailsCard metric={metric}/>
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


