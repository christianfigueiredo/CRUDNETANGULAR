using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Pessoa> Pessoas { get; set; }

       protected override void OnConfiguring(DbContextOptionsBuilder options)
 {
     if(!options.IsConfigured)
     {
         var conexaoStr = "server=localhost;port=3306;database=crudDB;uid=root;password=123456;Persist Security Info=false;Connect Timeout=300";
         options.UseMySql(conexaoStr, ServerVersion.AutoDetect(conexaoStr));
     }           
 }   
    }
}