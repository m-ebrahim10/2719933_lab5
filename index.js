const express = require('express');
const app = express();
//const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.use(express.json());

// store in memory 
let books = [];

// GET /whoami -- Returns an object with your student number.
app.get('/whoami', (req, res) => {
    res.json({ studentNumber: "2719933" });
});

// GET /books - Returns all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id - Returns a specific book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
});

// POST /books - Adds a new book
app.post('/books', (req, res) => {
    const { id, title, details } = req.body;
    if (!id || !title || !details) {
        return res.status(400).json({ error: "Missing required book details" });
    }
    books.push({ id, title, details });
    res.status(201).json({ message: "Book added successfully" });
});

// PUT /books/:id - Updates an existing book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    book.title = req.body.title || book.title;
    book.details = req.body.details || book.details;
    res.json({ message: "Book updated successfully" });
});

// DELETE /books/:id - Deletes a book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }
    books.splice(index, 1);
    res.json({ message: "Book deleted successfully" });
});

// POST /books/:id/details - Adds a detail to a book
app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    const { id, author, genre, publicationYear } = req.body;
    if (!id || !author || !genre || !publicationYear) {
        return res.status(400).json({ error: "Missing required detail fields" });
    }
    book.details.push({ id, author, genre, publicationYear });
    res.status(201).json({ message: "Detail added successfully" });
});

// DELETE /books/:id/details/:detailId - Removes a detail from a book
app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
    if (detailIndex === -1) {
        return res.status(404).json({ error: "Detail not found" });
    }
    book.details.splice(detailIndex, 1);
    res.json({ message: "Detail removed successfully" });
});

//Start server
//app.listen(PORT, () => {
  //  console.log(`Server is running on http://localhost:${PORT}`);
//});


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

