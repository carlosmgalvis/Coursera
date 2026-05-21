import { Component, OnInit, inject } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { FlickService } from '~/core/services/flick.service';
import { FlickModel } from '~/core/models/flick.model';
import { ItemEventData } from '@nativescript/core';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private flickService = inject(FlickService);
  private router = inject(RouterExtensions);

  allFlicks: FlickModel[] = [];
  filteredFlicks: FlickModel[] = [];
  searchQuery: string = '';
  isSearching: boolean = false;

  ngOnInit(): void {
    this.allFlicks = this.flickService.getFlicks();
    this.filteredFlicks = this.allFlicks;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onSearchTap(): void {
    this.isSearching = true;
  }

  onSearchClose(): void {
    this.isSearching = false;
    this.searchQuery = '';
    this.filteredFlicks = this.allFlicks;
  }

  onSearchTextChange(args: any): void {
    const searchBar = args.object;
    this.searchQuery = searchBar.text.toLowerCase();
    this.filterFlicks();
  }

  onSearchSubmit(args: any): void {
    const searchBar = args.object;
    this.searchQuery = searchBar.text.toLowerCase();
    this.filterFlicks();
  }

  private filterFlicks(): void {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.filteredFlicks = this.allFlicks;
    } else {
      this.filteredFlicks = this.allFlicks.filter(flick =>
        flick.title.toLowerCase().includes(this.searchQuery) ||
        flick.genre.toLowerCase().includes(this.searchQuery) ||
        flick.description.toLowerCase().includes(this.searchQuery)
      );
    }
  }

  onFlickTap(args: ItemEventData): void {
    const flick = this.filteredFlicks[args.index];
    this.router.navigate(['/details', flick.id]);
  }

  getResultCount(): number {
    return this.filteredFlicks.length;
  }
}
