'use client'
import Button from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import classes from './documentForm.module.scss'
import { Account, UserDocument } from '@prisma/client'

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

const DocumentForm = ({ userDocument, account }: { userDocument: UserDocument[]; account: Account }) => {
	const [errorMsg, setErrorMsg] = useState('')
	const router = useRouter()
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			jobTitle: '',
			photoUrl: '',
			firstName: account.name.split(' ')[0],
			lastName: account.name.split(' ')[1],
			email: account.email,
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
		<section className={classes.formSection}>
			<h1 className="headingH1">{userDocument[0].name}</h1>
			<FormProvider {...form}>
				<form className={classes.form}>
					<FormInput type="text" id="jobTitle" label="Job Title" />
					<FormInput type="text" id="firstName" label="First Name" defaultValue={account.name.split(' ')[0]} />
					<FormInput type="text" id="lastName" label="Last Name" defaultValue={account.name.split(' ')[1]} />
					<FormInput type="email" id="email" label="Email" defaultValue={account.email} />
					<FormInput type="tel" id="phone" label="Phone number" />
					<FormInput type="country" id="country" label="Country" />
					<FormInput type="city" id="city" label="City" />
					<FormInput type="text" id="summary" label="Summary" />
				</form>
				<p>{errorMsg}</p>
				<Button type="submit" style={{ marginTop: 'auto', width: '100%' }} filled onClick={form.handleSubmit(onSubmit)}>
					Download your resume
				</Button>
			</FormProvider>
		</section>
	)
}

export default DocumentForm
