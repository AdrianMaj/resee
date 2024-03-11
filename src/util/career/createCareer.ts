'use server'
import prisma from '@/lib/prisma'

const createEmployment = async (documentId: string, type: string) => {
	const employment = await prisma.career.create({
		data: {
			documentId: documentId,
			type,
		},
	})
	return employment
}
export default createEmployment
