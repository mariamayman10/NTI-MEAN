import { Schema , model} from 'mongoose';
import Subcategory from '../interfaces/subcategory';

const SubcategorySchema: Schema = new Schema<Subcategory>(
    {
        name: {type:String, required:true, unique:true, trim:true},
        image: {type:String},
        category: Schema.Types.ObjectId
    },{timestamps:true}
);

const imageUrl = (document: Subcategory) => {
    if(document.image){
        const imageUrl:string = `${process.env.BASE_URL}/subcategories/${document.image}`;
        document.image = imageUrl; 
    }
}

SubcategorySchema
    .post('init', (document: Subcategory) => imageUrl(document))
    .post('save', (document: Subcategory) => imageUrl(document))


const SubcategoryModel = model<Subcategory>('Subcategory', SubcategorySchema);

export default SubcategoryModel;