import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { Colors } from '../../util/colors';


export default function Layout({ children, navContent }: { children: ReactNode, navContent?: ReactNode }) {

    const layoutStyles = css({
        marginTop: '100px',
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        alignItems: 'center',
    })

    const navStyles = css({
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        top: 0,
        width: '100%',
        height: 100,
        padding: '1rem',
        overflow: 'hidden',
        backgroundColor: Colors.navBackground,
    })


    return (
        <>
            <nav css={navStyles}>
                <h1 css={{flex: 1}}>Metric Crud App</h1> 
                {!!navContent && navContent}

            </nav>
            <main css={layoutStyles}>
                {children}
            </main>
        </>
    )
}

