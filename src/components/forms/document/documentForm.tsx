'use client'
import Button from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import classes from './documentForm.module.scss'

const FormSchema = z.object({
	jobTitle: z.string(),
	photoUrl: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	phone: z.string(),
	country: z.string(),
	city: z.string(),
	summary: z.string(),
	// employment: z.string().array(), object
	// education: z.string().array(), object
	// skills: z.array(z.string()), string
	// languages: z.array(z.string()), string
})

const DocumentForm = () => {
	const [errorMsg, setErrorMsg] = useState('')
	const router = useRouter()
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			jobTitle: '',
			photoUrl: '',
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			country: '',
			city: '',
			summary: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		console.log(values)
	}
	return (
		<FormProvider {...form}>
			<form className={classes.form}></form>
			<p>{errorMsg}</p>
			<Button type="submit" style={{ marginTop: 'auto', width: '100%' }} filled onClick={form.handleSubmit(onSubmit)}>
				Log in
			</Button>
		</FormProvider>
	)
}

export default DocumentForm
