import {Schema, model} from 'mongoose';
import Category from '../interfaces/category';
const CategorySchema: Schema = new Schema<Category>(
    {
        name: {type:String, required:true, unique:true, trim: true},
        image: {type:String}
    },{timestamps:true}
);

// const imageUrl = (document: Category) => {
//     if(document.image){
//         const imageUrl:string = `${process.env.BASE_URL}/categories/${document.image}`;
//         document.image = imageUrl; 
//     }
// }

// CategorySchema
//     .post('init', (document: Category) => imageUrl(document))
//     .post('save', (document: Category) => imageUrl(document))


const CategoryModel = model<Category>('Category', CategorySchema);

export default CategoryModel;