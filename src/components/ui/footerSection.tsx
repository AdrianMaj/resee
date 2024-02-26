import React from 'react'
import Wrapper from './wrapper'
import classes from './footerSection.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import MotionLink from './motionLink'
const FooterSection = () => {
	const date = new Date()
	return (
		<footer className={classes.footer}>
			<Wrapper>
				<div className={classes.container}>
					<Link className={classes.logo} href="/">
						<Image
							src="/reseeLogoFooter.svg"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: '100%', height: 'auto' }}
							alt="resee Logo"
						/>
					</Link>

					<div className={classes.links}>
						<p className={classes.linksTitle}>Links</p>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Resume Templates
						</MotionLink>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Resume Examples
						</MotionLink>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Resume Editor
						</MotionLink>
					</div>
					<div className={classes.links}>
						<p className={classes.linksTitle}>Socials</p>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Facebook
						</MotionLink>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Instagram
						</MotionLink>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Twitter / X
						</MotionLink>
					</div>
					<div className={classes.links}>
						<p className={classes.linksTitle}>Documents</p>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Privacy Policy
						</MotionLink>
						<MotionLink
							whileHover={{
								color: '#fff',
							}}
							className={classes.link}
							href="/">
							Terms of service
						</MotionLink>
					</div>
				</div>
				<div className={classes.attribution}>&copy; {date.getFullYear()} resee Company</div>
			</Wrapper>
		</footer>
	)
}

export default FooterSection
