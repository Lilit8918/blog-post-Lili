import { Storage } from '../utils/Storage.js'; 

export class BaseApi {
    validateResponse(response){
        if(response.status ===  401) {
            Storage.remove('token');
            Storage.remove('user');
            window.location.assign('index.html') ;
            return false
        }
        return true;
    }
}