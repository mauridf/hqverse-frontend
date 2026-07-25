'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  MoreVertical,
  Star,
  Calendar,
  BookOpen,
  CheckCircle,
  Book,
  Bookmark,
} from 'lucide-react';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data - será substituído por dados da API
const mockCollectionData = {
  id: 1,
  name: 'Batman Completo',
  issueCount: 15,
  progress: 70,
  isPublic: true,
  createdAt: '10/06/2026',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_AWQdOrbbBHWYQDMB9mYfkyXNnGSADpSQLEF9fgE6rzIGyUhkJGdYeqhihUAF3DV5LdA_7XaXZNnk0UT2BWnhua7KT9m8_AfHMc0wFBCpSkoxTRR9VydTJ3a9Mx70vaWfra_6zZpDGbByVL_g2dgGTG8CjlGxZrq9Riju0-K7WdYHkJ2bMyXhPQCQo5890m2uFXe5HAyaQFZ87L0am444A4YkwpiAq0wQrxSZ9LhV6xRYgUlFvRtItPcpEpHNA7ZVbFNpG5Tj4UM',
  issues: [
    {
      id: 1,
      number: '428',
      title: 'Batman #428',
      status: 'read',
      rating: 5,
      date: '22/07/2026',
      note: '"Clássico absoluto!"',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQikNmaod5c2vBrYrUJch0KE3Dy3OdVsJXL0rQB0E64msLTh5AQ2Q7NR8pYVVReUEFqaTNphDmvGLkgWTFKKR9IUoFoTN7GkMllHwb4etNO5xWp-CE6zJwsfCY_XO91TylSyExmYrj9WtE1sElqr7MlYpJWZdgzCK0w2YZpsQKu-eaJypkmDa33vNN_elnkKx49Kocl46SK6sOG7xmkR6KteLiI1hnOkdNPcHqt3vHFtJVYfI3-rvnZucbhdA20nfp59mi_ZcLZzA',
    },
    {
      id: 2,
      number: '429',
      title: 'Batman #429',
      status: 'reading',
      rating: 4,
      currentPage: 15,
      totalPages: 30,
      progress: 50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPKiILEMo-wUX1ohl2y_Ec1n-qxopg2rVdVck8J3drSqK92782sIyIh_ziiTNuhbgIq509MgzKYFchf4W5J9r8k6WcTL1-hEi0H6KxeYqV0CnafgrFF-up49LmBDqaA2suNjvPTaxU4SY4HBZfIKCpO3_72d_XOnK34yeN0eXU9JhFVXLUnAfGQ26AlRZ6YVi5Eux-vDnWFDXzs3wMGKqrNUk5-01vGSN7lEpObldlmlMkHaRyC3HOUh6btyDN6sEmDtrqjsDfk2Q',
    },
    {
      id: 3,
      number: '430',
      title: 'Batman #430',
      status: 'wishlist',
      rating: 0,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOGaI-fNFXMVR71eSpeHfDNQGshhlPUE93AkiLzNicUmiXiDCJIVr4D6ZtX_O9otEklw5CSHLUqxczLAYcKjRZ1J6t13jpee7Uf0Y8jOHq-qw6gbSFA4D6se1PqbzOLmAweewn9biro4FhaLgQIdgHQb5Ni5N10bGhs0KxGh-OytP3v-ndx-1AAJ5lOJ-11X_KTA7nSn5ThonGCTS7h8_8CLj2lZDBHDkIOlItlLzjVsutO7OG-aQ64yS6WIDbMnGuqhKt5N8YzEU',
    },
  ],
};



const statusLabels = {
  read: 'Lido',
  reading: 'Lendo',
  wishlist: 'Wishlist',
};

function CollectionDetailContent() {
  const params = useParams();
  const collection = mockCollectionData;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'read': return <CheckCircle className="h-4 w-4 text-[#10B981]" />;
      case 'reading': return <Book className="h-4 w-4 text-[#F59E0B]" />;
      case 'wishlist': return <Bookmark className="h-4 w-4 text-[#EF4444]" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-4 py-6 md:pl-70">
        {/* Back Button */}
        <Link 
          href="/collections"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors mb-4 font-label-heroic"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg mb-1">{collection.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-label-heroic text-label-heroic">
                  {collection.issueCount} issues · {collection.progress}% completo
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="text-label-sm">
                  Criada em {collection.createdAt} · {collection.isPublic ? '🔓 Pública' : '🔒 Privada'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="border-2 border-primary text-primary font-label-heroic flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
            <Button variant="outline" className="border-2 border-outline-variant text-on-surface-variant font-label-heroic flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
            <Button className="bg-secondary text-on-primary font-label-heroic flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
              <Plus className="h-4 w-4" />
              + Adicionar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            {/* Progress Card */}
            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[10px_10px_0px_0px_rgba(9,20,38,0.05)] border border-surface-container-high">
              <h3 className="font-label-heroic text-label-heroic mb-2 uppercase tracking-wider text-on-surface-variant">
                Progresso Geral
              </h3>
              <div className="flex items-center justify-between mb-1">
                <span className="text-headline-md font-headline-md">{collection.progress}%</span>
                <span className="text-label-sm font-label-sm text-secondary font-bold">
                  {collection.issues.filter(i => i.status === 'read').length}/{collection.issueCount} Lidos
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden mb-3">
                <div 
                  className="bg-secondary h-full rounded-full transition-all duration-1000"
                  style={{ width: `${collection.progress}%` }}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                    <span className="font-label-heroic text-label-heroic">Lidos</span>
                  </div>
                  <span className="font-bold">
                    {collection.issues.filter(i => i.status === 'read').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <span className="font-label-heroic text-label-heroic">Lendo</span>
                  </div>
                  <span className="font-bold">
                    {collection.issues.filter(i => i.status === 'reading').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <span className="font-label-heroic text-label-heroic">Abandonados</span>
                  </div>
                  <span className="font-bold">
                    {collection.issues.filter(i => i.status === 'wishlist').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Collection Art */}
            <div className="relative group rounded-xl overflow-hidden aspect-3/4 shadow-[10px_10px_0px_0px_rgba(9,20,38,0.05)] border-4 border-primary">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full bg-[radial-gradient(circle,rgba(186,0,53,0.1)_1px,transparent_1px)] bg-size-[8px_8px] p-4 bg-linear-to-t from-primary to-transparent">
                <p className="text-on-primary font-headline-md text-[18px]">The Dark Knight Saga</p>
              </div>
            </div>
          </aside>

          {/* Issues List */}
          <div className="lg:col-span-8 space-y-3">
            <h3 className="font-headline-md text-headline-md mb-4">Capítulos na Coleção</h3>

            {collection.issues.map((issue) => (
              <div
                key={issue.id}
                className={cn(
                  'bg-surface-container-lowest flex flex-col md:flex-row items-center gap-4 p-3 md:p-4 rounded-xl border border-surface-container-high hover:border-secondary transition-all shadow-[10px_10px_0px_0px_rgba(9,20,38,0.05)] relative overflow-hidden',
                  issue.status === 'reading' && 'border-2 border-secondary/30 bg-secondary/5'
                )}
              >
                {issue.status === 'read' && (
                  <div className="absolute top-0 right-0 p-1 bg-[#10B981] text-white rounded-bl-lg">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}

                <div className="w-24 h-36 shrink-0 bg-surface-container rounded-lg overflow-hidden border border-outline-variant shadow-sm">
                  <Image
                    src={issue.image}
                    alt={issue.title}
                    width={96}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grow w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-headline-md text-[20px]">{issue.title}</h4>
                    {issue.rating > 0 && (
                      <div className="flex items-center text-tertiary-fixed-dim">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < issue.rating ? 'fill-current' : 'text-outline-variant'
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mb-1">
                    <span className={cn('font-bold flex items-center gap-1', {
                      'text-[#10B981]': issue.status === 'read',
                      'text-[#F59E0B]': issue.status === 'reading',
                      'text-[#EF4444]': issue.status === 'wishlist',
                    })}>
                      {getStatusIcon(issue.status)}
                      {statusLabels[issue.status as keyof typeof statusLabels]}
                      {issue.status === 'read' && ` · ${issue.date}`}
                      {issue.status === 'reading' && ` · pág ${issue.currentPage}/${issue.totalPages} (${issue.progress}%)`}
                    </span>
                  </div>

                  {issue.note && (
                    <div className="bg-surface-container-low p-2 px-3 rounded border-l-4 border-secondary">
                      <p className="text-body-md text-[14px] italic">{issue.note}</p>
                    </div>
                  )}

                  {issue.status === 'reading' && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="grow h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div 
                          className="bg-secondary h-full rounded-full"
                          style={{ width: `${issue.progress}%` }}
                        />
                      </div>
                      <Button size="sm" className="bg-primary text-on-primary font-label-heroic text-xs">
                        Continuar Leitura
                      </Button>
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {/* Pagination */}
            <div className="pt-4 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" className="w-10 h-10 rounded-xl">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm" className="w-10 h-10 rounded-xl bg-secondary text-white font-bold">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 rounded-xl">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 rounded-xl">
                3
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 rounded-xl">
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CollectionDetailPage() {
  return (
    <AuthGuard>
      <CollectionDetailContent />
    </AuthGuard>
  );
}
