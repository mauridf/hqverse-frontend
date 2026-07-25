'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  Calendar, MapPin, 
  Heart, BookOpen, ArrowRight,
  Globe
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MockCharacter {
  name: string;
  realName: string;
  image: string;
}

interface MockSeries {
  name: string;
  description: string;
  issues: number;
  status: string;
  image: string;
}

interface MockPublisher {
  id: number;
  name: string;
  founded: string;
  location: string;
  website: string;
  description: string;
  logo: string;
  characters: MockCharacter[];
  series: MockSeries[];
  quote: string;
  quoteAuthor: string;
}

// Mock data - será substituído por dados da API
const mockPublisherData: Record<string, MockPublisher> = {
  marvel: {
    id: 1,
    name: 'Marvel Comics',
    founded: '1939',
    location: 'New York, USA',
    website: 'marvel.com',
    description: `A Marvel Comics é uma das principais editoras de quadrinhos do mundo, conhecida por criar o vasto e interconectado Universo Marvel. Desde sua fundação em 1939 como Timely Publications, a Marvel revolucionou o gênero heroico ao introduzir personagens com dilemas humanos reais, sob a liderança visionária de Stan Lee, Jack Kirby e Steve Ditko.`,
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5lvZc6Ej1U23x9Mqv9vFthOB1MAMXwDv4fVs1uZq-RpXQRQTe6wKq83bnmFhZFSBh3kCXT0FuWJtkq-j5lO6G7PeJXhOhGxU_AJinEleIfNaOwZm3g0MYWHHRzR6YLlyvoxn7ra_KYeXc5FRRByFZSdR0KtkXJct3W6_12Ln4fWzPfX9JeJY1-dIBUJrm7PhmQbPMjK6FO_KI_NAbTXIf8amNSficpldX3gostscirJB5WE6jwJ_REnGi-Ve5Pb-E4nOh2mRH6tg',
    characters: [
      { name: 'Spider-Man', realName: 'Peter Parker', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrnck2egDI_OFBTHcCoevPH6xOl5HPMlz7Id2fgOvB56If1jbv5UfNlgCPxD6vaIvifEXDEskAL8sF711X88iVDwoCMLp1f6G9baMO0vR9E04S0gi3OgcI-89PUxfXuUiP1HbWk0sTKKSDYyJJvhYrBwjJHgEr2PECaEYcJNbzSqXw8asBeAieDz5BRs9zW-dHBqhcQXqVsA3cShv5MGClsiixXAvD5V-9eot6Bg4BvaJWDdD0MJp78cDxlSs9QJaIepqyhDDekhQ' },
      { name: 'Iron Man', realName: 'Tony Stark', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9YY-cBUdfsGZRX-CUH1cWyfY8heipnITDrhDQCgTzwNErcUYW64JRQAS6OZY0OaMFC0iOnhRryKiDsCHFh5OxRWgi0b7EFVkIMLv5I4eBeUmqY_g7OrtLfJnRG67JU3XGTKNeUsrz-s80yeIF41ikWlATF0dBpjQoSqE2wXI8j_yW00cOdHmi9Sa6rLc8Oz5KJm4BIe5rElhOnFeIlA5zGbbwPtYh5pjgZ0ZQXTMFMTaSlNdPpoRWb_P8sw3UIYOS69YCAeP8-g' },
      { name: 'Ant-Man', realName: 'Scott Lang', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy-3LCScWzZmSRF8mAreDqu4gsp1w7Kre4l14eNHO3jmRPZvjMvavG_Tf91UCKCXBydSmMQU5mQEm0o9AYXVFqKBxKqH4VJ-SenjeE3Il4Vf8jcQes4_BK2MXMeXJVufns2md4oPQ69n3gyNEOCYpjWfflbjKDTtSLJ9s7tlI_xK4PX8DMnIesW9i8AcplVvtg1y0BFoxOzyDJsCBPsbcckBJgRDHr1a8IxyL8bi1LRkcrmbrcRBapF18Rq86Oi-axiR5ysvwKzOA' },
      { name: 'Thor', realName: 'Thor Odinson', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1WfrxqfnhGLUwWC1fCbMY8YjMwvnm5gyYxoLCC_hR2oVHo2FfPkqpVQUUkepMCLpdNrlylIWj5c77Rvv5Z0LEJNxAtPkTp1ynnpJ1Df6hrDu5FkFACel44RlAyYpO3J-TrpXwdV6z4IPQvge6VtqfoaloIEH8clHiXxhK4Oft2q0cuylJx9klAbjFIkLkE8ySuxj8P1-Mls04qe7vQBhl9PTdF6bSmOsREn3ciRyDQUqG1xAaDBo_pC99unG5xZRcvxf04HFfgpw' },
    ],
    series: [
      { name: 'Amazing Spider-Man', description: 'The legendary journey of Peter Parker.', issues: 950, status: 'Active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAd2-YR_9iuUAkITxqZVMNAJp35jdqAon5nbG44aR_aeXvTN6VWJDQmjUT3edke9ikPfWEXkeJI7OA2icgbH4EmHFqO-bmyRh7QlmrQOQZ-qnmhiNzpnq35LTN7X9JI2I7et1g5QPsNrvNqZEfG-pJ2qoP6lAAXDfftYPiAsFZv3utdI2B5TvZ-QyU107NplJU2vOPnKG51E8-zK3z1MrHmbQruaOdM6F5EBvpK7tOYsekPJgKSoA7WifcqYJA48LhyX4dW0wOGeo' },
      { name: 'Avengers', description: "Earth's mightiest heroes unite against all odds.", issues: 760, status: 'Active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCrsy83K311eYSu80p238FY3R8iBvZZS-P_oCJY_KSypZeCqV3I3J5pONXwVtRFv9Mukef-8cZwAMJ76xjAE0uibmhzR6PZ16fyMCQJ6E4QI18VM-fFjY2CkrWZGWa-zg-618OyqwvBWMrl7RHKHV4iaI6mnxzgApogYmmTtyJsNwkaFLFIG259Qd-MplhgzSfT8Xzu9EmdzDfMi4NSxjJvusJG2KMkkcgBnyQ6x4BWa3_Je2MgGL5vkJQDKxdgAkqwH4XMY1RNiU' },
      { name: 'X-Men', description: 'Protecting a world that fears and hates them.', issues: 640, status: 'Active', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfZBzbGDxBd24z6faNG7E_BRjNzXtAoyMIBcENkAzadYtwA85aRSZdI8zCHOixiXL0P1ChTNHb73NmfLj9fMfeRt0gpg_zBk3DVwiSvl0I5vXFqf-zv8s7txD-wt3qEX53EbRaFa5arHWhxkYNb1kraJwE6n6Njc4xzWzddWx1fLmRI9J7zSfzCAvLARy3nGclpRkFKuI_QRFOK8d5_YrbAohttdMJozDnF1FAR8i00g4CpH8LaO1dP_YhzQZxEqeYdzqxH7Jg2CI' },
    ],
    quote: '"With great power comes great responsibility."',
    quoteAuthor: 'Stan Lee',
  },
};

export default function PublisherDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const publisher = mockPublisherData[slug];
  const [isFavorited, setIsFavorited] = useState(false);

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
                src={publisher.logo}
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
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span className="font-body-md text-on-surface-variant">
                    <span className="font-bold text-on-surface">Fundada:</span> {publisher.founded}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span className="font-body-md text-on-surface-variant">
                    <span className="font-bold text-on-surface">Local:</span> {publisher.location}
                  </span>
                </div>
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
              </div>

              <div className="mt-4 max-w-3xl">
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {publisher.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Key Characters */}
          <section className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-primary">Key Characters</h2>
              <Button variant="ghost" className="text-secondary font-label-heroic hover:underline">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {publisher.characters.map((char: MockCharacter, index: number) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group border border-transparent hover:border-outline-variant"
                >
                  <div className="w-14 h-14 rounded-full bg-surface-container overflow-hidden shrink-0 shadow-sm border-2 border-white">
                    <Image
                      src={char.image}
                      alt={char.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary">{char.name}</h3>
                    <p className="text-label-sm text-on-surface-variant">{char.realName}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-outline group-hover:text-secondary transition-colors" />
                </div>
              ))}
            </div>
          </section>

          {/* Series */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-primary">Séries desta Editora</h2>
              <Button variant="outline" size="sm" className="bg-surface-container px-4 py-2 rounded-lg font-label-heroic text-primary hover:bg-outline-variant transition-colors">
                Filter by Year
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {publisher.series.map((series: MockSeries, index: number) => (
                <Link 
                  key={index}
                  href={`/comic-series/${series.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden border border-outline-variant flex flex-col h-full hover:-translate-y-2 transition-transform"
                >
                  <div className="relative h-48">
                    <Image
                      src={series.image}
                      alt={series.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/80 to-transparent">
                      <Badge className="bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {index === 0 ? 'Top Rated' : 'Popular'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <h3 className="font-headline-md text-[20px] leading-tight text-primary">
                        {series.name}
                      </h3>
                      <p className="text-on-surface-variant text-body-md mt-1">
                        {series.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2 border-t border-outline-variant pt-2">
                      <span className="text-label-sm font-bold text-on-surface-variant flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {series.issues} Issues
                      </span>
                      <Badge variant="secondary" className="text-secondary font-bold text-label-sm">
                        {series.status}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* History Section */}
        <section className="max-w-4xl mx-auto py-8">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Our Legacy &amp; History</h2>
          <div className="text-on-surface-variant space-y-4">
            <p className="font-body-lg leading-relaxed">
              O &ldquo;Método Marvel&rdquo; de criação de quadrinhos, desenvolvido nos anos 60, permitiu uma colaboração sem precedentes entre escritores e artistas, resultando em algumas das narrativas mais dinâmicas da história do meio. A Marvel não apenas criou heróis; ela criou ícones que refletem as complexidades da sociedade moderna.
            </p>
            
            <div className="bg-primary-container p-6 rounded-xl text-on-primary-container relative overflow-hidden my-6">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="text-8xl">&ldquo;</span>
              </div>
              <blockquote className="relative z-10 font-headline-md text-headline-md italic leading-tight">
                {publisher.quote}
              </blockquote>
              <p className="mt-2 font-label-heroic uppercase tracking-widest text-secondary">
                — {publisher.quoteAuthor}
              </p>
            </div>

            <p className="font-body-lg leading-relaxed">
              Hoje, a Marvel Comics continua a expandir os limites da narrativa sequencial, abraçando novas tecnologias e plataformas digitais para levar suas histórias a uma audiência global, mantendo sempre o coração humano que define suas maiores criações.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}