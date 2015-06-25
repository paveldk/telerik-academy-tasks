function solve() {
	var library = (function () {
		var minSymbols = 2,
			maxSymbols = 100,
			ISBNSymbolsLenght = [10, 13],
			books = [],
			categories = [];

		function isUnique(arr, newValue, prop) {
			var resultArray;

			if (!newValue) {
				throw new Error("isUnique:: value is missing.");
			}

			resultArray = arr.filter(function (val) {
				return val[prop] === newValue;
			});

			return resultArray.length === 0;
		}

		function isUniqueCategory(categoryName) {
			var resultArray;

			if (!categoryName) {
				throw new Error("isUnique:: value is missing.");
			}

			resultArray = categories.filter(function (val) {
				return val.name === categoryName;
			});

			return resultArray.length === 0;
		}

		function matchCriteria(val) {
			if (val.length < minSymbols) {
				throw new Error("matchCriteria:: " + val + " is too short. Min is " + minSymbols + " symbols");
			}

			if (val.length > maxSymbols) {
				throw new Error("matchCriteria:: " + val + " is too long. Max is " + maxSymbols + " symbols");
			}
		}

		function isValidISBN(isbn) {
			var isbnLength = isbn.length;

			return ISBNSymbolsLenght.indexOf(isbnLength) > -1;
		}

		function categoryExists(categoryName) {
			return categories.indexOf(categoryName) > -1;
		}

		function validateBook(book) {
			var category = {};

			if (!book.author) {
				throw new Error("addBook:: book author is missing!");
			}

			if (!isUnique(books, book.title, "title")) {
				throw new Error("addBook:: book with such title already exists!");
			}

			matchCriteria(book.title);

			if (!isUnique(books, book.isbn, "isbn")) {
				throw new Error("addBook:: book with such isbn already exists!");
			}

			matchCriteria(book.isbn);

			if (isUniqueCategory(book.category)) {
				category.id = categories.length + 1;
				category.name = book.category;

				categories.push(category);
			}

			if (!isValidISBN(book.isbn)) {
				throw new Error("validateBook:: " + book.isbn + " must be " + ISBNSymbolsLenght.join(" or ") + "!!");
			}
		}

		function listBooks(sortPropertyObj) {
			var sortProperties,
				sortProperty;

			sortPropertyObj = sortPropertyObj || {};
			sortProperties = Object.keys(sortPropertyObj);
			sortProperty = sortProperties[0];

			return books.filter(function (obj) {
				return obj[sortProperty] === sortPropertyObj[sortProperty];
			}).sort(function (a, b) {
				return a.id - b.id;
			});
		}

		function addBook(book) {
			validateBook(book);

			book.ID = books.length + 1;
			books.push(book);

			return book;
		}

		function listCategories() {
			return categories.sort(function (a, b) {
				return a.id - b.id;
			}).map(function (category) {
				return category.name;
			});
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());

	return library;
}
solve();
