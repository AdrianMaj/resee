import * as z from 'zod'

export const documentFormSchema = z.object({
	jobTitle: z.string(),
	photoUrl: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	phone: z.string(),
	country: z.string(),
	city: z.string(),
	summary: z.string(),
	employment: z
		.object({
			name: z.string(),
			description: z.string(),
			from: z.string(),
			to: z.string(),
		})
		.array(),
	// education: z.string().array(),
	// skills: z.array(z.string()),
	// languages: z.array(z.string()),
})
