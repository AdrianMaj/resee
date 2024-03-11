import * as z from 'zod'

export const infoInputFormSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	from: z.string(),
	type: z.string(),
	to: z.string(),
})
