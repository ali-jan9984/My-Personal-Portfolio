import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{

    interface User{
        _id?:string,
        isVerified?:boolean,
        userName?:string
    }
    interface Sesssion {
        user:{
            _id?:string,
            isVerified?:boolean,
            userName?:string,
        } & DefaultSession['user'];
    }
}
export interface DefaultSession {
    user?: {
        _id?:string|null|undefined,
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }
declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string,
        isVerified?:boolean,
        userName:string,
    }
}