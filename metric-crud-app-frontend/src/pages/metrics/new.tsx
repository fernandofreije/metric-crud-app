import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import * as yup from 'yup';
import {  FormikHelpers, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Metric } from '../../models/Metric';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

export default function NewMetricPage() {

    const validationSchema = yup.object({
        name: yup.string().required(),
        value: yup.number().integer().min(1).required(),
    });

    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const router = useRouter();

    useEffect(() => {
      router.prefetch('/metrics')
    }, [router])



      const onSubmit = async (newMetricData: Pick<Metric, 'name' | 'value'>, resetForm: () => void) => {
        const response = await fetch('/api/metric', { method: 'POST', body: JSON.stringify(newMetricData) });

        if (!response.ok) {
          if (response.status === 400) {
            // only pass the bad request error messages
            const apiError = await response.json();
            return setError(apiError);
          } else {
            return setError('Generic error');
          }
        }

        setInfo('metric created succesfully')
        resetForm();
      }


      const formik = useFormik({
        initialValues: {
          name: '',
          value: 1,
        },
        onSubmit: async (values: Pick<Metric, 'name' | 'value'>, { setSubmitting, resetForm }: FormikHelpers<Pick<Metric, 'name' | 'value'>>) => {
          setSubmitting(true);
          await onSubmit(values, resetForm);
          setSubmitting(false);
          mutate('/api/metric')
          router.push('/metrics')
        },
        validationSchema,
        enableReinitialize: true,
      });
    

  return (
    <>
      <Head>
        <title>Metrics Page</title>
        <meta name="description" content="Metrics Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        {info ?? <p style={{color: 'green'}}>{info}</p>}
        {error ?? <p style={{color: 'red'}}>{error}</p>}
        <form style={{display: 'grid', gap: 10}} onSubmit={formik.handleSubmit}>
            <label style={{display: 'grid'}} htmlFor="name">Name <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Some name for your metric"/></label>
            
            <label style={{display: 'grid'}} htmlFor="name">value <input type="number" id="value" name="value" value={formik.values.value} onChange={formik.handleChange} placeholder="200"/></label>
           
            {formik.isSubmitting ? <p>Submitting....</p> :  <button type="submit">Create</button>}
        </form>
      </main>

    </>
  )
}
