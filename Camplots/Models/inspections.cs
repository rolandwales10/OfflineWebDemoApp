//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Camplots.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class inspections
    {
        public int camplot_ID { get; set; }
        public System.DateTime INSPECTN_DATE { get; set; }
        public string INSPECTORS { get; set; }
        public Nullable<System.DateTime> NextDate { get; set; }
    }
}