export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
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

export function truncateText(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
