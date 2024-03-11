import { Prisma } from '@prisma/client'

export type UserDocumentWithCareer = Prisma.UserDocumentGetPayload<{
	include: {
		career: true
	}
}>
