export type CurrencyCode = 'INR' | 'USD';

export interface KpiMetric {
  value: string;
  label: string;
  context: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: string;
  shortDesc: string;
  featured: boolean;
  timeline: string;
  startingInr: string;
  startingUsd: string;
  deliverables: string[];
  outcomes: string;
}

export type CaseCategory = 'All Work' | 'Branding & Web' | 'Performance Ads' | 'Social & Video';

export interface CaseStudy {
  id: string;
  client: string;
  category: Exclude<CaseCategory, 'All Work'>;
  timeframe: string;
  headlineMetric: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  challenge: string;
  strategy: string;
  results: { label: string; value: string }[];
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyInr: number;
  monthlyUsd: number;
  popular?: boolean;
  turnaround: string;
  features: string[];
  ctaLabel: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  outcome: string;
}

export const KPI_METRICS: KpiMetric[] = [
  {
    value: '150+',
    label: 'Campaigns & Sites Shipped',
    context: 'Across D2C, SaaS & local leaders',
  },
  {
    value: '3.8x',
    label: 'Blended Paid ROAS',
    context: 'Verified across Meta & Google ad accounts',
  },
  {
    value: '90+',
    label: 'Active & Retained Brands',
    context: '89% 12-month client retention rate',
  },
  {
    value: '48h',
    label: 'Audit Turnaround',
    context: 'Actionable funnel & ad diagnostic',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'performance-ads',
    index: '01.',
    title: 'Performance Paid Ads',
    category: 'Meta · Google · YouTube',
    shortDesc:
      'Full-funnel Meta and Google Search campaigns engineered around lower cost-per-lead and profitable ROAS—never vanity impressions.',
    featured: true,
    timeline: 'Launch in 7 days',
    startingInr: '₹24,999/mo',
    startingUsd: '$399/mo',
    deliverables: [
      'Account structure & pixel/CAPI server-side tracking setup',
      'Weekly creative testing sprints (static hooks + UGC scripts)',
      'Keyword intent sculpting & negative-match hygiene on Google',
      'Live Looker Studio / WhatsApp weekly ROI digest',
    ],
    outcomes: 'Average 34% drop in cost-per-qualified-lead within the first 45 days of campaign stabilization.',
  },
  {
    id: 'conversion-web',
    index: '02.',
    title: 'Conversion Websites & Landing Pages',
    category: 'Design · Speed · CRO',
    shortDesc:
      'Thumb-friendly, fast-loading websites built specifically for Android mobile shoppers and B2B decision makers.',
    featured: true,
    timeline: '2–3 weeks delivery',
    startingInr: '₹35,000 one-time',
    startingUsd: '$590 one-time',
    deliverables: [
      'Mobile-first UX architecture (< 1.8s LCP on 4G Android)',
      'High-contrast conversion copywriting & objection-handling flow',
      'WhatsApp, Razorpay / Stripe & CRM webhook integrations',
      'Technical SEO schema, analytics & heatmap event tracking',
    ],
    outcomes: 'Replaces slow brochure templates with structured buyer journeys that convert 2x–3x more traffic.',
  },
  {
    id: 'brand-identity',
    index: '03.',
    title: 'Brand Identity & Packaging',
    category: 'Logo · Guidelines · Print',
    shortDesc:
      'Distinctive visual systems, typography, and packaging that command higher perceived value on shelves and feeds.',
    featured: false,
    timeline: '10–14 days',
    startingInr: '₹19,999',
    startingUsd: '$349',
    deliverables: [
      'Primary wordmark, icon mark & responsive lockups',
      'Color architecture, font pairing & social templates',
      'Print-ready packaging dielines & pitch deck system',
    ],
    outcomes: 'Gives emerging Indian and global brands an unmistakable flagship presence from day one.',
  },
  {
    id: 'social-video',
    index: '04.',
    title: 'Reels & Social Content Engine',
    category: 'Instagram · LinkedIn · Shorts',
    shortDesc:
      'Scroll-stopping short-form video, retention editing, and founder positioning built to turn followers into inbound inquiries.',
    featured: false,
    timeline: 'Ongoing monthly sprint',
    startingInr: '₹18,999/mo',
    startingUsd: '$299/mo',
    deliverables: [
      'Monthly content calendar & hook scripting',
      '12–20 edited Reels/Shorts with motion captions',
      'Carousel frameworks & DM automation triggers',
    ],
    outcomes: 'Consistent organic reach compounding alongside your paid acquisition funnels.',
  },
  {
    id: 'seo-organic',
    index: '05.',
    title: 'Local & Technical SEO',
    category: 'Search · Maps · Authority',
    shortDesc:
      'Rank for high-intent local and commercial search terms so buyers find your business before your competitors.',
    featured: false,
    timeline: '90-day compound sprint',
    startingInr: '₹16,999/mo',
    startingUsd: '$279/mo',
    deliverables: [
      'Google Business Profile optimization & review velocity',
      'High-intent service & comparison landing pages',
      'Core Web Vitals tuning & clean internal linking',
    ],
    outcomes: 'Builds durable, zero-ad-spend inbound traffic month over month.',
  },
  {
    id: 'cro-retention',
    index: '06.',
    title: 'WhatsApp & Email Retention',
    category: 'Flows · CRM · Repeat Sales',
    shortDesc:
      'Automated WhatsApp broadcasts and cart-recovery sequences that turn one-time leads into repeat customers.',
    featured: false,
    timeline: '10-day setup',
    startingInr: '₹14,999',
    startingUsd: '$249',
    deliverables: [
      'WhatsApp Business API welcome & cart recovery flows',
      'Lead qualification bot & instant calendar booking',
      'Post-purchase upsell & review collection sequences',
    ],
    outcomes: 'Recovers 18–26% of abandoned checkouts and dormant inquiries automatically.',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-botanicals',
    client: 'Veda & Co. Botanicals',
    category: 'Branding & Web',
    timeframe: '10 Weeks · D2C Skincare',
    headlineMetric: '+162% Mobile Checkout Conversion',
    title: 'Rebuilding a heritage skincare line for fast Android D2C shopping',
    summary:
      'Redesigned visual packaging, product photography direction, and a sub-2-second mobile storefront with one-tap UPI checkout.',
    image: '/src/assets/images/case_d2c_skincare_1794905992218.jpg',
    imageAlt: 'Amber glass botanical skincare bottles arranged on dark basalt stone',
    challenge:
      'Traffic from Instagram was bouncing on a sluggish 6-second storefront where shade/skin-type selection felt cramped on mobile screens.',
    strategy:
      'We stripped away heavy sliders, designed a minimalist thumb-first product selector, elevated packaging visuals, and wired automated WhatsApp COD verification.',
    results: [
      { label: 'Checkout Rate', value: '1.3% → 3.4%' },
      { label: 'Mobile Load Time', value: '1.6s LCP' },
      { label: 'Repeat Order Share', value: '38% in 60d' },
    ],
  },
  {
    id: 'kinetix-wealth',
    client: 'ArthaLedger Fintech',
    category: 'Performance Ads',
    timeframe: '90 Days · B2C App & Web',
    headlineMetric: '4.2x ROAS on ₹42L Monthly Spend',
    title: 'Scaling qualified advisor consultations through intent-led Meta & Search ads',
    summary:
      'Replaced broad interest targeting with segmented problem-aware video hooks and a pre-qualifying 3-step lead form.',
    image: '/src/assets/images/case_fintech_ads_1794905993146.jpg',
    imageAlt: 'Smartphone displaying financial portfolio growth interface on dark slate desk',
    challenge:
      'Previous campaigns brought cheap clicks but less than 12% of leads answered sales calls or met minimum investment criteria.',
    strategy:
      'Implemented server-side Conversions API, gated the consultation form with smart qualification questions, and rebuilt Google Search around high-intent comparison queries.',
    results: [
      { label: 'Blended ROAS', value: '4.2x Verified' },
      { label: 'Qualified Call Rate', value: '12% → 54%' },
      { label: 'Cost Per Qualified Lead', value: '-41% Reduction' },
    ],
  },
  {
    id: 'roast-house-social',
    client: 'Kala Ghoda Roasters',
    category: 'Social & Video',
    timeframe: '6 Months · Hospitality',
    headlineMetric: '2.8M Organic Views & +46% Footfall',
    title: 'Turning behind-the-scenes craft Reels into weekend café bookings',
    summary:
      'Produced crisp 35mm-styled short-form founder & barista stories paired with geo-fenced local discovery ads.',
    image: '/src/assets/images/case_hospitality_reels_1794905992759.jpg',
    imageAlt: 'Commercial video production crew filming espresso pour inside a warm roastery cafe',
    challenge:
      'Strong offline word-of-mouth but flat weekday awareness among nearby office crowds and younger specialty coffee audiences.',
    strategy:
      'Shot two batch production days per month focused on 3-second sensory hooks, paired with hyper-local 5km radius Instagram promo boosts for seasonal launches.',
    results: [
      { label: 'Organic Reel Reach', value: '2.8M Views' },
      { label: 'Weekend Footfall', value: '+46% YoY' },
      { label: 'Bean Subscription Leads', value: '640+ Signups' },
    ],
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Launch Foundation',
    tagline: 'For local businesses & early brands building credible online momentum.',
    monthlyInr: 14999,
    monthlyUsd: 249,
    turnaround: 'Kickoff in 72 hours',
    features: [
      '12 branded social posts & Reels edits per month',
      'Instagram, Facebook & Google Profile management',
      'Meta lead-gen campaign setup (up to ₹25k ad spend)',
      'Monthly growth scorecard & strategy check-in',
      'Direct WhatsApp support channel',
    ],
    ctaLabel: 'Choose Launch Plan',
  },
  {
    id: 'growth',
    name: 'Growth Accelerator',
    tagline: 'Our flagship system for brands ready to scale leads, ROAS, and conversion.',
    monthlyInr: 29999,
    monthlyUsd: 499,
    popular: true,
    turnaround: 'Dedicated strategist + creative pod',
    features: [
      '20 high-retention creatives (Reels, statics & ad variations)',
      'Full Meta Ads + Google Search campaign management',
      '1 custom high-converting landing page per quarter',
      'Server-side Pixel / CAPI & WhatsApp lead routing',
      'Bi-weekly creative testing & ROI optimization calls',
    ],
    ctaLabel: 'Choose Growth Plan',
  },
  {
    id: 'scale',
    name: 'Scale Partner',
    tagline: 'Embedded full-stack marketing, CRO, and multi-channel media buying.',
    monthlyInr: 54999,
    monthlyUsd: 899,
    turnaround: 'Priority 24h creative SLA',
    features: [
      'Unlimited ad creative iterations & UGC direction',
      'Omnichannel Meta, Google, YouTube & LinkedIn Ads',
      'Continuous website CRO, A/B testing & retention flows',
      'Custom Looker Studio live revenue dashboard',
      'Weekly executive growth sync with founders',
    ],
    ctaLabel: 'Choose Scale Plan',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Before Shivay Digital, our Meta ads burned budget on tire-kickers. Within six weeks they rebuilt our landing page for mobile users and cut our cost per qualified consultation by 41%.',
    author: 'Raghavendra Kulkarni',
    role: 'Co-Founder',
    company: 'ArthaLedger Fintech',
    outcome: '54% qualified call rate',
  },
  {
    id: 't2',
    quote:
      'Most agencies send pretty decks and slow sites. Shivay obsessed over how our skincare checkout felt on a mid-range Android phone—our mobile conversion more than doubled.',
    author: 'Ananya Deshmukh',
    role: 'Founder',
    company: 'Veda & Co. Botanicals',
    outcome: '1.3% → 3.4% checkout rate',
  },
  {
    id: 't3',
    quote:
      'Their production days are effortless. One afternoon of filming turned into two months of sharp Reels that actually brought new neighborhood customers through our doors.',
    author: 'Kabir Merchant',
    role: 'Managing Partner',
    company: 'Kala Ghoda Roasters',
    outcome: '+46% weekend footfall',
  },
];
