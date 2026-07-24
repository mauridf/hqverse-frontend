export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(d);
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(d);
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
  if (months > 0) return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
  if (weeks > 0) return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`;
  if (days > 0) return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  if (hours > 0) return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
  return 'agora mesmo';
}

export function isToday(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

export function isThisWeek(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return d >= startOfWeek && d <= endOfWeek;
}

export function isThisMonth(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

export function isThisYear(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return d.getFullYear() === today.getFullYear();
}

export function getDaysBetween(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function addDays(date: string | Date, days: number): Date {
  const d = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: string | Date, months: number): Date {
  const d = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(d);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function addYears(date: string | Date, years: number): Date {
  const d = typeof date === 'string' ? new Date(date) : date;
  const result = new Date(d);
  result.setFullYear(result.getFullYear() + years);
  return result;
}
