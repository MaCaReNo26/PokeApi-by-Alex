import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: string[];
  stats: { name: string; value: number }[];
  cryUrl: string | null;
  gifUrl: string | null;
  gallery: string[];
  mainImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class Pokemon {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 20): Observable<{ results: { name: string; url: string }[]; count: number }> {
    return this.http.get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetail(nameOrId: string | number): Observable<PokemonDetail> {
    const query = String(nameOrId).trim().toLowerCase();
    return this.http.get<any>(`${this.baseUrl}/${query}`).pipe(
      map((data) => {
        // Nivel 2: Galería de al menos 5 imágenes reales de la API
        const rawImages = [
          data.sprites?.other?.['official-artwork']?.front_default,
          data.sprites?.other?.['official-artwork']?.front_shiny,
          data.sprites?.other?.home?.front_default,
          data.sprites?.other?.home?.front_shiny,
          data.sprites?.front_default,
          data.sprites?.back_default,
          data.sprites?.front_shiny,
          data.sprites?.back_shiny
        ].filter((img): img is string => Boolean(img));

        // Nivel 2: GIF / WebP animado (Showdown o Black-White animated)
        const gifUrl =
          data.sprites?.other?.showdown?.front_default ||
          data.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
          data.sprites?.front_default;

        // Nivel 2: Sonido (Grito oficial en .ogg de PokeAPI)
        const cryUrl = data.cries?.latest || data.cries?.legacy || null;

        return {
          id: data.id,
          name: data.name,
          height: data.height / 10,
          weight: data.weight / 10,
          base_experience: data.base_experience || 0,
          types: data.types.map((t: any) => t.type.name),
          stats: data.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat
          })),
          cryUrl,
          gifUrl,
          gallery: rawImages,
          mainImage: rawImages[0] || data.sprites?.front_default
        };
      })
    );
  }
}