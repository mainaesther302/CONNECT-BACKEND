export interface User{
    UserId:string;
    UserName:string;
    Email:string;
    Password:string;
    Role:string;
    Status?: string;
    isDeleted:number;
    IsEmailSent:number;
}
export interface Payload{
    sub:string;
    UserName:string;
    Role:string;
}


