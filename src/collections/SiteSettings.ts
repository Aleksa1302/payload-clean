import type { CollectionConfig } from 'payload'
import { tenantAccess, tenantCreateAccess } from '@/access/tenantAccess'
import { enforceTenant } from '@/hooks/enforceTenant'
import { triggerDeploy } from '@/hooks/triggerDeploy'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tenant', 'updatedAt'],
  },
  access: {
    read: tenantAccess,
    create: tenantCreateAccess,
    update: tenantAccess,
    delete: tenantAccess,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [enforceTenant],
    afterChange: [triggerDeploy],
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for this settings doc (one per tenant).',
      },
    },
    {
      name: 'menus',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'content', type: 'richText' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'forms',
      type: 'relationship',
      relationTo: 'forms',
      hasMany: true,
    },
    {
      name: 'seoDefaults',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
