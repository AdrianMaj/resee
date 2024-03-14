import * as z from 'zod'

export const infoInputFormSchema = z.object({
	id: z.string(),
	title: z.string().nullable(),
	description: z.string().nullable(),
	from: z.string().nullable(),
	type: z.string().nullable(),
	to: z.string().nullable(),
})
