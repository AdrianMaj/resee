'use client'
import Button from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import classes from './documentForm.module.scss'
import { Account, UserDocument } from '@prisma/client'
import FormTextArea from '@/components/ui/formTextArea'
import _ from 'lodash'
import updateDocument from '@/util/updateDocument'

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
	// employment: z.string().array(),
	// education: z.string().array(),
	// skills: z.array(z.string()),
	// languages: z.array(z.string()),
})

const DocumentForm = ({
	userDocument,
	account,
	handleSetDocumentData,
}: {
	userDocument: UserDocument
	account: Account
	handleSetDocumentData: (documentData: UserDocument) => void
}) => {
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

	useEffect(() => {
		const debouncedLogValues = _.debounce(async values => {
			const result = await updateDocument(userDocument.id, values)
			handleSetDocumentData(result)
		}, 1000)

		const subscription = form.watch(values => {
			debouncedLogValues(values)
		})

		return () => {
			subscription.unsubscribe()
			debouncedLogValues.cancel()
		}
	}, [form, form.watch, handleSetDocumentData, userDocument.id])

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		console.log(values)
	}

	return (
		<section className={classes.formSection}>
			<h1 className="headingH1">{userDocument.name}</h1>
			<FormProvider {...form}>
				<form className={classes.form}>
					<h2 className={classes.headingH2}>Personal info</h2>
					<FormInput type="text" id="jobTitle" label="Job Title" />
					<FormInput type="text" id="firstName" label="First Name" defaultValue={account.name.split(' ')[0]} />
					<FormInput type="text" id="lastName" label="Last Name" defaultValue={account.name.split(' ')[1]} />
					<FormInput type="email" id="email" label="Email" defaultValue={account.email} />
					<FormInput type="tel" id="phone" label="Phone number" />
					<FormInput type="country" id="country" label="Country" />
					<FormInput type="city" id="city" label="City" />
					<div>
						<h2 className={classes.headingH2}>Professional Summary</h2>
						<p className={classes.paragraphSmall}>
							Write from 2 to 4 sentences to interest recruiter. Mention your experience and biggest achievments. You
							can also mention your skills and roles in previous work.
						</p>
						<FormTextArea type="text" id="summary" label="Summary" />
					</div>
					<h2 className={classes.headingH2}>Employment History</h2>
					<h2 className={classes.headingH2}>Education</h2>
					<h2 className={classes.headingH2}>Skills</h2>
					<h2 className={classes.headingH2}>Languages</h2>
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
