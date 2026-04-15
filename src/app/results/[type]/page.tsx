import { redirect } from 'next/navigation';
import ResultsClient from './ResultsClient';

// Pre-generate all 5 type pages at build time
export function generateStaticParams() {
  return [
    { type: 'manifestor' },
    { type: 'generator' },
    { type: 'manifesting-generator' },
    { type: 'projector' },
    { type: 'reflector' },
  ];
}

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await params;
  const resolvedSearchParams = await searchParams;

  if (Object.prototype.hasOwnProperty.call(resolvedSearchParams, 'data')) {
    const nextSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (key === 'data' || value == null) continue;
      if (Array.isArray(value)) {
        for (const item of value) {
          nextSearchParams.append(key, item);
        }
        continue;
      }
      nextSearchParams.set(key, value);
    }

    const query = nextSearchParams.toString();
    redirect(query ? `/results/${type}?${query}` : `/results/${type}`);
  }

  return <ResultsClient typeSlug={type} />;
}
