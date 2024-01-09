using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Participant
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Score { get; set; }
        public int MapId { get; set; }
        public DateTime DateComplete { get; set; }
        public int Times { get; set; }
    }
}