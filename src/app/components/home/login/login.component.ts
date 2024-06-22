import { Component, OnInit, AfterViewInit, EventEmitter, HostListener } from '@angular/core';

import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MemberService } from 'src/app/services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations: [
  //   trigger('memberTrigger', [
  //     transition(":enter", [
  //       query("*", [
  //         style({ opacity: 0, transform: "translateX(-50px)" }),
  //         stagger(50, [
  //           animate(
  //             "250ms cubic-bezier(0.35, 0, 0.25, 1)",
  //             style({ opacity: 1, transform: "none" })
  //           )
  //         ])
  //       ])
  //     ])
  //   ])
  // ]
})
export class LoginComponent implements OnInit {

    public event: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    categories: any = [];
    trainers: any = [];
    submitted: boolean = false;
    editData: any = {};
    fileName = "";
    // @HostListener('window:resize', ['$event']) 
    // Resize() {
    //   let container = document.querySelector('.mat-dialog-container');
    //   if (window.innerWidth <= 575) {
    //     container.classList.add('mat-dialog-container80')
    //   } else {
    //     container.classList.add('mat-dialog-container80')
    //   }
    // }
  
    constructor(
      // public dialogRef: MatDialogRef<PostDialogComponent>,
      // @Inject(MAT_DIALOG_DATA) public data: any,
      public dataService: MemberService,
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
    ) {
      // let container = document.querySelector('.mat-dialog-container');
      // if (window.innerWidth <= 575) {
      //   container.classList.add('mat-dialog-container80')
      // }
      // this.categoryService.getCategories().subscribe(data=>{
      //   this.categories = data;
      // });
      // this.trainerService.getTrainers().subscribe(data=>{
      //   this.trainers = data;
      // });
    }

    ngOnInit() {
      this.form = this.fb.group({
        username: ["", [Validators.required]],
        password: ["", [Validators.required]],
      });
    }

    onSubmit(): void {debugger
    
      this.submitted = true;
      if (this.form.valid) {
        let data = {
          username: this.form.get("username").value || "",
          password: this.form.get("password").value || "",
        }
        if (data.username == 'admin' && data.password == 'nimda') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Invalid credentials');
          this.vibrateDevice();
        }
        // this.dataService.saveMemberData(data).subscribe(res=>{

        // });
      } else {
        this.form.markAsTouched();
        alert('Please enter login credentials');
        this.vibrateDevice();
      }
    }
    vibrateDevice(): void {
      if (navigator.vibrate) {
        navigator.vibrate([200, 200]);  // Vibrate for 200 milliseconds
      }
    }
}
