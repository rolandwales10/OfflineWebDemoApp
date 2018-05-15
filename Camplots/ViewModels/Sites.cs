using System.ComponentModel.DataAnnotations;

namespace Camplots.ViewModels
{
    public class Sites
    {
        public int CAMPLOT_ID { get; set; }
        [MinLength(5)]
        [MaxLength(20)]
        public string LOCATION { get; set; }
    }
}