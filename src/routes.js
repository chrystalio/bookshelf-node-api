const {getBookLists} = require("./handler");

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getBookLists,
    },
];


module.exports = routes;