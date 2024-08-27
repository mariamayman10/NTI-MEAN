import {Schema, model} from 'mongoose';
import Category from '../interfaces/category';
const CategorySchema: Schema = new Schema<Category>(
    {
        name: {type:String, required:true, unique:true, trim: true}
    },{timestamps:true}
);

const CategoryModel = model<Category>('Category', CategorySchema);

export default CategoryModel;