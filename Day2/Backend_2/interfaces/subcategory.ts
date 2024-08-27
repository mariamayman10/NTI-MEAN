import {Document, Schema} from 'mongoose';
interface Subcategory extends Document{
    name: string,
    category:Schema.Types.ObjectId
}
export default Subcategory;