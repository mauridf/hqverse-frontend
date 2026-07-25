'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, Heart, Globe } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { usePublisher } from '@/lib/hooks/useData';

export default function PublisherDetailPage() {
  const params = useParams();
  const id = Number(params.slug);
  const { data: publisher, isLoading } = usePublisher(id);
  const [isFavorited, setIsFavorited] = useState(!!publisher);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center text-on-surface-variant">Carregando editora...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!publisher) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Editora não encontrada</h1>
            <p className="text-muted-foreground">A editora que você procura não existe.</p>
            <Button asChild className="mt-4">
              <Link href="/publishers">Voltar para editoras</Link>
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
          <Link href="/publishers" className="hover:text-secondary transition-colors">Editoras</Link>
          <span className="text-sm">›</span>
          <span className="text-primary font-bold">{publisher.name}</span>
        </nav>

        {/* Header Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-xl shadow-xl p-6 flex items-center justify-center border border-outline-variant relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] text-on-surface-variant/5 group-hover:opacity-10 transition-opacity" />
              <Image
                src={publisher.logoUrl ?? ''}
                alt={publisher.name}
                width={200}
                height={200}
                className="object-contain z-10"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="font-headline-lg text-headline-lg text-primary">
                  {publisher.name}
                </h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${
                    isFavorited 
                      ? 'bg-secondary text-white border-secondary hover:bg-secondary/90' 
                      : 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                  } transition-all`}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-white' : ''}`} />
                  {isFavorited ? 'Favoritado' : 'Favoritar'}
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 mt-2">
                {publisher.foundationDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-secondary" />
                    <span className="font-body-md text-on-surface-variant">
                      <span className="font-bold text-on-surface">Fundada:</span> {new Date(publisher.foundationDate).getFullYear()}
                    </span>
                  </div>
                )}
                {publisher.country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <span className="font-body-md text-on-surface-variant">
                      <span className="font-bold text-on-surface">Local:</span> {publisher.country}
                    </span>
                  </div>
                )}
                {publisher.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-secondary" />
                    <a 
                      href={`https://${publisher.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-body-md text-secondary hover:underline"
                    >
                      {publisher.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-4 max-w-3xl">
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {publisher.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Series from this Publisher - if data available */}
        <section className="mb-8">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Séries desta Editora</h2>
          <p className="text-on-surface-variant">Carregando séries...</p>
        </section>

        {publisher.description && (
          <section className="max-w-4xl mx-auto py-8">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">Sobre {publisher.name}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{publisher.description}</p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}