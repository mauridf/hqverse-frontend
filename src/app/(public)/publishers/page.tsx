'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, Users, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/shared/Pagination';

// Mock data - será substituído por dados da API
const mockPublishers = [
  {
    id: 1,
    name: 'Marvel',
    country: 'USA',
    characterCount: '8,000+',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsBT4-9hXKJY9PC7r-LVjPWKF_aSJihyPGxuNuFDLvbWGAFfh5Bq28Iw1rXOaaGwxQzq5QOyFZ_BeO6yYnqliIvUvFTnDOnwZkH0vfJrbRCfxFH36XWa2RhYVjYur3beUdBZzL2ZSETHU1gkC0mCSq_mxnmhShrsKJyvXpGO0bZSAo2AivDthd9BRHmNAbjTxder065G8RH5Xe8mUAQX7D7zwrIjFM6Qhs6oLrrhMaOKLZ8tsBtjq8ectYGmeMQJYNM_8tyfCga1M',
    slug: 'marvel',
  },
  {
    id: 2,
    name: 'DC',
    country: 'USA',
    characterCount: '10,000+',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXOMMNMY5jlyR4Zk8wO2DOi8ePN8ivqcxDCmR6paReuNsYopNlcwX8xDR8das0s8zNH6TqVKuekVKxmEI-aYcc3uWxe9mUpUXE7Yn8CIdDApeu97DU3WRBPLthvirol2JCApmxCqkOcS0xebDvjBUqXIAo2n7Y3HRzUZsn0heJF2l-Rh4hKXbxLLYfFt879YTJh9g1hSRJ-dyE1jKvKogpK12hV94KVd4CXRGzBOpdOvZAICEJid4v3Ic-kU9HgW5j3y5ciSxA8U0',
    slug: 'dc',
  },
  {
    id: 3,
    name: 'Panini',
    country: 'Brasil',
    characterCount: '2,500+',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRp4MI5GwPgGfbSnHhAhlMJjsbkDt_qZ7fcdqjqBbiqHs7Lc--1FYEwcf7s3liAQOPKoKXyN2EZ2STMnzY2ilK1RUazi3IaIoq3VBrBOFW1i44NG4dfIw82qJMIfwwuUG8CPpEOFjBnWMi-dxOiyv9xXuSWrrAaYHk6hokOyAkwHslbhFye7DzWmfIBzQM619UKz1DlMNnC73kJoMzN2HXSH_JlaBZliY4SXW_wQ2fdeVCnkjSHUWIWNpp6xXxTs5Qajd9_QfVk90',
    slug: 'panini',
  },
  {
    id: 4,
    name: 'Image',
    country: 'USA',
    characterCount: '1,200+',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3PtCMn9riiQz4FXOpqzPl8PnIuloLj6g9dnQBdhpOs_zhCr0d5S5mxmYh0rcBX_G9MYIoVfkTCvYBcRAoYO_QvTg_eCpxsc5mJYuNhedrURV-cTswwq3YUa-pAHHSNsE7pdEDNCrXDV97xOx_m-7x6Tt8liI3QQvzzZt5HloIx4-6s4V2-HJPosRI2b3QL8AJEbWsXBs_ZrxW2uz8jcntH45J7TswREiC5LMMAbgJuuNy6eUJyRea3oNux-vO7qVn5B-Q-I0ar90',
    slug: 'image',
  },
  {
    id: 5,
    name: 'Dark Horse',
    country: 'USA',
    characterCount: '900+',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgl7IEc-BttSmYZMeuwpBtTTYh1dTZjNYfY8gH1kFWtOtFxbnf2gVTTk94L5xGDEN8tNGfyx0hU8q6zsskaSQYZYNaUpteHH_6GwyPUpQdwr0mJkvjrVbVHX3CKK_6UAVa1BBNvvzpNiHwLSYWVmOAP7OnEKJYdkL3GeUBxlgHCKsF1Q6zftYaHxqfOlcjobKJZ7ZjdwtvY3lBLCdwCnrufrKxJjksEjwAFc8FWMqpqbhFUMlnHBDML6IBhU918nU3hJdpfEw_Uk8',
    slug: 'darkhorse',
  },
  {
    id: 6,
    name: 'Abril',
    country: 'Brasil',
    characterCount: '3,000+',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdrAMZwzcojd3YcbgWqALTSa05g7t-ImNcvVP5JTDQueLz5BxYcvkvui6jAADnPjxzymIMwk2nyhf62pFaf6F_GhCIqWMp4HrARGF0g2Ddbq6eUxWfW-THk2foU1JlCidXN_hO4yHUuqKwlzAZQUG1hpa9XQ5xW8zWpPD7qTqTunGFStcQZwAuw9S0p_Psz3AAmxJUFWUPhu_MtuEoPFUJJ6KJl_GP2B-Dl8YoqC5BIf8fLEmsxYTeDOt9LYF67fqcecs-YwhMWSc',
    slug: 'abril',
  },
];

export default function PublishersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const totalItems = 24;

  const filteredPublishers = mockPublishers.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredPublishers.map((publisher) => (
            <Link
              key={publisher.id}
              href={`/publishers/${publisher.slug}`}
              className="group relative bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.12)] overflow-hidden transition-all border border-outline-variant/20 hover:shadow-[0_20px_40px_rgba(186,0,53,0.15)] hover:-translate-y-1"
            >
              <div className="aspect-video w-full overflow-hidden bg-primary relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] opacity-10 text-white pointer-events-none" />
                <Image
                  src={publisher.logo}
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
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md mb-3">
                  <Users className="h-4 w-4" />
                  <span>{publisher.characterCount} Characters</span>
                </div>
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
            Showing 1 to {filteredPublishers.length} of {totalItems} publishers
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
