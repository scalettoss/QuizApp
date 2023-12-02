using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Participant
    {
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Email { get; set; }
        public int Score { get; set; }
        public int TimeTaken { get; set; }
    }
}