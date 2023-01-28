import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Metric } from '../../models/Metric'
import { BackendHttpDriver } from '../../repositories/drivers/BackendHttpDriver'
import { HttpMetricRepository } from '../../repositories/HttpMetricRepository'


export default function MetricDetailsPage({metric}: {metric: Metric}) {

  return (
    <>
      <Head>
        <title>Metrics Page</title>
        <meta name="description" content="Metrics Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        {
          <span key={metric.id}>{metric.name} -  {metric.value}</span>
        }
      </main>

    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ metric: Metric }> = async ({query}) => {
    const metric = await new HttpMetricRepository(new BackendHttpDriver()).get({metricId: query.id as string})
  
    return {
      props: {
        metric,
      },
    }
  }


