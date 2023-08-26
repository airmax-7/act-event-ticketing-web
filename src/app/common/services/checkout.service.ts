import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CheckoutClient } from "../clients/checkoutClient";
import { YenePayCheckout } from "../models/payment-methods/YenePay/yenepay.checkout.model";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
  })
  
export class CheckoutService {
    constructor(
        private checkoutClient: CheckoutClient,
        private router: Router,
        private snackBar: MatSnackBar) { }
    
    public checkout(checkoutModel: YenePayCheckout): void {
        this.checkoutClient.getCheckoutUrl(checkoutModel)
          .subscribe({
            next: (result) => {
              this.handleGetCheckoutSuccess(result);
            },
            error: (error: HttpErrorResponse) => {
              this.handleGetCheckoutFail(error);
            }
          });
    }

    private handleGetCheckoutSuccess(result: string): void {
        let message;
    
        if (result !== null) {
            window.location.href = result;
        } 
        else{
            message = "Cannot generate payment link.";
            this.snackBar.open(message, 'Close');
        }
    }

    private handleGetCheckoutFail(error: HttpErrorResponse): void {
        let message = "Cannot generate payment link.";
        this.snackBar.open(message, 'Close');
    }

}