import type { BeforeValidateHook } from 'payload'
import { slugify } from '@/utils/slugify'

export const slugifyField = (field: string, source: string): BeforeValidateHook => {
  return ({ data }) => {
    if (!data) return data
    const current = data[field]
    const from = data[source]
    if (!current && typeof from === 'string') {
      return { ...data, [field]: slugify(from) }
    }
    if (typeof current === 'string') {
      return { ...data, [field]: slugify(current) }
    }
    return data
  }
}
