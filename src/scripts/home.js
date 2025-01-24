import UI from "./utils/utils.js";
import { PostsApi } from "./apis/post_api.js";
import { UsersApi } from "./apis/user_api.js";
import { Storage } from "./utils/Storage.js";
import { baseURL } from "./apis/constant.js";

const postsApi = new PostsApi(baseURL);
const usersApi = new UsersApi(baseURL);

const user = Storage.getItem("user");
const token = Storage.getItem("token");

function createBloggerCard(blogger) {
    const blogCard = UI.createElement(
        "div",
        {
            class: "blogger-card d-flex flex-column align-items-center p-2 rounded shadow-sm bg-white",
            id: `blogger-${blogger.id}`,
        },
        [
            UI.createElement("img", {
                src:
                    blogger.avatar ||
                    "https://png.pngtree.com/png-vector/20220624/ourmid/pngtree-unknown-user-question-mark-about-png-image_5178068.png",
                class: "blogger-avatar rounded-circle mb-2",
            }),
            UI.createElement(
                "p",
                { class: "blogger-name text-dark fw-bold small" },
                `${blogger.firstName} ${blogger.lastName}`
            ),
            UI.createElement(
                "p",
                { class: "blogger-email text-muted small" },
                blogger.email
            ),
        ]
    );
    return blogCard;
}

function createPostCard(post) {
    if (!post || !post.authorName || !post.title || !post.img || !post.story) {
        return null;
    }

    const postCard = UI.createElement(
        "div",
        { class: "post-card", id: `post-${post.id}` },
        [
            UI.createElement("div", { class: "post-header d-flex justify-content-between" }, [
                UI.createElement("p", { class: "author-name" }, `By: ${post.authorName}`),
                UI.createElement("h4", { class: "post-title" }, post.title),
            ]),
            UI.createElement(
                "div",
                { class: "post-content d-flex align-items-center" },
                [
                    UI.createElement("img", {
                        src: post.img,
                        alt: post.title,
                        class: "post-image",
                    }),
                    UI.createElement("div", { class: "post-description" }, [
                        UI.createElement("p", { class: "post-story" }, post.story),
                    ]),
                ]
            ),
            UI.createElement("button", { class: "delete-post-btn", id: `delete-post-btn-${post.id}` }, "Delete"),
            UI.createElement("button", { class: "edit-post-btn", id: `edit-post-btn-${post.id}` }, "Edit"),
        ]
    );

    const deleteButton = postCard.querySelector(`#delete-post-btn-${post.id}`);
    const editButton = postCard.querySelector(`#edit-post-btn-${post.id}`);

    if (!user || !token) {
        deleteButton.style.display = "none";
        editButton.style.display = "none";
    } else {
        deleteButton.style.display = "block";
        editButton.style.display = "block";
    }

    deleteButton.addEventListener("click", () => deletePost(post.id));
    editButton.addEventListener("click", () => {
        window.location.href = `createBlogPost.html?postId=${post.id}`;
    });

    return postCard;
}

function renderItems(data, containerSelector, createCard) {
    const container = document.querySelector(containerSelector);
    data.forEach((item) => {
        const card = createCard(item);
        if (card) {
            container.prepend(card);
        }
    });
}

function createContainer() {
    const container = UI.createElement(
        "div",
        { class: "container-home d-flex flex-column align-items-center w-100" },
        [
            UI.createElement("header", { class: "header w-100 d-flex justify-content-between align-items-center" }, [
                UI.createElement("div", { class: "d-flex align-items-center" }, [
                    UI.createElement("h1", {}, "Welcome to Blog App"),
                ]),
                UI.createElement("div", { class: "d-flex gap-3" }, [
                    UI.createElement("a", { href: "index.html" }, "Registration"),
                    UI.createElement("a", { id: "login" }, "Login"),
                    UI.createElement("a", { href: "createBlogPost.html", id: "createButton" }, "Create Blog"),
                ]),
            ]),
            UI.createElement("main", { class: "main d-flex flex-row w-100 gap-4 mt-5" }, [
                UI.createElement("nav", { class: "bloggers-container bg-light p-3 rounded shadow-sm" }, [
                    UI.createElement("h2", { class: "fw-bold mb-3 text-warning" }, "Bloggers"),
                    UI.createElement("div", { class: "bloggers-list overflow-auto d-flex flex-column gap-2" }, []),
                ]),
                UI.createElement("section", { class: "posts-section w-100" }, [
                    UI.createElement("div", { class: "posts" }, []),
                ]),
            ]),
            UI.createElement("footer", { class: "footer w-100 text-center p-3" }, [
                UI.createElement("p", {}, "Made with ❤️ by Lilit"),
            ]),
        ]
    );

    UI.render(container, "body");

    postsApi.getPosts().then((posts) => {
        renderItems(posts, ".posts", createPostCard);
    });

    usersApi.getUsers().then((users) => {
        renderItems(users, ".bloggers-list", createBloggerCard);
    });

    const createButton = document.getElementById("createButton");
    const loginButton = document.getElementById("login");

    if (!user || !token) {
        createButton.style.display = "none";
    } else {
        createButton.style.display = "block";
        loginButton.innerText = "Log out";
    }

    loginButton.addEventListener("click", () => {
        if (user || token) {
            Storage.remove("user");
            Storage.remove("token");
            window.location.assign("index.html");
        } else {
            window.location.href = "index.html";
        }
    });
}

function deletePost(postId) {
    return postsApi.deletePost(postId).then(() => {
        const postBox = document.getElementById(`post-${postId}`);
        if (postBox) {
            postBox.remove();
        }
    });
}

createContainer();
