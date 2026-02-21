import type { Access } from 'payload'

export const isAdminUser = (user?: { roles?: string[] | null } | null): boolean => {
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdmin: Access = ({ req: { user } }) => isAdminUser(user)
