import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autenticação',
  description: 'Faça login ou crie sua conta no HQVerse',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4 relative overflow-hidden">
      {/* Halftone Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #091426 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
      </div>
      
      {/* Decorative Halftone SVG */}
      <div className="fixed bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
          <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>
      
      <div className="w-full max-w-[480px] z-10">
        {children}
      </div>
    </div>
  );
}
