import uuid from 'uuid';
import Joi from '@hapi/joi';
import controllers from './controllers.js';
import { generateHash } from './helpers.js';
import Boom from '@hapi/boom';

const uuidv4 = uuid.v4;
export default [
    {
        method: 'GET',
        path: '/api/hello',
        handler: controllers.hello,
        options: {
            validate: {
                query: Joi.object({
                    name: Joi.string().valid('Вася', 'Петя', 'Лена').required(),
                    age: Joi.string().valid('24', '22', '29').required()
                }).optional()
            }
        }
    },
    {
        method: 'GET',
        path: '/api/users',
        handler: controllers.getUsers,
        config: {
            cors : true,
        }
    },

    {
        method: 'POST',
        path: '/api/login',
        handler: controllers.login,
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).required(),
                }),
            },
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/deleteUser',
        handler: controllers.deleteUser,
        options: {
            auth: {
                strategy: 'user',
            },
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/registerUser',// урл регистрации новых пользователей
        handler: controllers.register,
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(6).required(),
                    name: Joi.string().min(2).required(),
                    surname: Joi.string(),
                    aboutMyself: Joi.string(),
                }),
            },
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/editUser',
        handler: controllers.editUser,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    password: Joi.string().min(6),
                    name: Joi.string().min(2),
                    surname: Joi.string(),
                    aboutMyself: Joi.string(),
                }),
            },
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/addPost',// добавить пост
        handler: controllers.addPost,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(2).required(),
                    text: Joi.string().max(3000).required(),
                    token: Joi.string().max(36).required(),
                }),
            },
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/deletePost',
        handler: controllers.deletePost,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    postId: Joi.string().min(36).required(),
                }),
            },
            cors : true,
        },

    },
    {
        method: 'POST',
        path: '/api/editPost',
        handler: controllers.editPost,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).required(),
                    text: Joi.string().max(3000).required(),
                    postId: Joi.string().min(36).required(),

                }),
            },
            cors : true,
        },

    },
    {
        method: 'GET',
        path: '/api/posts/{postId}',
        handler: controllers.getPost,
        config: {
            cors : true,
        },
    },
    {
        method: 'GET',
        path: '/api/posts',// получить все посты
        handler: controllers.getPosts,
        config: {
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/comments',
        handler: controllers.getComments,
        options: {
            validate: {
                payload: Joi.object({
                    postId: Joi.string().min(36).required(),
                }),
            },
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/addComment',
        handler: controllers.addComment,
        options: {
            auth: {
                strategy: 'user',
            },
            validate: {
                payload: Joi.object({
                    text: Joi.string().max(1000).required(),
                    postId: Joi.string().min(36).required(),
                }),
            },
            cors : true,

        }
    },
    {
        method: 'POST',
        path: '/api/deleteComment',
        handler: controllers.deleteComment,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    commentId: Joi.string().min(36).required(),
                }),
            },
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/editComment',
        handler: controllers.editComment,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    text: Joi.string().max(300).required(),
                    commentId: Joi.string().min(36).required(),
                }),
            },
            cors : true,

        }
    },
    {
        method: 'GET',
        path: '/api/commentsCount',
        handler: controllers.commentsCount,
        config: {
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/search',
        handler: controllers.search,
        options: {
            validate: {
                payload: Joi.object({
                    search: Joi.string().max(300).required(),
                }),
            },
            cors : true,

        }
    },
    {
        method: 'GET',
        path: '/api/likes',// получить все лайки пользователя
        handler: controllers.getLikes,
        options: {
            auth: {
                strategies:['user','admin']
            },
            cors : true,
        }
    },
    {
        method: 'GET',
        path: '/api/likesCount',
        handler: controllers.likesCount,
        config: {
            cors : true,
        }
    },
    {
        method: 'POST',
        path: '/api/addLike',
        handler: controllers.addLike,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    postId: Joi.string().min(36).required(),
                }),
            },
            cors : true,

        }
    },
    {
        method: 'POST',
        path: '/api/deleteLike',
        handler: controllers.deleteLike,
        options: {
            auth: {
                strategies:['user','admin']
            },
            validate: {
                payload: Joi.object({
                    postId: Joi.string().min(36).required(),
                }),
            },
            cors : true,
        }
    },
    {
        method: 'GET',//заглушка для статичных файлов
        path: '/{file*}',
        handler: {
            directory: {
                path: './public',
                redirectToSlash: true,
                index: true,
            }
        }
    }
];
