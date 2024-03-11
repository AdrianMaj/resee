'use server'
import prisma from '@/lib/prisma'

const removeEmployment = async (id: string) => {
	await prisma.employment.delete({
		where: {
			id,
		},
	})
}
export default removeEmployment
