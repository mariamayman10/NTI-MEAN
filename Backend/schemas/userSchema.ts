import { Schema, model } from "mongoose";
import { User } from './../interfaces/user';
import bcrypt from 'bcryptjs';


const UserSchema: Schema = new Schema<User>(
    {
        name: {type:String, required:true, trim:true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required:true, minlength:8, maxlength:20},
        image: {type: String},
        role: {type:String, required:true, enum: ['manager', 'admin', 'user'], default: 'user'},
        active: { type: Boolean, default: true },
        passwordChangedAt: {type: Date},
        resetCode: {type: String},
        resetCodeExpireTime: {type: Date},
        resetCodeVerify: {type: Boolean}
    },{timestamps: true}
);

const imageUrl = (document: User) => {
    if(document.image){
        const imageUrl:string = `${process.env.BASE_URL}/users/${document.image}`;
        document.image = imageUrl; 
    }
}

UserSchema
    .post('init', (document: User) => imageUrl(document))
    .post('save', (document: User) => imageUrl(document))
UserSchema.pre<User>('save', async function(next) {
    if(!this.isModified('password')){
        return next;
    }
    this.password = await bcrypt.hash(this.password, 13);
});

const UserModel = model<User>('users', UserSchema);

export default UserModel;