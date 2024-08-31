import { Schema , model} from 'mongoose';
import Subcategory from '../interfaces/subcategory';

const SubcategorySchema: Schema = new Schema<Subcategory>(
    {
        // ? Isn't it normal for the name to be duplicated?
        name: {type:String, required:true, unique:true, trim:true},
        image: {type:String},
        category: {type: Schema.Types.ObjectId, required: true, ref: 'Category'}
    },{timestamps:true}
);

// const imageUrl = (document: Subcategory) => {
//     if(document.image){
//         const imageUrl:string = `${process.env.BASE_URL}/subcategories/${document.image}`;
//         document.image = imageUrl; 
//     }
// }

// SubcategorySchema
//     .post('init', (document: Subcategory) => imageUrl(document))
//     .post('save', (document: Subcategory) => imageUrl(document))

SubcategorySchema.pre<Subcategory>(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name' })
    next()
})

const SubcategoryModel = model<Subcategory>('Subcategory', SubcategorySchema);

export default SubcategoryModel;