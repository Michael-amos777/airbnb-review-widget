import { DemoReviewProvider } from './demoProvider';
import { ExternalPmsReviewAdapter } from './pmsAdapter';
import { ReviewProviderAdapter } from './types';

export * from './types';
export * from './demoProvider';
export * from './pmsAdapter';

const demoProvider = new DemoReviewProvider();
const pmsProvider = new ExternalPmsReviewAdapter();

const adapterRegistry = new Map<string, ReviewProviderAdapter>();
adapterRegistry.set(demoProvider.id, demoProvider);
adapterRegistry.set(pmsProvider.id, pmsProvider);

/**
 * Get configured review provider adapter
 */
export function getReviewProvider(providerId = 'demo-adapter'): ReviewProviderAdapter {
  const provider = adapterRegistry.get(providerId);
  if (!provider) {
    return demoProvider;
  }
  return provider;
}

/**
 * List all available adapters for settings UI
 */
export function getAvailableAdapters(): Array<{
  id: string;
  name: string;
  description: string;
  isDemonstration: boolean;
}> {
  return Array.from(adapterRegistry.values()).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    isDemonstration: p.isDemonstrationProvider,
  }));
}
