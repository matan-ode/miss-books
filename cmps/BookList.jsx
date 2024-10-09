import { BookPreview } from "./BookPreview.jsx";


export function BookList({ books, onRemoveBook, onSelectBookId }) {


    return (
        <ul className="book-list">
            {books.map(book =>
                <li className="book-card" key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>)
            }
        </ul>
    )
}