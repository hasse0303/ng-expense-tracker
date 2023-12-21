import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { AlertBoxComponent } from '../alert-box/alert-box.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user_name:any='';
  editable:boolean=false;
  isProcess:boolean=true;
  name:any='';
  lines:any=[];
  isEdit:boolean=false;
  userInfo: any = {};
  newName:any;
  newUsername:any;
  newGmail: any;
  gmail: any;
  constructor(public businessData:BusinessDataService,public authService:AuthService,public snackBar:MatSnackBar,public dialog: MatDialog){}
  ngOnInit(): void {
    this.isProcess=true;
    this.authService.getAllSaveData().subscribe((res:any)=>{
      this.userInfo = res.data
      setTimeout(() => {
        this.isProcess=false;
        this.editable=true;
      }, 1000);
      this.name=res.data.name;
      this.gmail=res.data.gmail;
      this.newName=res.data.name;
      this.newGmail=res.data.gmail;
    })
  }
  editField(){
    this.isEdit=!this.isEdit;
  }
  saveData(){
    let body={
      gmail:this.newGmail,
      name:this.newName,
    }
    this.authService.updateProfile(body).subscribe((res:any)=>{
      if(res){
        this.authService.updateWholeInfo(body).subscribe((result)=>{console.log(result);
        });
        this.snackBar.open('Profile Updated','',{duration:2000});
      }
    },error=>{
      this.snackBar.open('Server Error','',{duration:2000});
    });
  }
  onDeleteAccount(){
    // console.log("delete");
    // this.authService.onLogout();
    this.dialog.open(AlertBoxComponent, {
      data:{type:'delete'}
    });
  }
}
