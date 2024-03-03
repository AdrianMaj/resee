'use server'
import prisma from '@/lib/prisma'

const fetchAccountByDocument = async (documentId: string) => {
	const userAccount = await prisma.account.findFirst({
		where: {
			UserDocument: {
				some: {
					id: documentId,
				},
			},
		},
		include: {
			UserDocument: {
				where: {
					id: documentId,
				},
			},
		},
	})

	return userAccount
}

export default fetchAccountByDocument
