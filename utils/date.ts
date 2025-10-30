export function getHours(date: string): string {
    const utcDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo', 
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  };

  return utcDate.toLocaleString('pt-BR', options);
}