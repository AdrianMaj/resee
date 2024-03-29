import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { hash } from 'bcrypt'
import * as z from 'zod'
import { randomUUID } from 'crypto'
import { sendValidationEmail } from '@/util/sendValidationEmail'

const accountSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
})

export const POST = async (req: Request) => {
	try {
		const body = await req.json()
		const { email, name, password } = accountSchema.parse(body)

		//EMAIL VERIFICATION
		const existingUserByEmail = await prisma.account.findUnique({
			where: { email: email },
		})
		if (existingUserByEmail && !existingUserByEmail.active) {
			const token = await prisma.activateToken.create({
				data: {
					token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
					accountId: existingUserByEmail.id,
				},
			})
			await sendValidationEmail(existingUserByEmail, token)
			return NextResponse.json(
				{ user: null, message: "Account with that email exist, but it's not active. Sent new activation email" },
				{ status: 409 }
			)
		} else if (existingUserByEmail && existingUserByEmail.active) {
			return NextResponse.json({ user: null, message: 'Account with that email already exist!' }, { status: 409 })
		}

		const hashedPassword = await hash(password, 10)

		const newAccount = await prisma.account.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		})

		const token = await prisma.activateToken.create({
			data: {
				token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				accountId: newAccount.id,
			},
		})
		try {
			await sendValidationEmail(newAccount, token)
		} catch (error) {
			return NextResponse.json(
				{ user: null, message: 'There was a problem with sending verification email. Please try again later.' },
				{ status: 409 }
			)
		}

		const { password: newAccountPassword, ...accountData } = newAccount

		return NextResponse.json(
			{ user: { account: accountData }, message: 'Account created successfully!' },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong! Please try again later.' }, { status: 500 })
	}
}
