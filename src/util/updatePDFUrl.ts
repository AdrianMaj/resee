'use server'
import prisma from '@/lib/prisma'

const updatePDFUrl = async (id: string, URL: string) => {
	const document = await prisma.userDocument.update({
		where: {
			id,
		},
		data: {
			pdfUrl: URL,
		},
	})
	return document
}
export default updatePDFUrl
