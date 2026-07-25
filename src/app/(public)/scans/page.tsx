'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Book,
  Clock,
  ChevronRight,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
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
const mockScans = [
  {
    id: 1,
    title: 'Batman #428 - A Piada Mortal',
    publisher: 'DC Comics',
    group: 'Darkseid Club',
    quality: 'HQ',
    language: 'pt-BR',
    pages: 32,
    size: '45MB',
    date: 'Hoje às 14:30',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJfAcjJ5R4Yk-k9lrNvQV_3elq7ixc6RPdgsYOMlhP6gQ-r6jl_CcbMhIn_41eISXQL2ZHTZdlkMTuAWQDsYoGBOFqpxyJAPlfhqi_69LzQG9663wtjNXHJCCaA2e-piW__-G6j-UawxBE_jybPdFNatuS8DqNEbEybaLsBRuyGiLDuR6ridmHPYaPB4_B-ofCOqe6aAHuNunTR3vhFBSAVy7OPP2XBL0C-qHpM-QTnr51w2qRBSIF7we0IGMH5YvVOmDJNGHSzvQ',
    progress: 0,
  },
  {
    id: 2,
    title: 'Superman #75 - A Morte do Superman',
    publisher: 'DC Comics',
    group: 'Zona Fantasma',
    quality: 'GOOD',
    language: 'pt-BR',
    pages: 48,
    size: '28MB',
    date: 'Ontem às 20:15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlps0pqymyNcUqb4tHOSWwKM8s2oW8VuzAociQ7rQ1u7JZgz7OoTK0UJ56vLt79wYqSygpE6kpX9XEzm800XLrN3724Slms13Kd3LojrtCsqPRgd0WF205e6K6Re9eL1Hz5zGBd422smgkyPKTZwH-9obq5KfQAzuXLgWkJ6l18XdaDLVqzBxgYAxJ_t5bdPsOM6sAF3jbi5VIbv0-FQSYTatShpaOvW2dNCOhtoOd01JZlOnZAu8VRdhwvKgtwbysg3kua6jiazM',
    progress: 45,
  },
];

export default function ScansPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'HQ': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'GOOD': return 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-fixed/20';
      default: return 'bg-surface-container-high text-on-surface';
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-label-sm text-on-surface-variant mb-4">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-secondary">Scans</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
              Lista de Scans Recentes
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Explore as últimas adições à nossa biblioteca digital. Scans de alta qualidade selecionados pelos melhores grupos.
            </p>
          </div>
        </div>

        {/* Filters */}
        <section className="bg-surface-container-lowest rounded-xl p-4 mb-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,#ba0035_0.5px,transparent_0.5px)] bg-size-[4px_4px] opacity-10 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="font-label-heroic text-secondary text-[11px] uppercase tracking-widest">
                Grupo
              </label>
              <Select>
                <SelectTrigger className="bg-background border-outline-variant/50 rounded-lg focus:border-secondary focus:ring-0">
                  <SelectValue placeholder="Todos os Grupos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Grupos</SelectItem>
                  <SelectItem value="darkseid">Darkseid Club</SelectItem>
                  <SelectItem value="zona">Zona Fantasma</SelectItem>
                  <SelectItem value="titans">Scan Titans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-heroic text-secondary text-[11px] uppercase tracking-widest">
                Idioma
              </label>
              <Select>
                <SelectTrigger className="bg-background border-outline-variant/50 rounded-lg focus:border-secondary focus:ring-0">
                  <SelectValue placeholder="Português (pt-BR)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (pt-BR)</SelectItem>
                  <SelectItem value="en-US">Inglês (en-US)</SelectItem>
                  <SelectItem value="es-ES">Espanhol (es-ES)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-heroic text-secondary text-[11px] uppercase tracking-widest">
                Qualidade
              </label>
              <Select>
                <SelectTrigger className="bg-background border-outline-variant/50 rounded-lg focus:border-secondary focus:ring-0">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="hq">HQ (High Quality)</SelectItem>
                  <SelectItem value="good">GOOD</SelectItem>
                  <SelectItem value="web">WEB-DL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-heroic text-secondary text-[11px] uppercase tracking-widest">
                Ordenar
              </label>
              <Select defaultValue="date">
                <SelectTrigger className="bg-background border-outline-variant/50 rounded-lg focus:border-secondary focus:ring-0 font-bold text-primary">
                  <SelectValue placeholder="Data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Data</SelectItem>
                  <SelectItem value="title">Título A-Z</SelectItem>
                  <SelectItem value="popular">Popularidade</SelectItem>
                  <SelectItem value="pages">Páginas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Scans List */}
        <div className="flex flex-col gap-3">
          {mockScans.map((scan) => (
            <article 
              key={scan.id}
              className="group bg-surface-container-lowest p-3 md:p-4 rounded-xl border border-outline-variant/20 hover:border-secondary/50 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
            >
              {/* Cover */}
              <div className="relative w-24 h-36 md:w-32 md:h-48 rounded-lg overflow-hidden shrink-0 shadow-md">
                <Image
                  src={scan.image}
                  alt={scan.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white font-label-heroic uppercase">Preview</span>
                </div>
              </div>

              {/* Info */}
              <div className="grow">
                <div className="flex flex-wrap gap-1.5 mb-1">
                  <Badge variant="secondary" className="bg-primary-container text-on-primary-container text-xs">
                    {scan.publisher}
                  </Badge>
                  <Badge variant="secondary" className="bg-surface-container-highest text-on-surface-variant text-xs">
                    {scan.group}
                  </Badge>
                  <Badge className={cn('text-xs font-bold border', getQualityColor(scan.quality))}>
                    {scan.quality}
                  </Badge>
                  <Badge variant="secondary" className="bg-surface-container-high text-on-surface text-xs uppercase">
                    {scan.language}
                  </Badge>
                </div>

                <h3 className="font-headline-md text-[22px] text-primary group-hover:text-secondary transition-colors mb-1 leading-tight">
                  {scan.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-body-md">
                  <div className="flex items-center gap-1">
                    <Book className="h-4 w-4" />
                    <span>{scan.pages} páginas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{scan.size}</span>
                  </div>
                  <div className="flex items-center gap-1 text-secondary font-medium">
                    <Clock className="h-4 w-4" />
                    <span>{scan.date}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary transition-all duration-500"
                    style={{ width: `${scan.progress}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:flex-col md:items-end w-full md:w-auto">
                <Button className="flex-1 md:w-full bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-label-heroic hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5">
                  <Book className="h-4 w-4" />
                  {scan.progress > 0 ? 'Continuar' : 'Ler Agora'}
                </Button>
                <Button variant="outline" className="flex-1 md:w-full border-2 border-outline-variant hover:border-secondary hover:text-secondary px-6 py-2.5 rounded-lg font-label-heroic transition-all flex items-center justify-center gap-1.5">
                  <Download className="h-4 w-4" />
                  Baixar
                </Button>
              </div>
            </article>
          ))}

          {/* Skeleton placeholder */}
          <div className="group bg-surface-container-lowest/50 p-3 md:p-4 rounded-xl border border-dashed border-outline-variant/40 flex flex-col md:flex-row gap-4 items-start md:items-center opacity-60">
            <div className="w-24 h-36 md:w-32 md:h-48 rounded-lg bg-surface-container-high animate-pulse" />
            <div className="grow space-y-3">
              <div className="flex gap-1.5">
                <div className="h-4 w-16 bg-surface-container-high rounded-full animate-pulse" />
                <div className="h-4 w-24 bg-surface-container-high rounded-full animate-pulse" />
              </div>
              <div className="h-6 w-3/4 bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-surface-container-high rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-surface-container-high rounded animate-pulse hidden md:block" />
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
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
