import { OrganizerStatus } from "../enums/organizer-status.enum";

export interface Organizer{
    name: string;
    type: string;
    status: OrganizerStatus;
    createdDate: string;
}