import { Metric } from '../models/Metric'
import { Colors } from '../util/colors';
import styles from '../styles/MetricCard.module.css'
import React, { HTMLAttributes, ReactNode } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';

interface ButtonLinkProps {
    href: string | URL;
    children: ReactNode;
}

const ButtonLinkStyles = css({
    backgroundColor: Colors.background,
    padding: '1rem',
    border: `1px solid ${Colors.borders}`,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center'
})

export default function ButtonLink({ href, children }: ButtonLinkProps) {
    return (
        <Link css={ButtonLinkStyles} href={href} passHref>
            {children}
        </Link>
    )
}

