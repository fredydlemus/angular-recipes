import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective, { static: true }) alertHost: PlaceHolderDirective;

  private closeSub: Subscription;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)

    } else {

      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe({
      next: (dataRes) => {
        console.log(dataRes);
        this.isLoading = false;
        this.router.navigate(['./recipes'])
      },
      error: (errorRes) => {
        console.log(errorRes);
        this.error = errorRes;
        this.showErrorAlter(errorRes);
        this.isLoading = false;
      }
    });
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlter(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
