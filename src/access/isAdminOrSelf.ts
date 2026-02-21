import type { Access } from 'payload'
import { isAdminUser } from './isAdmin'

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (isAdminUser(user)) return true
  return { id: { equals: id } }
}
