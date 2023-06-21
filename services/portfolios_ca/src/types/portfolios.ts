export interface PortfoliosList {
  id: number;
  name: string;
  textKey: string;
}

export interface PortfoliosServiceI {
  getPortfoliosList: () => Promise<Array<PortfoliosList>>;
  getPortfoliosCALayer: (portfolioId: number) => Promise<Buffer>;
}
