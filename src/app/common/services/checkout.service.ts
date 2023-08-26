import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CheckoutClient } from "../clients/checkoutClient";
import { YenePayCheckout } from "../models/payment-methods/YenePay/yenepay.checkout.model";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  
export class CheckoutService {
    constructor(
        private checkoutClient: CheckoutClient,
        private router: Router,
        private snackBar: MatSnackBar) { }
    
    public async getCheckoutUrl(checkoutModel: YenePayCheckout): Promise<string>{
        return await firstValueFrom(this.checkoutClient.getCheckoutUrl(checkoutModel));
          // .subscribe({
          //   next: (result: string) => {
          //     //this.handleGetCheckoutSuccess(result);
          //     return result;
          //   },
          //   error: (error: HttpErrorResponse) => {
          //     //this.handleGetCheckoutFail(error);
          //     return "";
          //   }
          // });
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