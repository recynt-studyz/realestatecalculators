export interface StateInfo {
  name: string
  abbr: string
  slug: string
  propertyTaxRate: number      // effective annual rate as a percentage (e.g., 0.63 for 0.63%)
  transferTaxRate: number      // as percentage of sale price
  hasTransferTax: boolean
  isAttorneyState: boolean
  medianHomeValue: number      // 2026 estimate
  homesteadExemption: number   // dollar reduction in assessed value (0 = no statewide exemption)
  titlePayer: 'buyer' | 'seller' | 'split' | 'negotiable'
}

export const STATES: Record<string, StateInfo> = {
  AL: { name: 'Alabama',        abbr: 'AL', slug: 'alabama',        propertyTaxRate: 0.41, transferTaxRate: 0.10, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 230000, homesteadExemption: 4000,   titlePayer: 'seller' },
  AK: { name: 'Alaska',         abbr: 'AK', slug: 'alaska',         propertyTaxRate: 1.04, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 340000, homesteadExemption: 0,      titlePayer: 'negotiable' },
  AZ: { name: 'Arizona',        abbr: 'AZ', slug: 'arizona',        propertyTaxRate: 0.63, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 420000, homesteadExemption: 0,      titlePayer: 'buyer' },
  AR: { name: 'Arkansas',       abbr: 'AR', slug: 'arkansas',       propertyTaxRate: 0.62, transferTaxRate: 0.33, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 210000, homesteadExemption: 375,    titlePayer: 'buyer' },
  CA: { name: 'California',     abbr: 'CA', slug: 'california',     propertyTaxRate: 0.75, transferTaxRate: 0.11, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 780000, homesteadExemption: 300000, titlePayer: 'seller' },
  CO: { name: 'Colorado',       abbr: 'CO', slug: 'colorado',       propertyTaxRate: 0.55, transferTaxRate: 0.01, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 550000, homesteadExemption: 25000,  titlePayer: 'seller' },
  CT: { name: 'Connecticut',    abbr: 'CT', slug: 'connecticut',    propertyTaxRate: 1.73, transferTaxRate: 0.75, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 410000, homesteadExemption: 0,      titlePayer: 'buyer' },
  DE: { name: 'Delaware',       abbr: 'DE', slug: 'delaware',       propertyTaxRate: 0.61, transferTaxRate: 1.50, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 350000, homesteadExemption: 0,      titlePayer: 'buyer' },
  FL: { name: 'Florida',        abbr: 'FL', slug: 'florida',        propertyTaxRate: 0.91, transferTaxRate: 0.70, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 420000, homesteadExemption: 50000,  titlePayer: 'seller' },
  GA: { name: 'Georgia',        abbr: 'GA', slug: 'georgia',        propertyTaxRate: 0.92, transferTaxRate: 0.10, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 320000, homesteadExemption: 2000,   titlePayer: 'seller' },
  HI: { name: 'Hawaii',         abbr: 'HI', slug: 'hawaii',         propertyTaxRate: 0.29, transferTaxRate: 0.10, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 830000, homesteadExemption: 100000, titlePayer: 'buyer' },
  ID: { name: 'Idaho',          abbr: 'ID', slug: 'idaho',          propertyTaxRate: 0.69, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 440000, homesteadExemption: 125000, titlePayer: 'buyer' },
  IL: { name: 'Illinois',       abbr: 'IL', slug: 'illinois',       propertyTaxRate: 2.23, transferTaxRate: 0.10, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 270000, homesteadExemption: 6000,   titlePayer: 'buyer' },
  IN: { name: 'Indiana',        abbr: 'IN', slug: 'indiana',        propertyTaxRate: 0.87, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 250000, homesteadExemption: 48000,  titlePayer: 'buyer' },
  IA: { name: 'Iowa',           abbr: 'IA', slug: 'iowa',           propertyTaxRate: 1.57, transferTaxRate: 0.16, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 220000, homesteadExemption: 4850,   titlePayer: 'buyer' },
  KS: { name: 'Kansas',         abbr: 'KS', slug: 'kansas',         propertyTaxRate: 1.41, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 225000, homesteadExemption: 0,      titlePayer: 'buyer' },
  KY: { name: 'Kentucky',       abbr: 'KY', slug: 'kentucky',       propertyTaxRate: 0.86, transferTaxRate: 0.10, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 230000, homesteadExemption: 46350,  titlePayer: 'buyer' },
  LA: { name: 'Louisiana',      abbr: 'LA', slug: 'louisiana',      propertyTaxRate: 0.55, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 215000, homesteadExemption: 75000,  titlePayer: 'buyer' },
  ME: { name: 'Maine',          abbr: 'ME', slug: 'maine',          propertyTaxRate: 1.36, transferTaxRate: 0.44, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 380000, homesteadExemption: 25000,  titlePayer: 'buyer' },
  MD: { name: 'Maryland',       abbr: 'MD', slug: 'maryland',       propertyTaxRate: 1.09, transferTaxRate: 0.50, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 420000, homesteadExemption: 0,      titlePayer: 'buyer' },
  MA: { name: 'Massachusetts',  abbr: 'MA', slug: 'massachusetts',  propertyTaxRate: 1.23, transferTaxRate: 0.46, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 620000, homesteadExemption: 500000, titlePayer: 'buyer' },
  MI: { name: 'Michigan',       abbr: 'MI', slug: 'michigan',       propertyTaxRate: 1.54, transferTaxRate: 0.75, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 250000, homesteadExemption: 0,      titlePayer: 'buyer' },
  MN: { name: 'Minnesota',      abbr: 'MN', slug: 'minnesota',      propertyTaxRate: 1.12, transferTaxRate: 0.33, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 330000, homesteadExemption: 0,      titlePayer: 'buyer' },
  MS: { name: 'Mississippi',    abbr: 'MS', slug: 'mississippi',    propertyTaxRate: 0.65, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 185000, homesteadExemption: 7500,   titlePayer: 'buyer' },
  MO: { name: 'Missouri',       abbr: 'MO', slug: 'missouri',       propertyTaxRate: 1.01, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 240000, homesteadExemption: 0,      titlePayer: 'buyer' },
  MT: { name: 'Montana',        abbr: 'MT', slug: 'montana',        propertyTaxRate: 0.84, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 430000, homesteadExemption: 0,      titlePayer: 'buyer' },
  NE: { name: 'Nebraska',       abbr: 'NE', slug: 'nebraska',       propertyTaxRate: 1.73, transferTaxRate: 0.23, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 250000, homesteadExemption: 0,      titlePayer: 'buyer' },
  NV: { name: 'Nevada',         abbr: 'NV', slug: 'nevada',         propertyTaxRate: 0.60, transferTaxRate: 0.26, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 440000, homesteadExemption: 0,      titlePayer: 'buyer' },
  NH: { name: 'New Hampshire',  abbr: 'NH', slug: 'new-hampshire',  propertyTaxRate: 2.09, transferTaxRate: 0.75, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 460000, homesteadExemption: 0,      titlePayer: 'buyer' },
  NJ: { name: 'New Jersey',     abbr: 'NJ', slug: 'new-jersey',     propertyTaxRate: 2.49, transferTaxRate: 1.00, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 510000, homesteadExemption: 0,      titlePayer: 'buyer' },
  NM: { name: 'New Mexico',     abbr: 'NM', slug: 'new-mexico',     propertyTaxRate: 0.80, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 290000, homesteadExemption: 2000,   titlePayer: 'buyer' },
  NY: { name: 'New York',       abbr: 'NY', slug: 'new-york',       propertyTaxRate: 1.72, transferTaxRate: 0.40, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 450000, homesteadExemption: 0,      titlePayer: 'buyer' },
  NC: { name: 'North Carolina', abbr: 'NC', slug: 'north-carolina', propertyTaxRate: 0.84, transferTaxRate: 0.20, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 330000, homesteadExemption: 25000,  titlePayer: 'buyer' },
  ND: { name: 'North Dakota',   abbr: 'ND', slug: 'north-dakota',   propertyTaxRate: 0.98, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 260000, homesteadExemption: 0,      titlePayer: 'buyer' },
  OH: { name: 'Ohio',           abbr: 'OH', slug: 'ohio',           propertyTaxRate: 1.62, transferTaxRate: 0.10, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 235000, homesteadExemption: 26200,  titlePayer: 'buyer' },
  OK: { name: 'Oklahoma',       abbr: 'OK', slug: 'oklahoma',       propertyTaxRate: 0.90, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 215000, homesteadExemption: 1000,   titlePayer: 'buyer' },
  OR: { name: 'Oregon',         abbr: 'OR', slug: 'oregon',         propertyTaxRate: 0.97, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 490000, homesteadExemption: 0,      titlePayer: 'buyer' },
  PA: { name: 'Pennsylvania',   abbr: 'PA', slug: 'pennsylvania',   propertyTaxRate: 1.58, transferTaxRate: 1.00, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 250000, homesteadExemption: 0,      titlePayer: 'buyer' },
  RI: { name: 'Rhode Island',   abbr: 'RI', slug: 'rhode-island',   propertyTaxRate: 1.53, transferTaxRate: 0.46, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 430000, homesteadExemption: 0,      titlePayer: 'buyer' },
  SC: { name: 'South Carolina', abbr: 'SC', slug: 'south-carolina', propertyTaxRate: 0.57, transferTaxRate: 0.37, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 300000, homesteadExemption: 50000,  titlePayer: 'buyer' },
  SD: { name: 'South Dakota',   abbr: 'SD', slug: 'south-dakota',   propertyTaxRate: 1.14, transferTaxRate: 0.10, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 285000, homesteadExemption: 0,      titlePayer: 'buyer' },
  TN: { name: 'Tennessee',      abbr: 'TN', slug: 'tennessee',      propertyTaxRate: 0.71, transferTaxRate: 0.37, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 310000, homesteadExemption: 25000,  titlePayer: 'buyer' },
  TX: { name: 'Texas',          abbr: 'TX', slug: 'texas',          propertyTaxRate: 1.80, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 330000, homesteadExemption: 100000, titlePayer: 'seller' },
  UT: { name: 'Utah',           abbr: 'UT', slug: 'utah',           propertyTaxRate: 0.63, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 510000, homesteadExemption: 0,      titlePayer: 'buyer' },
  VT: { name: 'Vermont',        abbr: 'VT', slug: 'vermont',        propertyTaxRate: 1.90, transferTaxRate: 1.25, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 390000, homesteadExemption: 0,      titlePayer: 'buyer' },
  VA: { name: 'Virginia',       abbr: 'VA', slug: 'virginia',       propertyTaxRate: 0.82, transferTaxRate: 0.25, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 380000, homesteadExemption: 0,      titlePayer: 'buyer' },
  WA: { name: 'Washington',     abbr: 'WA', slug: 'washington',     propertyTaxRate: 1.03, transferTaxRate: 1.10, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 580000, homesteadExemption: 0,      titlePayer: 'buyer' },
  WV: { name: 'West Virginia',  abbr: 'WV', slug: 'west-virginia',  propertyTaxRate: 0.59, transferTaxRate: 0.22, hasTransferTax: true,  isAttorneyState: true,  medianHomeValue: 160000, homesteadExemption: 20000,  titlePayer: 'buyer' },
  WI: { name: 'Wisconsin',      abbr: 'WI', slug: 'wisconsin',      propertyTaxRate: 1.85, transferTaxRate: 0.30, hasTransferTax: true,  isAttorneyState: false, medianHomeValue: 280000, homesteadExemption: 0,      titlePayer: 'buyer' },
  WY: { name: 'Wyoming',        abbr: 'WY', slug: 'wyoming',        propertyTaxRate: 0.61, transferTaxRate: 0,    hasTransferTax: false, isAttorneyState: false, medianHomeValue: 360000, homesteadExemption: 0,      titlePayer: 'buyer' },
}

export const STATE_LIST: StateInfo[] = Object.values(STATES).sort((a, b) => a.name.localeCompare(b.name))

export const STATE_PROPERTY_TAX_RATES: Record<string, number> =
  Object.fromEntries(Object.entries(STATES).map(([k, v]) => [k, v.propertyTaxRate]))

export const STATE_TRANSFER_TAX_RATES: Record<string, number> =
  Object.fromEntries(Object.entries(STATES).map(([k, v]) => [k, v.transferTaxRate]))

export const STATE_SLUGS: string[] = Object.values(STATES).map(s => s.slug)
