'use server'
import mailjet from 'node-mailjet'
const mailjetClient = mailjet.apiConnect(process.env.MAILJET_API_PUBLIC_KEY!, process.env.MAILJET_API_PRIVATE_KEY!)

export async function sendEmail({
	to,
	from,
	subject,
	message,
	recipentName,
}: {
	to: string
	from: string
	subject: string
	message: string
	recipentName: string
}) {
	const emailData = {
		Messages: [
			{
				From: {
					Email: from,
					Name: 'resee Company',
				},
				To: [
					{
						Email: to,
						Name: recipentName,
					},
				],
				Subject: subject,
				HTMLPart: message,
			},
		],
	}
	try {
		const result = await mailjetClient.post('send', { version: 'v3.1' }).request(emailData)
		return result
	} catch (error) {
		console.error('Error sending email:', error)
		throw error
	}
}
