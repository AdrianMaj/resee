'use server'
import prisma from '@/lib/prisma'

const fetchDocumentWithAccount = async (documentId: string) => {
	const userDocument = await prisma.userDocument.findUnique({
		where: {
			id: documentId,
		},
		include: {
			account: true,
			career: true,
		},
	})

	return userDocument
}

export default fetchDocumentWithAccount
