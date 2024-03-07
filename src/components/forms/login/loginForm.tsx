'use client'
import React, { useState } from 'react'
import FormSiteContainer from '../formSiteContainer'
import Logo from '@/components/ui/logo'
import classes from './loginForm.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/ui/formInput'
import Button from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LoginFormSchema } from './loginForm.data'
import * as z from 'zod'

const LoginForm = () => {
	const [errorMsg, setErrorMsg] = useState('')
	const router = useRouter()
	const form = useForm({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
		try {
			const result = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			})
			if (result && !result.error) {
				console.log('success')
				router.push('/')
			} else {
				setErrorMsg('Wrong email or password, or the account is not active.')
			}
		} catch (error: any) {
			console.error('Error during sign-in:', error)
		}
	}

	return (
		<FormSiteContainer>
			<Logo />
			<h1 className={classes.formHeading}>Login to your account</h1>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
					<FormInput id="email" type="email" label="Email" error={form.formState.errors.email?.message} />
					<FormInput id="password" type="password" label="Password" error={form.formState.errors.password?.message} />
				</form>
				<p>{errorMsg}</p>
				<Button type="submit" style={{ marginTop: 'auto', width: '100%' }} filled onClick={form.handleSubmit(onSubmit)}>
					Log in
				</Button>
			</FormProvider>
		</FormSiteContainer>
	)
}

export default LoginForm
