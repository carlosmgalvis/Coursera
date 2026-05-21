import { Injectable } from '@angular/core';
import { FlickModel } from '../models/flick.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FlickService {
  private flicks: FlickModel[] = [];
  private readonly FLICKS_STORAGE_KEY = 'flicks_data';

  constructor(private storageService: StorageService) {
    this.loadFlicks();
  }

  private loadFlicks(): void {
    // Try to load from storage first
    const storedFlicks = this.storageService.getItem<FlickModel[]>(this.FLICKS_STORAGE_KEY);

    if (storedFlicks) {
      this.flicks = storedFlicks;
    } else {
      // Initialize with default data
      this.flicks = [
        {
          id: 1,
          genre: 'Musical',
          title: 'Book of Mormon',
          image: '~/assets/bookofmormon.png',
          url: 'https://nativescript.org/images/ngconf/book-of-mormon.mov',
          ticketPrice: 89.99,
          availableTickets: 150,
          description: `A satirical examination of the beliefs and practices of The Church of Jesus Christ of Latter-day Saints.`,
          details: [
            {
              title: 'Music, Lyrics and Book by',
              body: 'Trey Parker, Robert Lopez, and Matt Stone',
            },
            {
              title: 'First showing on Broadway',
              body: 'March 2011 after nearly seven years of development.',
            },
            {
              title: 'Revenue',
              body: 'Grossed over $500 million, making it one of the most successful musicals of all time.',
            },
          ],
        },
        {
          id: 2,
          genre: 'Musical',
          title: 'Beetlejuice',
          image: '~/assets/beetlejuice.png',
          url: 'https://nativescript.org/images/ngconf/beetlejuice.mov',
          ticketPrice: 79.99,
          availableTickets: 200,
          description: `A deceased couple looks for help from a devious bio-exorcist to handle their haunted house.`,
          details: [
            {
              title: 'Music and Lyrics',
              body: 'Eddie Perfect',
            },
            {
              title: 'Book by',
              body: 'Scott Brown and Anthony King',
            },
          ],
        },
        {
          id: 3,
          genre: 'Musical',
          title: 'Anastasia',
          image: '~/assets/anastasia.png',
          url: 'https://nativescript.org/images/ngconf/anastasia.mov',
          ticketPrice: 69.99,
          availableTickets: 180,
          description: `The legend of Grand Duchess Anastasia Nikolaevna of Russia.`,
          details: [
            { title: 'Music and Lyrics', body: 'Lynn Ahrens and Stephen Flaherty' },
            {
              title: 'Book by',
              body: 'Terrence McNally',
            },
          ],
        },
      ];
      this.saveFlicks();
    }
  }

  private saveFlicks(): void {
    this.storageService.setItem(this.FLICKS_STORAGE_KEY, this.flicks);
  }

  getFlicks(): FlickModel[] {
    return this.flicks;
  }

  getFlickById(id: number): FlickModel | undefined {
    return this.flicks.find((flick) => flick.id === id);
  }

  updateAvailableTickets(id: number, quantity: number): boolean {
    const flick = this.getFlickById(id);
    if (flick && flick.availableTickets >= quantity) {
      flick.availableTickets -= quantity;
      this.saveFlicks(); // Persist changes
      return true;
    }
    return false;
  }
}
