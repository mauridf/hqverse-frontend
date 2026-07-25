'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Pause,
  CheckCircle,
  MoreVertical,
  Star,
  History,
  ArrowRight,
  Plus,
  BookOpen,
  TrendingUp,
  Award
} from 'lucide-react';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

// Mock data - será substituído por dados da API
const mockReadings = [
  {
    id: 1,
    title: 'Batman #428',
    publisher: 'DC Comics • Jim Starlin',
    progress: 75,
    currentPage: 24,
    totalPages: 32,
    isFavorite: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE9tJ97jwxNIDHga2Ewep4twG74kToyF2M9zzosRMSPOz3DZo0aWN35JzU5lSeUu-t3iHHq2JYpiolT6k57epevXPxFfWFFRosa5tftZHSyJuief9FisinNPpY98iU84QeNXgNwoL1UzdMMjuOXYk7HNwcTKAbPnON24vS9TIo6kWZpX4hEZHZTqDjEY237MA-qeuPKCUqq5MI6h7ZCxYKXKcgGS1pSq6K_OttuyXD38a3meFk__NzKmxavmsDGMl6HeSU0-2XlAI',
  },
  {
    id: 2,
    title: 'Watchmen #1',
    publisher: 'DC Comics • Alan Moore',
    progress: 15,
    currentPage: 6,
    totalPages: 40,
    isFavorite: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaXy_rFCPrJvrv9PZDA_on0MEGptitBkNsPx5Vho5fEDQN0WIsOnEyHfDyZPHv4J6KeCVA1e3jvfSzGEoNy4tx-sQHj_cbiGtkDm7R-_1gJhkgGVVi_fK5-P9mmZMyC8OjrWne_PPk22ak-Fo2lhp0RCjo6pEpJ26guPfltXuzaJXE96QS91k8cVvODjB02c-GRB8tH2Vc4syMESd2bWpvSJcysh2AwgfeXMqA3h5JvZkNSJMHe2BTGSckeW0aoS0dRgbQJbwrBDY',
  },
];

const mockHistory = [
  {
    id: 1,
    title: 'Spider-Man #12',
    publisher: 'Marvel Comics',
    status: 'complete',
    completedAt: 'Ontem, 22:30',
    rating: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUdq_owCmnT5p-R4wfSKTBSCINw_Xg7UP7al7fJLsUA-DDO1yfOZrHZ3a3P8FEuDdC5ckJ_61YE_yTWqtZb2KYdSPZIwdI4oaDGZkM75Pnl7qDa4cE9Ao7nQOULkgwF-k3FO-TNsSb_HfMVQSOwvwkRawgfMRkGTYEI8yuzAsQJsUcpFxlBTMXAxS9GPRUg8M5ZXNjgUlfxi9F_kJ4Z3TRnZTQAdwbS91zS-URqoJGZOgjOubOXzufCZRJyaPLlH3UEp_ssvBc-eQ',
  },
  {
    id: 2,
    title: 'Saga Vol. 1',
    publisher: 'Image Comics',
    status: 'complete',
    completedAt: '15 Out, 2023',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Eb2zMfD7nyn-gbA89LxepZS5jaM27A7z2-FoEEVOhPa_uRFosF2BxJF0Z7cDDyVrAsj5cN6jTaZ7tTfYGCLD6Jy8BYHURI3s-uwE5mmFAlO6772d_lFjGHTJ_EHscUdWHyx6jFglipl9_46M23cV5qvrWZzPH9cO4CDsiyL9kaYLm1afJLjblFf4Wva9ETrkzM83j51N-IjKb_0NkT9HqHD0TxPP5JVpiCvhqa6Aa-3YTrK9oSNQM0i2Xv2hAlfgcNYZnJ7BZvs',
  },
];

function ReadingContent() {
  const [activeReadings, setActiveReadings] = useState(mockReadings);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-4 py-6 md:pl-70">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-1">
              Minhas Leituras
            </h1>
            <p className="text-on-surface-variant font-body-lg max-w-xl">
              Continue de onde parou ou finalize suas edições pendentes. O próximo capítulo te espera.
            </p>
          </div>
          <Button className="bg-secondary text-on-primary font-label-heroic px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Adicionar HQ
          </Button>
        </div>

        {/* Active Readings */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Play className="h-5 w-5 text-secondary" />
            <h2 className="font-headline-md text-headline-md text-primary">Leituras Ativas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {activeReadings.map((reading) => (
              <div 
                key={reading.id}
                className="bg-white rounded-xl overflow-hidden border border-surface-container-high shadow-[10px_10px_0px_0px_rgba(9,20,38,0.05)] group hover:border-secondary transition-all"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="w-full sm:w-1/3 relative aspect-3/4 sm:aspect-auto">
                    <Image
                      src={reading.image}
                      alt={reading.title}
                      fill
                      className="object-cover"
                    />
                    {reading.isFavorite && (
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-secondary text-white text-[10px] font-bold uppercase tracking-widest">
                          Favorito
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-headline-md text-xl text-primary leading-tight">
                          {reading.title}
                        </h3>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-on-surface-variant text-label-sm mb-3">
                        {reading.publisher}
                      </p>
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-label-sm font-bold text-primary">
                          <span>{reading.progress}% Concluído</span>
                          <span>{reading.currentPage}/{reading.totalPages} págs</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-secondary rounded-full transition-all duration-1000"
                            style={{ width: `${reading.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button className="w-full py-2 bg-secondary text-white rounded-lg font-label-heroic hover:brightness-110 transition-all flex items-center justify-center gap-2">
                        <Play className="h-4 w-4" />
                        Continuar
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="py-2 border-2 border-primary text-primary rounded-lg font-label-heroic hover:bg-primary hover:text-white transition-all text-xs">
                          <Pause className="h-3 w-3 mr-1" />
                          Pausar
                        </Button>
                        <Button variant="outline" className="py-2 bg-surface-container-high text-on-surface-variant rounded-lg font-label-heroic hover:bg-secondary-fixed-dim transition-all text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Finalizar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State / Add New */}
            <div className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-6 bg-surface-container-lowest group cursor-pointer hover:bg-white hover:border-secondary transition-all">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-3 group-hover:bg-secondary-fixed transition-all">
                <Plus className="h-8 w-8 text-on-surface-variant group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="font-headline-md text-lg text-primary text-center">Retomar outra obra?</h3>
              <p className="text-on-surface-variant text-label-sm text-center mt-1">
                Escolha na sua coleção para começar uma nova leitura ativa.
              </p>
            </div>
          </div>
        </section>

        {/* Reading History */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-secondary" />
              <h2 className="font-headline-md text-headline-md text-primary">Histórico Recente</h2>
            </div>
            <Button variant="ghost" className="text-secondary font-label-heroic flex items-center gap-1 hover:underline">
              Ver tudo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-surface-container-high overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-4 py-3 text-label-heroic text-on-surface-variant uppercase tracking-wider text-xs">Obra</th>
                    <th className="px-4 py-3 text-label-heroic text-on-surface-variant uppercase tracking-wider text-xs">Status</th>
                    <th className="px-4 py-3 text-label-heroic text-on-surface-variant uppercase tracking-wider text-xs">Finalizado em</th>
                    <th className="px-4 py-3 text-label-heroic text-on-surface-variant uppercase tracking-wider text-xs">Avaliação</th>
                    <th className="px-4 py-3 text-label-heroic text-on-surface-variant uppercase tracking-wider text-xs text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  {mockHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-14 bg-surface-container rounded overflow-hidden shrink-0 shadow-sm">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={40}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{item.title}</p>
                            <p className="text-xs text-on-surface-variant">{item.publisher}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          Completo
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant text-label-sm">
                        {item.completedAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-0.5 text-tertiary-fixed-dim">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-4 w-4',
                                i < item.rating ? 'fill-current' : 'text-outline-variant'
                              )}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Star className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stats & Achievements */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border-2 border-secondary/20 bg-[radial-gradient(circle,rgba(186,0,53,0.1)_1px,transparent_1px)] bg-size-[6px_6px]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-white shadow-lg">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-primary text-lg">Mestre da Leitura</h4>
                <p className="text-on-surface-variant text-sm">Você leu 12 HQs este mês! Falta pouco para bater sua meta de 15.</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="w-24 h-24 rounded-full border-4 border-secondary flex items-center justify-center">
                <span className="font-black text-2xl text-secondary">80%</span>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h4 className="text-on-primary-container font-label-heroic uppercase tracking-widest text-[10px] mb-1">
                Tempo total
              </h4>
              <p className="text-3xl font-black">48h <span className="text-lg font-normal text-on-primary-container">lidas</span></p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-secondary-fixed-dim">
              <TrendingUp className="h-4 w-4" />
              <span>+12% que na semana passada</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ReadingPage() {
  return (
    <AuthGuard>
      <ReadingContent />
    </AuthGuard>
  );
}
