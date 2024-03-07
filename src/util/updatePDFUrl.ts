'use server'
import prisma from '@/lib/prisma'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const updatePDFUrl = async (id: string, pdfUrl: string, deleteId?: string) => {
	const options = {
		invalidate: true,
	}
	if (deleteId) {
		await cloudinary.v2.uploader.destroy(deleteId, options)
	}
	const document = await prisma.userDocument.update({
		where: {
			id,
		},
		data: {
			pdfUrl,
		},
	})
	return document
}
export default updatePDFUrl
