const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((bookItem) => bookItem.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const getAllBooksHandler = (request) => {
  const keys = ['id', 'name', 'publisher'];
  const {
    name: queryName,
    reading,
    finished,
  } = request.query;

  if (queryName) {
    return {
      status: 'success',
      data: {
        books: books
          .filter((bookItem) => bookItem.name.toLowerCase().includes(queryName.toLowerCase()))
          .map(({ id, name, publisher }) => ({ id, name, publisher })),
      },
    };
  }

  if (reading !== undefined) {
    const readingValue = !!parseInt(reading, 10);
    const bookList = books
      .filter((bookItem) => bookItem.reading === readingValue)
      .map(({ id, name, publisher }) => ({ id, name, publisher }));

    return {
      status: 'success',
      data: {
        books: bookList,
      },
    };
  }

  if (finished !== undefined) {
    const finishedValue = !!parseInt(finished, 10);
    const bookList = books
      .filter((bookItem) => bookItem.finished === finishedValue)
      .map(({ id, name, publisher }) => ({ id, name, publisher }));

    return {
      status: 'success',
      data: {
        books: bookList,
      },
    };
  }

  const bookList = books.map((bookItem) => {
    const obj = {};
    keys.forEach((k) => { obj[k] = bookItem[k]; });
    return obj;
  });

  return {
    status: 'success',
    data: {
      books: bookList,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const bookItem = books.filter((book) => book.id === bookId)[0];

  if (bookItem !== undefined) {
    return {
      status: 'success',
      data: {
        book: bookItem,
      },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((bookItem) => bookItem.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((bookItem) => bookItem.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  getAllBooksHandler,
  addBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
