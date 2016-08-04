import { Component, OnInit } from '@angular/core';
import {SpaceComponent} from './space.component'
import {SpaceModel} from './space.model';
import {SpaceService} from './space.service';

@Component({
  moduleId: module.id,
  selector: 'store-diagram',
  inputs: ['stores'],
  directives: [],
  template: `
          <section>
            <!--<h2>Diagram</h2>-->
            <!--{{ stores | json}}-->
            <div class="storeContainer">
              <div [className]="getClassOfStore(store)" *ngFor="let store of stores">
                <div class="storeDiagramCardName">{{store.name}}</div>
              </div>


              
            </div>
            <!--<a routerLink="/space/{{space.id}}/{{space.name}}">-->
          </section>
          `

})
export class StoreDiagramComponent implements OnInit {

  private stores : any;
  constructor( private spaceService: SpaceService) { 
    
  }
  getClassOfStore (store) {
    if (!store.item) return 'store'
    else             return 'item'
  }
  ngOnInit() { 
  }

}
