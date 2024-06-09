
const headers = {
 'Content-Type': 'application/json'
}
module.exports = {
    createPosts : async(body) => {
        let url = 'http://localhost:3001/api/post/createPost'
        let posts = await fetch(url,{
            method: 'POST',
            credentials: 'include',
            body:body,
            headers:{
              'Content_Type':'application/json'
            }
        })
     },
}