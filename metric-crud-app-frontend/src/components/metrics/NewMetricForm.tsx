import { css } from '@emotion/react'
import { ChangeEvent } from 'react'
import { Colors } from '../../util/colors'
import Button from '../common/Button'


interface NewMetricFormProps { onSubmit: () => void, values: Record<string, any>, handleChange: (e: ChangeEvent<any>) => void, isSubmitting: boolean }

const newMetricFormStyles = css({
    display: 'grid',
    gap: '1rem',
    maxHeight: '85vh',
    overflowY: 'auto',
    padding: '1rem'
})

const labelStyles = css({
    display: 'grid'
})

const inputStyles = css({
    backgroundColor: Colors.background,
    color: Colors.foreground,
    border: `1px solid ${Colors.borders}`,
    borderRadius: 8,
    padding: '1rem',
    margin: '1rem 0',
    fontFamily: 'inherit',
})

export default function NewMetricForm({ onSubmit, values, handleChange, isSubmitting }: NewMetricFormProps) {
    return (
        <form css={newMetricFormStyles} onSubmit={onSubmit}>
            <label css={labelStyles} htmlFor="name">Name <input css={inputStyles} type="text" id="name" name="name" value={values.name} onChange={handleChange} placeholder="Some name for your metric" /></label>

            <label css={labelStyles} htmlFor="value">Value <input css={inputStyles} type="number" id="value" name="value" value={values.value} onChange={handleChange} placeholder="200" /></label>

            {isSubmitting ? <p>Submitting....</p> : <Button type="submit">Create</Button>}
        </form>
    )
}

