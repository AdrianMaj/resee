'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { accountFormSchema } from './accountForm.data'
import FormInput from '@/components/ui/formInput'
import classes from './accountForm.module.scss'
import Link from 'next/link'
import { Account } from '@prisma/client'
import MotionLink from '@/components/ui/motionLink'

const AccountForm = ({ account }: { account: Account | null | undefined }) => {
	const form = useForm({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			fullName: account?.name || '',
			email: account?.email || '',
		},
	})
	return (
		<FormProvider {...form}>
			<form className={classes.form}>
				<FormInput type="text" id="fullName" label="Full name" defaultValue={account?.name} />
				<FormInput type="email" id="email" label="Email" defaultValue={account?.email} />
				<div>
					<FormInput type="password" disabled id="password" label="Password" defaultValue="xxxxxxxxxx" />
					<MotionLink
						whileHover={{
							color: '#000',
						}}
						className={classes.form__passwordLink}
						href="/change-password">
						Change password
					</MotionLink>
				</div>
				<MotionLink className={classes.form__deleteAccount} href="/delete-account">
					Delete my account
				</MotionLink>
			</form>
		</FormProvider>
	)
}

export default AccountForm
