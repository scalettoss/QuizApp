using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Email { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Fullname { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Password { get; set; }
        //[NotMapped]
        //public string ConfirmPassword { get; set; }
    }
}
