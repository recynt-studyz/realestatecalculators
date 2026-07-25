type CTAVariant = 'buyer' | 'investor' | 'seller'

interface Props {
  variant?: CTAVariant
}

const CTA_CONTENT: Record<CTAVariant, {
  headline: string
  body: string
  buttonText: string
}> = {
  buyer: {
    headline: 'Ready to compare mortgage rates?',
    body: 'Compare rates from 500+ lenders. Free, no obligation, no credit score impact. Get pre-approved in minutes.',
    buttonText: 'Compare Rates Free →',
  },
  investor: {
    headline: 'Analyze real estate deals faster with DealCheck',
    body: 'The #1 real estate investment analysis app. Run cap rate, cash-on-cash, ROI and flip analysis in seconds. Free trial, no credit card required.',
    buttonText: 'Try DealCheck Free →',
  },
  seller: {
    headline: 'Find a top real estate agent in your area',
    body: 'Compare top-rated local agents with proven sales records. Free service, no obligation. Sell faster and for more.',
    buttonText: 'Find My Agent →',
  },
}

export default function AffiliateCTA({ variant = 'buyer' }: Props) {
  const { headline, body, buttonText } = CTA_CONTENT[variant]
  return (
    <div className="rounded-2xl bg-[#166534] p-6 my-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">{headline}</h3>
        <p className="text-sm text-green-100 mb-4 max-w-md mx-auto leading-relaxed">{body}</p>
        <a
          href="#"
          className="inline-block bg-white text-[#166534] font-bold px-8 py-3 rounded-xl hover:bg-green-50 transition text-sm"
        >
          {buttonText}
        </a>
        <p className="text-xs text-green-200 mt-3">
          We may earn compensation when you connect with services through this site.
        </p>
      </div>
    </div>
  )
}
