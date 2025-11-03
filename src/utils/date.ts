export function getHours(date: string): string {
  const utcDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return utcDate.toLocaleString("pt-BR", options);
}

export function formatDateTime(isoString: string) {
  const date = new Date(isoString);
  const day = date.toLocaleDateString("pt-BR", { day: "2-digit" });
  const month = date
    .toLocaleDateString("pt-BR", { month: "short" })
    .toUpperCase()
    .replace(".", "");
  const year = date.toLocaleDateString("pt-BR", { year: "numeric" });
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day}, ${month}. ${year} às ${time}`;
}

export function formatDate(isoString: string) {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  if (isNaN(day)) {
    return "";
  }

  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
}
