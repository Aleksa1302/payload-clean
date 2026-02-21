# Deploy Instructions (Cloudflare Pages)

This guide explains how to deploy the CMS safely for testing.

## 1. Prerequisites

- A GitHub repo with this code pushed.
- Cloudflare account with Workers (Paid plan recommended).
- Cloudflare Pages (for client Astro sites).

## 2. Create Cloudflare Services

Create or select:
- D1 database
- R2 bucket

## 3. Deploy the CMS

You can deploy from Cloudflare Workers dashboard or via the Deploy button in the repo README.

Required environment variables and bindings:
- `PAYLOAD_SECRET`: a random string (example: output of `openssl rand -hex 32`)
- `D1`: bind to your D1 database
- `R2`: bind to your R2 bucket

Optional:
- `CLOUDFLARE_ENV`: environment name

## 4. First Login

- Open the admin URL for the deployed worker.
- Create the first admin user (admin role).

## 5. Add Your First Tenant

In the CMS:
- Create a `tenants` entry with `name` and `slug`.
- Add the Cloudflare Pages deploy hook URL to `deployHookURL`.

## 6. Create Client Users

- Create a user with role `client` and assign the tenant.
- Client users can only edit their own tenant content.

## 7. Content Workflow

- Create or edit content.
- Click `Publish` (drafts are enabled).
- On publish, a Cloudflare Pages deploy hook is triggered for that tenant.

## 8. Astro Frontend Data Access

Recommended: use a server-side API token or server-only user to fetch data by tenant slug.
If you want a public read endpoint, ask and we can add it.
