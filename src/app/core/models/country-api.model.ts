export interface CountryNowResponse {
  error: boolean;
  data: CountryNow[];
}

export interface CountryNow {
  name: string;
  flag?: string;
  dialCode?: string;
}
