import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksDB } from './booksDB.service.js'

const BOOK_KEY = 'bookDB'
const REVIEWS_KEY = 'reviewsDB'
const GOOGLE_KEY = 'googleDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addReview,
    getReviews,
    getGoogleBooks

}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minAmount) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minAmount)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
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

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function addReview(bookId, review) {
    const newReviews = { bookId, ...review }
    return storageService.post(REVIEWS_KEY, newReviews)
}

function getReviews(bookId) {
    // return storageService.get(REVIEWS_KEY, bookId)
    return storageService.query(REVIEWS_KEY)
        .then(reviews => {
            return reviews.filter(review => review.bookId === bookId)
        })
    // _queryReviews(bookId)
}

function getGoogleBooks(url) {
    const values = loadFromStorage(GOOGLE_KEY)
    if (values) return Promise.resolve(values)

    return axios.get(url).then(res => {
        const values = res.data.items
        console.log(values);
        
        const valuesData = getPrepareData(values)
        storageService.post(GOOGLE_KEY, valuesData)
        console.log(valuesData)
        return valuesData
    })
}

function getPrepareData( results ) {
    console.log(results);
    
    return results.map((book) => {
        return {
            id: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            language: book.volumeInfo.imageLinks.language,
            listPrice: {amount:99, currencyCode: "EUR", isOnSale: checkIsSale(book.saleInfo.saleability) }
        }
    })
}


function checkIsSale(str){
    if(str === 'NOT_FOR_SALE') return false
    else return true
}
// {
//     "id": "OXeMG8wNskc",
//     "title": "metus hendrerit",
//     "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
//     "authors": [
//       "Barbara Cartland"
//     ],
//     "publishedDate": 2023,
//     "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
//     "pageCount": 713,
//     "categories": [
//       "Computers",
//       "Hack"
//     ],
//     "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
//     "language": "en",
//     "listPrice": {
//       "amount": 109,
//       "currencyCode": "EUR",
//       "isOnSale": false
//     }
//   },

function addGoogleBook(item) {

}