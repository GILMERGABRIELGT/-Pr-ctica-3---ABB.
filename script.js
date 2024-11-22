class BookNode {
    constructor(isbn, title) {
      this.isbn = isbn;
      this.title = title;
      this.left = null;
      this.right = null;
    }
  }
  
  class BookBST {
    constructor() {
      this.root = null;
    }
  
    insert(isbn, title) {
      const newNode = new BookNode(isbn, title);
      if (!this.root) {
        this.root = newNode;
      } else {
        this._insertNode(this.root, newNode);
      }
    }
  
    _insertNode(node, newNode) {
      if (newNode.isbn < node.isbn) {
        if (!node.left) {
          node.left = newNode;
        } else {
          this._insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          this._insertNode(node.right, newNode);
        }
      }
    }
  
    search(isbn) {
      return this._searchNode(this.root, isbn);
    }
  
    _searchNode(node, isbn) {
      if (!node) return null;
      if (isbn === node.isbn) return node;
      return isbn < node.isbn
        ? this._searchNode(node.left, isbn)
        : this._searchNode(node.right, isbn);
    }
  
    delete(isbn) {
      this.root = this._deleteNode(this.root, isbn);
    }
  
    _deleteNode(node, isbn) {
      if (!node) return null;
  
      if (isbn < node.isbn) {
        node.left = this._deleteNode(node.left, isbn);
        return node;
      } else if (isbn > node.isbn) {
        node.right = this._deleteNode(node.right, isbn);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        const minNode = this._findMinNode(node.right);
        node.isbn = minNode.isbn;
        node.title = minNode.title;
        node.right = this._deleteNode(node.right, minNode.isbn);
        return node;
      }
    }
  
    _findMinNode(node) {
      while (node && node.left) node = node.left;
      return node;
    }
  
    inOrder(node = this.root, result = []) {
      if (node) {
        this.inOrder(node.left, result);
        result.push({ isbn: node.isbn, title: node.title });
        this.inOrder(node.right, result);
      }
      return result;
    }
  }
  
  const bookCatalog = new BookBST();
  
  document.getElementById('addBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const isbn = document.getElementById('isbn').value.trim();
    const title = document.getElementById('title').value.trim();
    bookCatalog.insert(isbn, title);
    displayCatalog();
  });
  
  document.getElementById('searchBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const isbn = document.getElementById('searchISBN').value.trim();
    const book = bookCatalog.search(isbn);
    alert(book ? `Libro encontrado: ${book.title}` : 'Libro no encontrado.');
  });
  
  document.getElementById('deleteBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const isbn = document.getElementById('deleteISBN').value.trim();
    bookCatalog.delete(isbn);
    displayCatalog();
  });
  
  function displayCatalog() {
    const catalogList = document.getElementById('catalogList');
    catalogList.innerHTML = '';
    const books = bookCatalog.inOrder();
    books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = `ISBN: ${book.isbn}, Título: ${book.title}`;
      catalogList.appendChild(li);
    });
  }
  