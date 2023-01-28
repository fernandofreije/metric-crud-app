import { css } from '@emotion/react'
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

export default function AverageBoxList() {
    return (
        <div css={metricCardListStyles}>
            <AverageBox text={'Per minute'} value={2} total={8} />
            <AverageBox text={'Per hour'} value={5} total={9} />
            <AverageBox text={'Per day'} value={7} total={200} />
        </div>
    )
}

