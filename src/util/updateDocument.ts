'use server'
import { documentFormSchema } from '@/components/forms/document/documentForm.data'
import prisma from '@/lib/prisma'
import * as z from 'zod'

const updateDocument = async (id: string, values: z.infer<typeof documentFormSchema>) => {
	const document = await prisma.userDocument.update({
		where: {
			id,
		},
		data: {
			jobTitle: values.jobTitle,
			photoUrl: values.photoUrl,
			name: values.firstName + ' ' + values.lastName,
			email: values.email,
			phone: values.phone,
			country: values.country,
			city: values.city,
			summary: values.summary,
		},
	})
	return document
}
export default updateDocument
