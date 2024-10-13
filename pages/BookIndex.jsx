const { Link, useSearchParams } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTruthyValues } from '../services/util.service.js';
import { BookDetails } from "./BookDetails.jsx";

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
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
                showSuccessMsg('Book removed successfully')
            })
            .catch(err => {
                console.log('Problems removing book:', err);
                showErrorMsg(`Problems removing book (${bookId})`)
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
            <button><Link to="/book/add">Add Book From Google</Link></button>
            <BookList onRemoveBook={onRemoveBook} books={books} />
        </section>
    )
}