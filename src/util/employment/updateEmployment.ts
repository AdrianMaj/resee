'use server'
import { infoInputFormSchema } from '@/components/ui/infoInput.data'
import prisma from '@/lib/prisma'
import * as z from 'zod'

const updateEmployment = async (values: z.infer<typeof infoInputFormSchema>) => {
	const document = await prisma.employment.update({
		where: {
			id: values.id,
		},
		data: {
			name: values.name,
			description: values.description,
			from: values.from,
			to: values.to,
		},
	})
	return document
}
export default updateEmployment
