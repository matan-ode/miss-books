import { BooksPreview } from '../cmps/BooksPreview.jsx'

export function HomePage() {
    return (
        <section className="home">
            <h2>We love books!</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/5078/5078755.png" alt="Book icon" />
            <BooksPreview />
        </section>
    )
}
