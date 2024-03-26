import * as z from 'zod'

export const accountFormSchema = z.object({
	fullName: z.string().min(1, 'Please enter your name!'),
	email: z.string().min(1, 'Email is required!').email('Invalid email!'),
})
