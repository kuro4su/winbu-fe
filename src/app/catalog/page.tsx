import type { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
    title: 'Catalog - Bellonime',
    description: 'Browse our extensive catalog of anime, films, and series.',
    openGraph: {
        title: 'Catalog - Bellonime',
        description: 'Browse our extensive catalog of anime, films, and series.',
    },
};

export default function CatalogPage() {
    return <CatalogClient />;
}
