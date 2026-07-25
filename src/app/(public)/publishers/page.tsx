'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/shared/Pagination';
import { usePublishers } from '@/lib/hooks/useData';

export default function PublishersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: publishersData, isLoading } = usePublishers({ search: searchQuery || undefined, page: currentPage });

  const publishers = publishersData?.items ?? [];
  const totalItems = publishersData?.totalCount ?? 0;
  const totalPages = publishersData?.totalPages ?? 1;

  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 mb-4 text-on-surface-variant text-label-sm">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span className="text-sm">›</span>
          <span className="text-secondary font-bold">Editoras</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">
              Explore the Multi-Verse
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Discover the legendary publishers shaping the narrative of heroes and villains across the globe.
            </p>
          </div>
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
            <Input
              type="text"
              placeholder="Find a publisher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all"
            />
          </div>
        </div>

        {/* Publishers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {isLoading && (
            <div className="col-span-full text-center py-10 text-on-surface-variant">Carregando editoras...</div>
          )}
          {!isLoading && publishers.length === 0 && (
            <div className="col-span-full text-center py-10 text-on-surface-variant">Nenhuma editora encontrada.</div>
          )}
          {publishers.map((publisher) => (
            <Link
              key={publisher.id}
              href={`/publishers/${publisher.id}`}
              className="group relative bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.12)] overflow-hidden transition-all border border-outline-variant/20 hover:shadow-[0_20px_40px_rgba(186,0,53,0.15)] hover:-translate-y-1"
            >
              <div className="aspect-video w-full overflow-hidden bg-primary relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] opacity-10 text-white pointer-events-none" />
                <Image
                  src={publisher.logoUrl ?? ''}
                  alt={publisher.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-headline-md text-headline-md text-primary">
                    {publisher.name}
                  </h3>
                  <Badge variant="secondary" className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full">
                    {publisher.country}
                  </Badge>
                </div>
                {publisher.description && (
                  <p className="text-on-surface-variant font-body-md mb-3 line-clamp-2">{publisher.description}</p>
                )}
                <div className="inline-flex items-center gap-2 font-label-heroic text-label-heroic text-secondary group-hover:gap-3 transition-all">
                  VIEW ROSTER
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-outline-variant">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Showing 1 to {publishers.length} of {totalItems} publishers
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
