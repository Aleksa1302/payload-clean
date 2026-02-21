import type { CollectionConfig } from 'payload'
import { tenantAccess, tenantCreateAccess } from '@/access/tenantAccess'
import { enforceTenant } from '@/hooks/enforceTenant'
import { triggerDeploy } from '@/hooks/triggerDeploy'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
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
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first.',
      },
    },
  ],
}
