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
    public class ParticipantController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Participant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
          if (_context.Participants == null)
          {
              return NotFound();
          }
            return await _context.Participants.ToListAsync();
        }
        //[HttpGet("getparbymapid/{mapId}")]
        //public async Task<ActionResult<IEnumerable<Participant>>> GetParticipantsByMapId(int mapId)
        //{
        //    var participants = await _context.Participants
        //        .Where(p => p.MapId == mapId)
        //        .OrderByDescending(p => p.Score)
        //        .Take(3)
        //        .Select(p => new { p.Times, p.Score, p.UserId })
        //        .ToListAsync();

        //    if (participants == null || participants.Count == 0)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(participants);
        //}

        [HttpGet("getparbymapid/{mapId}")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetParticipantsByMapId(int mapId)
        {
            var participants = await _context.Participants
                .Where(p => p.MapId == mapId)
                .OrderByDescending(p => p.Score)
                .Take(3)
                .Join(_context.Users, p => p.UserId, u => u.Id, (p, u) => new { p.Times, p.Score, u.Fullname })
                .ToListAsync();

            if (participants == null || participants.Count == 0)
            {
                return NotFound();
            }
            return Ok(participants);
        }



        // GET: api/Participant/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(int id)
        {
          if (_context.Participants == null)
          {
              return NotFound();
          }
            var participant = await _context.Participants.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }
        [HttpGet("{mapId}/{userId}")]
        public async Task<ActionResult<Participant>> GetParticipant(int mapId, int userId)
        {
            var participant = await _context.Participants.FirstOrDefaultAsync(p => p.MapId == mapId && p.UserId == userId);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }
        // PUT: api/Participant/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(int id, Participant participant)
        {
            if (id != participant.Id)
            {
                return BadRequest();
            }

            _context.Entry(participant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
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

        // POST: api/Participant
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            if (_context.Participants == null)
            {
                return Problem("Entity set 'QuizDbContext.Participants'  is null.");
            }
            _context.Participants.Add(participant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetParticipant", new { id = participant.Id }, participant);
        }


        // DELETE: api/Participant/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipant(int id)
        {
            if (_context.Participants == null)
            {
                return NotFound();
            }
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null)
            {
                return NotFound();
            }

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{mapId}/{userId}")]
        public async Task<IActionResult> DeleteParticipantByMapIdAndUserId(int mapId, int userId)
        {
            var participant = await _context.Participants
                .FirstOrDefaultAsync(p => p.MapId == mapId && p.UserId == userId);

            if (participant == null)
            {
                return NotFound();
            }

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantExists(int id)
        {
            return (_context.Participants?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
