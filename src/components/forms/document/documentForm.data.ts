import * as z from 'zod'

export const documentFormSchema = z.object({
	name: z.string(),
	jobTitle: z.string(),
	photoUrl: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	phone: z.string(),
	country: z.string(),
	city: z.string(),
	summary: z.string(),
	link1: z.string(),
	link2: z.string(),
	career: z.array(
		z.object({
			id: z.string(),
			title: z.string().nullable(),
			from: z.string().nullable(),
			to: z.string().nullable(),
			type: z.string().nullable(),
			description: z.string().nullable(),
			documentId: z.string(),
			createdAt: z.date(),
			updatedAt: z.date(),
		})
	),
	skills: z.array(z.string()),
	languages: z.array(z.string()),
	attribution: z.string(),
})
