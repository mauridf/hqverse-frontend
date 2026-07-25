'use client';

import Image from 'next/image';
import { 
  Library, 
  Star, 
  BookOpen, 
  Heart, 
  Bookmark,
  MessageSquare,
} from 'lucide-react';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data - será substituído por dados da API
const mockStats = {
  collections: 12,
  reviews: 5,
  issues: 48,
  favorites: 156,
};

const mockReadings = [
  {
    id: 1,
    title: 'Batman #428',
    publisher: 'DC Comics • Modern Era',
    currentPage: 15,
    totalPages: 32,
    progress: 45,
    startedAt: '20/07',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCExklTIR9Q88T7GgiofaHYIVQHZWnqJuRr5wjhEgaTmh1RAT6AWCbAWiEWZVN7kjtoEnc2t0gQe7hFyl7kuEp7J5qsiVDNWRK6B2C_aPBjFxJV64bAYzfkNhlEVLjwvf_9CeYuGapgGsp44XF6ASeqOilDL9v72GBWIUMpn0qfTA0nGX6y_Mpiw3-eUWeFsMwlcU6x1Pn2CdDORdbvFiHn2DxCIEYS1SHyt9FgXWfqh4uekhugs5jC3KgVRlzs1t2cpTdkBvVitS4',
  },
  {
    id: 2,
    title: 'Watchmen #1',
    publisher: 'DC Comics • Graphic Novel',
    currentPage: 30,
    totalPages: 35,
    progress: 85,
    startedAt: '15/07',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuaLJV8E1xIFTF_1ZOFtajFkQm44dP75oAGYgBci4Le9Kvc0amyqfJ5-aivclGCfdlkquLpqsfqUjZHsZ2pAxEAsADHMHjm9gjI919PvsLNdhDI-05sAt_0jpmz_pswjyy0Bwc4844M2Oyun0l0H5UQGtUZ0mX3x3VX9D8d3jjSQuURPc4PqLaS7RF-ROzA92mp0NB5TSXpqETfz_V-KNkl2pk33VI9KXFcJByrmVhggJ7PYXrtm0ENlG4eAq6nFgmxJ2_0PGtWeE',
  },
];

const mockActivities = [
  { 
    id: 1, 
    type: 'start', 
    title: 'Sandman #10', 
    time: 'Há 2 horas',
    icon: Bookmark,
    iconBg: 'bg-primary',
  },
  { 
    id: 2, 
    type: 'review', 
    title: 'Saga #1', 
    time: 'Há 5 horas',
    subtitle: 'com 5 estrelas',
    icon: MessageSquare,
    iconBg: 'bg-secondary',
  },
  { 
    id: 3, 
    type: 'add', 
    title: 'Daredevil #1', 
    time: '18:45',
    subtitle: 'Coleção Pessoal',
    icon: Library,
    iconBg: 'bg-surface-tint',
  },
  { 
    id: 4, 
    type: 'finish', 
    title: 'Spider-Man Blue', 
    time: '14:20',
    subtitle: 'Concluído',
    icon: BookOpen,
    iconBg: 'bg-primary',
  },
];

function DashboardContent() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-4 py-6 md:pl-70">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Coleções', value: mockStats.collections, icon: Library, change: '+2 New' },
            { label: 'Reviews', value: mockStats.reviews, icon: Star },
            { label: 'Issues', value: mockStats.issues, icon: BookOpen },
            { label: 'Favoritos', value: mockStats.favorites, icon: Heart },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.12)] border-l-4 border-secondary relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
                <div className="flex justify-between items-start mb-2">
                  <Icon className="h-6 w-6 text-on-primary-container" />
                  {stat.change && (
                    <Badge className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold">
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <p className="text-on-surface-variant font-label-sm uppercase tracking-wider text-xs">
                  {stat.label}
                </p>
                <h3 className="font-headline-lg text-headline-lg text-primary">
                  {stat.value}
                </h3>
              </div>
            );
          })}
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reading Progress */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-headline-md text-headline-md text-primary">
                Progresso de Leitura
              </h4>
              <Button variant="ghost" className="text-secondary font-label-heroic hover:underline">
                Ver todos
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockReadings.map((reading) => (
                <div key={reading.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.12)] group">
                  <div className="h-48 w-full relative">
                    <Image
                      src={reading.image}
                      alt={reading.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-3 bg-linear-to-t from-primary/90 to-transparent">
                      <h5 className="text-white font-bold text-lg">{reading.title}</h5>
                      <p className="text-white/80 text-xs">{reading.publisher}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                      <span>{reading.currentPage} de {reading.totalPages} páginas</span>
                      <span>{reading.progress}%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-secondary h-full rounded-full transition-all duration-1000"
                        style={{ width: `${reading.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-on-surface-variant/70 italic">
                      Iniciado em {reading.startedAt}
                    </p>
                    <Button className="w-full py-2 bg-secondary text-white font-label-heroic rounded-lg hover:brightness-110 active:scale-[0.98] transition-all">
                      Continuar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-headline-md text-headline-md text-primary">
              Últimas Atividades
            </h4>

            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_10px_20px_rgba(0,0,0,0.12)] border border-outline-variant/10">
              <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-outline-variant/30">
                {/* Today */}
                <div>
                  <h6 className="text-[10px] font-bold text-on-primary-container uppercase tracking-widest mb-2 ml-8">
                    Hoje
                  </h6>
                  <div className="space-y-3">
                    {mockActivities.slice(0, 2).map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex gap-3 relative">
                          <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center z-10 shrink-0 border-2 border-white shadow-sm`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-on-surface">
                              {activity.type === 'start' && 'Começou a ler '}
                              {activity.type === 'review' && 'Avaliou '}
                              {activity.type === 'add' && 'Adicionou '}
                              {activity.type === 'finish' && 'Terminou a leitura de '}
                              <span className="font-bold">{activity.title}</span>
                              {activity.subtitle && ` ${activity.subtitle}`}
                            </p>
                            <p className="text-xs text-on-surface-variant">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Yesterday */}
                <div className="mt-4">
                  <h6 className="text-[10px] font-bold text-on-primary-container uppercase tracking-widest mb-2 ml-8">
                    Ontem
                  </h6>
                  <div className="space-y-3">
                    {mockActivities.slice(2).map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex gap-3 relative">
                          <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center z-10 shrink-0 border-2 border-white shadow-sm`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-on-surface">
                              {activity.type === 'start' && 'Começou a ler '}
                              {activity.type === 'review' && 'Avaliou '}
                              {activity.type === 'add' && 'Adicionou '}
                              {activity.type === 'finish' && 'Terminou a leitura de '}
                              <span className="font-bold">{activity.title}</span>
                              {activity.subtitle && ` ${activity.subtitle}`}
                            </p>
                            <p className="text-xs text-on-surface-variant">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="w-full mt-4 py-2 text-on-primary-container text-xs hover:text-secondary transition-colors border-t border-outline-variant/20 pt-3">
                Carregar mais atividades
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
