'use server'
import prisma from '@/lib/prisma'

const createEmployment = async (documentId: string) => {
	const employment = await prisma.employment.create({
		data: {
			documentId: documentId,
		},
	})
	return employment
}
export default createEmployment
