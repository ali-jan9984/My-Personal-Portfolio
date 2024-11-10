import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{

    interface User extends DefaultSession{
        _id?:string,
        isVerified?:boolean,
        userName?:string
    }
    interface Sesssion extends DefaultSession{
        user:{
            _id?:string,
            isVerified?:boolean,
            userName?:string,
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string,
        isVerified?:boolean,
        userName:string,
    }
}