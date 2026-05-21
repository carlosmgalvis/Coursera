import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'
import { SearchService, SearchItem } from '../search/search.service'

@Component({
  selector: 'SearchDetail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {
  item: SearchItem | null = null
  rotationAngle: number = 0

  constructor(
    private searchService: SearchService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.item = this.searchService.getSelectedItem()
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onBackTap(): void {
    this.routerExtensions.back()
  }

  // Animación de rotación
  onRotateIcon(): void {
    this.rotationAngle = this.rotationAngle === 0 ? 360 : 0
  }
}
