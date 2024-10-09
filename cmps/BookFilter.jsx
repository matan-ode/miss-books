const { useState , useEffect} = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(()=>{
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, minAmount } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form className="filter-inputs">
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} type="text" name="title" id="txt" />

                <label htmlFor="minAmount">Minimum Price</label>
                <input onChange={handleChange} value={minAmount} type="number" name="minAmount" id="minAmount" />
            </form>
        </section>
    )
}