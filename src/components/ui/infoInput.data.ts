import * as z from 'zod'

export const infoInputFormSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	from: z.string(),
	to: z.string(),
})
