import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Rehoboth Ministries';
  currentUrl: string = '';
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
    ){
    }
  ngOnInit(): void {
    this.titleService.setTitle( "Rehoboth Ministries" );

    this.metaService.addTags([
      {name: 'keywords', content: 'Rehoboth Ministries'},
      {name: 'description', content: 'Rehoboth Ministries'},
    ]);
    
    
    AOS.init(); 
    
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;      
    });    
  }

  isLoginPage(): boolean {
    return this.router.url === '/';    
  }
  
}
