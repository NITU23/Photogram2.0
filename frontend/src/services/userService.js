const headers = {
    'Content-Type': 'application/json',
    "Accept": "application/json",
   }

const baseURL = 'https://main--photogrambe.netlify.app/';

   module.exports = {
    fetchUser : async () => {
        let url = `${baseURL}/user/getUsers`;
        let users = await fetch(url, {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        });
        users = await users.json();
        return users;
    },
    setProfilePic : async(file) =>{
        let url = `${baseURL}/user/setProfile`;
        let response= await fetch(url, {
            method: 'POST',
            headers: headers,
            body:file,
            credentials: 'include'
        });
        return {response:await response.json(),status:response.status};
    },
    getUserProfile : async(email)=>{
        let url = `${baseURL}/user/getUserProfile?email=${email}`;
        let response= await fetch(url, {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        });
        return {response:await response.json(),status:response.status};
    },
    updatePassword : async(body)=>{
        let url = `${baseURL}/user/updatePassword`;
        let response= await fetch(url, {
            method: 'POST',
            headers: headers,
            body:body,
            credentials: 'include'
        });
        return {response:await response.json(),status:response.status};
    },
    getConnectedPeople:async(body)=>{
        let url = `${baseURL}/user/getConnectedPeople?body=${body}`;
        let response= await fetch(url, {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        });
        return {response:await response.json(),status:response.status};
    }

}