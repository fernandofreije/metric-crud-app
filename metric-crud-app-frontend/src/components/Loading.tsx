import { Metric } from '../models/Metric'
import { Colors } from '../util/colors';
import styles from '../styles/MetricCard.module.css'
import React, { ReactNode } from 'react';
import { css } from '@emotion/react';


export default function Loading() {

    const containerStyles = css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })

    return (
        <div css={containerStyles}>
            Loading....
        </div>
    )
}

