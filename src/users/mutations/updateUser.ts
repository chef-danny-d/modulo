import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateUser } from '../../auth/validations'

export default resolver.pipe(
  resolver.zod(UpdateUser),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const user = await db.user.update({ where: { id }, data });

    return user;
  }
);
