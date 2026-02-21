import type { BeforeValidateHook } from 'payload'
import { isAdminUser } from '@/access/isAdmin'

export const enforceTenant: BeforeValidateHook = ({ data, req }) => {
  if (!req.user) return data
  if (isAdminUser(req.user)) return data

  const nextData = { ...(data || {}) }
  const tenantValue = req.user.tenant as { id?: string } | string | undefined | null
  nextData.tenant = typeof tenantValue === 'string' ? tenantValue : tenantValue?.id
  return nextData
}
