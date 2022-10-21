export interface PortfoliosServiceI {
  getPortfoliosList: () => Promise<Array<PortfoliosList>>;
  getPortfoliosCALayer: (portfolioId: number) => Promise<Buffer>;
}

export interface PortfoliosList {
  id: number;
  name: string;
}
