
const { useState, useEffect } = React

export function BookAdd() {

    const [search, setSearch] = useState('')


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


    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${search}`

    return (
        <section>
            <h1>Add Book</h1>
            <input onChange={handleChange} type="text" name="search" id="search" />
        </section>
    )
}