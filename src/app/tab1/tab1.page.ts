import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent,
  IonModal, IonButton, IonButtons, IonIcon, IonSpinner, IonChip, IonLabel,
  IonFab, IonFabButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { volumeHighOutline, closeOutline, sparklesOutline, imagesOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { Pokemon, PokemonDetail } from '../services/pokemon';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent,
    IonModal, IonButton, IonButtons, IonIcon, IonSpinner, IonChip, IonLabel,
    IonFab, IonFabButton
  ]
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll?: IonInfiniteScroll;

  pokemonList: PokemonDetail[] = [];
  offset = 0;
  limit = 20;
  searchTerm = '';
  isLoading = false;
  notFound = false;

  selectedPokemon: PokemonDetail | null = null;
  activeImage: string = '';
  isModalOpen = false;
  isPlayingSound = false;

  // easter egg
  pokeballTaps = 0;
  cornerPokemon: PokemonDetail | null = null;
  isCornerPlaying = false;

  constructor(
    private pokemonService: Pokemon,
    private router: Router
  ) {
    addIcons({ volumeHighOutline, closeOutline, sparklesOutline, imagesOutline, shieldCheckmarkOutline });
  }

  ngOnInit() {
    this.loadPokemon();
    this.loadRandomCornerPokemon();
  }

  loadPokemon(event?: any) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.notFound = false;

    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe({
      next: (res) => {
        const requests = res.results.map(p => this.pokemonService.getPokemonDetail(p.name));
        forkJoin(requests).subscribe({
          next: (details) => {
            this.pokemonList = [...this.pokemonList, ...details];
            this.offset += this.limit;
            this.isLoading = false;
            if (event) event.target.complete();
          },
          error: () => {
            this.isLoading = false;
            if (event) event.target.complete();
          }
        });
      },
      error: () => {
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  onSearchChange(event: any) {
    const value = event.detail.value ? event.detail.value.trim().toLowerCase() : '';
    this.searchTerm = value;

    if (!value) {
      this.pokemonList = [];
      this.offset = 0;
      this.notFound = false;
      if (this.infiniteScroll) this.infiniteScroll.disabled = false;
      this.loadPokemon();
      return;
    }

    this.isLoading = true;
    this.notFound = false;
    if (this.infiniteScroll) this.infiniteScroll.disabled = true;

    this.pokemonService.getPokemonDetail(value).subscribe({
      next: (pokemon) => {
        this.pokemonList = [pokemon];
        this.isLoading = false;
      },
      error: () => {
        this.pokemonList = [];
        this.isLoading = false;
        this.notFound = true;
      }
    });
  }

  openDetail(pokemon: PokemonDetail) {
    this.selectedPokemon = pokemon;
    this.activeImage = pokemon.mainImage;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  selectGalleryImage(imgUrl: string) {
    this.activeImage = imgUrl;
  }

  playCry(cryUrl: string | null) {
    if (!cryUrl) return;
    const audio = new Audio(cryUrl);
    this.isPlayingSound = true;
    audio.play().catch(() => {
      this.isPlayingSound = false;
    });
    audio.onended = () => {
      this.isPlayingSound = false;
    };
  }

  // easter egg
  onPokeballTap() {
    this.pokeballTaps++;
    if (this.pokeballTaps >= 7) {
      this.pokeballTaps = 0;
      (document.activeElement as HTMLElement)?.blur();

      const random1 = Math.floor(Math.random() * 1025) + 1;
      let random2 = Math.floor(Math.random() * 1025) + 1;
      if (random2 === random1) random2 = random1 === 1025 ? 1 : random1 + 1;

      this.router.navigate(['/tabs/tab2'], {
        queryParams: { p1: random1, p2: random2, r: Date.now() }
      });
    }
  }

  // Carga un Pokémon aleatorio 
  loadRandomCornerPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    this.pokemonService.getPokemonDetail(randomId).subscribe({
      next: (p) => {
        this.cornerPokemon = p;
      }
    });
  }

  // sonido y cambia a otro Pokémon aleatorio
  playCornerPokemon() {
    if (!this.cornerPokemon || this.isCornerPlaying) return;

    const cryUrl = this.cornerPokemon.cryUrl;
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      this.isCornerPlaying = true;
      audio.play().catch(() => {
        this.isCornerPlaying = false;
      });
      audio.onended = () => {
        this.isCornerPlaying = false;
        this.loadRandomCornerPokemon();
      };
    } else {
      this.loadRandomCornerPokemon();
    }
  }
}