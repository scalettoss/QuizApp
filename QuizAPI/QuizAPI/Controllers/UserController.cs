using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuizAPI.DTO;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public UserController(QuizDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.Users == null)
          {
              return Problem("Entity set 'QuizDbContext.Users'  is null.");
          }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'QuizDbContext.Users'  is null.");
            }
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest("Email already exists.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDTO loginDto)
        {
            // Kiểm tra thông tin đăng nhập
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }
            // Tạo và trả về chuỗi token
            var token = GenerateToken(user);
            return Ok(token);
        }

        private string GenerateToken(User user)
        {
            // Tạo token (ví dụ: sử dụng JWT)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Truong_The_Bao_NTU_thuc_tap_co_so"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }


        [HttpPost("userinfo")]
        public async Task<ActionResult<User>> GetUserInfo([FromBody] QuizAPI.DTO.TokenModal model)
        {
            var token = model.Token;
            var handler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Truong_The_Bao_NTU_thuc_tap_co_so")),
                ValidateIssuer = false,
                ValidateAudience = false,
            };
            SecurityToken validatedToken;
            var principal = handler.ValidateToken(token, validationParameters, out validatedToken);
            // Lấy email từ chuỗi token
            var email = principal.FindFirstValue(ClaimTypes.Email);
            // Tìm người dùng dựa trên email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }
    }
}
