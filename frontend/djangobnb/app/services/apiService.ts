import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url:string): Promise<any> {
        

        const token = await getAccessToken();

        return new Promise((resolve, reject) =>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) =>{
                    

                    resolve(json);
                })
                .catch((error =>{
                    reject(error);
                }))
        })
    },

    post: async function (url: string , data: any): Promise <any>{
        


        const token = await getAccessToken();

        return new Promise((resolve, reject) =>{
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) =>{
                    

                    resolve(json);
                })
                .catch((error =>{
                    reject(error);
                }))
        
         })
        },

        postWithoutToken: async function (url: string, data: any): Promise<any> {
            
        
            const isFormData = data instanceof FormData;
        
            return new Promise((resolve, reject) => {
                fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                    method: 'POST',
                    body: data,
                    headers: isFormData
                        ? {
                            'Accept': 'application/json'
                        }
                        : {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                })
                    .then(response => response.json())
                    .then((json) => {
                        
                        resolve(json);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
        
}

export default apiService;