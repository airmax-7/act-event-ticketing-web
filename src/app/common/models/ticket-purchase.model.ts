export class TicketPurchase{
    public purchaseCode: string;
    public quantity: number;
    public status: string;
    public purchaseDate: string;
    public paymentReferenceCode: string;
    public eventTicketId: number;
    public applicationUserId: number;

    constructor(purchaseCode: string,
        quantity: number,
        status: string,
        purchaseDate: string,
        paymentReferenceCode: string,
        eventTicketId: number,
        applicationUserId: number){
            this.purchaseCode = purchaseCode;
            this.quantity = quantity;
            this.status = status;
            this.purchaseDate = purchaseDate;
            this.paymentReferenceCode = paymentReferenceCode;
            this.eventTicketId = eventTicketId;
            this.applicationUserId = applicationUserId;
        }
}