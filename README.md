<h1 align="left">📍 Учебный проект "Mesto"</h1>

<div align="left">
  <a href="https://irina-sakhno.students.nomoreparties.sbs/">
    <img width="600" alt="Основной экран приложения" src="https://github.com/IrinaSakhno/react-mesto-api-full-gha/assets/110684477/552fca68-c966-482a-8bed-16f5c9b0f029">
  </a>
</div>

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#technologies">Стек технологий</a></li>
      <li><a href="#installation">Установка и запуск приложения в локальном репозитории, эксплуатация</a></li>
      <li><a href="#functionality">Функционал</a></li>
      <li><a href="#enhancement">Планы по улучшению</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
Данная проектная работа реализована в рамках курса по Веб-разработке от <a href="https://practicum.yandex.ru/">Яндекс Практикума</a>. Проект представляет собой SPA-приложение с адаптивной версткой, написанное на "React" (часть frontend) и "Node" (часть backend), с возможностью регистрации личного кабинета пользователя, редактирования данных и добавления фотокарточек в общую галерею.

Изначально приложение было написано на нативных технологиях: JavaScript, CSS3 и HTML5. Затем проект был перенесен на "React" с добавлением регистрации и авторизации пользователей. Отдельно написана логика серверной части с использованием фреймворка "Express". И в завершение обе части объединены и задеплоены на виртуальную машину, размещенную на <a href="https://cloud.yandex.ru/">Яндекс Облаке</a>.

<b>Адрес репозитория:</b> https://github.com/IrinaSakhno/react-mesto-api-full-gha

<b>Ссылки на проект:</b>
<br>
IP 158.160.76.66
<br>
Frontend https://irina-sakhno.students.nomoreparties.sbs/
<br>
Backend https://api.irina-sakhno.students.nomoreparties.sbs/

<a name="technologies"><h2>2. Стек технологий</h2></a>
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка React">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="Иконка React Router">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="Иконка 'JavaScript'">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="Иконка CSS3">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка HTML5">
  <a href=""><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Иконка 'Express'"></a>
  <a href=""><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Иконка 'Node JS'"></a>
  <a href=""><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="Иконка 'MongoDB'"></a>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Иконка 'NGINX'">
</span>


<a name="installation"><h2>3. Установка и запуск приложения на локальной машине</h2></a>
1. `git clone https://github.com/IrinaSakhno/react-mesto-api-full-gha.git` - клонировать репозиторий на свое устройство
2. `npm i` - установить зависимости (отдельно - в папке `frontend` и `backend`)
3. `npm run dev` - запустить приложение в режиме разработчика в папке `backend` (можно предварительно настроить `порт 3001`)
4. `npm run start` - запустить приложение в режиме разработчика в папке `frontend`

<a name="functionality"><h2>4. Функциональность</h2></a>
1. Регистрация и авторизация пользователей
2. Редактирование данных пользователя
3. Обновление аватара
4. Добавление новой карточки
5. Добавление и снятие лайка (работает счетчик лайков)
6. Удаление карточки с подтверждением действия в модальном окне
7. Модальное окно успешной/неудачной регистрации на сайте
8. Модальное окно с увеличенной фотографией карточки
9. Открытие и закрытие модальных окон (по кнопке, оверлею и клавише "Escape")

<a name="enhancement"><h2>5. Планы по улучшению</h2></a>
- Спиннеры загрузки
- Валидация форм
- Страница 404


<div align="right">(<a href="#summary">к оглавлению</a>)</div>

