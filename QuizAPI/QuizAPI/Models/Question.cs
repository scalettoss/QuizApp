using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Question
    {
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(500)")]

        public string? Img { get; set; }
        [Column(TypeName = "nvarchar(500)")]

        public string OP1 { get; set; }
        [Column(TypeName = "nvarchar(500)")]

        public string OP2 { get; set; }
        [Column(TypeName = "nvarchar(500)")]

        public string OP3 { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string OP4 { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Answer { get; set; }
    }
}
