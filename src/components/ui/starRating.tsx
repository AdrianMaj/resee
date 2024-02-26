import React from 'react'
import { uuid } from 'uuidv4'
import classes from './starRating.module.scss'

const StarRating = ({ stars }: { stars: number }) => {
	const starsArray = [
		{ id: uuid(), filled: false },
		{ id: uuid(), filled: false },
		{ id: uuid(), filled: false },
		{ id: uuid(), filled: false },
		{ id: uuid(), filled: false },
	]
	for (let i = 0; i < stars; i++) {
		starsArray[i].filled = true
	}
	return (
		<div className={classes.container}>
			{starsArray.map(starValue => {
				if (starValue.filled === true) {
					return (
						<div key={starValue.id} className={classes.starIcon}>
							<svg width="auto" height="auto" viewBox="0 0 975 931" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M459.406 17.5132C471.534 -4.72492 503.466 -4.72496 515.594 17.5132L650.165 264.265C654.767 272.704 662.92 278.628 672.368 280.397L948.628 332.131C973.525 336.793 983.393 367.162 965.991 385.568L772.9 589.803C766.296 596.789 763.182 606.372 764.419 615.905L800.586 894.631C803.846 919.75 778.013 938.519 755.13 927.657L501.223 807.129C492.539 803.007 482.461 803.007 473.777 807.129L219.87 927.657C196.987 938.519 171.154 919.75 174.414 894.631L210.581 615.905C211.818 606.372 208.704 596.789 202.1 589.803L9.0092 385.568C-8.39275 367.162 1.47456 336.793 26.372 332.131L302.632 280.397C312.08 278.628 320.233 272.705 324.835 264.265L459.406 17.5132Z"
									fill="#9357F4"
								/>
							</svg>
						</div>
					)
				} else {
					return (
						<div key={starValue.id} className={classes.starIcon}>
							<svg width="auto" height="auto" viewBox="0 0 975 931" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M459.406 17.5132C471.534 -4.72492 503.466 -4.72496 515.594 17.5132L650.165 264.265C654.767 272.704 662.92 278.628 672.368 280.397L948.628 332.131C973.525 336.793 983.393 367.162 965.991 385.568L772.9 589.803C766.296 596.789 763.182 606.372 764.419 615.905L800.586 894.631C803.846 919.75 778.013 938.519 755.13 927.657L501.223 807.129C492.539 803.007 482.461 803.007 473.777 807.129L219.87 927.657C196.987 938.519 171.154 919.75 174.414 894.631L210.581 615.905C211.818 606.372 208.704 596.789 202.1 589.803L9.0092 385.568C-8.39275 367.162 1.47456 336.793 26.372 332.131L302.632 280.397C312.08 278.628 320.233 272.705 324.835 264.265L459.406 17.5132Z"
									fill="#d1b7fa"
								/>
							</svg>
						</div>
					)
				}
			})}
		</div>
	)
}

export default StarRating
