import { FaCheck } from 'react-icons/fa'
import { Card } from 'flowbite-react'
import type { Course } from '@prisma/client'

export const CourseCard = ({
	course: { title, summary, price, image, duration },
}: {
	course: Course
}) => {
	return (
		<div className="max-w-sm">
			<Card
				imgAlt="Meaningful alt text for an image that is not purely decorative"
				imgSrc={image || 'https://flowbite.com/docs/images/blog/image-1.jpg'}
			>
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
				<p className="font-normal text-gray-700 dark:text-gray-400">{summary}</p>
			</Card>
		</div>
	)
	// return (
	// 	<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
	// 		<h3 className="mb-4 text-2xl font-semibold">Starter</h3>
	// 		<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
	// 			Best option for personal use & for your next project.
	// 		</p>
	// 		<div className="flex justify-center items-baseline my-8">
	// 			<span className="mr-2 text-5xl font-extrabold">$29</span>
	// 			<span className="text-gray-500 dark:text-gray-400">/month</span>
	// 		</div>
	// 		<ul
	// 			role="list"
	// 			className="mb-8 space-y-4 text-left"
	// 		>
	// 			<li className="flex items-center space-x-3">
	// 				<FaCheck />
	// 				<span>Individual configuration</span>
	// 			</li>
	// 			<li className="flex items-center space-x-3">
	// 				<FaCheck />
	// 				<span>No setup, or hidden fees</span>
	// 			</li>
	// 			<li className="flex items-center space-x-3">
	// 				<FaCheck />
	// 				<span>
	// 					Team size: <span className="font-semibold">1 developer</span>
	// 				</span>
	// 			</li>
	// 			<li className="flex items-center space-x-3">
	// 				<FaCheck />
	// 				<span>
	// 					Premium support: <span className="font-semibold">6 months</span>
	// 				</span>
	// 			</li>
	// 			<li className="flex items-center space-x-3">
	// 				<FaCheck />
	// 				<span>
	// 					Free updates: <span className="font-semibold">6 months</span>
	// 				</span>
	// 			</li>
	// 		</ul>
	// 		<a
	// 			href="#"
	// 			className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
	// 		>
	// 			Get started
	// 		</a>
	// 	</div>
	// )
}
