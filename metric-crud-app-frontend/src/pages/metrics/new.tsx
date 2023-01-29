import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import * as yup from 'yup';
import Layout from '../../components/common/Layout';
import NewMetricForm from '../../components/metrics/NewMetricForm';
import { Metric } from '../../models/Metric';

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
        const apiError = await response.json();
        return setError(apiError);
      } else {
        return setError('Something went wrong');
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
    <Layout>
      {info ?? <p>{info}</p>}
      {error ?? <p>{error}</p>}
      <NewMetricForm onSubmit={formik.handleSubmit} isSubmitting={formik.isSubmitting} values={formik.values} handleChange={formik.handleChange} />
    </Layout >
  )
}
