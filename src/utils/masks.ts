export const formatPhone = (value: string): string => {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  const country = cleaned.slice(0, 2);
  const ddd = cleaned.slice(2, 4);
  const part1 = cleaned.slice(4, 9);
  const part2 = cleaned.slice(9, 13);

  return `+${country} (${ddd}) ${part1}-${part2}`;
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};
