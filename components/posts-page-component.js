import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user, getToken } from "../index.js";
import { getDisliked, getLiked } from "../api.js";
import { formatDistanceToNow } from "date-fns";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  // const timeToPosted = formatDistanceToNow(new Date(posts.createdAt));
  
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  const postEl = document.querySelector('.posts');

  const postsHtml = posts
    .map((posts) => {
      return `<li class="post">
          <div class="post-header" data-user-id="${posts.user.id}">
              <img src="${posts.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${posts.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${posts.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${posts.id}" class="like-button">
              <img src="./assets/images/${posts.isLiked ? 'like-active' : 'like-not-active'}.svg">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${posts.likes.length > 1 ? (posts.likes[0].name + ' и ещё ' + (posts.likes.length - 1).toString()) : `${posts.likes.length === 0 ? '0' : posts.likes[0].name}`}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${posts.user.name}</span>
            ${posts.description}
          </p>
          <p class="post-date">
            ${formatDistanceToNow(new Date(posts.createdAt))} ago
          </p>
        </li>`;
    }).join('');

    postEl.innerHTML = postsHtml;


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let likeEl of document.querySelectorAll('.like-button')) {
    likeEl.addEventListener('click', () => {
      if (user) {
        const i = posts.findIndex((posts => posts.id === likeEl.dataset.postId));
        posts[i].isLiked ?
        getDisliked({
          postId: likeEl.dataset.postId,
          token: getToken()
          }).then(() => {
            posts[i].isLiked = false,
            goToPage(POSTS_PAGE)
          })
        : getLiked({
          postId: likeEl.dataset.postId,
          token: getToken()
          }).then(() => {
            posts[i].isLiked = true,
            goToPage(POSTS_PAGE)
          })
      }
      else {
        alert('Добавлять и убирать лайки могут только авторизованные пользователи')
      }
            
    })
  }
};


