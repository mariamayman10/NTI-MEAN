import { Schema , model} from 'mongoose';
import Subcategory from '../interfaces/subcategory';

const SubcategorySchema: Schema = new Schema<Subcategory>(
    {
        name: {type:String, required:true, unique:true, trim:true},
        category: Schema.Types.ObjectId
    },{timestamps:true}
);
const SubcategoryModel = model<Subcategory>('Subcategory', SubcategorySchema);

export default SubcategoryModel;