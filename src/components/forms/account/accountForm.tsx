'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { accountFormSchema } from './accountForm.data'
import FormInput from '@/components/ui/formInput'
import classes from './accountForm.module.scss'
import Link from 'next/link'

const AccountForm = () => {
	const form = useForm({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			fullName: '',
		},
	})
	return (
		<FormProvider {...form}>
			<form className={classes.form}>
				<FormInput type="text" id="fullName" label="Full name" />
				<FormInput type="email" id="email" label="Email" />
				<div>
					<FormInput type="password" disabled id="password" label="Password" defaultValue="xxxxxxxx" />
					<Link href="/change-password">Change password</Link>
				</div>
				<Link href="/delete-account">Delete my account</Link>
			</form>
		</FormProvider>
	)
}

export default AccountForm
