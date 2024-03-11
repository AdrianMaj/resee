import { Prisma } from '@prisma/client'

export type UserDocumentWithEmployment = Prisma.UserDocumentGetPayload<{
	include: {
		employment: true
	}
}>
