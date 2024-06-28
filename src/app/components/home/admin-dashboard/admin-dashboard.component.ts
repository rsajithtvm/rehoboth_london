import { Component, OnInit, Renderer2  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { MemberService } from 'src/app/services/member.service';
import { forkJoin, pipe } from "rxjs";
import { map, startWith } from "rxjs/operators";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  seatingPlan: any[][];
  success: boolean = false;
  memberList = [];
  sortedData = [];
  searchControl = new FormControl();
  constructor(public adminservice: AdminService, private memberservice: MemberService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.memberservice.getMembers().subscribe(res => {
     // debugger
      this.memberList = res;
      this.sortedData = res;
    });
    this.searchControl.valueChanges
      .pipe(
        startWith(""),
        map((value) => {
          return this._filter(value);
        })
      )
      .subscribe((data) => {//debugger
        this.sortedData = data;
      });
      this.addBodyClass();
  }
  addBodyClass(): void {
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'dashboard');
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.memberList.filter((option) =>
      JSON.stringify(option).toLowerCase().includes(filterValue)
    );
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/default-avatar.jpeg';
  }

}
