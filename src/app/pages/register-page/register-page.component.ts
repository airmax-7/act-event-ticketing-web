import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationUser } from 'src/app/common/models/application-user.model';
import { User } from 'src/app/common/models/user.model';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;
  public minDate: Date;
  public maxDate: Date;
  constructor(private authenticationService: AuthenticationService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
  }

  ngOnInit() {

    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
    });

  }

  public onSubmit() {
    var user = new ApplicationUser(
      this.registerForm.get('firstName')!.value,
      this.registerForm.get('lastName')!.value,
    this.registerForm.get('email')!.value,
    [],
    "",
    this.registerForm.get('dateOfBirth')!.value,
    this.registerForm!.get('phoneNumber')!.value,
    this.registerForm.get('password')!.value,)
    this.authenticationService.register(user);
  }
}
