'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsCards } from '@/components/profile/StatsCards';
import { RecentReviews } from '@/components/profile/RecentReviews';
import { ReadingProgressWidget } from '@/components/profile/ReadingProgressWidget';
import { AchievementBadge } from '@/components/profile/AchievementBadge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useRouter } from 'next/navigation';

// Mock data - será substituído por dados reais da API
const mockStats = {
  collections: 12,
  reviews: 5,
  issuesCollected: 48,
  favorites: 156,
};

const mockReviews = [
  {
    id: 1,
    title: 'Batman #1 - Clássico!',
    content: 'Simplesmente essencial para qualquer colecionador. A arte de Bob Kane tem aquele charme rústico que definiu o gênero. A história do Coringa aqui ainda é assustadora pela sua simplicidade e impacto psicológico.',
    rating: 5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    issue: {
      id: 1,
      title: 'Batman #1',
      issueNumber: '1',
      coverUrl: 'https://comicvine.gamespot.com/api/image/standard_small/123456.jpg',
      series: {
        name: 'Batman',
        publisher: {
          name: 'DC Comics',
        },
      },
    },
    tags: ['DC Comics', 'Vintage'],
  },
  {
    id: 2,
    title: 'Uncanny X-Men #141',
    content: 'Dias de um Futuro Esquecido começa aqui. O roteiro do Claremont é denso, mas recompensador. Uma das capas mais icônicas da história da Marvel.',
    rating: 4,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    issue: {
      id: 2,
      title: 'Uncanny X-Men #141',
      issueNumber: '141',
      coverUrl: 'https://comicvine.gamespot.com/api/image/standard_small/123457.jpg',
      series: {
        name: 'X-Men',
        publisher: {
          name: 'Marvel',
        },
      },
    },
    tags: ['Marvel', 'Mutants'],
  },
];

const mockReadings = [
  { title: 'Batman: Year One', progress: 85 },
  { title: 'Saga Vol. 3', progress: 42 },
];

function ProfileContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-6 space-y-6">
        {/* Profile Header */}
        <ProfileHeader
          user={user}
          onEdit={() => router.push('/profile/edit')}
          onChangePassword={() => router.push('/profile/change-password')}
        />

        {/* Stats */}
        <StatsCards stats={mockStats} />

        {/* Main Content Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Reviews */}
          <div className="lg:col-span-8">
            <RecentReviews 
              reviews={mockReviews}
              onViewAll={() => router.push('/profile/reviews')}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <ReadingProgressWidget readings={mockReadings} />
            <AchievementBadge
              title="Master Collector"
              tier="Tier 3 Achievement"
              description="Unlocked by collecting over 40 issues across 10 different series. Keep it up, hero!"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
