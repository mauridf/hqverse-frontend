'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  MoreVertical, 
  Lock, 
  LockOpen, 
  Library,
  BookOpen,
  Star
} from 'lucide-react';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

// Mock data - será substituído por dados da API
const mockCollections = [
  {
    id: 1,
    name: 'Batman Completo',
    issueCount: 15,
    progress: 70,
    isPublic: true,
    isFavorite: true,
    createdAt: '10/06/2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9J3IAE54KUm45KDRlypRPxO7RxmuCqg8jcnI0RPe7rUuFWwXtuYbKQqXJ6PzEvlN5mC_i92ryZ1nETkehkWA0VCHRqELrpp4czSOF7Z7GS_55jOMBfYj6EBOLk57d9s5LMRrNx6ScvfNNtN_5iAqbZnqkK912bQkWvYYgjZoRnPlyhfJlq8OWiRFm7prTLK8-gQzjLuPqMB7nX6AbDzpKhuG5ZZg-Rczkg-GA4irKbOWQrAXOftKyBonqMNTL4d4q8q-CWuEHOlo',
  },
  {
    id: 2,
    name: 'O Amigão da Vizinhança',
    issueCount: 42,
    progress: 25,
    isPublic: false,
    isFavorite: false,
    createdAt: '15/07/2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfYBTGTMDqv2Iu298GLLHD3Koj0N2bsO1WAZ1rfSPbAkxOPmnrjOZXcxURoWmNxQuQflEZIpiYZKse_ySsH5FkKXiLls8pBMQu5MKDvDpXLUjurE7U4NAEyMCKkjvMVlPHBVojuA9XAIHrPPUXXY6PuGRvnGbgEOB54qgAlzXW6xuVCfmRLxnCi0_h_CtEmBCvqpaTDKIeerJA6wkEmJlDjVKN5yJ7iyXI36c5aAmRblMSzZ1NchiXlXWzYKeJQwIgYWiv6uXu6Bw',
  },
  {
    id: 3,
    name: 'Sagas Cósmicas',
    issueCount: 8,
    progress: 100,
    isPublic: true,
    isFavorite: false,
    createdAt: '02/08/2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEnEhCxpzd1ARdqX5l8IH7ygnsJrGe79rsE55DHofOSVFYH0wSI-GmFYw6lV0c07VeQj0FuehjweO9t_FmayThDSrsMPMcshesH9uyMbfRRQ_2YX7LNLpSyve-wIbGshziG9slQsR4-VhU47RUeg7MH7G1x4_sowMRvfsk66nZPjrHsvAt8HVjCz8kIgk6OazYOc7ouofvp2xnGutYwCI4KzWhZEnOiCqDU4koq-H1Wi9WkyVsUFypVYXC5BqR06FUCVIyyLl8Kpk',
  },
  {
    id: 4,
    name: 'Mistérios de Gotham',
    issueCount: 12,
    progress: 55,
    isPublic: false,
    isFavorite: false,
    createdAt: '20/08/2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATlRo859UKabFeIWdxa7Q1ZLwMwODF-oTBy4vRRwfbTfyV1i0DwOeicaoxR3w8uHCdp7psU1nSrwa1QLHGv8vAUmguJcQH7TRPWeabPj9npeZEadYTL-Ft3wm0_qwKnT6PquWVPAeh745AhDhE-hMQhM2_WOgnt8L3bwklwx0j40_C5JfW8-WY0zv33Q3eFATE3abtUoUgU5S45GJgtldX61cRd-HMGYdH4VPJk4c7rlKCIhKXhmETweHx7aqYQ5LFs6HO9BJIWEA',
  },
];

function CollectionsContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-4 py-6 md:pl-70">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
              Minhas Coleções
            </h1>
            <p className="text-on-surface-variant font-body-md">
              Gerencie seu universo de histórias organizadas em estantes digitais.
            </p>
          </div>
          <Button className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-heroic flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto">
            <Plus className="h-5 w-5" />
            Nova Coleção
          </Button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-[10px_10px_0px_0px_rgba(9,20,38,0.05)] hover:shadow-[14px_14px_0px_0px_rgba(186,0,53,0.1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
            >
              <div className="relative h-48 bg-primary overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <Library className="h-6 w-6 text-secondary-fixed" />
                    {collection.isFavorite && (
                      <Badge className="bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
                        Favorito
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    {collection.isPublic ? (
                      <LockOpen className="h-3.5 w-3.5" />
                    ) : (
                      <Lock className="h-3.5 w-3.5" />
                    )}
                    <span className="text-label-sm">
                      {collection.isPublic ? 'Pública' : 'Privada'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline-md text-[20px] text-primary group-hover:text-secondary transition-colors">
                    {collection.name}
                  </h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-label-sm text-on-surface-variant font-medium">
                    <span>{collection.issueCount} issues</span>
                    <span className="text-secondary">{collection.progress}% lido</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary rounded-full transition-all duration-1000"
                      style={{ width: `${collection.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="text-[11px] text-on-surface-variant italic">
                    Criada em {collection.createdAt}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Add New Collection Card */}
          <Link
            href="/collections/new"
            className="bg-surface-container-low rounded-xl border-2 border-dashed border-outline hover:border-secondary hover:bg-surface transition-all group flex flex-col items-center justify-center p-6 gap-3 text-center min-h-85 shadow-[10px_10px_0px_0px_rgba(9,20,38,0.05)] hover:shadow-[14px_14px_0px_0px_rgba(186,0,53,0.1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <Plus className="h-8 w-8 text-outline group-hover:text-secondary transition-colors" />
            </div>
            <div>
              <p className="font-headline-md text-[18px] text-on-surface">Nova Estante</p>
              <p className="text-label-sm text-on-surface-variant">Comece a organizar um novo arco agora</p>
            </div>
          </Link>
        </div>

        {/* Quick Filters - Desktop */}
        <div className="hidden lg:block fixed right-6 bottom-6 space-y-2">
          <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-xl border border-outline-variant flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-1">
              Filtros Rápidos
            </p>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-label-sm font-bold text-primary hover:text-secondary justify-start px-2">
              <BookOpen className="h-4 w-4" />
              Concluídas
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-label-sm font-bold text-primary hover:text-secondary justify-start px-2">
              <Star className="h-4 w-4" />
              Em Leitura
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-label-sm font-bold text-primary hover:text-secondary justify-start px-2">
              <Lock className="h-4 w-4" />
              Favoritas
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <AuthGuard>
      <CollectionsContent />
    </AuthGuard>
  );
}
