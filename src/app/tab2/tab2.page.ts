import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonBadge, IonSpinner, IonText,
  IonProgressBar, IonButton, IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { volumeHighOutline } from 'ionicons/icons';
import { Pokemon, PokemonDetail } from '../services/pokemon';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonGrid, IonRow, IonCol, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonSpinner, IonText,
    IonProgressBar, IonButton, IonIcon
  ]
})
export class Tab2Page implements OnInit {
  pokemon1: PokemonDetail | null = null;
  pokemon2: PokemonDetail | null = null;

  search1Text = 'pikachu';
  search2Text = 'charizard';

  isLoading = false;
  error1 = '';
  error2 = '';

  private ignoreNextInput1 = false;
  private ignoreNextInput2 = false;

  constructor(
    private pokemonService: Pokemon,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ volumeHighOutline });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['p1'] && params['p2']) {
        this.ignoreNextInput1 = true;
        this.ignoreNextInput2 = true;
        this.search1Text = String(params['p1']);
        this.search2Text = String(params['p2']);
        this.loadBoth(this.search1Text, this.search2Text);
      } else if (!this.pokemon1 && !this.pokemon2) {
        this.ignoreNextInput1 = true;
        this.ignoreNextInput2 = true;
        this.loadBoth(this.search1Text, this.search2Text);
      }
    });
  }

  loadBoth(q1: string, q2: string) {
    this.isLoading = true;
    this.error1 = '';
    this.error2 = '';

    const req1$ = this.pokemonService.getPokemonDetail(q1).pipe(
      catchError(() => {
        this.error1 = `No se encontró "${q1}"`;
        return of(null);
      })
    );

    const req2$ = this.pokemonService.getPokemonDetail(q2).pipe(
      catchError(() => {
        this.error2 = `No se encontró "${q2}"`;
        return of(null);
      })
    );

    forkJoin([req1$, req2$])
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(([res1, res2]) => {
        if (res1) this.pokemon1 = res1;
        if (res2) this.pokemon2 = res2;
      });
  }

  onSearch1(event: any) {
    if (this.ignoreNextInput1) {
      this.ignoreNextInput1 = false;
      return;
    }
    const query = (event?.detail?.value ?? '').trim().toLowerCase();
    if (!query) {
      this.error1 = '';
      return;
    }
    this.search1Text = query;
    this.isLoading = true;
    this.error1 = '';

    this.pokemonService
      .getPokemonDetail(query)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (p) => (this.pokemon1 = p),
        error: () => (this.error1 = `No se encontró "${query}"`)
      });
  }

  onSearch2(event: any) {
    if (this.ignoreNextInput2) {
      this.ignoreNextInput2 = false;
      return;
    }
    const query = (event?.detail?.value ?? '').trim().toLowerCase();
    if (!query) {
      this.error2 = '';
      return;
    }
    this.search2Text = query;
    this.isLoading = true;
    this.error2 = '';

    this.pokemonService
      .getPokemonDetail(query)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (p) => (this.pokemon2 = p),
        error: () => (this.error2 = `No se encontró "${query}"`)
      });
  }

  playCry(cryUrl: string | null) {
    if (!cryUrl) return;
    new Audio(cryUrl).play().catch(() => {});
  }

  getTotalStats(p: PokemonDetail): number {
    return p.stats.reduce((acc, s) => acc + s.value, 0);
  }
}