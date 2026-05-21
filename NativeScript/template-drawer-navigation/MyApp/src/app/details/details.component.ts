import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { FlickService } from "~/core/services/flick.service";
import { FlickModel } from "~/core/models/flick.model";

@Component({
  selector: "details",
  templateUrl: "details.component.html"
})
export class DetailsComponent implements OnInit {
  flickService = inject(FlickService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(RouterExtensions);
  flick: FlickModel | undefined = undefined;

  ngOnInit(): void {
    // Use paramMap to get the id parameter
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.flick = this.flickService.getFlickById(+id);
        console.log('Loading flick with id:', id, this.flick); // Debug log
      }
    });
  }
  goBack(): void {
    this.router.back();
  }
}
