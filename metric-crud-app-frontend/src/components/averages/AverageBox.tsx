import { css } from '@emotion/react';
import { Colors } from '../../util/colors';

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
                <label> Average  <p css={{ fontSize: 36, ...cardContentStyles }}>{Math.round(value * 100) / 100}</p></label>
                <label> Total  <p css={{ fontSize: 36, ...cardContentStyles }}>{Math.round(total * 100) / 100}</p></label>
            </div>
        </div>
    )
}

