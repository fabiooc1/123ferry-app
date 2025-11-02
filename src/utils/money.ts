export function formatCurrency(valueInCents: number) {
    const valueInReais = Number(valueInCents) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueInReais);
  };
