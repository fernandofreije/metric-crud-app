import AverageBoxList from '../../components/averages/AverageBoxList'
import ButtonLink from '../../components/common/ButtonLink'
import Layout from '../../components/common/Layout'
import MetricCardList from '../../components/metrics/MetricCardList'
import { useAverages } from '../../hooks/useAverages'
import { useMetrics } from '../../hooks/useMetrics'
import { mq } from '../../util/mediaQuery'

export default function MetricListPage() {

  const { data: metrics, loading: loadingMetrics, error: errorMetrics } = useMetrics();
  const { data: averages, loading: loadingAverages, error: errorAverages } = useAverages();

  return (
    <Layout navContent={<ButtonLink href={`/metrics/new`}> Create new metric </ButtonLink>}>
      <div css={mq({ display: 'flex', flexDirection: ['column', 'row-reverse'], width: '100%', gap: ['2rem','10rem'] })}>
        <div css={mq({ flex: 1 })}>
          <h1 css={{ margin: '0 2rem' }}>Averages</h1>
          <AverageBoxList averages={averages} loading={loadingAverages} error={errorAverages}/>
        </div>
        <div css={mq({ flex: [1, 2] })}>
          <h1 css={{ margin: '0 2rem' }}>Timeline</h1>
          <div css={mq({ maxHeight: ['none', 'calc(100vh - 200px)'], overflowY: 'auto' })}>
            <MetricCardList metrics={metrics} loading={loadingMetrics} error={errorMetrics}/>
          </div>
        </div>
      </div>
    </Layout >

  )
}
