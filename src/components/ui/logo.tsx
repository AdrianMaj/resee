import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import classes from './logo.module.scss'

const Logo = ({ ...props }: { [x: string]: any }) => {
	return (
		<Link className={classes.logo} href="/" {...props}>
			<Image
				src="/reseeLogo.svg"
				width={0}
				height={0}
				sizes="100vw"
				style={{ width: '100%', height: 'auto' }}
				alt="resee Logo"
			/>
		</Link>
	)
}

export default Logo
