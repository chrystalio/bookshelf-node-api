const {nanoid} = require("nanoid");
const books = require("./books")

const getBookLists = () => ({
    status: "success",
    data: {
        books
    },
});

module.exports = { getBookLists };