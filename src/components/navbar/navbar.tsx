import React from 'react'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'
import classes from './navbar.module.scss'
import Link from 'next/link'
import LinkButton from '../ui/linkButton'
import MotionLink from '../ui/motionLink'

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<Wrapper>
				<div className={classes.navbarContainer}>
					<Link className={classes.logo} href="/">
						<Image
							src="/reseeLogo.svg"
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: '100%', height: 'auto' }}
							alt="resee Logo"
						/>
					</Link>
					<div className={classes.menuLinks}>
						<MotionLink whileHover={{ color: '#7527f1' }} className={`${classes.menuLink}`} href="/resume-templates">
							Resume Templates
						</MotionLink>
						<MotionLink whileHover={{ color: '#7527f1' }} className={`${classes.menuLink}`} href="/resume-editor">
							Resume Editor
						</MotionLink>
						<div className={classes.menuLine}></div>
						<MotionLink
							whileHover={{ color: '#7527f1' }}
							className={`${classes.menuLink} ${classes.loginLink}`}
							href="/login">
							Log in
						</MotionLink>
						<LinkButton href="/sign-up">Sign up</LinkButton>
					</div>
				</div>
			</Wrapper>
		</nav>
	)
}

export default Navbar
