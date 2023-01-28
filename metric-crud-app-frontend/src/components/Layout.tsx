import { Metric } from '../models/Metric'
import { Colors } from '../util/colors';
import styles from '../styles/MetricCard.module.css'
import React, { ReactNode } from 'react';
import { css } from '@emotion/react';


export default function Layout({ children, navContent }: { children: ReactNode, navContent?: ReactNode }) {

    const layoutStyles = css({
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        alignItems: 'center',
    })

    const navStyles = css({
        position: 'sticky',
        display: 'flex',
        justifyContent: 'end',
        padding: '1rem',
        overflow: 'hidden',
        height: 80,
        backgroundColor: Colors.navBackground,
    })


    return (
        <>
            {!!navContent && <nav css={navStyles}>{navContent}</nav>}
            <main css={layoutStyles}>
                {children}
            </main>
        </>
    )
}

