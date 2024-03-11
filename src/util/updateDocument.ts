'use server'
import { documentFormSchema } from '@/components/forms/document/documentForm.data'
import prisma from '@/lib/prisma'
import { Career } from '@prisma/client'
import * as z from 'zod'

const updateDocument = async (id: string, values: z.infer<typeof documentFormSchema>) => {
	const careers: Career[] = []
	const document = await prisma.userDocument.update({
		where: {
			id,
		},
		data: {
			jobTitle: values.jobTitle,
			photoUrl: values.photoUrl,
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			phone: values.phone,
			country: values.country,
			city: values.city,
			summary: values.summary,
		},
	})
	values.career.forEach(async item => {
		const career = await prisma.career.update({
			where: {
				id: item.id,
			},
			data: {
				from: item.from,
				to: item.to,
				title: item.title,
				description: item.description,
			},
		})
		careers.push(career)
	})
	return { ...document, career: careers }
}
export default updateDocument
