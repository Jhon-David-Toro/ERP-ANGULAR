import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { CountryNow, CountryNowResponse } from '../models/country-api.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly countriesUrl = environment.countriesApiUrl;

  getCountries(): Observable<Country[]> {
    return this.http.get<CountryNowResponse>(this.countriesUrl).pipe(
      map((response) => {
        if (response.error) throw new Error('Countries API returned an error');

        return (response.data ?? [])
          .map((country) => this.toCountry(country))
          .filter((country): country is Country => country !== null)
          .sort((first, second) => first.name.localeCompare(second.name));
      })
    );
  }

  private toCountry(country: CountryNow): Country | null {
    const dialCode = this.normalizeDialCode(country.dialCode);

    if (!dialCode) return null;

    return {
      code: country.name,
      name: country.name,
      flagUrl: country.flag ?? '',
      dialCode,
    };
  }

  private normalizeDialCode(dialCode?: string): string {
    if (!dialCode) return '';

    const firstCode = dialCode.split('and')[0];
    const digits = firstCode.replace(/\D/g, '');

    return digits ? `+${digits}` : '';
  }
}
