import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"
import {debounce} from '../services/util.service.js';

const { useState, useEffect } = React

export function BookAdd() {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState('')

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${search ? search.search : ''}`

    useEffect(() => {
        loadResults()
    }, [search])

    function loadResults() {
        bookService.getGoogleBooks(url)
            .then(results => {
                console.log(results);

                setResults(results)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.value) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setSearch(prevSearch => ({ ...prevSearch, [field]: value }))
    }

    function onAddGoogleBook(item) {
        console.log('hi', item);

        return bookService.addGoogleBook(item)
    }

    const { newSearch } = search

    if (!results) return <div>Loading...</div>

    return (
        <section className="add-book-container">
            <h1>Add Book</h1>
            <input onChange={debounce(handleChange, 700)} value={newSearch} type="text" name="search" id="search" />
            {results.map(result =>
                <div className="google-result" key={result.id}>
                    <p>{result.title}</p>
                    <button onClick={() => onAddGoogleBook(result)}>+</button>
                </div>
            )}
        </section>
    )
}