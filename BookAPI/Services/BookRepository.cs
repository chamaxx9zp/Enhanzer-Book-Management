using System.Collections.Generic;
using System.Linq;

public class BookRepository
{
    private readonly List<Book> _books = new();

    public IEnumerable<Book> GetAll() => _books;

    public Book GetById(int id) => _books.FirstOrDefault(b => b.Id == id);

    public void Add(Book book) => _books.Add(book);

    public void Update(Book book)
    {
        var existing = _books.FirstOrDefault(b => b.Id == book.Id);
        if (existing != null)
        {
            existing.Title = book.Title;
            existing.Author = book.Author;
            existing.ISBN = book.ISBN;
            existing.PublicationDate = book.PublicationDate;
        }
    }

    public void Delete(int id) => _books.RemoveAll(b => b.Id == id);
}
