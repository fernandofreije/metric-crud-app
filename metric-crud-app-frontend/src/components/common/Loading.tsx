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

