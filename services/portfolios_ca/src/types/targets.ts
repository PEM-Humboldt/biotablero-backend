export interface TargetsServiceI {
  getPortfoliosByTarget: (targetId: number) => Promise<PortfoliosByTarget>;
  getTargetsList: () => Promise<Array<TargetsList>>;
  getPortfoliosCALayer: (portfolioId: number) => Promise<Buffer>;
}

export interface PortfoliosByTarget {
  target_id: number;
  target_name: string;
  target_national: number;
  target_units_short: string;
  target_units: string;
  portfolios_data: Array<{
    id: number;
    name: string;
    short_name: string;
    value: number;
  }>;
}

export interface TargetsList {
  id: string;
  name: string;
}
