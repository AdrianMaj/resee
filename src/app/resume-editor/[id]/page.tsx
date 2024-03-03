import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
	return (
		<div>
			Page
			<p>{params.id}</p>
		</div>
	)
}

export default Page
