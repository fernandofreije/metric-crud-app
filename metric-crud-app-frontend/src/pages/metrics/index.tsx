import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { useMetrics } from '../../hooks/useMetrics'
import { Metric } from '../../models/Metric'


export default function MetricListPage() {

  const {data: metrics, loading, error} = useMetrics();

  function getInnerPage({metrics, loading, error}: {metrics?: Metric[], loading: boolean, error: unknown}) {
    if (error){
      return <span>There was an error...</span>
    }
    if (loading){
      return <span>loading...</span>
    }
    if (!metrics){
      return <span>No metrics...</span>
    }
    if (metrics){
      return <ul>{metrics.map((metric) => <li key={metric.id}>{metric.name} -  {metric.value} - <Link href={`/metrics/${metric.id}`}>Details</Link></li>)}</ul>
    }
  } 

  return (
    <>
      <Head>
        <title>Metrics Page</title>
        <meta name="description" content="Metrics Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Link href={`/metrics/new`}passHref> Create new metric </Link>
        {
          getInnerPage({metrics, loading, error})
        }
      </main>

    </>
  )
}
