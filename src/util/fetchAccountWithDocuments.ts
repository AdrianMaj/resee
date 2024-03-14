'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

const fetchAccountWithDocuments = async () => {
	const session = await getServerSession(authOptions)
	if (session?.user) {
		const userId = session.user.id
		const userAccount = await prisma.account.findUnique({
			where: {
				id: userId,
			},
			include: {
				UserDocument: {
					orderBy: {
						updatedAt: 'desc',
					},
				},
			},
		})
		return userAccount
	}
}
export default fetchAccountWithDocuments
