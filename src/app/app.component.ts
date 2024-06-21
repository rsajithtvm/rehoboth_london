import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Rehoboth Ministries';
  
  constructor(
    private titleService: Title,
    private metaService: Meta,
    ){
    }
  ngOnInit(): void {
    this.titleService.setTitle( "Rehoboth Ministries" );

    this.metaService.addTags([
      {name: 'keywords', content: 'Rehoboth Ministries'},
      {name: 'description', content: 'Rehoboth Ministries'},
    ]);
    
    
    AOS.init(); 

  }
}
