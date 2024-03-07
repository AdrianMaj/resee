'use client'
import React, { useState } from 'react'
import classes from './menu.module.scss'
import MotionLink from '../ui/motionLink'
import LinkButton from '../ui/linkButton'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { Account } from '@prisma/client'
import Image from 'next/image'

const Menu = ({ userAccount }: { userAccount: Account | undefined }) => {
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const [isUserMenuOpened, setIsUserMenuOpened] = useState(false)
	const menuVariants = {
		hidden: {
			scaleY: 0,
		},
		shown: {
			scaleY: 1,
		},
	}
	const elementsVariants = {
		hidden: {
			opacity: 0,
		},
		shown: {
			opacity: 1,
		},
	}

	const toggleUserMenu = () => {
		setIsUserMenuOpened(prevState => !prevState)
	}
	const MotionImage = motion(Image)

	return (
		<motion.div
			initial={isMobile ? 'hidden' : 'shown'}
			animate="shown"
			exit="hidden"
			variants={menuVariants}
			className={classes.menu}>
			<MotionLink
				variants={elementsVariants}
				whileHover={{ color: '#7527f1' }}
				className={`${classes.menu__link}`}
				href="/resume-templates">
				Resume Templates
			</MotionLink>
			<MotionLink
				variants={elementsVariants}
				whileHover={{ color: '#7527f1' }}
				className={`${classes.menu__link}`}
				href="/resume-editor">
				Resume Editor
			</MotionLink>
			<div className={classes.menu__line}></div>
			{userAccount ? (
				<div className={classes.menu__detailsContainer}>
					<motion.div className={classes.menu__photoContainer} onClick={toggleUserMenu}>
						<Image
							className={classes.menu__avatar}
							width={0}
							height={0}
							sizes="100vw"
							src={userAccount.photo || '/user.svg'}
							alt={userAccount.name}
						/>
						{isMobile ? (
							<p className={classes.menu__userName}>{userAccount.name}</p>
						) : (
							<div className={classes.menu__iconContainer}>
								<MotionImage
									animate={{ rotate: !isUserMenuOpened ? [180, 0] : [0, 180] }}
									className={classes.menu__avatarArrow}
									width={0}
									height={0}
									sizes="100vw"
									src="/avatarArrow.svg"
									alt={userAccount.name}
								/>
							</div>
						)}
					</motion.div>
					<AnimatePresence>
						{(isMobile || isUserMenuOpened) && (
							<motion.div
								initial={{ scaleY: 0, scaleX: 0 }}
								animate={{ scaleY: 1, scaleX: 1 }}
								exit={{ scaleY: 0, scaleX: 0 }}
								className={classes.menu__userLinks}>
								<MotionLink
									variants={elementsVariants}
									whileHover={{ color: '#7527f1' }}
									className={`${classes.menu__link}`}
									href="/resume-editor">
									My account
								</MotionLink>
								<MotionLink
									variants={elementsVariants}
									whileHover={{ color: '#7527f1' }}
									className={`${classes.menu__link}`}
									href="/resume-editor">
									My templates
								</MotionLink>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			) : (
				<div className={classes.menu__loginContainer}>
					<MotionLink
						variants={elementsVariants}
						whileHover={{ color: '#7527f1' }}
						className={`${classes.menu__link} ${classes.menu__loginLink}`}
						href="/login">
						Log in
					</MotionLink>
					<LinkButton variants={elementsVariants} href="/sign-up">
						Sign up
					</LinkButton>
				</div>
			)}
		</motion.div>
	)
}

export default Menu
