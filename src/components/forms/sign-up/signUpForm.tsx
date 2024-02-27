'use client'
import React, { useState } from 'react'
import classes from './signUpForm.module.scss'
import FormSiteContainer from '../formSiteContainer'
import Logo from '@/components/ui/logo'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import Button from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import GoogleButton from '@/components/ui/googleButton'
import Link from 'next/link'

const FormSchema = z
	.object({
		firstName: z.string().min(1, 'First name is required!').max(100),
		lastName: z.string().min(1, 'Last name is required!').max(100),
		email: z.string().min(1, 'Email is required!').email('Invalid email!'),
		password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters!'),
		confirmPassword: z.string().min(1, 'Confirm Password is required!'),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	})
const SignUpForm = () => {
	const [stepNumber, setStepNumber] = useState(1)
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})
	const handleGoBack = () => {
		setStepNumber(prevNumber => prevNumber - 1)
	}
	const handleNext = () => {
		setStepNumber(prevNumber => prevNumber + 1)
	}
	return (
		<FormSiteContainer>
			<Logo />
			<h1 className={classes.formHeading}>Create an account</h1>
			<div className={classes.stepIndicator}>
				<AnimatePresence>
					<div
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
						{stepNumber === 1 && <motion.div layoutId="step" className={classes.stepBg}></motion.div>}
					</div>
					<div
						onClick={() => {
							if (stepNumber > 2) {
								setStepNumber(2)
							}
						}}
						className={classes.numberContainer}>
						<motion.p
							animate={{
								color: stepNumber === 2 ? '#ffffff' : '#000000',
								cursor: stepNumber > 2 ? 'pointer' : 'default',
							}}
							className={classes.number}>
							2
						</motion.p>
						{stepNumber === 2 && <motion.div layoutId="step" className={classes.stepBg}></motion.div>}
					</div>
					<div className={classes.numberContainer}>
						<motion.p
							animate={{
								color: stepNumber === 3 ? '#ffffff' : '#000000',
							}}
							className={classes.number}>
							3
						</motion.p>
						{stepNumber === 3 && <motion.div layoutId="step" className={classes.stepBg}></motion.div>}
					</div>
				</AnimatePresence>
			</div>
			<FormProvider {...form}>
				<form className={classes.form}>
					{stepNumber === 1 && (
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
					)}
					{stepNumber === 2 && (
						<div className={classes.inputContainer}>
							<input className={classes.input} type="text" placeholder="First name" />
							<input className={classes.input} type="text" placeholder="Last name" />
							<input className={classes.input} type="email" placeholder="Email" />
						</div>
					)}
					{stepNumber === 3 && (
						<div className={classes.inputContainer}>
							<input className={classes.input} type="password" placeholder="Password" />
							<input className={classes.input} type="password" placeholder="Confirm password" />
						</div>
					)}
				</form>
			</FormProvider>
			<div className={classes.formControls}>
				{stepNumber === 1 && (
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
				)}
				{stepNumber > 1 && (
					<Button
						style={{
							marginRight: 'auto',
						}}
						onClick={handleGoBack}>
						Go Back
					</Button>
				)}
				{stepNumber === 2 && (
					<Button
						style={{
							marginLeft: 'auto',
						}}
						onClick={handleNext}
						filled>
						Next
					</Button>
				)}
				{stepNumber === 3 && (
					<Button
						style={{
							marginLeft: 'auto',
						}}
						onClick={handleNext}
						filled>
						Submit
					</Button>
				)}
			</div>
		</FormSiteContainer>
	)
}
export default SignUpForm
