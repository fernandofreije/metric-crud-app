import AverageBoxList from '../../components/AverageBoxList'
import ButtonLink from '../../components/ButtonLink'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Info from '../../components/Info'
import ErrorComponent from '../../components/Error'
import MetricCardList from '../../components/MetricCardList'
import { useMetrics } from '../../hooks/useMetrics'
import { Metric } from '../../models/Metric'
import { mq } from '../../util/mediaQuery'


export default function MetricListPage() {

  const { data: metrics, loading, error } = useMetrics();

  function getInnerPage({ metrics, loading, error }: { metrics?: Metric[], loading: boolean, error: unknown }) {
    if (error) {
      return <ErrorComponent>Something went wrong</ErrorComponent>
    }
    if (loading) {
      return <Loading />
    }
    if (!metrics) {
      return <Info>Something went wrong</Info>
    }
    if (metrics) {
      return <MetricCardList metrics={metrics} />
    }
  }

  return (
    <Layout navContent={<ButtonLink href={`/metrics/new`}> Create new metric </ButtonLink>}>
      <div css={mq({ display: 'flex', flexDirection: ['column', 'row-reverse'], width: '100%', gap: '10rem' })}>
        <div css={mq({ flex: 1 })}>
          <h1 css={{ margin: '0 1rem' }}>Averages</h1>
          <AverageBoxList />
        </div>
        <div css={mq({ flex: [1, 2] })}>
          <h1 css={{ margin: '0 1rem' }}>Timeline</h1>
          <div css={mq({ maxHeight: ['none', 'calc(100vh - 200px)'], overflowY: 'auto' })}>
            {getInnerPage({ metrics, loading, error })}
          </div>
        </div>
      </div>
    </Layout >

  )
}
