using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Map
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Title { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Description { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Difficulty { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Topic { get; set; }
        public int? Status { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string? Img { get; set; }
        [Required]
        public int CreateBy { get; set; }
    }
}
