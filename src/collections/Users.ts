import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'client'],
      defaultValue: ['client'],
      required: true,
      saveToJWT: true,
      access: {
        update: isAdmin,
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      saveToJWT: true,
      admin: {
        description: 'Required for client users. Admins can be tenantless.',
      },
      validate: (value, { siblingData }) => {
        const roles = siblingData?.roles as string[] | undefined
        if (roles?.includes('admin')) return true
        return Boolean(value) || 'Tenant is required for client users.'
      },
    },
  ],
}
