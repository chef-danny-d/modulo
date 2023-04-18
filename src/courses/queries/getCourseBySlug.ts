import { NotFoundError } from 'blitz'
import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const GetCourse = z.object({
	// This accepts type of undefined, but is required at runtime
	slug: z.string().optional().refine(Boolean, 'Required'),
	include: z.nullable(z.object({}).optional()),
})

export default resolver.pipe(
	resolver.zod(GetCourse),
	resolver.authorize(),
	async ({ slug, ...rest }) => {
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const course = await db.course.findFirst({
			where: { slug },
			...rest,
		})

		if (!course) throw new NotFoundError()

		return course
	}
)
