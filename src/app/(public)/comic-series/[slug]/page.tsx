'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Calendar,
  BookOpen,
  Star,
  Heart,
  Play,
  Grid,
  List,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pagination } from '@/components/shared/Pagination';

interface MockIssue {
  number: string;
  title: string;
  year: number;
  rating: number;
  image: string;
}

interface MockSeries {
  id: number;
  name: string;
  publisher: string;
  startYear: number;
  endYear: number | null;
  totalIssues: number;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  cover: string;
  tags: string[];
  issues: MockIssue[];
}

// Mock data - será substituído por dados da API
const mockSeriesData: Record<string, MockSeries> = {
  'amazing-spider-man': {
    id: 1,
    name: 'Amazing Spider-Man',
    publisher: 'Marvel',
    startYear: 1963,
    endYear: null,
    totalIssues: 900,
    rating: 4.9,
    reviewCount: 24000,
    description: 'Follow the adventures of Peter Parker, a high school student who gained super-powers after being bitten by a radioactive spider. This legendary series has defined comic book history for over six decades.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0LqJv8mKt1kXsntt8zBdB3mtkwA8IZjGPDdoeqBQElf6TloGE00nWo2RuWMGy-22gAEYJDLbPQMOEn8mniliWNrbM-nSmbsN07R-9m48esJoyXotVLWZ3yDrPbsveUeOdzj9g5eJCcxIrK2_iG2RH7wg_3NhzqlbneIjdZ46aS-1Al9Fs54XnJvVk6Pi4euwRbpTnYkCEKLdhc3N5l0BlSm5Zrs2IKqFTwugbmPrQo3oJbzVFnpJn0Qv2DMPGTLoGCkq_Xoclln8',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0LqJv8mKt1kXsntt8zBdB3mtkwA8IZjGPDdoeqBQElf6TloGE00nWo2RuWMGy-22gAEYJDLbPQMOEn8mniliWNrbM-nSmbsN07R-9m48esJoyXotVLWZ3yDrPbsveUeOdzj9g5eJCcxIrK2_iG2RH7wg_3NhzqlbneIjdZ46aS-1Al9Fs54XnJvVk6Pi4euwRbpTnYkCEKLdhc3N5l0BlSm5Zrs2IKqFTwugbmPrQo3oJbzVFnpJn0Qv2DMPGTLoGCkq_Xoclln8',
    tags: ['Most Read', 'Action'],
    issues: [
      { number: '001', title: 'Spider-Man No More!', year: 1963, rating: 4.9, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQAX9US_LfaLQVA7V-EbSE8ss8LhLPKF4xv6Q5FA0AgoxpLscM2XgTc1eMCUebVhFG9t-PlBQ2gmxIgkXFhQVTSdYVBuA1erjN08Hr6xM8Bbue9yuWxu5yUIg9d3fivPCUMF5_UjXWsEq2zSVC6xHnywaiRigqDFcq-4P7CWL9Ww03nZA5_Hk1D634wscasp5asmTsl-SRt2_CcbfeRedO4tHLdaFG9s8ZEECdSzJ5ni1bRoex63AN42ZWJ12FOM1k9j8Gz8OK8v4' },
      { number: '129', title: 'The Punisher Strikes!', year: 1974, rating: 5.0, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoWHHIinJly7HHl_nAQEtGS8-C25hTKuScS_Rk3y2cuix2LhxOr0hFNSHUiqPIcjusRqdC0DGaKSvdCsrx0IBW-hhc6dd_h-vcccO8f7UHgCxDKTXUkJFRwCp_Hx3eeqxwy7bAI-m4qNXVbprgCG_PhF5_qgu9EUmyb3ewX198dEkX-3Dng-tvnxP-RXoK90Yk35EktNZj74etUxNdesSQ66BHxVpMkbPopj6mE6BMTciD2kK8Hup-LqTUELuov7z_-v3QEShtjsc' },
      { number: '252', title: 'Homecoming!', year: 1984, rating: 4.8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSYER1YBVfpY2xfy5lmwDwH8CELVA40jPhGPnC6ook9w53riNMV9d3KWwrTGuJ51kvT2epZjAPgE1u4ZeimCROlC553DM93goQktTdgRrSG5DFeEFpL41QIw6ji4T4bP0nRdgAuJKcoo0iMFwJQ0pEHtM32U0aGUFRYbE7UuqCZ3i_Gby_l-dA-JiAJsKt3I8J6fG0pUEhoDfNsr5_ycl6mWLf8SB2-rEmRjN6M46OZqfXcWrRmltYNL3eD7cedU-js9-Hh0XLG9Y' },
      { number: '800', title: 'Go Down Swinging', year: 2018, rating: 4.7, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsWW9UIIpnBZz7SYD5NbGokV9d18lZr-Y6uls4hc5R_UyqBKAuQLqwYjhOrey703GJ-mASusjKESIMJZ7KlBsjzGxcwH8D1L-G9zdyfIA0Flhvlc9mtAsPnYyizTtWQCHAOqZ25FOoasWpb7d2MSJLpMD-DZjQv8LcT71Z2Bo6MPyVzusEwH-HTiUDT6Zd2Y8ujpPm8IYkuHsJb1lcsfBVuNG_q9ZP_H6n-Na7LuHMscLOAbO2vAjAX6x4cTLh78EjDxXwUhKuDlI' },
      { number: '900', title: 'Legacy Reborn', year: 2024, rating: 4.9, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH2mbZLbf91A061S-0uTt4PoKI_d3E07Pvg6JM5yFGf3uITq9nhoLu8C6DJZxIoPi9MPHfbjXDVfD1puNnxibEwmaQn1jRaFy6TrKZNZ5U-ANl--2hvtUC08TcJaO4LtdVueXbhmUWWG-8h3gSozq-Pn3C081vdylED3DPyAdGInbFmlVJIOuLlEJVPwZLD8odTfi54FyiJAwj1C6210OQtky8cGFkJKXNf0CAt5D164sdo7EK-ZegaPakT42jGcS8Yl4GVIs-mRs' },
    ],
  },
};

export default function SeriesDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const series = mockSeriesData[slug];
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 75;

  if (!series) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Série não encontrada</h1>
            <p className="text-muted-foreground">A série que você procura não existe.</p>
            <Button asChild className="mt-4">
              <Link href="/comic-series">Voltar para séries</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 mb-6 text-on-surface-variant text-label-sm overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span className="text-sm">›</span>
          <Link href="/comic-series" className="hover:text-secondary transition-colors">Séries</Link>
          <span className="text-sm">›</span>
          <span className="text-primary font-bold">{series.name}</span>
        </nav>

        {/* Header Hero */}
        <section className="relative rounded-xl overflow-hidden bg-primary text-on-primary p-6 md:p-10 mb-8">
          <div className="absolute inset-0 z-0 opacity-30">
            <div 
              className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ backgroundImage: `url(${series.image})` }}
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent z-0" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            {/* Cover */}
            <div className="md:col-span-3">
              <div className="shadow-[0_10px_20px_rgba(0,0,0,0.12)] rounded-xl overflow-hidden aspect-2/3 border-4 border-on-primary/20">
                <Image
                  src={series.cover}
                  alt={series.name}
                  width={300}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-9 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                  Most Read
                </Badge>
                <Badge className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs">
                  Action
                </Badge>
              </div>

              <h1 className="font-display-hero text-4xl md:text-6xl leading-none">
                {series.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-on-primary/80">
                <div className="flex items-center gap-1">
                  <span className="text-secondary">◆</span>
                  <span className="font-bold">{series.publisher}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{series.startYear} {series.endYear ? `- ${series.endYear}` : '• Ongoing'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{series.totalIssues} Issues</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{series.rating}</span>
                  <span className="text-xs opacity-70">({series.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>

              <p className="max-w-2xl text-body-lg text-on-primary/70 mt-2">
                {series.description}
              </p>

              <div className="flex gap-4 mt-4">
                <Button className="bg-secondary text-on-secondary font-label-heroic px-8 py-6 rounded-xl shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  START READING #001
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`border-2 border-on-primary/30 text-on-primary font-label-heroic px-8 py-6 rounded-xl hover:bg-on-primary/10 transition-all flex items-center gap-2 ${
                    isFollowing ? 'bg-on-primary/20' : ''
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFollowing ? 'fill-secondary text-secondary' : ''}`} />
                  {isFollowing ? 'FOLLOWING' : 'FOLLOW SERIES'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white p-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)] mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-xs">
                Filter by Year
              </label>
              <Select>
                <SelectTrigger className="bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary min-w-35">
                  <SelectValue placeholder="All Eras" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Eras</SelectItem>
                  <SelectItem value="silver">Silver Age (1963-70)</SelectItem>
                  <SelectItem value="modern">Modern Age (2000+)</SelectItem>
                  <SelectItem value="recent">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-xs">
                Rating
              </label>
              <Select>
                <SelectTrigger className="bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary min-w-35">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="45">4.5+ Stars</SelectItem>
                  <SelectItem value="40">4.0+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant uppercase tracking-widest text-xs">
                Availability
              </label>
              <div className="flex items-center gap-2 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" />
                  <span className="ml-2 font-body-md">Scans Only</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <span className="text-on-surface-variant font-body-md text-sm">
              {series.totalIssues} issues found
            </span>
            <div className="flex gap-1">
              <Button variant="default" size="sm" className="bg-primary text-on-primary p-2 rounded-lg hover:bg-secondary transition-colors h-9 w-9">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-surface-container-high text-on-surface-variant p-2 rounded-lg hover:bg-outline-variant transition-colors h-9 w-9">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {series.issues.map((issue: MockIssue, index: number) => (
            <Link
              key={index}
              href={`/comic-issues/${issue.number}`}
              className="group cursor-pointer"
            >
              <div className="relative shadow-[0_10px_20px_rgba(0,0,0,0.12)] rounded-lg overflow-hidden aspect-2/3 mb-2 bg-surface-container-highest transition-transform duration-300 group-hover:-translate-y-2">
                <Image
                  src={issue.image}
                  alt={`Issue #${issue.number}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-primary/90 text-on-primary font-label-sm px-2 py-0.5 rounded text-xs">
                  #{issue.number}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
                  <Button size="sm" className="bg-secondary text-on-secondary p-1 rounded-full h-8 w-8">
                    <Play className="h-4 w-4" />
                  </Button>
                  <span className="text-on-primary font-label-sm text-xs">Read Now</span>
                </div>
              </div>
              <h3 className="font-bold text-body-md line-clamp-1 group-hover:text-secondary transition-colors">
                {issue.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-on-surface-variant text-label-sm">{issue.year}</span>
                <span className="flex items-center text-secondary text-label-sm">
                  <Star className="h-3 w-3 mr-0.5 fill-secondary text-secondary" />
                  {issue.rating}
                </span>
              </div>
            </Link>
          ))}

          {/* View More Card */}
          <div className="group cursor-pointer">
            <div className="shadow-[0_10px_20px_rgba(0,0,0,0.12)] rounded-lg overflow-hidden aspect-2/3 mb-2 bg-surface-variant flex flex-col items-center justify-center p-4 text-center transition-transform duration-300 group-hover:-translate-y-2">
              <div className="bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] opacity-10 absolute inset-0" />
              <span className="material-symbols-outlined text-secondary text-4xl mb-2">more_horiz</span>
              <p className="font-label-sm uppercase tracking-widest text-on-surface-variant text-xs">
                View More Issues
              </p>
            </div>
            <h3 className="font-bold text-body-md opacity-50">Back Issues</h3>
            <div className="flex justify-between items-center mt-1 opacity-50">
              <span className="text-on-surface-variant text-label-sm">1963-Present</span>
              <span className="text-label-sm">Browse 895+</span>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <Footer />
    </>
  );
}
