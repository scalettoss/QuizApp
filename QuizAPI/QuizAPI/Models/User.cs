using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Password { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Fullname { get; set; }
    }
}
