import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста

    const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="form"></div>
              </div>`;

    appEl.innerHTML = appHtml;

    const formEl = document.querySelector('.form');

    const formHtml = `
    <h3 class="form-title">Добавить пост</h3>
             <div class="form-inputs">
               <div class="upload-image-container">
                 <div class="upload=image">
                 <label class="file-upload-label secondary-button">
                     <input type="file" class="file-upload-input" style="display:none">
                     Выберите фото
                 </label>
                </div>
               </div>
               <label>
                 Опишите фотографию:
                 <textarea class="input textarea" rows="4"></textarea>
                 </label>
                 <button class="button" id="add-button">Добавить</button>
             </div>`;

    formEl.innerHTML = formHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });


    // const uploadImageContainer = appEl.querySelector(".onImageUrlChange");

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.querySelector('.textarea');
      imageUrl ? description.value ? 
      onAddPostClick({
        description: description.value,
        imageUrl: imageUrl,
      }) : alert('Не заполнено описание фото') : alert('Не указано фото');
      goToPage(POSTS_PAGE);
    })
  };

  render();
}
