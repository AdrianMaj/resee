'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

const MotionLink = ({ href, children, ...props }: { href: string; children?: React.ReactNode; [x: string]: any }) => {
	const MotionLink = motion(Link)
	return (
		<MotionLink href={href} {...props}>
			{children}
		</MotionLink>
	)
}

export default MotionLink
