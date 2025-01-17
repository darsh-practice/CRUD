app.get("/books/:bookId", (req, res) => {
  res.send(req.params.bookId);
});
