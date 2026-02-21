import type { Access } from 'payload'
import { isAdminUser } from './isAdmin'

export const tenantAccess: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdminUser(user)) return true
  const tenantValue = user?.tenant as { id?: string } | string | undefined | null
  const tenant = typeof tenantValue === 'string' ? tenantValue : tenantValue?.id
  if (!tenant) return false
  return { tenant: { equals: tenant } }
}

export const tenantCreateAccess: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdminUser(user)) return true
  return Boolean(user?.tenant)
}

export const tenantReadAccess: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdminUser(user)) return true
  const tenantValue = user?.tenant as { id?: string } | string | undefined | null
  const tenant = typeof tenantValue === 'string' ? tenantValue : tenantValue?.id
  if (!tenant) return false
  return { id: { equals: tenant } }
}
