import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { UpdateUser } from '../../auth/validations'

export default resolver.pipe(
	resolver.zod(UpdateUser),
	resolver.authorize(),
	async ({ id, ...data }) => {
		return await db.user.update({ where: { id }, data })
	}
)
