using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/books")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly BookRepository _repository;

    public BooksController(BookRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public IEnumerable<Book> Get() => _repository.GetAll();

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var book = _repository.GetById(id);
        if (book == null) return NotFound();
        return Ok(book);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Book book)
    {
        _repository.Add(book);
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Book book)
    {
        if (id != book.Id) return BadRequest();
        _repository.Update(book);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _repository.Delete(id);
        return NoContent();
    }
}

