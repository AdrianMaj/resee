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
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			phone: values.phone,
			country: values.country,
			city: values.city,
			summary: values.summary,
			skills: values.skills,
			languages: values.languages,
			link1: values.link1,
			link2: values.link2,
			attribution: values.attribution,
		},
		include: {
			career: true,
		},
	})
	values.career.forEach(async item => {
		await prisma.career.update({
			where: {
				id: item.id,
			},
			data: {
				from: item.from,
				to: item.to,
				title: item.title,
				documentId: item.documentId,
				description: item.description,
			},
		})
	})
	return document
}
export default updateDocument
