﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Title { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string OP1 { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string OP2 { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string OP3 { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string OP4 { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Answer { get; set; }

        [Required]
        public DateTime CreateAt { get; set; }

        [Required]
        public int CreateBy { get; set; }
        public int? MapId { get; set; }
    }
}
