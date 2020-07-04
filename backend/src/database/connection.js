import userSchema from './userSchema.js';
import postSchema from './postSchema.js';
import commentSchema from './commentSchema.js';
import likeSchema from './likeSchema.js';
import mongoose from 'mongoose';

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;//
const dbName = 'mySite'

const uri = `mongodb://${host}:${port}/${dbName}`;

mongoose.connect(uri, { useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', (err) => {
    console.error('произошла ошибка при подключении к Монге', err);
});

db.once('open', () => {
    console.log('успешно подключились к Монге');
});

const user = mongoose.model('user', userSchema);
//там описана логика добавления поль-ля
const post = mongoose.model('post', postSchema);

const comment = mongoose.model('comment', commentSchema);

const like = mongoose.model('like', likeSchema);

export default {//экс-м объект, в котором поле user
    post,
    user,
    comment,
    like,

}
