import type { MetadataRoute } from 'next'
import { STATE_SLUGS } from '@/lib/stateData'

const BASE = 'https://realestatecalculators.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const closingCostStatePages: MetadataRoute.Sitemap = STATE_SLUGS.map(slug => ({
    url: `${BASE}/${slug}-closing-costs`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const propertyTaxStatePages: MetadataRoute.Sitemap = STATE_SLUGS.map(slug => ({
    url: `${BASE}/${slug}-property-tax-calculator`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/affordability`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/rent-vs-buy`,             lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/closing-costs`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/seller-net`,              lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/investment-roi`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/cap-rate`,                lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/fix-flip`,                lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/cash-on-cash`,            lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/mortgage-payoff`,         lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/property-tax`,            lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...closingCostStatePages,
    ...propertyTaxStatePages,
    { url: `${BASE}/about`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
