import { css } from '@emotion/react'
import { MetricAverages } from '../models/MetricAverages'
import { mq } from '../util/mediaQuery'
import AverageBox from './AverageBox'

const metricCardListStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    maxHeight: '85vh',
    overflowY: 'auto',
    padding: '0 2rem',
})

export default function AverageBoxList({averages}: {averages: MetricAverages}) {

    const {oneMinuteAgo, oneHourAgo, oneDayAgo} = averages

    return (
        <div css={metricCardListStyles}>
            <AverageBox text={'Last minute'} value={oneMinuteAgo.value} total={oneMinuteAgo.total} />
            <AverageBox text={'Last hour'} value={oneHourAgo.value} total={oneHourAgo.total} />
            <AverageBox text={'Last day'} value={oneDayAgo.value} total={oneDayAgo.total} />
        </div>
    )
}

