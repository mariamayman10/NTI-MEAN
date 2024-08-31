import { Schema, model } from "mongoose";
import { Address } from "../interfaces/address";


export const AddressSchema: Schema = new Schema<Address>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    apartmentNo: { type: String, required: true },
});

const AddressModel = model<Address>('Address', AddressSchema);

export default AddressModel;