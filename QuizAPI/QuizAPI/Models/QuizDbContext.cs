using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Models
{
    public class QuizDbContext:DbContext
    {
        public QuizDbContext()
        {}
        public QuizDbContext(DbContextOptions<QuizDbContext> options): base(options){ }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<QuizAPI.Models.Map> Map { get; set; } = default!;
    }
}
