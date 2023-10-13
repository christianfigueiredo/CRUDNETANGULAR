using System;
using System.Collections;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : Controller
    {
        private readonly Contexto _contexto;

        public PessoasController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>>  PegarTodosAsync()
        {
           return await _contexto.Pessoas.ToListAsync();
        }   

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> PegarPorIdAsync(int id)
        {
            var pessoa = await _contexto.Pessoas.FindAsync(id);
            if (pessoa == null)
            {
                return NotFound();                
            }            
            return pessoa;
        } 

        [HttpPost]
        public async Task<ActionResult<Pessoa>> SalvarPessoaAsync(Pessoa pessoa)
        {
            await _contexto.Pessoas.AddAsync(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
            //return CreatedAtAction(nameof(PegarPorIdAsync), new { id = pessoa.PessoaId }, pessoa);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Pessoa>> AtualizarPessoaAsync(Pessoa pessoa)
        {
            _contexto.Update(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Pessoa>> ExcluirPessoaAsync(int id)
        {
            Pessoa pessoa = await _contexto.Pessoas.FindAsync(id);
            if (pessoa == null)
            {
                return NotFound();
            }
            _contexto.Pessoas.Remove(pessoa);
            await _contexto.SaveChangesAsync();
            return Ok();
        }        
    }
}
