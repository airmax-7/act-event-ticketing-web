import { YenePayItem } from "./yenepay.item.model";

export class YenePayCheckout{
    Process: string | undefined;
    MerchantId: string| undefined;
    MerchantOrderId: string | undefined;
    SuccessUrl: string | undefined;
    IpnUrl: string | undefined;
    Items: YenePayItem[] | undefined;
}