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
import Spinner from '@/components/ui/spinner'

const LoginForm = () => {
	const [errorMsg, setErrorMsg] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const form = useForm({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
		setIsLoading(true)
		console.log(values)
		try {
			const result = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			})
			if (result && !result.error) {
				router.push('/')
			} else {
				setIsLoading(false)
				setErrorMsg('Wrong email or password, or the account is not active.')
			}
		} catch (error: any) {
			setIsLoading(false)
			console.error('Error during sign-in:', error)
		}
	}

	const handleTestLogin = async () => {
		setIsLoading(true)
		try {
			const result = await signIn('credentials', {
				email: 'aaa',
				password: 'bbb',
				redirect: false,
			})
			if (result && !result.error) {
				router.push('/')
			} else {
				setIsLoading(false)
				setErrorMsg('Wrong email or password, or the account is not active.')
			}
		} catch (error: any) {
			setIsLoading(false)
			console.error('Error during sign-in:', error)
		}
	}

	return (
		<FormSiteContainer>
			{isLoading ? (
				<Spinner text="Logging in..." />
			) : (
				<>
					<Logo />
					<h1 className={classes.formHeading}>Login to your account</h1>
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
							<FormInput id="email" type="email" label="Email" error={form.formState.errors.email?.message} />
							<FormInput
								id="password"
								type="password"
								label="Password"
								error={form.formState.errors.password?.message}
							/>
							<Button type="submit" style={{ display: 'none' }}>
								{' '}
							</Button>
						</form>
						<p className={classes.errorMsg}>{errorMsg}</p>
						<Button
							type="submit"
							style={{ marginTop: 'auto', width: '100%' }}
							filled
							onClick={form.handleSubmit(onSubmit)}>
							Log in
						</Button>
					</FormProvider>
					<Button type="button" style={{ width: '100%' }} onClick={handleTestLogin}>
						Use test account
					</Button>
				</>
			)}
		</FormSiteContainer>
	)
}

export default LoginForm
