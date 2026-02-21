import type { CollectionConfig } from 'payload'
import { tenantAccess, tenantCreateAccess } from '@/access/tenantAccess'
import { enforceTenant } from '@/hooks/enforceTenant'
import { slugifyField } from '@/hooks/slugifyField'
import { triggerDeploy } from '@/hooks/triggerDeploy'

export const Forms: CollectionConfig = {
  slug: 'forms',
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
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'intro', type: 'richText' },
    {
      name: 'fields',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        {
          name: 'fieldType',
          type: 'select',
          required: true,
          options: ['text', 'email', 'textarea', 'select', 'checkbox'],
        },
        { name: 'required', type: 'checkbox', defaultValue: false },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.fieldType === 'select',
          },
          fields: [{ name: 'value', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'submit',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Submit' },
        { name: 'successMessage', type: 'text', defaultValue: 'Thanks! We will be in touch.' },
      ],
    },
  ],
}
