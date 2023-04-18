import { FaCheck } from 'react-icons/fa'
import { Card } from 'flowbite-react'
import type { Course } from '@prisma/client'
import Link from 'next/link'

export const CourseCard = ({
	course: { title, summary, price, image, duration, slug },
}: {
	course: Course
}) => {
	return (
		<div className="max-w-sm">
			<Card
				imgAlt="Meaningful alt text for an image that is not purely decorative"
				imgSrc={image || 'https://flowbite.com/docs/images/blog/image-1.jpg'}
			>
				<Link href={`/courses/${slug}`}>
					<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{title}
					</h5>
				</Link>
				<p className="font-normal text-gray-700 dark:text-gray-400">{summary}</p>
			</Card>
		</div>
	)
}
