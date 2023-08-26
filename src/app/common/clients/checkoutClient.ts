import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {YenePayCheckout} from "../models/payment-methods/YenePay/yenepay.checkout.model";

@Injectable({
    providedIn: 'root',
})

export class CheckoutClient{
    constructor(private http: HttpClient){}

    public getCheckoutUrl(checkoutModel: YenePayCheckout): Observable<string>{
        return this.http.post<string>(
            environment.yenepayGenerateCheckoutUrl,
            checkoutModel,
        );
    }
}