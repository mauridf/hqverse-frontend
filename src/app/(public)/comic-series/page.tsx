'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/shared/Pagination';
import { useSeries } from '@/lib/hooks/useData';

export default function SeriesListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: seriesData, isLoading } = useSeries({ search: searchQuery || undefined, page: currentPage });

  const series = seriesData?.items ?? [];
  const totalItems = seriesData?.totalCount ?? 0;
  const totalPages = seriesData?.totalPages ?? 1;

  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 mb-4 text-on-surface-variant text-label-sm">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span className="text-sm">›</span>
          <span className="text-secondary font-bold">Séries</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-2">
              Explore as Séries
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Descubra as séries mais icônicas da história dos quadrinhos.
            </p>
          </div>
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
            <Input
              type="text"
              placeholder="Buscar séries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all"
            />
          </div>
        </div>



        {/* Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
            <div className="col-span-full text-center py-10 text-on-surface-variant">Carregando séries...</div>
          )}
          {!isLoading && series.length === 0 && (
            <div className="col-span-full text-center py-10 text-on-surface-variant">Nenhuma série encontrada.</div>
          )}
          {series.map((series) => (
            <Link
              key={series.id}
              href={`/comic-series/${series.id}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden border border-outline-variant hover:shadow-[0_20px_40px_rgba(186,0,53,0.15)] hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-video overflow-hidden bg-primary">
                <Image
                  src={series.imageUrl ?? ''}
                  alt={series.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="font-headline-md text-[20px] leading-tight text-primary group-hover:text-secondary transition-colors">
                  {series.name}
                </h3>
                <p className="text-on-surface-variant text-body-md mt-1">
                  {series.publisher?.name ?? ''}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant">
                  <span className="text-label-sm text-on-surface-variant">
                    {series.startYear} {series.endYear ? `- ${series.endYear}` : '• Ongoing'}
                  </span>
                  <span className="flex items-center gap-1 text-label-sm font-medium">
                    <BookOpen className="h-3 w-3" />
                    {series.totalIssues} issues
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-outline-variant">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Showing 1 to {series.length} of {totalItems} series
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
