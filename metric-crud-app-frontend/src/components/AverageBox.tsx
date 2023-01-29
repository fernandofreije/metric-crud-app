import { Metric } from '../models/Metric'
import { Colors } from '../util/colors';
import { css } from '@emotion/react';
import Moment from 'react-moment';
import ButtonLink from './ButtonLink';

interface AverageBoxProps { text: string, value: number, total: number }

export default function AverageBox({ text, value, total }: AverageBoxProps) {

    const CardContainerStyles = css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: 12,
        border: `1px solid ${Colors.borders}`,
        backgroundColor: Colors.cardBackground,
        padding: '1.2rem',
    })

    const cardContentStyles = css({
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    })

    return (
        <div css={CardContainerStyles}>
            <h1 css={cardContentStyles}>{text}</h1>
            <div css={{display: 'flex', gap: '5rem'}}>
                <label> Average  <p css={{ fontSize: 36, ...cardContentStyles }}>{value}</p></label>
                <label> Total  <p css={{ fontSize: 36, ...cardContentStyles }}>{total}</p></label>
            </div>
        </div>
    )
}

