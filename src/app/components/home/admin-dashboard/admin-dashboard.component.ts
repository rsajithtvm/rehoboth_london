import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  seatingPlan: any[][];
  success: boolean = false;
  memberList = [];
  constructor(public adminservice: AdminService, private memberservice: MemberService) { }

  ngOnInit(): void {
    this.memberservice.getMembers().subscribe(res => {
      debugger
      this.memberList = res;
    });
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/default-avatar.jpeg';
  }

}
