const {getAllBooksHandler, addBookHandler, getBookByIdHandler, editBookByIdHandler} = require("./handler");

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method: 'POST',
        path: '/books/{bookId}',
        handler:editBookByIdHandler
    }
];


module.exports = routes;