'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Bell, 
  Bookmark, 
  User, 
  Home, 
  Library, 
  Star,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useUIStore } from '@/lib/stores/ui.store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/publishers', label: 'Editoras', icon: Library },
  { href: '/characters', label: 'Personagens', icon: User },
  { href: '/comic-series', label: 'Séries', icon: Bookmark },
];

const protectedLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Compass },
  { href: '/collections', label: 'Coleções', icon: Library },
  { href: '/reviews', label: 'Reviews', icon: Star },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname?.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-primary text-on-primary sticky top-0 z-50 shadow-lg shadow-primary/20">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-secondary flex items-center justify-center rounded-lg shadow-inner">
              <span className="text-white font-black text-sm">HQ</span>
            </div>
            <span className="text-headline-md font-headline-md font-black tracking-tighter text-on-primary hidden sm:block">
              HQVERSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-label-heroic font-label-heroic transition-colors duration-200 hover:text-tertiary-fixed-dim',
                  isActive(href) 
                    ? 'text-secondary-container border-b-2 border-secondary-container pb-1' 
                    : 'text-on-primary/70'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-surface-container-low border-none text-on-surface text-label-sm px-4 py-2 rounded-full w-48 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:w-64 transition-all outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
            </div>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="text-on-primary hover:text-secondary-container transition-colors p-1.5 rounded-lg hover:bg-on-primary/10">
                  <Bell className="h-5 w-5" />
                </button>

                {/* Bookmarks */}
                <button className="text-on-primary hover:text-secondary-container transition-colors p-1.5 rounded-lg hover:bg-on-primary/10">
                  <Bookmark className="h-5 w-5" />
                </button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                      <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-secondary-container/50 hover:border-secondary-container transition-colors">
                        <Avatar className="w-full h-full">
                          <AvatarImage src={user?.avatarUrl || undefined} alt={user?.displayName || 'User'} />
                          <AvatarFallback className="bg-secondary/20 text-secondary font-bold">
                            {user?.displayName?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <ChevronDown className="h-4 w-4 text-on-primary/70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.displayName}</p>
                        <p className="text-xs text-muted-foreground">@{user?.username}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/collections" className="cursor-pointer">
                        <Library className="mr-2 h-4 w-4" />
                        Minhas Coleções
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/reviews" className="cursor-pointer">
                        <Star className="mr-2 h-4 w-4" />
                        Minhas Reviews
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-error cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  asChild 
                  variant="ghost" 
                  className="text-on-primary hover:text-secondary-container hover:bg-on-primary/10"
                >
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-secondary text-on-secondary hover:bg-secondary/90"
                >
                  <Link href="/register">Cadastrar</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-on-primary hover:text-secondary-container transition-colors p-1.5 rounded-lg hover:bg-on-primary/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-on-primary/10">
            <div className="flex flex-col space-y-3">
              {/* Search Mobile */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low border-none text-on-surface text-body-md px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
              </div>

              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-body-md font-medium transition-colors py-2 px-3 rounded-lg',
                    isActive(href) 
                      ? 'bg-on-primary/10 text-on-primary' 
                      : 'text-on-primary/70 hover:text-on-primary hover:bg-on-primary/5'
                  )}
                  onClick={toggleMobileMenu}
                >
                  {label}
                </Link>
              ))}

              {isAuthenticated && protectedLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-on-primary/70 hover:text-on-primary hover:bg-on-primary/5 transition-colors py-2 px-3 rounded-lg flex items-center gap-2"
                  onClick={toggleMobileMenu}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}

              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="text-error hover:bg-error/10 transition-colors py-2 px-3 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
