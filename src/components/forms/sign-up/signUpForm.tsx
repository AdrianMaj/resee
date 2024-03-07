'use client'
import React, { useState } from 'react'
import classes from './signUpForm.module.scss'
import FormSiteContainer from '../formSiteContainer'
import Logo from '@/components/ui/logo'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import GoogleButton from '@/components/ui/googleButton'
import Link from 'next/link'
import FormInput from '@/components/ui/formInput'
import LinkButton from '@/components/ui/linkButton'
import * as z from 'zod'
import { FormStepOneSchema, FormStepTwoSchema } from './signUpForm.data'

const SignUpForm = () => {
	const [stepNumber, setStepNumber] = useState(1)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [formValues, setFormValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const formStepOne = useForm({
		resolver: zodResolver(FormStepOneSchema),
		defaultValues: {
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			email: formValues.email,
		},
	})
	const formStepTwo = useForm({
		resolver: zodResolver(FormStepTwoSchema),
		defaultValues: {
			password: formValues.password,
			confirmPassword: formValues.confirmPassword,
		},
	})
	const handleGoBack = () => {
		setStepNumber(prevNumber => prevNumber - 1)
	}
	const handleNext = () => {
		setStepNumber(prevNumber => prevNumber + 1)
	}
	const onSubmit = (values: z.infer<typeof FormStepOneSchema>) => {
		setFormValues(prevValues => {
			const newValues = {
				...prevValues,
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
			}
			return newValues
		})
		handleNext()
	}
	const onSecondSubmit = (values: z.infer<typeof FormStepTwoSchema>) => {
		setIsSubmitting(true)
		setFormValues(prevValues => {
			const newValues = {
				...prevValues,
				password: values.password,
				confirmPassword: values.confirmPassword,
			}
			return newValues
		})
		const data = {
			name: `${formValues.firstName} ${formValues.lastName}`,
			email: formValues.email,
			password: values.password,
		}
		createAccount(data)
	}

	const createAccount = async ({ name, email, password }: { name: string; email: string; password: string }) => {
		try {
			const response = await fetch('/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: name,
					email: email,
					password: password,
				}),
			})

			if (response.ok) {
				setIsSubmitting(false)
				setStepNumber(4)
			} else {
				setIsSubmitting(false)
				const res = await response.json()
				setError(res.message)
			}
		} catch (error) {
			setIsSubmitting(false)
			console.error('An error occured', error)
		}
	}
	return (
		<FormSiteContainer>
			<Logo />
			<h1 className={classes.formHeading}>{stepNumber !== 4 ? 'Create an account' : 'Success!'}</h1>
			{stepNumber !== 4 && (
				<div className={classes.stepIndicator}>
					<AnimatePresence>
						<motion.div
							key="saidasufasfasi"
							animate={{
								cursor: stepNumber > 1 ? 'pointer' : 'default',
							}}
							onClick={() => {
								if (stepNumber > 1) {
									setStepNumber(1)
								}
							}}
							className={classes.numberContainer}>
							<motion.p
								initial={{
									color: '#ffffff',
								}}
								animate={{
									color: stepNumber === 1 ? '#ffffff' : '#000000',
									cursor: stepNumber > 1 ? 'pointer' : 'default',
								}}
								className={classes.number}>
								1
							</motion.p>
							{stepNumber === 1 && <motion.div key={1} layoutId="step" className={classes.stepBg}></motion.div>}
						</motion.div>
						<motion.div
							key="asdasdhasuf"
							animate={{
								cursor:
									stepNumber > 2 ||
									(formValues.firstName !== '' &&
										formValues.lastName !== '' &&
										formValues.email !== '' &&
										stepNumber !== 2)
										? 'pointer'
										: 'default',
							}}
							onClick={() => {
								if (
									stepNumber > 2 ||
									(formValues.firstName !== '' && formValues.lastName !== '' && formValues.email !== '')
								) {
									setStepNumber(2)
								}
							}}
							className={classes.numberContainer}>
							<motion.p
								animate={{
									color: stepNumber === 2 ? '#ffffff' : '#000000',
								}}
								className={classes.number}>
								2
							</motion.p>
							{stepNumber === 2 && <motion.div key={2} layoutId="step" className={classes.stepBg}></motion.div>}
						</motion.div>
						<div className={classes.numberContainer}>
							<motion.p
								animate={{
									color: stepNumber === 3 ? '#ffffff' : '#000000',
								}}
								className={classes.number}>
								3
							</motion.p>
							{stepNumber === 3 && <motion.div key={3} layoutId="step" className={classes.stepBg}></motion.div>}
						</div>
					</AnimatePresence>
				</div>
			)}
			{stepNumber === 1 && (
				<>
					<div className={classes.inputContainer}>
						<GoogleButton>Sign up with Google</GoogleButton>
						<Button onClick={handleNext} filled>
							<div className={classes.buttonText}>
								<Image src="/emailIcon.svg" alt="Email Icon" width={30} height={30} />
								Sign up with Email
							</div>
						</Button>
						<p className={classes.loginAttribution}>
							Already have an account?{' '}
							<Link className={classes.loginAttributionLink} href="/login">
								Log in
							</Link>
						</p>
					</div>
					<p className={classes.attribution}>
						By signing up to create an account I accept Company&apos;s{' '}
						<Link className={classes.attributionLink} href="/terms-of-service">
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link className={classes.attributionLink} href="/privacy-policy">
							Privacy Policy
						</Link>
					</p>
				</>
			)}
			{stepNumber === 2 && (
				<>
					<FormProvider {...formStepOne}>
						<form onSubmit={formStepOne.handleSubmit(onSubmit)} className={classes.form}>
							<div className={classes.inputContainer}>
								<FormInput
									autoFocus
									type="text"
									id="firstName"
									defaultValue={formValues.firstName}
									label="First Name"
									error={formStepOne.formState.errors.firstName?.message}
								/>
								<FormInput
									type="text"
									id="lastName"
									defaultValue={formValues.lastName}
									label="Last Name"
									error={formStepOne.formState.errors.lastName?.message}
								/>
								<FormInput
									type="email"
									id="email"
									defaultValue={formValues.email}
									label="Email"
									error={formStepOne.formState.errors.email?.message}
								/>
							</div>
						</form>
					</FormProvider>
					<div className={classes.formControls}>
						<Button
							type="button"
							style={{
								marginRight: 'auto',
							}}
							onClick={handleGoBack}>
							Go Back
						</Button>
						<Button
							type="submit"
							onClick={formStepOne.handleSubmit(onSubmit)}
							style={{
								marginLeft: 'auto',
							}}
							filled>
							Next
						</Button>
					</div>
				</>
			)}
			{stepNumber === 3 && (
				<>
					<FormProvider {...formStepTwo}>
						<form onSubmit={formStepTwo.handleSubmit(onSecondSubmit)} className={classes.form}>
							<div className={classes.inputContainer}>
								<FormInput
									autoFocus
									type="password"
									id="password"
									defaultValue={formValues.password}
									label="Password"
									error={formStepTwo.formState.errors.password?.message}
								/>
								<FormInput
									type="password"
									id="confirmPassword"
									defaultValue={formValues.confirmPassword}
									label="Confirm password"
									error={formStepTwo.formState.errors.confirmPassword?.message}
								/>
								{error.length > 0 && <p className={classes.errorMessage}>{error}</p>}
							</div>
						</form>
					</FormProvider>
					<div className={classes.formControls}>
						<Button
							type="button"
							style={{
								marginRight: 'auto',
							}}
							onClick={handleGoBack}>
							Go Back
						</Button>
						<Button
							type="submit"
							onClick={formStepTwo.handleSubmit(onSecondSubmit)}
							style={{
								marginLeft: 'auto',
							}}
							filled>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</>
			)}
			{stepNumber === 4 && (
				<>
					<div className={classes.inputContainer}>
						<p className={classes.successMessage}>
							Your account was created successfully, the verification email was sent to the address you entered in the
							form. Please check your mailbox, and SPAM folder. If the email doesn&quot;t appear within 10 minutes, try
							creating the account again later.
						</p>
					</div>
					<div className={classes.formControls}>
						<LinkButton style={{ width: '100%' }} href="/login">
							Return to login page
						</LinkButton>
					</div>
				</>
			)}
		</FormSiteContainer>
	)
}
export default SignUpForm
