import type { CollectionConfig } from 'payload'
import { tenantAccess } from '@/access/tenantAccess'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['form', 'createdAt'],
  },
  access: {
    create: () => true,
    read: tenantAccess,
    update: tenantAccess,
    delete: tenantAccess,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data?.form || data?.tenant) return data
        try {
          const form = await req.payload.findByID({
            collection: 'forms',
            id: data.form as string,
            depth: 0,
            overrideAccess: true,
          })
          if (form?.tenant) {
            return { ...data, tenant: form.tenant }
          }
        } catch {
          return data
        }
        return data
      },
    ],
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
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'submission',
      type: 'json',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Optional source URL or page path.',
      },
    },
  ],
}
