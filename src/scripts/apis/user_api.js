import { Api } from "./api.js";

export class UsersApi extends Api{
    constructor(baseUrl){
        super(baseUrl);
    } 

    getUsers(){
        return this.get('/api/users')
    }

   
}