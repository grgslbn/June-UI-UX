// JSON-LD @graph builders (seo-tech-strategy §3). One graph per page. No AggregateRating (policy, §3.4).
import { abs, SITE } from '@shared/routes.mjs';
import facts from '@shared/content/facts.json';
type Locale = 'nl-be' | 'fr-be';
const lang = (l: Locale) => (l === 'nl-be' ? 'nl-BE' : 'fr-BE');
const ORG = `${SITE}#org`;

export function graph(o: { locale: Locale; routeKey: string; title: string; crumbs?: { name: string; key: string }[]; extra?: object[] }) {
  const url = abs(o.routeKey, o.locale);
  const L = o.locale === 'nl-be' ? 'nl' : 'fr';
  const nodes: any[] = [
    { '@type': 'Organization', '@id': ORG, name: 'June', legalName: 'June Energy', url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}logo-512.png`, width: 512, height: 512 },
      description: (facts.brand.descriptor as any)[L], areaServed: { '@type': 'Country', name: 'BE' },
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['nl', 'fr'] } },
    { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: 'June', publisher: { '@id': ORG }, inLanguage: ['nl-BE', 'fr-BE'] },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: o.title, inLanguage: lang(o.locale), isPartOf: { '@id': `${SITE}#website` },
      ...(o.crumbs ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}) },
  ];
  if (o.crumbs) nodes.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
    itemListElement: o.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.key, o.locale) })) });
  return { '@context': 'https://schema.org', '@graph': [...nodes, ...(o.extra || [])] };
}

export function productNode(slug: string, locale: Locale) {
  const p = (facts.plans as any[]).find(x => x.slug === slug);
  const L = locale === 'nl-be' ? 'nl' : 'fr';
  const planUrl = abs('plans', locale);
  const signup = `${abs('signup', locale)}?plan=${slug}`;
  return {
    '@type': 'Product', '@id': `${planUrl}#${slug}`, name: p.name, category: 'Energy switching service', brand: { '@id': ORG },
    description: p.valueProposition[L],
    offers: { '@type': 'Offer', url: signup, price: p.priceYearly.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock',
      eligibleRegion: { '@type': 'Country', name: 'BE' }, seller: { '@id': ORG },
      priceSpecification: [
        { '@type': 'UnitPriceSpecification', price: p.priceYearly.toFixed(2), priceCurrency: 'EUR', valueAddedTaxIncluded: true,
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'ANN' }, billingDuration: 'P1Y' },
        { '@type': 'UnitPriceSpecification', price: p.priceMonthly.toFixed(2), priceCurrency: 'EUR', valueAddedTaxIncluded: true,
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' }, priceType: 'https://schema.org/ListPrice',
          description: L === 'nl' ? 'Maandelijks equivalent, jaarlijks gefactureerd' : 'Équivalent mensuel, facturé annuellement' },
      ] },
  };
}

export const faqNode = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage', mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
