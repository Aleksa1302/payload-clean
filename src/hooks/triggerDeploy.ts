import type { AfterChangeHook } from 'payload'

export const triggerDeploy: AfterChangeHook = async ({ doc, previousDoc, req, context }) => {
  if (context?.skipDeploy) return doc

  const status = doc?._status
  if (status !== 'published') return doc

  const tenantValue = doc?.tenant
  const tenantId = typeof tenantValue === 'string' ? tenantValue : tenantValue?.id
  if (!tenantId) return doc

  try {
    const tenant = await req.payload.findByID({
      collection: 'tenants',
      id: tenantId,
      depth: 0,
      req,
      overrideAccess: false,
    })

    if (!tenant?.deployHookURL) return doc

    await fetch(tenant.deployHookURL, { method: 'POST' })
  } catch (error) {
    console.error('Deploy hook failed', error)
  }

  return doc
}
