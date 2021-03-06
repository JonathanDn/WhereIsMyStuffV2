import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpaceService} from './space.service';
import {SpaceModel} from './space.model';

import {StoreListComponent} from './store-list.component';
import {StoreDiagramComponent} from './store-diagram.component';
import {ItemsListComponent} from './items-list.component';

import {SearchComponent} from './search.component';



@Component({
  moduleId: module.id,
  //styleUrls: [`scss/css/main.css`],
  selector: 'space-comp',
  directives: [StoreListComponent, StoreDiagramComponent,ItemsListComponent, SearchComponent],
  template: `
    <section class="mainViewSection" *ngIf="space">
      <!--<button (click)="setStore()">Go Home</button>-->
      <h1 class="mainViewTitle">{{space.name}}</h1>

      <user-search (search)="findItemFromService($event)"></user-search>
      <!--<div>thisPath: {{getPaths() | json}}</div>-->
      <ul>
        <li *ngFor="let path of paths">{{path.path}}</li>
      </ul>

      <!--Test{{space.items | json}}-->
      <div class="primarySpaceContainer">
        <div class="spacesSideBar">
            <!--<h2 class="spaceSideBarTitle"></h2>-->
            <!--<div class="spaceCardContainer">-->
              <div class="spaceSideBarTitle">{{storeTypeToAdd}}s</div>
              <store-list *ngIf="!space.items" 
                          [stores]="space.stores" 
                          (selected)="setStore($event)" 
                          (deleteStore)="delete($event)" >the list Should render here</store-list>
              
            <!--</div>-->

          <div *ngIf="!space.items" (click)="renderStoreType();getStorageCard()" class="addSpaceBtn btn btn-primary">
            <p class="addSpacePlusIcon glyphicon glyphicon-plus"></p>Add {{storeTypeToAdd}}
          </div>
          <div *ngIf="!space.stores" (click)="addItem();getStorageCard()" class="addSpaceBtn btn btn-primary">
            <p class="addSpacePlusIcon glyphicon glyphicon-plus"></p>Add Items
          </div>
          
        </div>

        <div class="storesPrimaryContainer">
          <!--<space-details>The Full Space Details</space-details>-->
          <store-diagram [stores]="space.stores ? space.stores : space.items" >The diagram should render here</store-diagram>
        </div>

      </div>
      <!--<pre>
          {{space | json}}
        </pre>-->

    </section>
  `
})
export class SpaceComponent implements OnInit {

  private space : SpaceModel;
  private storeTypeToAdd;

  private searchedItems: any;
  private result: any;
  private paths: Object[];
  constructor(
                private route: ActivatedRoute, private router: Router,
                private spaceService : SpaceService
                ){} 

  ngOnInit() {
    // creating the initial HOUSE object
    this.storeTypeToAdd = this.spaceService.getStoreType();
    this.space = this.spaceService.getCurrStore();
     if (!this.space) {
          const id = '5797787f2ecc9326143177f0';
          const prmSpace = this.spaceService.get(id);
          prmSpace.then((space: SpaceModel) => {
            this.space = space;
            // console.log('this.space:', this.space);
            
        });
     }
  }
  getPaths() {
    this.paths;


    return this.paths;
  }




  // using spaceService finding items method
  findItemFromService(searchedValue) {
    console.log('searchedValue in space comp', searchedValue);
    // console.log('this.space in space comp:', this.space);
    
    // use service to find searched item by inputting 1) serached item value 2) the house object
    // console.log('this.searchedItems initialzied:', this.searchedItems);
    this.paths = this.spaceService.findItems(searchedValue, this.space);
    // console.log('this.result:', this.paths);
    
    // console.log('this.searchedItems found:', this.searchedItems);
    
  }

  getStorageCard() {
    // this.isImageStorage = true;

  }

  setStore(store) {
    this.space =  this.spaceService.setCurrStore(store);
    this.storeTypeToAdd = "Storage";
    this.spaceService.setStoreType();
  }

  renderStoreType() {
    this.storeTypeToAdd = this.spaceService.setStoreType();
    this.router.navigate(['/edit']);
  }
  
  addItem() {
    // this.storeTypeToAdd = 'Item';
    // this.storeTypeToAdd = this.spaceService.setStoreType();
    this.router.navigate(['/edit-item']);
  }

   delete(store) {
    // event.stopPropagation();
    // console.log('event is :', event);
    
    console.log('store for deletion: ',store);
    
    this.spaceService.delete(store.name)
      .then((res)=>{
          // console.log('my House after deletion: ',res);
          // console.log('query is: ',res);
          this.router.navigate(['']);
      });
  }
}
