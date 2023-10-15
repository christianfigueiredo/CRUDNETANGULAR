import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from 'src/app/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  tituloFormulario?: string;
  pessoas: Pessoa[] | undefined;
  nomePessoa?: string;
  pessoaId?: number;
  

  exibirForm: boolean = false;
  exibirTable: boolean = true;

  
 

  constructor(private pessoasService: PessoasService,
    private modalService: BsModalService) { }

  ngOnInit(): void { 

    this.pessoasService.pegarTodos().subscribe(pessoas => {
      this.pessoas = pessoas;
    });   
  }

  exibirFormulario(): void {  
    this.exibirTable = false; 
    this.exibirForm = true;    
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    }); 
    
  }

  exibirFormularioAtualizacao(pessoaId: number): void {
    this.exibirTable = false;
    this.exibirForm = true;
    this.pessoasService.pegarPeloId(pessoaId).subscribe(pessoa => {
      this.tituloFormulario = 'Atualizar ${pessoa.nome}';
      this.formulario = new FormGroup({        
        nome: new FormControl(pessoa.nome),
        sobrenome: new FormControl(pessoa.sobrenome),
        idade: new FormControl(pessoa.idade),
        profissao: new FormControl(pessoa.profissao)
      });
    });
  }

  voltar(): void {    
    this.exibirTable = true;
    this.exibirForm = false;
  }

  

  excluirPessoa(pessoaId: number): void {
    alert("Falta implementar");
  }

  EnviarFormulario():void {
    const pessoa : Pessoa= this.formulario.value;
    
    this.pessoasService.salvarPessoa(pessoa).subscribe(resultado=>{
      this.exibirForm=false;
      this.exibirTable=true;
      alert("Pessoa inserida com sucesso");
      this.pessoasService.pegarTodos().subscribe(pessoas => {
        this.pessoas = pessoas;
      });
    });      
}
  excluir(){
    alert("Falta implementar");
  }

  atualizar(pessoaId: number): void {
    this.exibirTable = false;
    this.exibirForm = true;

    this.pessoasService.pegarPeloId(pessoaId).subscribe(pessoa => {
      this.tituloFormulario = 'Atualizar Pessoa';

      this.formulario = new FormGroup({
        pessoaId: new FormControl(pessoa.pessoaId),
        nome: new FormControl(pessoa.nome),
        sobrenome: new FormControl(pessoa.sobrenome),
        idade: new FormControl(pessoa.idade),
        profissao: new FormControl(pessoa.profissao)
      });   
    });
  }

  salvarPessoa(pessoa: Pessoa): void {
    this.salvarPessoa(pessoa);

  }
}
