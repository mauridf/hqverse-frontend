'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, BookOpen, Star } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/shared/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data - será substituído por dados da API
const mockSeries = [
  {
    id: 1,
    name: 'Amazing Spider-Man',
    publisher: 'Marvel',
    startYear: 1963,
    endYear: null,
    totalIssues: 950,
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAd2-YR_9iuUAkITxqZVMNAJp35jdqAon5nbG44aR_aeXvTN6VWJDQmjUT3edke9ikPfWEXkeJI7OA2icgbH4EmHFqO-bmyRh7QlmrQOQZ-qnmhiNzpnq35LTN7X9JI2I7et1g5QPsNrvNqZEfG-pJ2qoP6lAAXDfftYPiAsFZv3utdI2B5TvZ-QyU107NplJU2vOPnKG51E8-zK3z1MrHmbQruaOdM6F5EBvpK7tOYsekPJgKSoA7WifcqYJA48LhyX4dW0wOGeo',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Batman',
    publisher: 'DC',
    startYear: 1940,
    endYear: null,
    totalIssues: 900,
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVdp0FNUeL9GbKcqVED7tsxki3Yq6WfJCqRMJoPD6_T-QRil-k1j7IomqcRwXPN1N-hFLY07e0NmlrqwfxvYa1vHnLSSv2i8nqi9rm4wXNR4Dn9YaDC9CwLd1-wYWulLN5W8qS5bzMcIih7kLOiYv8lrmESlIs-xq7Ug5BwxrSAg2S-FEymsVE3X9NpD3lnpcvya-hvISSqjPT0J1hpeVQ-GdBPd1ka_qFdexHQFGMOZCOB5hbfYwd1Hfw3eIfL-stwFLHw3fTp0w',
    status: 'Active',
  },
  {
    id: 3,
    name: 'X-Men',
    publisher: 'Marvel',
    startYear: 1963,
    endYear: null,
    totalIssues: 640,
    rating: 4.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfZBzbGDxBd24z6faNG7E_BRjNzXtAoyMIBcENkAzadYtwA85aRSZdI8zCHOixiXL0P1ChTNHb73NmfLj9fMfeRt0gpg_zBk3DVwiSvl0I5vXFqf-zv8s7txD-wt3qEX53EbRaFa5arHWhxkYNb1kraJwE6n6Njc4xzWzddWx1fLmRI9J7zSfzCAvLARy3nGclpRkFKuI_QRFOK8d5_YrbAohttdMJozDnF1FAR8i00g4CpH8LaO1dP_YhzQZxEqeYdzqxH7Jg2CI',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Wonder Woman',
    publisher: 'DC',
    startYear: 1941,
    endYear: null,
    totalIssues: 780,
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4TXoQJrEX05xx4n6cfHMto-pebEglTJSWCMnYGN0ctX6tLTBa1xrR7nFPIMO-jjNiS4KhMPmlgRLMg4TIPHpA1SfEpjgyAaazQoMPvSrHfp3_MVDMLvSq0rMBv8RFIXa43scVpA41ppK32aiB6HIPayIdNvQBYpXPaURFGLf7BDlIlj3UgncPd-OqOPCgcccb0fusqm1OB3mvyIDI3WoH1ezdGRZNiXoDx7e3x4s1rlGLz1vnfY032R6Ukh_t5hsQzxgmwDXykvM',
    status: 'Active',
  },
  {
    id: 5,
    name: 'The Walking Dead',
    publisher: 'Image',
    startYear: 2003,
    endYear: 2019,
    totalIssues: 193,
    rating: 4.5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6SeXaNGzutYY0Zc2UCGAULA8RZZ8rZB5a0i0TwSVXzTqCh6wgkccnAz0dvIB1YutTWExgHntWDChaJQlFvQwbjYD8RjFnan0TMb6KnTNDiRnDbMLQmleVjRaR8SycBxQqd-s7pn9cBXU5sXz2eyLIu-QBk9e8v5UGhzCaqbJZs_wYShAhJohWlriEwXPBHHPSJkK9Pf6FpWM0ufu_6Lnebnvjl5hvyFCl4S4BVm0_9NUEorGQtfZAQr1wEwszEuElpkLpnzdNPd8',
    status: 'Completed',
  },
  {
    id: 6,
    name: 'Spawn',
    publisher: 'Image',
    startYear: 1992,
    endYear: null,
    totalIssues: 350,
    rating: 4.3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw1u4KdcHjhOfJPPlVNS3THo2JABgOhqW019zwXAFGGh1xcdn7QeiXZPZMKtvmrLb4UoMYOqp6x1aSQTERxxutYQhynih05jpEZThB1YKCjvihdZ6QAfXEWtM9eGiqQH8yex6NBRZ-iYN3HmVuTiSX2o49C7-N6_RVNOMRI_BUfEI8a26tpj7q2wzG6ICLKcSjmGocibkFV_lbIGPt6C3Myjt6Gw1YWT0cMDjvQY36Vo2GF5LfrYxHlFt9OHdEaStnSS4vdvN3qfo',
    status: 'Active',
  },
];

export default function SeriesListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const totalItems = 125;

  const filteredSeries = mockSeries.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.publisher.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white p-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)] mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-xs">
                Publisher
              </label>
              <Select>
                <SelectTrigger className="bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary min-w-35">
                  <SelectValue placeholder="All Publishers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Publishers</SelectItem>
                  <SelectItem value="marvel">Marvel</SelectItem>
                  <SelectItem value="dc">DC</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="darkhorse">Dark Horse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-xs">
                Status
              </label>
              <Select>
                <SelectTrigger className="bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary min-w-35">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="hiatus">Hiatus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-xs">
                Sort By
              </label>
              <Select>
                <SelectTrigger className="bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary min-w-35">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="issues">Issues Count</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant font-body-md text-sm">
              {totalItems} séries encontradas
            </span>
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeries.map((series) => (
            <Link
              key={series.id}
              href={`/comic-series/${series.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden border border-outline-variant hover:shadow-[0_20px_40px_rgba(186,0,53,0.15)] hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-video overflow-hidden bg-primary">
                <Image
                  src={series.image}
                  alt={series.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <Badge className="bg-secondary text-white text-xs font-bold px-3 py-1">
                    {series.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-white">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{series.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-headline-md text-[20px] leading-tight text-primary group-hover:text-secondary transition-colors">
                  {series.name}
                </h3>
                <p className="text-on-surface-variant text-body-md mt-1">
                  {series.publisher}
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
            Showing 1 to {filteredSeries.length} of {totalItems} series
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
