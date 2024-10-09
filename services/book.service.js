import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksDB } from './booksDB.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyCar: getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     cars = cars.filter(car => regExp.test(car.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     cars = cars.filter(car => car.speed >= filterBy.minSpeed)
            // }
            
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook() {
    return {
        id: '',
        title: '',
        description: '',
        thumbnail: '',
        listPrice: { amount: '', currencyCode: '', isOnSale: '' }
    }
}

function getDefaultFilter() {
    return { title: '', minAmount: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksDB.getBooks()
        saveToStorage(BOOK_KEY, books)
    }

    console.log(books);
    

    //     books = [
    //         _createBook('audu', 300),
    //         _createBook('fiak', 120),
    //         _createBook('subali', 50),
    //         _createBook('mitsu', 150)
    //     ]
    //     saveToStorage(BOOK_KEY, books)
    // }
}

function _createBook() {
    const book = getEmptyBook()
    book.id = makeId()
    return book
}