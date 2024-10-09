
const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"

export function App() {

    const [page, setPage] = useState('home')

    return (
        <section className="app">
            <AppHeader onSetPage={(page) => setPage(page)}/>
                
            <main className="main-layout">
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}

            </main>
        </section>
    )
}