'use server'
import prisma from '@/lib/prisma'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const updatePDFUrl = async (id: string, file: string) => {
	const options = {
		overwrite: true,
		upload_preset: 'reseeFiles',
	}

	const response = await cloudinary.v2.uploader.upload(file, options)
	const document = await prisma.userDocument.update({
		where: {
			id,
		},
		data: {
			pdfUrl: response.secure_url,
		},
	})
	return document
}
export default updatePDFUrl
