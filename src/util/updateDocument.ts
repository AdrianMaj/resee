'use server'
import prisma from '@/lib/prisma'
import { TemporaryDocumentType } from '@/types/documentTypes'

const updateDocument = async (id: string, values: TemporaryDocumentType) => {
	const document = await prisma.userDocument.update({
		where: {
			id,
		},
		data: {
			...values,
		},
	})
	return document
}
export default updateDocument
