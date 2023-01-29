import { css } from '@emotion/react';
import { ReactNode } from 'react';


export default function Error({ children }: { children: ReactNode }) {

    const containerStyles = css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    })

    return (
        <div css={containerStyles}>
            <p css={{ color: 'red' }}>{children}</p>
        </div>
    )
}

