'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, 
  BookOpen, 
  Library, 
  Users, 
  Brush, 
  Timeline,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/shared/Pagination';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { cn } from '@/lib/utils';

// Mock data - será substituído por dados da API
const mockResults = {
  characters: [
    {
      id: 1,
      name: 'Batman',
      realName: 'Bruce Wayne',
      type: 'HERO',
      year: 1939,
      publisher: 'DC Comics',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXnst7Qzu5pWN67ZkKQNWwDhCeTlXzb-AXs2RYzZQabkzEV6oZ0BmDiO3zB4XZNLDgO9Kx0lqz3_tY_vxdG-SF1nl3P81o7CAmOFkCWATToRP7prK6svez4blQcEFER_v8vEIhm9zR12p7-iBPkHV2ILirIO-i6EPLwu5Xq52mbTNN6xtDnlSeBGELZK22U3I9W4xFfM0p09A0P0MZ5Si0zo0CNGN6hLnV-7lkh62l_buLgXRXrwHC1mf8ksQpu2laihVLI0iuKP8',
      isOfficial: true,
    },
    {
      id: 2,
      name: 'Batman (Terry McGinnis)',
      realName: 'Batman Beyond',
      type: 'HERO',
      year: 1999,
      publisher: 'DC Comics',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFsGOmxaeJIXT-onI90IPlSlrdA4hIlRuCZ8yk1f_FI20A9ZcXPbipPVapXlHclp5GsifU0bWGoa99yGYQYLJqnav_k0YwCATK-zQ08-zIqetybPmcID3D74OUTRgMFOtQEvgyiVu5t-LjHdYJobnJqwm0cvI0okYVs9nK5KTsbV1tUD9lM_Ve8cE11ZCXEjrMisWN5tUI72t0ooGtYaFfBBNlZ3U3uUsy3lgrZuojEJa_j2wZo70ebEvjTJI-f9iiwgvr_6v9BmM',
      isOfficial: false,
    },
    {
      id: 3,
      name: 'Batman (Thomas Wayne)',
      realName: 'Alternative Knight',
      type: 'ANTI-HERO',
      year: 2011,
      publisher: 'DC Comics',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyt71MP8qSL4MMtzsVttXFGRN7VJ9k-9tUWu1sZxxealU64LYg7QFsj4P6HhK1cwnitwj_pIiscebpz4wFeRLYBY2TTVAUWfTgzsUghTA_H37OSyhR5TeIRJKY1zODIRQLY0IlHVACBDIEiPr7x8CTImOkQNUZNrdpokaCxrt0QYb-tSFCedpG6yPnzJwd8JbwElCynesjTudDpx8BzZifCOUPvF8cpfbgQVvgKZ1MwzVNT3vyDntCfgavYbLh6YOWUDfEmpnurtM',
      isOfficial: false,
    },
    {
      id: 4,
      name: 'Batman Who Laughs',
      realName: 'Bruce Wayne (Earth -22)',
      type: 'VILLAIN',
      year: 2017,
      publisher: 'DC Comics',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5I7XRI9kscOOwz7IWGVxPuAKAduT2YrzAHoVhdeuEGuc42jLTRHAgNNlx43Tzq3lJVUUwxJTp5RUQQTA-kSW2Ic4aORkmzPKRgNIYBI4QGJzBzo4XumI9hlF4WorLkFxNWXBrUCuEuyS-YEP_rGhwBL7GODp1PUyQAmrKtN-X1BEM5lODfc1wXvIS2FuVDUHGeFEi6NLjP6eLNPyreFkks1D2XBeWwvL0BCLKFSpFwPq6T8tgD5O1j35eLkVuAvHZZalkBANoHVg',
      isOfficial: false,
    },
  ],
  total: 245,
};

const tabs = [
  { id: 'characters', label: 'Personagens', icon: User },
  { id: 'series', label: 'Séries', icon: Library },
  { id: 'issues', label: 'Edições', icon: BookOpen },
  { id: 'teams', label: 'Equipes', icon: Users },
  { id: 'creators', label: 'Criadores', icon: Brush },
  { id: 'story-arcs', label: 'Arcos', icon: Timeline },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('characters');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const debouncedQuery = useDebounce(query, 300);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'HERO': return 'bg-primary-container text-on-primary-container';
      case 'ANTI-HERO': return 'bg-surface-container-high text-on-surface';
      case 'VILLAIN': return 'bg-error-container text-on-error-container';
      default: return 'bg-surface-container-high text-on-surface';
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto px-4 py-6 min-h-screen">
        {/* Header */}
        <header className="mb-6">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-1">
            Resultados para <span className="text-secondary italic">&ldquo;{query}&rdquo;</span>
          </h1>
          <p className="text-on-surface-variant text-body-lg">
            {mockResults.total} encontrados em toda a rede HQVerse
          </p>
        </header>

        {/* Tabs */}
        <div className="border-b border-outline-variant mb-6 overflow-x-auto">
          <div className="flex gap-6 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative pb-3 font-label-heroic flex items-center gap-1.5 transition-colors whitespace-nowrap',
                    isActive 
                      ? 'text-secondary font-bold' 
                      : 'text-on-surface-variant font-medium hover:text-secondary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {mockResults.characters.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="group relative bg-surface-container-lowest rounded-xl p-4 flex gap-4 shadow-[0_10px_20px_rgba(0,0,0,0.12)] border border-transparent hover:border-secondary transition-all"
            >
              <div className="w-32 h-40 bg-surface-dim rounded-lg overflow-hidden shrink-0 relative">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] opacity-10 group-hover:opacity-20 transition-opacity" />
              </div>

              <div className="flex flex-col justify-between py-1 flex-1">
                <div>
                  {character.isOfficial && (
                    <div className="flex items-center gap-1 text-secondary font-bold text-label-sm mb-1 uppercase tracking-wider">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Oficial DC Comics
                    </div>
                  )}
                  <h2 className="font-headline-md text-[24px] text-primary group-hover:text-secondary transition-colors">
                    {character.name}
                  </h2>
                  <p className="text-on-surface-variant font-medium">{character.realName}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Badge className={cn('text-xs font-bold', getTypeColor(character.type))}>
                    {character.type}
                  </Badge>
                  <Badge variant="secondary" className="bg-surface-container-high text-on-surface-variant text-xs">
                    EST. {character.year}
                  </Badge>
                </div>

                <div className="mt-2 text-secondary font-bold text-label-heroic flex items-center gap-1 self-start group-hover:gap-2 transition-all">
                  Ver detalhes
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
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