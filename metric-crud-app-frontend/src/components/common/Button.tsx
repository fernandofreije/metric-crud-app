import { css } from '@emotion/react';
import React from 'react';
import { Colors } from '../../util/colors';


type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonStyles = css({
    backgroundColor: Colors.background,
    padding: '1rem',
    border: `1px solid ${Colors.borders}`,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center'
})

export default function Button(props: ButtonProps) {
    return (
        <button css={ButtonStyles} {...props} />
    )
}

