import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService : AuthService
  ){}

  user : User | null = null;

  ngOnInit(): void {
    // se guarda el profile en el obs user$ -> auth.service.ts
    this.authService.user$
      .subscribe( profile => {
        this.user = profile;
      });

    // old, cuando no guardamos el profile
    /*
    this.authService.getProfile()
    .subscribe( profile => {
      this.user = profile;
    });
    */
  }

}
