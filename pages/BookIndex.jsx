const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { BookDetails } from "./BookDetails.jsx";

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books =>
                    books.filter(book => book.id !== bookId)
                )
            })
            .catch(err => {
                console.log('Problems removing book:', err);

            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }



    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <button><Link to="/book/edit">Add Book</Link></button>
            <BookList onRemoveBook={onRemoveBook} books={books} />
        </section>
    )
}