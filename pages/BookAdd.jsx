import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React

export function BookAdd() {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState('')


    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${search}`


    useEffect(() => {
        loadResults()
    }, [])

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

    if (!results) return <div>Loading...</div>

    return (
        <section>
            <h1>Add Book</h1>
            <input onChange={handleChange} type="text" name="search" id="search" />
            <select name="results" id="results">
                {/* {results.map(result =>
                    <option value={result}>{result}</option>
                )} */}
            </select>
        </section>
    )
}