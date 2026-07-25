'use client';

import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building,
  QrCode,
  Book,
  Images,
  MessageSquare,
  Users,
  Group,
  MessageCircle,
  RefreshCw,
  Package,
  Star,
  MoreVertical,
} from 'lucide-react';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data - será substituído por dados da API
const mockStats = [
  { label: 'Editoras', value: '1.200', icon: Building, change: '+12%', trend: 'up', color: 'secondary' },
  { label: 'Pers.', value: '25.000', icon: QrCode, change: '+5.2k', trend: 'up', color: 'primary' },
  { label: 'Edições', value: '50.000', icon: Book, change: 'Volume total', trend: 'neutral', color: 'secondary' },
  { label: 'Scans', value: '5.000', icon: Images, change: '30 aguardando', trend: 'down', color: 'primary' },
  { label: 'Reviews', value: '850', icon: MessageSquare, change: 'Média 4.8/5.0', trend: 'up', color: 'secondary' },
  { label: 'Grupos', value: '5', icon: Group, change: 'Equipes de moderação', trend: 'neutral', color: 'primary' },
  { label: 'Usuários', value: '3.400', icon: Group, change: '+45 hoje', trend: 'up', color: 'secondary' },
  { label: 'Rooms', value: '12', icon: MessageCircle, change: '8 ativos agora', trend: 'neutral', color: 'primary' },
];

const mockActivities = [
  { 
    id: 1, 
    type: 'user', 
    title: 'Novo Usuário: @herocllector', 
    description: 'Acabou de se registrar via Social Login',
    time: '12m atrás',
    icon: Group,
    iconBg: 'bg-green-100 text-green-700',
  },
  { 
    id: 2, 
    type: 'import', 
    title: 'Edição Importada: X-Men #12 (2024)', 
    description: 'Pendente de revisão de scan',
    time: '45m atrás',
    icon: Package,
    iconBg: 'bg-blue-100 text-blue-700',
  },
  { 
    id: 3, 
    type: 'report', 
    title: 'Review Denunciada', 
    description: 'Spam detectado em "Batman: Year One"',
    time: '2h atrás',
    icon: MessageSquare,
    iconBg: 'bg-amber-100 text-amber-700',
  },
];

const quickActions = [
  {
    title: 'Sincronizar Comic Vine',
    description: 'Atualize metadados e capas diretamente da API global.',
    icon: RefreshCw,
    color: 'bg-secondary text-white',
    border: 'border-secondary',
  },
  {
    title: 'Importar em Massa',
    description: 'Suba múltiplos arquivos CBZ/CBR simultaneamente.',
    icon: Package,
    color: 'bg-primary text-white',
    border: 'border-primary',
  },
  {
    title: 'Moderar Reviews',
    description: 'Verifique comentários denunciados e mantenha a qualidade.',
    icon: Star,
    color: 'bg-secondary text-white',
    border: 'border-secondary',
  },
];

function AdminContent() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-4 py-6 md:pl-70">
        {/* Hero Header */}
        <section className="relative overflow-hidden rounded-xl bg-primary p-6 mb-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[8px_8px] text-white/5" />
          <div className="relative z-10">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-1">
              Painel de Controle
            </h1>
            <p className="font-body-lg text-primary-fixed/80 max-w-2xl">
              Gestão centralizada do ecossistema HQVerse. Monitore dados críticos, modere conteúdo e controle a escalabilidade da plataforma em tempo real.
            </p>
          </div>
        </section>

        {/* Overview Stats */}
        <section className="mb-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">Visão Geral</h2>
              <div className="h-1 w-24 bg-secondary rounded-full mt-1" />
            </div>
            <span className="text-label-sm text-on-surface-variant italic">Atualizado há 2 minutos</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className={`border-l-4 border-${stat.color} hover:-translate-y-1 transition-all`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-label-sm font-label-heroic text-on-surface-variant uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <Icon className={`h-5 w-5 text-${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div className="font-headline-md text-headline-md text-primary">{stat.value}</div>
                    <div className={`flex items-center gap-1 mt-1 text-label-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-error' : 
                      'text-on-surface-variant'
                    }`}>
                      {stat.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                      {stat.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                      <span>{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-headline-md text-headline-md text-primary">Ações Rápidas</h2>
            <div className="flex-1 h-0.5 bg-surface-container-highest" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`relative overflow-hidden p-6 rounded-2xl border-2 ${action.border} hover:border-secondary transition-all active:scale-[0.98] h-auto flex-col items-center text-center gap-3`}
                >
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[8px_8px] pointer-events-none" />
                  <div className={`relative z-10 w-16 h-16 rounded-full ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="relative z-10">
                    <span className="font-label-heroic text-label-heroic text-secondary block uppercase tracking-widest mb-1">
                      {action.title.split(' ')[0]}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary">{action.title}</h3>
                  </div>
                  <p className="relative z-10 text-label-sm text-on-surface-variant opacity-70">
                    {action.description}
                  </p>
                </Button>
              );
            })}
          </div>
        </section>

        {/* Bottom Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <Card className="p-4">
            <CardHeader className="flex flex-row items-center justify-between px-0 pt-0">
              <CardTitle className="font-headline-md text-headline-md text-primary">Atividade Recente</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="px-0 pb-0 space-y-3">
              {mockActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-surface-container rounded-xl transition-colors">
                    <div className={`w-10 h-10 rounded-lg ${activity.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-body-md font-semibold">{activity.title}</p>
                      <p className="text-label-sm text-on-surface-variant">{activity.description}</p>
                    </div>
                    <span className="text-label-sm opacity-60 flex-shrink-0">{activity.time}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-primary text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[8px_8px]" />
            <CardHeader className="px-0 pt-0 relative z-10">
              <CardTitle className="font-headline-md text-headline-md text-white">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0 relative z-10 space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-label-heroic text-on-primary/80 uppercase text-xs">CPU Usage</span>
                  <span className="text-label-heroic text-secondary">24%</span>
                </div>
                <div className="w-full bg-primary-container h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '24%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-label-heroic text-on-primary/80 uppercase text-xs">Memory</span>
                  <span className="text-label-heroic text-on-primary">4.2GB / 8GB</span>
                </div>
                <div className="w-full bg-primary-container h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-fixed-dim h-full rounded-full" style={{ width: '52%' }} />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary-container/50 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-label-heroic text-on-primary">API Online</span>
                </div>
                <div className="text-label-sm text-on-primary/60">Uptime: 99.98%</div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard requireAdmin>
      <AdminContent />
    </AuthGuard>
  );
}
