'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Rocket, Compass, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useDashboard } from '@/lib/hooks/useData';

const mockScans = [
  {
    id: 1,
    title: 'Cosmic Vanguard #42',
    publisher: 'Marvel Comics',
    year: 2024,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABzmpXvUJBlj5Y4eZYWqLXdZCxZoFCWm75DCa1u_QcT-IqRGIUM0PSAVbsA-rEJSLcGMsVirObfzH924e_sLpjRnmGVXw7ZkZ3bqRDh2_ywGOkn1UrTaQpFHOLzOfi-t3GIDWwNb2_Ki-1FNQ7lsJDKnVcNXpo1MuUBbAwlPTX9Jf3dwY5Cvm4xlrDDWuhYtwG2iYjdrv42M1JIqIAFNWYXovjibiJPI16a-fM_ZMXL4dWEzsx1zRzWDX4bsEBarHW8N6t0zNscZk',
    isNew: true,
  },
  {
    id: 2,
    title: 'Neon Knight: Protocol',
    publisher: 'DC Comics',
    year: 2023,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_rzwlHnKSm6Ms5NKOJy0q39PXmBspy_BsnLsA7cRv6VJMnwgWSV9u5spJH0MubrGzFPp924yT_ppeqI9M1wHnc3Esdu7Avc8cFz_44OfH3tQ6nTOOdBzECaR6JzJbUn4oE9tT074dKEr4mgq2gA16b5anox4CCmNyQinGV4C_oC-r7CzCTmmB2z3Fv_E8Mqym6nB0E4f-kdczPcx5iObsPtRseTyXjpA0D5zxIwbsyQqtxql_QXYuJYa8vd_3uRpKwUBLY7me2lo',
    isNew: false,
  },
  {
    id: 3,
    title: 'Legacy Squad #1',
    publisher: 'Image Comics',
    year: 2024,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6SeXaNGzutYY0Zc2UCGAULA8RZZ8rZB5a0i0TwSVXzTqCh6wgkccnAz0dvIB1YutTWExgHntWDChaJQlFvQwbjYD8RjFnan0TMb6KnTNDiRnDbMLQmleVjRaR8SycBxQqd-s7pn9cBXU5sXz2eyLIu-QBk9e8v5UGhzCaqbJZs_wYShAhJohWlriEwXPBHHPSJkK9Pf6FpWM0ufu_6Lnebnvjl5hvyFCl4S4BVm0_9NUEorGQtfZAQr1wEwszEuElpkLpnzdNPd8',
    isNew: false,
  },
  {
    id: 4,
    title: 'The Emerald Staff',
    publisher: 'Vertigo',
    year: 2022,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw1u4KdcHjhOfJPPlVNS3THo2JABgOhqW019zwXAFGGh1xcdn7QeiXZPZMKtvmrLb4UoMYOqp6x1aSQTERxxutYQhynih05jpEZThB1YKCjvihdZ6QAfXEWtM9eGiqQH8yex6NBRZ-iYN3HmVuTiSX2o49C7-N6_RVNOMRI_BUfEI8a26tpj7q2wzG6ICLKcSjmGocibkFV_lbIGPt6C3Myjt6Gw1YWT0cMDjvQY36Vo2GF5LfrYxHlFt9OHdEaStnSS4vdvN3qfo',
    isNew: false,
  },
  {
    id: 5,
    title: 'Orbital Reach #15',
    publisher: 'Dark Horse',
    year: 2024,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4TXoQJrEX05xx4n6cfHMto-pebEglTJSWCMnYGN0ctX6tLTBa1xrR7nFPIMO-jjNiS4KhMPmlgRLMg4TIPHpA1SfEpjgyAaazQoMPvSrHfp3_MVDMLvSq0rMBv8RFIXa43scVpA41ppK32aiB6HIPayIdNvQBYpXPaURFGLf7BDlIlj3UgncPd-OqOPCgcccb0fusqm1OB3mvyIDI3WoH1ezdGRZNiXoDx7e3x4s1rlGLz1vnfY032R6Ukh_t5hsQzxgmwDXykvM',
    isNew: false,
  },
];

const mockReviews = [
  {
    id: 1,
    username: '@hq_master_99',
    rating: 4.5,
    text: '"A arte de Cosmic Vanguard está em outro nível nesta edição. O roteiro amarra bem as pontas soltas da saga anterior. Essencial!"',
    issue: 'Cosmic Vanguard #42',
    time: 'há 2 horas',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7w0B71oxH4_cVXMpUS9PzXv1CtaxJz9ovQ44iaS78pyQf0gxKacuqfwr-9yICl_DeoCxtHt21HbxriFGnOKF4AV94BUi6DeiEKbH0n8nhRSzA8f-rz7Z3N6PfvFYdpofF7KGkxCNkNYva5OCDY5WqcE6whcaiS6ZF3qHMU8xAlLQK_fbbj6ZcjBhRVPPypgk7kSk4b95xjFPJOQI7Kt_aVw1w73r-Oc0U2N7hrQisSbNleaGcL7lBnvvN7bY7EO2yF6f-zlf9DpE',
  },
  {
    id: 2,
    username: '@comic_queen',
    rating: 5,
    text: '"Neon Knight continua sendo a melhor HQ noir do mercado. O uso das cores neon contra o preto absoluto é de tirar o fôlego."',
    issue: 'Neon Knight',
    time: 'há 5 horas',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI9cEpafikYwYEK81jY5iCYj4O0YAOy6CONhuiwrk4khRRVvZJmQmbjDKrNMbPX2A4lnYgumRAi_SoLpHqwxrbeuVkyH6Hm7h73c3Rst5ExRO7YLL_a_RWPNY6xkUNzREMUPrq6lbCWWEgzXrjAzkE4LB-Px_MJiemaB97l8oqD4xgo0v1j7MQmqWEC1cWaAsG4Jvd3bKLL7QBkeR19p-KCNUvL89LOOn9CCh60RcptjAz53GuVhSGylP7H9h8uDW22ltvb3jsLs4',
  },
  {
    id: 3,
    username: '@oldschool_reader',
    rating: 4,
    text: '"Legacy Squad traz aquele sentimento clássico de heroísmo com uma roupagem moderna. Uma ótima surpresa para novos leitores."',
    issue: 'Legacy Squad #1',
    time: 'ontem',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd5QVmMeLDw0JE2oIVqnby-UkmDq_WC4mICnEuye6SFYrwXyX7KEu-fSK86zBLCIDXQSE5V8WeRHf950LZmaWtt5U68q__en6WBpNK6n2jYZKv05BAOm0ek_tCBSKUjqSvF3xe6tQ9DwYHxVUnvoU7fafwnsZUQmYJabFHdjzAYCqTc84mzrrkRFxLnOJKL6nqJIcSIm7-GNjEN95eHI7REiaIZhzf60tC2dFnJjH7u9J-hh6It59sHAX86Ni7wTH11uOrP23vVyI',
  },
];

export default function HomePage() {
  const { data: dashboardData } = useDashboard();
  const stats = dashboardData?.stats;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative w-full h-[85vh] overflow-hidden">
          <div className="absolute inset-0 bg-primary">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUX85P1S5s8imwzoVVo7X2NGBcXAfLhvH2iBcAHeBPIp_rwL18Cmh0q3Q5e9csD2jNI2fr5prTSD-BNMrS59C-NwdRlgR0LFt6fQS2hsiOe3DNXORM-0man52I0MoDZC_iXQjjxAYQS-oQfnbOqbM4ycz5ZOms4dMZv1EbW56NDWtqU17MxwFpBQ18Zy_CsShD1Ulud9DGg55hpbZ66dQlmpAKaIpzWxCVWO6VUoxZrOm4WOfgN0X1Qt7SYT50QSoKwZZQd16fYIc"
              alt="Hero Background"
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/60 to-transparent" />
          
          <div className="relative h-full flex items-end pb-16 px-4 md:px-10 max-w-screen-2xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-on-primary font-display-hero text-[48px] md:text-display-hero leading-tight mb-4">
                A maior comunidade de{' '}
                <span className="text-secondary-fixed">HQs digitalizadas</span>
              </h1>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-secondary text-on-secondary hover:bg-secondary/90 rounded-xl font-label-heroic text-label-heroic px-8 py-6 flex items-center gap-2 shadow-lg hover:shadow-secondary/30 hover:-translate-y-1 transition-all"
                >
                  <Rocket className="h-5 w-5" />
                  Comece Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 rounded-xl font-label-heroic text-label-heroic px-8 py-6 flex items-center gap-2 transition-all"
                >
                  <Compass className="h-5 w-5" />
                  Explorar Catálogo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Global Stats */}
        <section className="bg-primary text-on-primary py-8">
          <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="group">
              <div className="text-headline-lg font-headline-lg text-secondary-fixed group-hover:scale-110 transition-transform">
                {(stats?.publishers ?? 1200).toLocaleString()}
              </div>
              <div className="text-label-heroic text-on-primary-container/80 uppercase tracking-widest">
                Publishers
              </div>
            </div>
            <div className="group">
              <div className="text-headline-lg font-headline-lg text-secondary-fixed group-hover:scale-110 transition-transform">
                {(stats?.characters ?? 25000).toLocaleString()}
              </div>
              <div className="text-label-heroic text-on-primary-container/80 uppercase tracking-widest">
                Characters
              </div>
            </div>
            <div className="group">
              <div className="text-headline-lg font-headline-lg text-secondary-fixed group-hover:scale-110 transition-transform">
                {(stats?.issues ?? 50000).toLocaleString()}
              </div>
              <div className="text-label-heroic text-on-primary-container/80 uppercase tracking-widest">
                Issues
              </div>
            </div>
          </div>
        </section>

        {/* Latest Scans */}
        <section className="py-16 max-w-screen-2xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">Últimos Scans Adicionados</h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg">
                Explore as novidades fresquinhas da comunidade.
              </p>
            </div>
            <Button variant="ghost" className="text-secondary font-label-heroic flex items-center gap-2 hover:gap-3 transition-all">
              Ver Tudo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockScans.map((scan) => (
              <div key={scan.id} className="group cursor-pointer">
                <div className="relative aspect-2/3 rounded-xl overflow-hidden shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)] transition-all group-hover:-translate-y-2">
                  <Image
                    src={scan.image}
                    alt={scan.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    {scan.isNew && (
                      <Badge className="bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mb-1">
                        NEW
                      </Badge>
                    )}
                    <p className="text-white font-bold line-clamp-2">{scan.title}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 pointer-events-none bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-size-[4px_4px] text-secondary/10" />
                </div>
                <div className="mt-2">
                  <h3 className="font-bold text-on-surface group-hover:text-secondary transition-colors">
                    {scan.title}
                  </h3>
                  <p className="text-label-sm text-on-surface-variant">
                    {scan.publisher} • {scan.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Reviews */}
        <section className="bg-surface-container-low py-16">
          <div className="max-w-screen-2xl mx-auto px-4">
            <div className="mb-8">
              <h2 className="font-headline-lg text-headline-lg text-primary">Reviews da Comunidade</h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg">
                O que os leitores estão achando das edições recentes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockReviews.map((review) => (
                <Card key={review.id} className="bg-white p-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)] border-l-4 border-secondary">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
                      <Image
                        src={review.avatar}
                        alt={review.username}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{review.username}</p>
                      <div className="flex text-tertiary-container">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(review.rating)
                                ? 'fill-tertiary-container text-tertiary-container'
                                : i < review.rating
                                ? 'fill-tertiary-container/50 text-tertiary-container'
                                : 'text-outline'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-on-surface-variant italic mb-3">{review.text}</p>
                  <div className="flex items-center justify-between text-label-sm text-on-surface-variant">
                    <span>em {review.issue}</span>
                    <span>{review.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}