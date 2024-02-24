import React from 'react'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'
import classes from './navbar.module.scss'
import Link from 'next/link'

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
						<Link className={`${classes.menuLink}`} href="/resume-templates">
							Resume Templates
						</Link>
						<Link className={`${classes.menuLink}`} href="/resume-editor">
							Resume Editor
						</Link>
						<div className={classes.menuLine}></div>
						<Link className={`${classes.menuLink}`} href="/login">
							Log in
						</Link>
						<Link className={`${classes.menuLink}`} href="/sign-up">
							Sign up
						</Link>
					</div>
				</div>
			</Wrapper>
		</nav>
	)
}

export default Navbar
