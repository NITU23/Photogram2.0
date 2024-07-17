const headers = {
  "Content-Type": "application/json",
};

const baseURL = 'https://main--photogrambe.netlify.app/';
console.log('234',baseURL)
module.exports = {
  createPosts: async (body) => {
    let url = `${baseURL}/post/createPost`;
    let posts = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    posts = { status: posts.status, posts: await posts.json() };
    return posts;
  },
  fetchPosts: async () => {
    let url = `${baseURL}/post/allImage`;
    let posts = await fetch(url, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    posts = await posts.json();
    return posts;
  },
  fetchUserPosts: async (username) => {
    let url = `${baseURL}/post/getUserPosts/?username=${username}`;
    let posts = await fetch(url, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    posts = await posts.json();
    return posts;
  },
  deletePost: async (postid) => {
    let url = `${baseURL}/post/deletePost/?postid=${postid}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      credentials: "include",
    });
    response = await response.json();
    return response;
  },
  addComments: async (body) => {
    let url = `${baseURL}/post/addComment`;
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
      credentials: "include",
    });
    response = {status:response.status,message:await response.json()}
    return response;
  },
  getComments: async (postid) => {
    let url = `${baseURL}/post/getComments?postid=${postid}`;
    let response = await fetch(url, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });
    response = await response.json();
    return response;
  },
  deleteComments : async(id,postid) =>{
    let url = `${baseURL}/post/deleteComment?commentid=${id}&postid=${postid}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      credentials: "include",
    });
    response = {status:response.status,message:await response.json()}
    return response;
  }
};
