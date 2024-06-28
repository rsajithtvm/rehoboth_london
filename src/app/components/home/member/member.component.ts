import { Component, OnInit, AfterViewInit, EventEmitter, HostListener } from '@angular/core';

import {trigger, state, style, animate, transition, stagger, query } from "@angular/animations"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MemberService } from 'src/app/services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  animations: [
    trigger('memberTrigger', [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateX(-50px)" }),
          stagger(50, [
            animate(
              "250ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({ opacity: 1, transform: "none" })
            )
          ])
        ])
      ])
    ])
  ]
})
export class MemberComponent implements OnInit {

    public event: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    categories: any = [];
    trainers: any = [];
    submitted: boolean = false;
    editData: any = {};
    memberList: Array<any> = [];
    fileName = "";
    disable = false;
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
      public memberservice: MemberService,
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
      this.memberservice.getMembers().subscribe(res => {
        //debugger
        this.memberList = res;
      });
      this.form = this.fb.group({
        fname: [this.editData.fname || "", [Validators.required]],
        lname: [this.editData.lname || ""],
        phone: [this.editData.phone || "", [Validators.required]],
        email: [this.editData.email || ""],
        consent: [false],
        from: [this.editData.from || ""],
        referrer: [this.editData.referrer || ""],
        details: [this.editData.details || ""],
        requests: [this.editData.requests || ""],
        // feeamount: [this.editData.feeamount || "", [Validators.required]],
        dateofjoin: [
          this.dateFormat(this.editData.dateofjoin) || this.dateFormat(),
          [Validators.required],
        ],
      });
    }

    toggleStatus(evt) {
      evt.preventDefault();
      let status = this.form.get('status').value == 'Active' ? 'Inactive': 'Active';
      this.form.controls.status.setValue(status)
    }
  
    onNoClick(): void {
      // this.dialogRef.close();
    }
  
    onSubmit(): void {debugger
    
      this.submitted = true;
      if (this.form.valid) {
        if (!this.form.get('consent').value) {
          alert('Please Select Consent');
          return;
        }
        let data = {
          fname: this.form.get("fname").value || "",
          lname: this.form.get("lname").value || "",
          phone: this.form.get("phone").value || "",
          email: this.form.get("email").value || "",
          from: this.form.get("from").value || "",
          referrer: this.form.get("referrer").value || "",
          details: this.form.get("details").value || "",
          requests: this.form.get("requests").value || "",
          dateofjoin:
          new Date(this.form.get("dateofjoin").value).toISOString() || "",
        }
        let exist = this.memberList.some(el=> data.phone == el.phone && data.fname == el.fname && data.lname == el.lname);
        if (exist) {
          alert('Member already registered.');
          return;
        }
        this.disable = true;
        this.memberservice.saveMemberData(data).subscribe(res=>{
          alert('Successfully Registered. Thank you for Registering.');
          setTimeout(() => {
            this.disable = false;
            this.router.navigate(['/']);
          }, 500);
        });
      } else {
        this.form.markAsTouched();
        this.vibrateDevice();
        alert('Please fill required fields.');
      }
    }
    dateFormat(date?) {
      date = date ? new Date(date) : new Date();
      var d = (date.getDate() < 10 ? "0" : "") + date.getDate();
      var m = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
      var y = date.getFullYear();
      var x = String(y + "-" + m + "-" + d);
      return x;
    }
    
    onFileSelected(event) {
      const file: File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
      }
    }
  
    vibrateDevice(): void {
      if (navigator.vibrate) {
        navigator.vibrate([200, 200]);  // Vibrate for 200 milliseconds
      }
    }

    // uploadImage(member) {
    //   let dialogRef = this.dialog.open(FileUploadComponent, {
    //     width: "600px",
    //     data: "Add Member",
    //   });
    //   dialogRef.componentInstance.memberData = member;
    //   dialogRef.componentInstance.event.subscribe((result) => {
    //     this.reload();
    //   });
    // }
    // reload() {
    //   let currentUrl = this._router.url;
    //   this._router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
    //     this._router.navigate([currentUrl]);
    //   });
    // }
}
