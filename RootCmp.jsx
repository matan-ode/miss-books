const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { Goal } from "./cmps/Goal.jsx"
import { Team } from "./cmps/Team.jsx"
import { BookDetails } from "./pages/BookDetalis.jsx"

export function App() {


    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />}>
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/goal" element={<Goal />} />
                        </Route>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </main>
            </section>
        </Router>
    )
}