import { Api } from "./api.js";
import { Storage } from '../utils/Storage.js'; 

export class PostsApi extends Api{
    constructor(baseUrl) {
        super(baseUrl);
        this.baseUrl = baseUrl ;
    }

    
    async getPostById(postId){
        const token =  Storage.getItem("token");

        try{
            const response = await fetch(this.buildUrl(`/api/posts/${postId}`),{
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`,
                } 
            })
            if(!this.validateResponse(response)){
                throw new Error (response.statusText)
            }
            return response.json();
        }catch(error){
            console.log(error);
            throw error
            
        }

      
    }


   async getPosts(){
        return await this.get('/api/posts') ;
    }

    async createPost(postData){
        const token = Storage.getItem("token") ;

        if (!token) {
            throw new Error('Token is required for authentication');
        }

        try{
            const response = await fetch(this.buildUrl('/api/posts'),{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData)

            })
            if(!this.validateResponse(response)){
                throw new Error('error ' + response.statusText);
            }
            return response.json()
        }catch(error){
            console.log(error);
            throw error;
        }

    
    }



   async  updatePost(postId, updatedPostData) {
        return await this.update(`/api/posts/${postId}`, updatedPostData) ;
    }

    async deletePost(postId) {
        return await this.delete(`/api/posts/${postId}`);
    }
}








