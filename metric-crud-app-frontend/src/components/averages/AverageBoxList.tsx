import { MetricAverages } from '../../models/MetricAverages';
import { mq } from '../../util/mediaQuery';
import ErrorComponent from '../common/Error';
import AverageBox from './AverageBox';
import AverageBoxEmpty from './AverageBoxEmpty';

interface MetricCardProps { averages?: MetricAverages, loading:boolean; error: unknown }

const metricCardListStyles = mq({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    maxHeight: '85vh',
    overflowY: 'auto',
    padding: ['2rem 0','2rem'],
})



export default function AverageBoxList({averages, loading, error}: MetricCardProps) {

    const EmptyComponent = ({error}:{error?: string}) => 
        <div css={metricCardListStyles}>
            {error && <ErrorComponent>{error}</ErrorComponent>}
            <AverageBoxEmpty text={'Last minute'}  />
            <AverageBoxEmpty text={'Last hour'}  />
            <AverageBoxEmpty text={'Last day'}  />
        </div>

    if (error) {
        return <EmptyComponent error={'Something was wrong retrieving the averages'}/>
    }
    if (loading || !averages) {
        return <EmptyComponent/>
    }

    const {oneMinuteAgo, oneHourAgo, oneDayAgo} = averages

    return (
        <div css={metricCardListStyles}>
            <AverageBox text={'Last minute'} value={oneMinuteAgo.value} total={oneMinuteAgo.total} />
            <AverageBox text={'Last hour'} value={oneHourAgo.value} total={oneHourAgo.total} />
            <AverageBox text={'Last day'} value={oneDayAgo.value} total={oneDayAgo.total} />
        </div>
    )
}

