'use server'
import prisma from '@/lib/prisma'

const createDocument = async (id: string, themeId: string, documentName: string) => {
	const document = await prisma.userDocument.create({
		data: {
			name: documentName,
			accountId: id,
			themeId: themeId,
		},
	})
	return document
}
export default createDocument
