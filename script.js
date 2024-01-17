let container = document.getElementById('container');

async function getPosts() {
    const responsePost = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await responsePost.json();
    console.log(responsePost);
    console.log(posts);
    return posts;

}
async function getComments() {
    const responseComments = await fetch("https://jsonplaceholder.typicode.com/comments")
    const comments = await responseComments.json();
    return comments;
}
//const commentsPromise = getComments()
//commentsPromise.then(comments => console.log(comments));
//getComments().then(comments => console.log(comments[5].name));

function postPlusComments() {

    Promise.all([getPosts(), getComments()]).then(([posts, comments]) => {


        posts.forEach(post => {
            let commentiDelPost = comments.filter((comment) => comment.postId == post.id)

            let nuoviCommentiInHtml = commentiDelPost.map((comment) => {
                return `<div class="commenti"><p class="commentEmail">${comment.email}</p> <p class="commentName">${comment.name}</p></div>`
            })
                .join('');



            container.innerHTML += `<div class="post"><h1>${post.title}</h1> <span>${post.body}</span> <p>${nuoviCommentiInHtml}</p></div>`



        });



    });




}
postPlusComments()