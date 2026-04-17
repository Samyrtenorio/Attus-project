export type PaginaParams = {
  pagina: number;
  tamanho: number;
};

export type Pagina<T> = {
  itens: T[];
  total: number;
  pagina: number;
  tamanho: number;
  totalPaginas: number;
};

export function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams,
): Pagina<T> {
  const pagina = Math.max(params.pagina, 1);
  const tamanho = Math.max(params.tamanho, 1);

  const filtrados = data.filter(filterFn);
  const total = filtrados.length;
  const inicio = (pagina - 1) * tamanho;

  return {
    itens: filtrados.slice(inicio, inicio + tamanho),
    total,
    pagina,
    tamanho,
    totalPaginas: Math.ceil(total / tamanho),
  };
}
