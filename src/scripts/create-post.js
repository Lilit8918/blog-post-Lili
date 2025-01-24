import { api } from "../apis/api.js";
import { Storage } from "../utils/storage.js";

const handleCreatePost = async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const story = document.getElementById("story").value.trim();

  const newPost = {
    title,
    story,
    userId: Storage.get("user").id,
  };

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  if (id) {
    await api.post.update(id, newPost);
  } else {
    await api.post.create(newPost);
  }

  window.location.href = "home.html";
};

document.getElementById("postForm").onsubmit = handleCreatePost;
