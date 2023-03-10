import { css } from '@emotion/react';
import { ReactNode } from 'react';


export default function Info({ children }: { children: ReactNode }) {

    const containerStyles = css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    })

    return (
        <div css={containerStyles}>
            <p>{children}</p>
        </div>
    )
}

