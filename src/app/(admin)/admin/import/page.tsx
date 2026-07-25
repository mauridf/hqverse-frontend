'use client';

import { useState } from 'react';
import {
  Search,
  ChevronRight,
  RefreshCw,
  CloudOff,
  Calendar,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data - será substituído por dados da API
const mockResults = [
  {
    id: 1,
    title: 'Batman: A Piada Mortal',
    number: '#428',
    publisher: 'DC Comics',
    year: '1988',
    pages: 48,
    isSynced: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqC4BCbuk7BaRoIB3XSjbOze53-oKZC5H8zfynV5JtL9ENBE3pnot_eeyKl0ltUV6DZKByqCKj9475w0zxptu7jIMgQNoOvB2b_DT1-OFa7e0EnJJMRsYlzc_TN-Ayw9WLEofEq6Ci3osUeCLV-QX_ZgmP_qPSd_veqQNrjED91Y4j4LHaDoPPLHGnhZOa6p7E4Fme6ZYtLxNd-S46r5hMVMugelwfxGiDUM8dFPTof7Cb5O2utD8pcaA3DC8VnqIsIzx0Ytu5Q8M',
  },
  {
    id: 2,
    title: 'Batman: O Longo Dia',
    number: '#429',
    publisher: 'DC Comics',
    year: '1988',
    pages: 48,
    isSynced: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmlWN7aanZVSmuauUWn6pPSkAQWMGOMMd3APne9ECiSYw05FlvNY4Hcn5QkT4uxBSbt_vbZHJjxXHmKQn8OK35AJ7_bphuatNkNbNxWeFiadxWrxW55bWKyTm05mAtAjh8540t6t2QG0RH4-cn6xoDJiUDEFA8VtreYZcc5dIgiUs6oCkqeuvKy4XLapm3jfQIWZ_Pha3h2Gw5lf-_M6oeGQTPNRVBTtUl-uOwE0zjEl-Ijhfm0QFj4JDCauz672OYx7ZzUj8IrS0',
  },
];

function AdminImportContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceType, setResourceType] = useState('issue');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-4 py-6 md:pl-70">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-4 text-on-surface-variant text-label-sm">
          <span className="hover:text-secondary cursor-pointer">Admin</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-on-surface font-bold">Importação Comic Vine</span>
        </nav>

        {/* Title */}
        <section className="mb-6">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-1">
            Comic Vine Import
          </h1>
          <p className="text-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Sincronize sua base de dados local com os metadados globais da Comic Vine para garantir precisão e fidelidade editorial.
          </p>
        </section>

        {/* Search Section */}
        <section className="mb-6">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.12)] border border-outline-variant flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block font-label-heroic text-label-heroic text-primary mb-1 uppercase tracking-widest">
                Busca Global
              </label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-outline-variant group-focus-within:text-secondary" />
                <Input
                  placeholder="Buscar na Comic Vine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-[#F1F5F9] border-none rounded-lg focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <label className="block font-label-heroic text-label-heroic text-primary mb-1 uppercase tracking-widest">
                Tipo
              </label>
              <Select value={resourceType} onValueChange={(v) => v && setResourceType(v)}>
                <SelectTrigger className="bg-[#F1F5F9] border-none rounded-lg focus:ring-2 focus:ring-secondary focus:bg-white transition-all">
                  <SelectValue placeholder="Issue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="issue">Issue</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="character">Character</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-label-heroic flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all w-full md:w-auto justify-center">
              <Search className="h-5 w-5" />
              BUSCAR
            </Button>
          </div>
        </section>

        {/* Results Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline-md text-headline-md text-primary">Resultados da Busca</h2>
            <span className="text-label-sm text-on-surface-variant">2 resultados encontrados</span>
          </div>

          {mockResults.map((result) => (
            <div 
              key={result.id}
              className="group bg-surface-container-lowest rounded-xl p-3 flex flex-col md:flex-row gap-4 shadow-[0_10px_20px_rgba(0,0,0,0.12)] border border-outline-variant/30 hover:border-secondary/30 transition-colors relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-24 h-full bg-[radial-gradient(#ba0035_0.5px,transparent_0.5px)] bg-size-[4px_4px] opacity-10 pointer-events-none" />
              
              <div className="w-full md:w-32 h-48 rounded-lg overflow-hidden shrink-0 shadow-md">
                <img 
                  src={result.image} 
                  alt={result.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 py-1 z-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold uppercase tracking-tighter">
                      {result.publisher}
                    </Badge>
                    <span className="text-label-sm text-on-surface-variant">{result.number}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-1">{result.title}</h3>
                  <div className="flex flex-wrap gap-3 text-on-surface-variant font-label-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {result.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {result.pages} pages
                    </span>
                    {result.isSynced && (
                      <span className="flex items-center gap-1 text-secondary font-bold">
                        <CheckCircle className="h-4 w-4" />
                        Já Sincronizado
                      </span>
                    )}
                  </div>
                </div>
                {!result.isSynced && (
                  <p className="text-label-sm text-on-surface-variant mt-2">
                    Pendente de sincronização de metadados e capas originais.
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-center items-end p-2 z-10">
                {result.isSynced ? (
                  <Button disabled variant="outline" className="opacity-50 cursor-not-allowed">
                    <CloudOff className="h-4 w-4 mr-2" />
                    SYNCED
                  </Button>
                ) : (
                  <Button className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-label-heroic flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md group-hover:shadow-secondary/20">
                    <RefreshCw className="h-4 w-4" />
                    SYNC NOW
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-outline-variant/50 flex items-center gap-4">
            <div className="flex items-center gap-1 text-label-sm text-on-surface-variant">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <span>Check Icon = Já sincronizado</span>
            </div>
            <div className="flex items-center gap-1 text-label-sm text-on-surface-variant">
              <RefreshCw className="h-4 w-4 text-outline-variant" />
              <span>Sync Icon = Pendente</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminImportPage() {
  return (
    <AuthGuard requireAdmin>
      <AdminImportContent />
    </AuthGuard>
  );
}
