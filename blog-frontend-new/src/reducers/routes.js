const initialState = {
    pages: [
        { pageId: 'main', name: 'Главная', path: '/' },
        { pageId: 'posts', name: 'Все статьи', path: '/posts' },
        { pageId: 'users', name: 'Пользователи', path: '/users' },
        { pageId: 'about', name: 'Контакты', path: '/about' },
    ],
    otherPages: [
        { pageId: 'addPost', name: 'Добавить статью', path: '/posts/addPost' },
        { pageId: 'postPage', name: 'Статья', path: '/posts/:postId' },
        { pageId: 'deletePost', name: 'Удалить статью', path: '/posts/delete/:postId' },
        { pageId: 'editPost', name: 'Редактировать статью', path: '/posts/edit/:postId' },
        { pageId: 'search', name: 'Поиск', path: '/posts/search' },

        { pageId: 'userPage', name: 'Пользователь', path: '/users/:userId' },
        { pageId: 'editUser', name: 'Редактировать пользователя', path: '/editUser' },
        { pageId: 'deleteUser', name: 'Удалить пользователя', path: '/deleteUser' },
        { pageId: 'addUser', name: 'Регистрация пользователя', path: '/addUser' },

        { pageId: 'addComment', name: 'Добавить комментарий', path: '/posts/:postId/addComment'},
        { pageId: 'deleteComment', name: 'Удалить комментарий', path: '/posts/:postId/deleteComment/:commentId' },
        { pageId: 'editComment', name: 'Редактировать комментарий', path: '/posts/:postId/editComment/:commentId' },
    ],
}

export default function pagesReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}