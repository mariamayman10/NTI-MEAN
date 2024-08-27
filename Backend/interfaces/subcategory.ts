import {Document, Schema} from 'mongoose';
import Category from './category';
interface Subcategory extends Document{
    name: string,
    category:Category,
}
export default Subcategory;
// make sure that delete category work well