
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
        posts = {status:posts.status,posts: (await posts.json())}
        return posts;
     },
     fetchPosts : async() =>{
      let url = 'http://localhost:3001/api/post/allImage'
      let posts = await fetch(url,{
        method: 'GET',
        headers: headers,
        credentials: 'include'}
        )
       posts = await posts.json();
       return posts;
    },
    fetchUserPosts : async (username) => {
      let url = `http://localhost:3001/api/post/getUserPosts/?username=${username}`;
      let posts = await fetch(url, {
          method: 'GET',
          headers: headers,
          credentials: 'include'
      });
      posts = await posts.json();
      return posts;
  },


}