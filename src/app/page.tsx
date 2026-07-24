import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <span className="text-6xl">🦸</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Bem-vindo ao HQVerse
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A maior comunidade de HQs digitalizadas. Catálogo completo, reviews, coleções e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Comece Agora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/publishers">Explorar Catálogo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">O que você encontra no HQVerse</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📚 Catálogo Completo</CardTitle>
              <CardDescription>
                Explore editoras, personagens, séries e edições de HQs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Mais de 50.000 edições catalogadas com informações detalhadas.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>⭐ Reviews</CardTitle>
              <CardDescription>
                Avalie e comente suas HQs favoritas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compartilhe sua opinião com a comunidade e veja o que outros estão dizendo.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>📦 Coleções</CardTitle>
              <CardDescription>
                Organize suas HQs em coleções personalizadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acompanhe seu progresso de leitura e organize suas HQs favoritas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}