export const CardList = ({ children, title, description }) => {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
						{title}
					</h2>
					<p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
						{description}
					</p>
				</div>
				<div className="my-6 flex lg:flex-row flex-col gap-4 sm:gap-2 xl:gap-10 space-y-0">
					{children}
				</div>
			</div>
		</section>
	)
}
