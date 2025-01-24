import { BaseApi } from "./base_api.js";

export class AuthApi extends BaseApi{
    constructor(baseUrl) {
        super(baseUrl);
        this.baseUrl = baseUrl;
    }

    buildUrl(path = ''){
        return `${this.baseUrl}${path}` ;
    }
    

   async login(credentials){
    try{
        const response = await fetch(this.buildUrl('/api/auth/login'), {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
       
        if(!this.validateResponse(response)){
            throw new Error(response.statusText);
        }
        return response.json()
    }catch(error){
        console.log(error);
        throw error
        
    }
    
    }


async register(user){

    try{
        const response = await fetch(this.buildUrl('/api/auth/register'), {
            method : 'POST', 
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user )
        })
        if(!response.ok){
            throw new Error(response.statusText);
        }
      
        const data = await response.json();  
        return data; 
    }catch(error){
        console.log(error);
        throw error
        
    }
       
    }






}
