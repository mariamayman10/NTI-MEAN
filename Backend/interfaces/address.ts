import { Document } from "mongoose";

export interface Address extends Document{
    street: string,
    city: string,
    state: string,
    apartmentNo: string,
}