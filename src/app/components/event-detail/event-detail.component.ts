import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LocalStorageConstants } from 'src/app/common/constants/constants';
import { Event } from 'src/app/common/models/event.model';
import { YenePayCheckout } from 'src/app/common/models/payment-methods/YenePay/yenepay.checkout.model';
import { YenePayItem } from 'src/app/common/models/payment-methods/YenePay/yenepay.item.model';
import { TicketPurchase } from 'src/app/common/models/ticket-purchase.model';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { CheckoutService } from 'src/app/common/services/checkout.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  @Input() selectedEvent: Event | undefined;
  selectedTicketQty: number;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private checkoutService: CheckoutService
  ){
    this.selectedTicketQty = 1;
  }

  ngOnInit(): void {
  }

  isUserLoggedIn(){
    var user = this.authenticationService.getUser();
    return user !== null;
  }

  loginToBuy(){
    localStorage.setItem(LocalStorageConstants.lastVisitUrl, this.router.url);
    this.router.navigate(['/login']);
  }

  async redirectToPayment(){
    //create checkout model
    var checkoutModel = new YenePayCheckout();
    checkoutModel.Process="Express";
    checkoutModel.MerchantId = "0008";
    checkoutModel.MerchantOrderId = "";
    checkoutModel.SuccessUrl = "";
    checkoutModel.IpnUrl="";
    
    var item = new YenePayItem();
    item.ItemName=this.selectedEvent?.name;
    item.Quantity = this.selectedTicketQty;
    item.UnitPrice = this.selectedEvent?.eventTickets[0].price;

    checkoutModel.Items = [item];

    //get checkouturl
    this.checkoutService.getCheckoutUrl(checkoutModel)
    .then(
      (url)=>window.location.href = url
      );
  }
}

