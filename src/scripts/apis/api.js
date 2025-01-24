import { Storage } from "../utils/Storage.js" ;
import { BaseApi } from "./base_api.js";

export class Api extends BaseApi {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
    }

    buildUrl(path = '') {
        return `${this.baseUrl}${path}`;
    }

    async get(path = '') {
      
        try{
            const response = await fetch(this.buildUrl(path))
            if (!this.validateResponse(response)) {
                throw new Error(response.statusText);
            }
            return response.json();
        }catch(error){
            console.log('error :', error);
            throw error;
            
        }
    }

    async delete(path = ''){
        const token = Storage.getItem("token") ;

        try{
            const response = await fetch(this.buildUrl(path), {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(!this.validateResponse(response)){
                throw new Error(response.statusText);
            }
          
        }catch(error){
            console.log(error);
            throw error;
            
        }


    }

    async post(path = '', postData) {

        try{
             const response = await fetch(this.buildUrl(path), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
             })
             if(!this.validateResponse(response)){
                throw new Error(response.statusText);
             }
             return response.json();
        }catch(error) {
            console.log(error);
            throw error
            
        }

       
    }

    async update(path = '', updatedPost) {
        const token = Storage.getItem("token");

        try{
            const response = await fetch(this.buildUrl(path), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPost)
            })
            if(!this.validateResponse(response)){
                throw new Error(response.statusText);
            }
            return response.json();
        }catch(error){
            console.log(error);
            throw error
        }

       
    }
}
