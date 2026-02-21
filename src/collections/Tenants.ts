import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { tenantReadAccess } from '@/access/tenantAccess'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdmin,
    read: tenantReadAccess,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'deployHookURL',
      type: 'text',
      label: 'Cloudflare Pages Deploy Hook URL',
      admin: {
        description: 'POST URL used to trigger a deploy on publish.',
      },
    },
  ],
}
