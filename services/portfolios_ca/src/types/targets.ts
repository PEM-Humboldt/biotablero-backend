export interface PortfoliosByTarget {
  target_id: number;
  target_name: string;
  target_text_key: string;
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
  id: number;
  name: string;
  textKey: string;
}

export interface TargetsServiceI {
  getPortfoliosByTarget: (
    areaType: string,
    areaId: string | number,
    targetId: number,
  ) => Promise<PortfoliosByTarget>;
  getTargetsList: (areaType: string, areaId: string | number) => Promise<Array<TargetsList>>;
}
