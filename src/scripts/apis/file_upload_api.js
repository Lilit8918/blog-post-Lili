import { Storage } from '../utils/Storage.js';  

export class FileUpload {
    constructor(baseUrl) {
        this.baseUrl = baseUrl ;
    };

    async upload(file){
        const formData =  new FormData();
        formData.append('file', file);

        const token = Storage.getItem('token') ;
        try{
            const response = await fetch(`${this.baseUrl}/api/file-upload/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` ,
                },
                body: formData
            })
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        } catch(error){
            console.log(error);
            throw error
            
        } 

     
    }

}
