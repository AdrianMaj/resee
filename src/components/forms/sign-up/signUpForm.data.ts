import * as z from 'zod'

export const FormStepOneSchema = z.object({
	firstName: z.string().min(1, 'First name is required!').max(100),
	lastName: z.string().min(1, 'Last name is required!').max(100),
	email: z.string().min(1, 'Email is required!').email('Invalid email!'),
})
export const FormStepTwoSchema = z
	.object({
		password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters!'),
		confirmPassword: z.string().min(1, 'Confirm Password is required!'),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	})
