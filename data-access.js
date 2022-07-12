//
// File: data-access.js
// Date: 6/25/2022
//
const GET_PERSON = "select * from person where person_id =($1);"
const GET_BOOK_STORE_ID = `
select 
b.title
from book_store bs
join book_store_book bsb on bsb.book_store_id = bs.book_store_id
join book b on b.book_id=bsb.book_id
where bs. book_store_id = ($1);`
const UPDATE_PERSON = "update person set first_name = $2 where person_id = $1 returning person_id;"
const INSERT_BOOK_STORE = 
`insert into 
   book_store (book_store_name) 
values 
($1) returning book_store_name;`
const INSERT_BOOK = 
    `insert into 
        book (title, isbn) 
    values 
        ($1, $2) 
    returning book_id ;`
const INSERT_BOOK_STORE_BOOK =
   `insert into 
       book_store_book (book_id, book_store_id) 
    values 
      ($1, $2) 
    returning book_store_book_id;`

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password:"Diane1991@" ,
  database: "postgres",
  host: "localhost",
  port: 5432,
});

exports.ex13 = async () => {
    let personId = 1
    console.log(await this.getPerson(personId))
}

exports. ex14 = async () => {
    let bookstoreId = 1
    console.log(await this.getBooks(bookstoreId))
}

exports. ex15 = async () => {
    let personId = 1
    let newName = "Johnny"
    return await this.updatePerson(personId, newName)
}

exports.ex16 = async () => {
    let bookstoreName = "Book World"
    return await addBookstore(bookstoreName)
}

exports.ex17 = async () => {
    let newBookTitle = "Jesus is Lord"
    let newBookIsbn = "31-03-1991-11-11-11"
    let bookStoreId = 1
    return await addBook(newBookTitle, newBookIsbn, bookStoreId)
}

//
// Your functions here...
//

exports.getPerson = async (personId) => {
    let retval = null;
    try{
        let r = await pool.query(GET_PERSON, [personId]);
        retval = r.rows;
    }catch (err){
        console.error(err);
    }
    return retval;
}

exports. getBooks = async (bookStoreId) => {
    let retval = null;
    try{
        let r = await pool.query(GET_BOOK_STORE_ID, [bookStoreId]);
        retval = r.rows;
    }catch (err){
        console.error(err);
    }
    return retval;
}

exports.updatePerson = async (personId, newName) => {
    let retval = null;
    try {
      let r = await pool.query(UPDATE_PERSON, [personId, newName]);
      retval = r.rows[0];
    } catch (err) {
      console.error(err);
    }
    return retval;
}

const addBookstore = async (bookstoreName) => {
    let retval = null;
    try {
        let r = await pool.query(INSERT_BOOK_STORE, [bookstoreName]);
        retval = r.rows[0];
      } catch (err) {
        console.error(err);
      }
    return retval;
}

const addBook = async (title, isbn, bookStoreId) => {
    let retval = null;
    try {
        let r = await pool.query(INSERT_BOOK, [title, isbn]);
        let bookId = r.rows[0].book_id;
        r = await pool.query(INSERT_BOOK_STORE_BOOK, [bookId, bookStoreId]);
        retval = r.rows[0];
      } catch (err) {
        console.error(err);
      }
    return retval;
}

// main()
