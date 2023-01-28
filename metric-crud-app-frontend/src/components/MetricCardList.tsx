import { css } from '@emotion/react'
import { Metric } from '../models/Metric'
import { mq } from '../util/mediaQuery'
import MetricCard from './MetricCard'


interface MetricCardProps { metrics: Metric[] }


const metricCardListStyles = mq({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    overflowY: 'auto',
    width: '100%',
    height: 'inherit',
    padding: '0 2rem',
})

export default function MetricCardList({ metrics }: MetricCardProps) {
    return (
        <div css={metricCardListStyles}>
            {metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
        </div>
    )
}

