import mongoose,{Schema,Document} from 'mongoose';

export interface User extends Document{
    name:string,
    email:string,
    password:string,
    profilePicture:string,
    isVerified:boolean,
    verifyCode:string,
    verifyCodeExpiry:Date
}

const userSchema: Schema<User> = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"UserName is required"],
        trim:true,
        unique: true
    },
    email:{
        type: String,
        trim:true,
        required:[true,"email is required!"],
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
    },
    profilePicture:{
        type: String,
        required:false,
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    verifyCode:{
        type: String,
        required: false,
    },
    verifyCodeExpiry:{
        type: Date,
        required:false,
     }
},{
    timestamps: true
});

const userModel = (mongoose.models.User as mongoose.Model<User>)
|| mongoose.model<User>("User",userSchema);

export default userModel;