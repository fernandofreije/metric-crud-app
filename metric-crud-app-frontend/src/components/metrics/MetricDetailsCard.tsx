import { css } from '@emotion/react';
import Moment from 'react-moment';
import { Metric } from '../../models/Metric';
import { Colors } from '../../util/colors';

interface MetricDetailsCardProps { metric: Metric }

export default function MetricDetailsCard({ metric }: MetricDetailsCardProps) {

  const { name, value, createdAt } = metric;

  const CardContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: 12,
    border: `1px solid ${Colors.borders}`,
    backgroundColor: Colors.cardBackground,
    padding: '1.2rem 1rem 3rem 1rem',
  })

  const cardContentStyles = css({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 'bold',
  })

  return (
    <div css={CardContainerStyles}>
      <div css={{ display: 'flex', justifyContent: 'end' }}><Moment css={{ display: 'inline-grid' }} fromNow>{createdAt}</Moment></div>
      <h1 css={cardContentStyles}>{name}</h1>
      <p css={{cardContentStyles }}>Value: {value}</p>
    </div>
  )
}

