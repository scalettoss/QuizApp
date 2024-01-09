using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            var questions = await _context.Questions.ToListAsync();

            if (questions == null)
            {
                return NotFound();
            }
            var randomQuestions = questions.OrderBy(q => Guid.NewGuid()).Take(10).ToList();
            return randomQuestions;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsById(int id)
        {
            var questions = await _context.Questions.ToListAsync();

            var filteredQuestions = questions.Where(q => q.MapId == id).Take(10).ToList();

            if (filteredQuestions.Count == 0)
            {
                return NotFound();
            }

            return filteredQuestions;
        }

        [HttpGet("getbymap/{mapId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsByMapId(int mapId)
        {
            var filteredQuestions = await _context.Questions
                .Where(q => q.MapId == mapId)
                .ToListAsync();

            if (filteredQuestions.Count == 0)
            {
                return NotFound();
            }

            return filteredQuestions;
        }



        // GET: api/Question/5

        // PUT: api/Question/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.Id)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Question
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
          if (_context.Questions == null)
          {
              return Problem("Entity set 'QuizDbContext.Questions'  is null.");
          }
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostQuestion), new { id = question.Id }, question);
        }

        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("deleteby-mapid/{mapId}")]
        public async Task<IActionResult> DeleteQuestionsByMapId(int mapId)
        {
            var questions = await _context.Questions
                .Where(q => q.MapId == mapId)
                .ToListAsync();

            if (questions == null || questions.Count == 0)
            {
                return NotFound();
            }

            _context.Questions.RemoveRange(questions);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool QuestionExists(int id)
        {
            return (_context.Questions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
