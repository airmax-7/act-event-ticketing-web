import { EventStatus } from "../enums/event-status.enum";
import { EventCategory } from "./event-category.model";
import { EventTicket } from "./event-ticket.model";
import { Organizer } from "./organizer.model";

export interface Event{
    eventCode: number;
    name: string;
    description: string;
    venue: string;
    startDate: string;
    endDate: string;
    status: EventStatus;
    category: EventCategory;
    organizer: Organizer;
    posterImage: string;
    eventTickets: EventTicket[];
}