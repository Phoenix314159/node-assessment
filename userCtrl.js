const users = require('./users');
module.exports = {
    readAll: () => {
        return users.find();
    },
    findUserById: id => {
        return users.findOne('id', id);
    },
    getAdmins: () => {
        return users.find('type', 'admin');
    },
    getNonAdmins: () => {
        return users.find('type', 'user')
    },
    getUsersByFavorite: favorite => {
        return users.find().filter(a => {
            return a.favorites.indexOf(favorite) !== -1;
        });
    },
    getUsersByAgeLimit: age => {
        return users.find().filter(a => {
            return a.age < age;
        });
    },
    findUserByQuery: (query, value) => {
        return users.find(query, value);
    },
    createUser: user => {
        user["first_name"] = 'mike';
        user["last_name"] = 'bomb';
        user["email"] = 'mcb@dude.com';
        user["gender"] = 'male';
        user["language"] = 'spanish';
        user["age"] = '32';
        user["city"] = 'phoenix';
        user['state'] = 'az';
        user["type"] = 'user';
        return users.add(user);
    },
    updateUser: (userId, obj) => {
        users.find().map(a => {
            a.id === userId ? Object.assign(a, obj) : null;
        });
    },
    removeUser: userId => {
        users.find().map(a => {
            a.id === userId ? users.remove(Object.keys(a)[0], userId) : null;
        });
    }
}
