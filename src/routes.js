const {getAllBookHandler, addBookHandler} = require("./handler");

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    }
];


module.exports = routes;