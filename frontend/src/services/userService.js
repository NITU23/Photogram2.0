const headers = {
    'Content-Type': 'application/json'
   }
   module.exports = {
    fetchUser : async () => {
        let url = `http://localhost:3001/api/user/getUsers`;
        let users = await fetch(url, {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        });
        users = await users.json();
        return users;
    }}