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
    public class MapController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public MapController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Map
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Map>>> GetMap()
        {
          if (_context.Map == null)
          {
              return NotFound();
          }
            return await _context.Map.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Map>> GetMapById(int id)
        {
            var map = await _context.Map.FindAsync(id);

            if (map == null)
            {
                return NotFound();
            }

            return map;
        }

        [HttpGet("availablemap")]
        public async Task<ActionResult<IEnumerable<Map>>> GetAvailableMap()
        {
            var maps = await _context.Map.Where(m => m.Status == 2).ToListAsync();

            if (maps == null)
            {
                return NotFound();
            }
            return maps;
        }




        // GET: api/Map/5
        [HttpGet("createdby")]
        public async Task<ActionResult<List<Map>>> GetMapsByCreatedBy(int createdBy)
        {
            if (_context.Map == null)
            {
                return NotFound();
            }

            var maps = await _context.Map.Where(m => m.CreateBy == createdBy).ToListAsync();

            if (maps == null || maps.Count == 0)
            {
                return NotFound();
            }

            return maps;
        }

        // PUT: api/Map/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMap(int id, Map map)
        {
            if (id != map.Id)
            {
                return BadRequest();
            }

            _context.Entry(map).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MapExists(id))
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

        // POST: api/Map
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Map>> PostMap(Map map)
        {
          if (_context.Map == null)
          {
              return Problem("Entity set 'QuizDbContext.Map'  is null.");
          }
            _context.Map.Add(map);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMap", new { id = map.Id }, map);
        }

        // DELETE: api/Map/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMap(int id)
        {
            if (_context.Map == null)
            {
                return NotFound();
            }
            var map = await _context.Map.FindAsync(id);
            if (map == null)
            {
                return NotFound();
            }

            _context.Map.Remove(map);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MapExists(int id)
        {
            return (_context.Map?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
