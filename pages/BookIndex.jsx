
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { BookDetails } from "./BookDetalis.jsx";

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
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

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {!selectedBookId ?
                <BookList onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} books={books} />
                : <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
            }
        </section>
    )
}