import { NotFoundError } from 'blitz'
import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const GetCourse = z.object({
	// This accepts type of undefined, but is required at runtime
	slug: z.string().optional().refine(Boolean, 'Required'),
	include: z.object({
		orderBy: z.array(
			z.object({
				position: z.enum(['asc', 'desc']),
			})
		),
		chapters: z.object({
			include: z.object({
				lessons: z.object({
					orderBy: z.array(
						z.object({
							position: z.enum(['asc', 'desc']),
						})
					),
				}),
			}),
		}),
		author: z.boolean(),
	}),
})

export default resolver.pipe(
	resolver.zod(GetCourse),
	resolver.authorize(),
	async ({ slug, ...rest }) => {
		console.log(rest)
		// TODO: in multi-tenant app, you must add validation to ensure correct tenant
		const course = await db.course.findFirst({
			where: { slug },
			...rest,
		})

		if (!course) throw new NotFoundError()

		return course
	}
)
