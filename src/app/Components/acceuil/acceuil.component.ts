import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {InscriptionRecruteurComponent} from "../Inscription/inscription-recruteur/inscription-recruteur.component";
import { UserAuthentificationService } from 'src/app/Services/user-authentification.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor(
    private authService: UserAuthentificationService,
    private route:Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
    }
  }
  open(){
    this.route.navigate(['/cv'])
  }

  openDialog() {
    this.dialog.open(InscriptionRecruteurComponent);
  }

}
