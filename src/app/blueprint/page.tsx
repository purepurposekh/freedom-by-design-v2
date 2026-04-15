import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import BlueprintClient from './BlueprintClient';

export default async function BlueprintPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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
    redirect(query ? `/blueprint?${query}` : '/blueprint');
  }

  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Loading blueprint...</div>}>
      <BlueprintClient />
    </Suspense>
  );
}
