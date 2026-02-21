import type { CollectionConfig } from 'payload'
import { tenantAccess, tenantCreateAccess } from '@/access/tenantAccess'
import { enforceTenant } from '@/hooks/enforceTenant'
import { slugifyField } from '@/hooks/slugifyField'
import { triggerDeploy } from '@/hooks/triggerDeploy'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
    beforeValidate: [enforceTenant, slugifyField('slug', 'title')],
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
      name: 'title',
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
      name: 'content',
      type: 'richText',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
