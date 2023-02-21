import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const CreateUser = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
})

export default resolver.pipe(resolver.zod(CreateUser), resolver.authorize(), async (input) => {
	// TODO: in multi-tenant app, you must add validation to ensure correct tenant
	const user = await db.user.create({ data: input })

	return user
})
