import { Injectable } from '@angular/core';
import { FlickModel } from '../models/flick.model';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlickService {
  private flicks: FlickModel[] = [];
  private favoritesSubject = new BehaviorSubject<FlickModel[]>([]);
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
          isFavorite: false,
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
          isFavorite: false,
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
          isFavorite: false,
          description: `The legend of Grand Duchess Anastasia Nikolaevna of Russia.`,
          details: [
            { title: 'Music and Lyrics',
              body: 'Lynn Ahrens and Stephen Flaherty'
            },
            {
              title: 'Book by',
              body: 'Terrence McNally',
            },
          ],
        },
  {
    id: 4,
    genre: 'Musical',
    title: 'Hamilton',
    image: '~/assets/hamilton.png',
    url: 'https://www.youtube.com/watch?v=oHiMCgzMrDg',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A groundbreaking hip-hop musical about the life of Alexander Hamilton.',
    details: [
      {
        title: 'Music and Lyrics',
        body: 'Lin-Manuel Miranda'
      },
      {
        title: 'Broadway Debut',
        body: 'Premiered in 2015 at the Richard Rodgers Theatre'
      }
    ]
  },
  {
    id: 5,
    genre: 'Musical',
    title: 'The Lion King',
    image: '~/assets/lionking.png',
    url: 'https://www.youtube.com/watch?v=EW0cP3m9G8M',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'Disney’s award-winning musical based on the animated film.',
    details: [
      {
        title: 'Director',
        body: 'Julie Taymor became the first woman to win a Tony Award for Best Direction of a Musical.'
      },
      {
        title: 'Broadway Success',
        body: 'The Lion King remains one of the highest-grossing Broadway productions.'
      }
    ]
  },
  {
    id: 6,
    genre: 'Musical',
    title: 'Wicked',
    image: '~/assets/wicked.png',
    url: 'https://www.youtube.com/watch?v=3g4eksl1JY8',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'The untold story of the witches of Oz before Dorothy arrived.',
    details: [
      {
        title: 'Music and Lyrics',
        body: 'Stephen Schwartz'
      },
      {
        title: 'Broadway Opening',
        body: 'Opened in 2003 at the Gershwin Theatre'
      }
    ]
  },
  {
    id: 7,
    genre: 'Musical',
    title: 'Chicago',
    image: '~/assets/chicago.png',
    url: 'https://www.youtube.com/watch?v=qrrz54UtkCc',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A jazz-age musical about fame, crime, and corruption.',
    details: [
      {
        title: 'Music',
        body: 'John Kander'
      },
      {
        title: 'Lyrics',
        body: 'Fred Ebb'
      }
    ]
  },
  {
    id: 8,
    genre: 'Musical',
    title: 'Moulin Rouge! The Musical',
    image: '~/assets/moulinrouge.png',
    url: 'https://www.youtube.com/watch?v=glVsJ8zWJmA',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A dazzling adaptation of Baz Luhrmann’s film.',
    details: [
      {
        title: 'Awards',
        body: 'Won multiple Tony Awards'
      },
      {
        title: 'Broadway Theatre',
        body: 'Al Hirschfeld Theatre'
      }
    ]
  },
  {
    id: 9,
    genre: 'Musical',
    title: 'Aladdin',
    image: '~/assets/aladdin.png',
    url: 'https://www.youtube.com/watch?v=-60o7HP7-XE',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'Disney’s magical musical adventure based on the classic animated movie.',
    details: [
      {
        title: 'Music',
        body: 'Alan Menken'
      },
      {
        title: 'Broadway Opening',
        body: 'Opened in 2014'
      }
    ]
  },
  {
    id: 10,
    genre: 'Musical',
    title: 'MJ The Musical',
    image: '~/assets/mjthemusical.png',
    url: 'https://www.youtube.com/watch?v=K0m8C7M2N7A',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A musical celebrating the artistry of Michael Jackson.',
    details: [
      {
        title: 'Storyline',
        body: 'The show focuses on the creation of Jackson’s Dangerous World Tour.'
      },
      {
        title: 'Tony Awards',
        body: 'MJ won four Tony Awards in 2022.'
      }
    ]
  },
  {
    id: 11,
    genre: 'Musical',
    title: 'Hadestown',
    image: '~/assets/hadestown.png',
    url: 'https://www.youtube.com/watch?v=u-LzVEOPD88',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A folk-opera retelling of Orpheus and Eurydice.',
    details: [
      {
        title: 'Creator',
        body: 'Anaïs Mitchell'
      },
      {
        title: 'Tony Award',
        body: 'Best Musical in 2019'
      }
    ]
  },
  {
    id: 12,
    genre: 'Musical',
    title: 'Sweeney Todd',
    image: '~/assets/sweeneytodd.png',
    url: 'https://www.youtube.com/watch?v=Z7D3OptJO-Q',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'Stephen Sondheim’s dark musical thriller set in Victorian London.',
    details: [
      {
        title: 'Plot',
        body: 'A barber seeks revenge with deadly consequences.'
      },
      {
        title: 'Music',
        body: 'Features one of Sondheim’s most acclaimed scores.'
      }
    ]
  },
  {
    id: 13,
    genre: 'Musical',
    title: 'Cabaret',
    image: '~/assets/cabaret.png',
    url: 'https://www.youtube.com/watch?v=0c2sx47p31M',
          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A revival of the classic musical set in 1930s Berlin.',
    details: [
      {
        title: 'Themes',
        body: 'Cabaret explores politics, love, and decadence.'
      },
      {
        title: 'Venue',
        body: 'Performed in a transformed August Wilson Theatre.'
      }
    ]
  },
  {
    id: 14,
    genre: 'Play',
    title: 'Harry Potter and the Cursed Child',
    image: '~/assets/harrypotter.png',
    url: 'https://www.youtube.com/watch?v=6oW8TcbGvdU',
	          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A stage sequel to the Harry Potter series.',
    details: [
      {
        title: 'Story',
        body: 'Follows Harry Potter’s son Albus at Hogwarts'
      },
      {
        title: 'Awards',
        body: 'Won several Tony Awards'
      }
    ]
  },
  {
    id: 15,
    genre: 'Play',
    title: 'The Play That Goes Wrong',
    image: '~/assets/playthatgoeswrong.png',
    url: 'https://www.youtube.com/watch?v=f8Q5kMZ8vzk',
	          ticketPrice: 69.99,
          availableTickets: 180,
          isFavorite: false,
    description: 'A comedy about a disastrous amateur theater production.',
    details: [
      {
        title: 'Comedy Style',
        body: 'The play uses slapstick and physical humor.'
      },
      {
        title: 'Broadway Run',
        body: 'It became a long-running Broadway comedy hit.'
      }
    ]
  },
      ];
      this.saveFlicks();
    }
     this.updateFavoritesSubject();
  }

  private saveFlicks(): void {
    this.storageService.setItem(this.FLICKS_STORAGE_KEY, this.flicks);
  }

  private updateFavoritesSubject(): void {
    const favorites = this.flicks.filter(flick => flick.isFavorite);
    this.favoritesSubject.next(favorites);
  }

  getFlicks(): FlickModel[] {
    return this.flicks;
  }

  getFlickById(id: number): FlickModel | undefined {
    return this.flicks.find((flick) => flick.id === id);
  }

  getFavorites(): Observable<FlickModel[]> {
    return this.favoritesSubject.asObservable();
  }

  getFavoritesList(): FlickModel[] {
    return this.flicks.filter(flick => flick.isFavorite);
  }

  toggleFavorite(id: number): boolean {
    const flick = this.getFlickById(id);
    if (flick) {
      flick.isFavorite = !flick.isFavorite;
      this.saveFlicks();
      this.updateFavoritesSubject();
      return flick.isFavorite;
    }
    return false;
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
