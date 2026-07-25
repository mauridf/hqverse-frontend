'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Calendar,
  BookOpen,
  Play,
  Library,
  Share,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RatingStars } from '@/components/shared/RatingStars';

// Mock data - será substituído por dados da API
const mockIssueData = {
  id: '001',
  seriesName: 'Amazing Spider-Man',
  publisher: 'MARVEL COMICS',
  number: '001',
  title: 'Amazing Spider-Man #001',
  date: 'Março 1963',
  pages: 36,
  isbn: '071486024504',
  rating: 4.5,
  reviewCount: 1200,
  cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRqaigTsK2Z2h3Q87hPQ5TAcQUk9h3QsfxtBsuCc9DpmSynj09YrjzpyicmJ9DBt5-4c_o2qsKNc5tXRfa8T8LRE0aZTnu39U4Qa7u8Xs3FSgbPoYZyw69tlZiXjvrap4ztxgvULnYkI0-8W0H-IvuoJpRANM8vGz27dlYkK7c45eOw7vP3CjNaXYl6ZZ0ResL_TPibN2MN9hiSHY2i-mpGUrVTkBi7d-1H-gZda4ZHDFt37mCkhfm-bVym9J1C9xdAOqQlnpc_pA',
  synopsis: 'A aventura começa! Peter Parker lida com a morte do Tio Ben enquanto tenta provar seu valor como o herói aracnídeo. Neste volume histórico, o Homem-Aranha tenta se juntar ao Quarteto Fantástico e enfrenta seu primeiro grande vilão solo: o Camaleão. É o nascimento de um dos ícones mais importantes da cultura pop mundial.',
  upc: '071486024504',
  releaseDate: '10 de Março, 1963',
  language: 'Português (PT-BR)',
  ageRating: 'Livre',
  volume: 'Volume 1',
  characters: ['Spider-Man', 'J. Jonah Jameson', 'Chameleon', 'Aunt May', 'Fantastic Four'],
  creators: [
    { name: 'Stan Lee', role: 'Escritor / Editor', initials: 'SL' },
    { name: 'Steve Ditko', role: 'Ilustrador / Arte-finalista', initials: 'SD' },
  ],
  scans: [
    { name: 'Darkseid Club', icon: 'cloud_download' },
    { name: 'Nexus Hub', icon: 'group' },
    { name: 'Vortex HQ', icon: 'rocket_launch' },
  ],
  reviews: [
    { 
      id: 1, 
      user: 'Marcos K.', 
      initials: 'MK', 
      rating: 5, 
      text: '"A pedra fundamental da Marvel. Ler isso hoje nos faz perceber quão revolucionário Stan Lee e Ditko foram ao humanizar um super-herói."' 
    },
    { 
      id: 2, 
      user: 'Aline Silva', 
      initials: 'AL', 
      rating: 4, 
      text: '"Incrível ver os primeiros passos do Peter. A arte do Ditko tem uma atmosfera única que se perdeu um pouco nas edições modernas."' 
    },
  ],
};

export default function IssueDetailPage() {
  const params = useParams();
  const issue = mockIssueData;
  const [isInCollection, setIsInCollection] = useState(false);

  if (!issue) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Edição não encontrada</h1>
            <p className="text-muted-foreground">A edição que você procura não existe.</p>
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
          <Link href="/comic-series/amazing-spider-man" className="hover:text-secondary transition-colors">Amazing SM</Link>
          <span className="text-sm">›</span>
          <span className="text-primary font-bold">#{issue.number}</span>
        </nav>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Cover */}
          <div className="lg:col-span-4 relative group">
            <div className="aspect-2/3 w-full rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.12)] bg-surface-container">
              <Image
                src={issue.cover}
                alt={issue.title}
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] opacity-20 pointer-events-none" />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="mb-2">
              <Badge className="bg-secondary-fixed text-on-secondary-fixed font-label-heroic text-xs px-3 py-1 rounded">
                {issue.publisher}
              </Badge>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
              {issue.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-3 text-on-surface-variant font-body-md">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {issue.date}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {issue.pages} Páginas
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">barcode_scanner</span>
                ISBN: {issue.isbn}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <RatingStars value={issue.rating} readonly size="md" />
              <span className="font-bold text-primary text-body-lg">{issue.rating}</span>
              <span className="text-on-surface-variant text-body-md">
                ({issue.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-secondary text-on-secondary font-label-heroic px-6 py-4 rounded-xl flex items-center gap-2 hover:shadow-xl active:scale-95 transition-all">
                <Play className="h-5 w-5" />
                Iniciar Leitura
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsInCollection(!isInCollection)}
                className={`border-2 font-label-heroic px-6 py-4 rounded-xl flex items-center gap-2 transition-all active:scale-95 ${
                  isInCollection 
                    ? 'bg-secondary text-on-secondary border-secondary hover:bg-secondary/90' 
                    : 'border-primary text-primary hover:bg-primary hover:text-on-primary'
                }`}
              >
                <Library className="h-5 w-5" />
                {isInCollection ? 'Adicionado' : 'Adicionar à Coleção'}
              </Button>
              <Button variant="outline" size="icon" className="bg-surface-container-high text-on-surface p-3 rounded-xl hover:bg-surface-variant transition-colors h-12 w-12">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Synopsis */}
            <Card className="p-6 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)]">
              <h2 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-secondary" />
                Sinopse
              </h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                {issue.synopsis}
              </p>
            </Card>

            {/* Characters & Creators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)]">
                <h3 className="font-label-heroic text-label-heroic text-primary uppercase tracking-widest mb-3">
                  Personagens
                </h3>
                <div className="flex flex-wrap gap-2">
                  {issue.characters.map((char, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full">
                      {char}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-4 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)]">
                <h3 className="font-label-heroic text-label-heroic text-primary uppercase tracking-widest mb-3">
                  Criadores
                </h3>
                <div className="space-y-3">
                  {issue.creators.map((creator, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-on-secondary font-bold text-sm ${
                        index === 0 ? 'bg-secondary-container' : 'bg-primary-container text-on-primary'
                      }`}>
                        {creator.initials}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{creator.name}</p>
                        <p className="text-label-sm text-on-surface-variant">{creator.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Reviews */}
            <Card className="p-6 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline-md text-headline-md text-primary">Avaliações Recentes</h2>
                <Button variant="ghost" className="text-secondary font-label-heroic border-b-2 border-secondary hover:opacity-80 transition-opacity rounded-none px-0">
                  Escrever Review
                </Button>
              </div>
              <div className="space-y-4">
                {issue.reviews.map((review) => (
                  <div key={review.id} className="border-b border-outline-variant pb-4 last:border-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center text-xs font-bold">
                          {review.initials}
                        </div>
                        <span className="font-bold">{review.user}</span>
                      </div>
                      <RatingStars value={review.rating} readonly size="sm" />
                    </div>
                    <p className="text-on-surface-variant text-body-md italic">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            {/* Technical Details */}
            <Card className="bg-primary text-on-primary p-4 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)]">
              <h3 className="font-label-heroic text-label-heroic mb-3 uppercase tracking-widest opacity-80">
                Ficha Técnica
              </h3>
              <ul className="space-y-2 font-body-md">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">UPC</span>
                  <span>{issue.upc}</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Data de Lançamento</span>
                  <span>{issue.releaseDate}</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Linguagem</span>
                  <span>{issue.language}</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Classificação</span>
                  <span>{issue.ageRating}</span>
                </li>
                <li className="flex justify-between">
                  <span className="opacity-70">Série</span>
                  <span className="text-secondary-fixed">{issue.volume}</span>
                </li>
              </ul>
            </Card>

            {/* Scans */}
            <Card className="p-4 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)]">
              <h3 className="font-label-heroic text-label-heroic text-primary mb-3 uppercase tracking-widest">
                Digital Scans
              </h3>
              <div className="space-y-2">
                {issue.scans.map((scan, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg group hover:bg-secondary transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined group-hover:text-on-secondary`}>
                        {scan.icon}
                      </span>
                      <span className="font-bold group-hover:text-on-secondary">{scan.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-secondary">
                      open_in_new
                    </span>
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 px-1">
                Note: Availability depends on club membership tier.
              </p>
            </Card>

            {/* Promo Card */}
            <Card className="relative overflow-hidden h-48 flex flex-col justify-end p-4 group cursor-pointer">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCURoNgvoWPYb94Ps-qWVQNJaeH_49PN0qXyXWimmttPtP3Vq26ZO1pgVJfo3Ip9Nf-InVSKUtXQ2Qj1vzIr30C7ULBg_xSkvGzlg1lRLp9zy7IcbAiwSKNsx_NGqJcuulakJvF5JWcDz2NdUpzY5Tv78K5jJwRN6t5iyVfeMD40yVTdiWDdJxGW0db4BSXydQO80QyPOhB4hn3QPhn2Pu9_fanaGoIkU7NDWKVnrn8s8AYLM3Fl1bHElpepxkboQjElgZ4BA84kg4"
                alt="Promo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent" />
              <div className="relative z-10">
                <span className="text-secondary-fixed text-label-sm font-bold uppercase mb-1 block">
                  Promoção HQVerse
                </span>
                <h4 className="text-on-primary font-bold">Assine o Premium Plus</h4>
                <p className="text-on-primary/70 text-xs">Leitura ilimitada de clássicos Marvel.</p>
              </div>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
