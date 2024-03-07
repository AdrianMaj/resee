import * as z from 'zod'

export const LoginFormSchema = z.object({
	email: z.string().min(1, 'Email is required!').email('Invalid email!'),
	password: z.string().min(1, 'Password is required'),
})
