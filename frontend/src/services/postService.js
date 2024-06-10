
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
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
        })
        posts = await posts.json()
        return posts;
     },
}