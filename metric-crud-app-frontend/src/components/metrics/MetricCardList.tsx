import { Metric } from '../../models/Metric';
import { mq } from '../../util/mediaQuery';
import ErrorComponent from '../common/Error';
import Info from '../common/Info';
import Loading from '../common/Loading';
import MetricCard from './MetricCard';


interface MetricCardProps { metrics?: Metric[], loading:boolean; error: unknown }


const metricCardListStyles = mq({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    overflowY: 'auto',
    width: '100%',
    height: 'inherit',
    padding: '2rem',
})

export default function MetricCardList({ metrics, loading, error }: MetricCardProps) {
    if (error) {
        return <ErrorComponent>Something went wrong retrieving the metrics</ErrorComponent>
    }
    if (loading) {
        return <Loading />
    }
    if (!metrics || metrics.length === 0) {
    return <Info>No metrics available</Info>
    }
      
    return (
        <div css={metricCardListStyles}>
            {metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
        </div>
    )
}

