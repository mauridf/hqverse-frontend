import Link from 'next/link';
import { Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/contact', label: 'Contact' },
  { href: '/help', label: 'Help Center' },
];

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-highest border-t border-outline-variant">
      <div className="flex flex-col gap-1 items-center md:items-start">
        <span className="font-headline-md text-primary text-headline-md tracking-tighter">
          HQVERSE
        </span>
        <p className="text-body-md font-body-md text-on-surface-variant text-center md:text-left">
          © 2024 HQVerse. Collect the Impossible.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {footerLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-all duration-300"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          size="icon"
          className="w-10 h-10 rounded-full bg-primary text-white hover:bg-secondary transition-colors"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          variant="default"
          size="icon"
          className="w-10 h-10 rounded-full bg-primary text-white hover:bg-secondary transition-colors"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </footer>
  );
}
