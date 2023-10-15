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

  modalRef: BsModalRef | undefined; 
 

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

  exibirFormularioAtualizacao(pessoaId:any): void {
    this.exibirTable = false;
    this.exibirForm = true;
    this.pessoasService.pegarPeloId(pessoaId).subscribe(pessoa => {
      this.tituloFormulario = 'Atualizar '+' '+pessoa.nome +' '+pessoa.sobrenome;
      this.formulario = new FormGroup({ 
        pessoaId: new FormControl(pessoa.pessoaId),       
        nome: new FormControl(pessoa.nome),
        sobrenome: new FormControl(pessoa.sobrenome),
        idade: new FormControl(pessoa.idade),
        profissao: new FormControl(pessoa.profissao)
      });
    });
  }

  exibirConfirmaExclusao(pessoaId: any, nomePessoa:any, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  EnviarFormulario():void {
    const pessoa : Pessoa= this.formulario.value;
    if(pessoa.pessoaId > 0){
      this.pessoasService.atualizar(pessoa).subscribe(resultado=>{
        this.exibirForm=false;
        this.exibirTable=true;
        alert("Pessoa atualizada com sucesso");
        this.pessoasService.pegarTodos().subscribe((pessoas) => {
          this.pessoas = pessoas;
        });
      })
    } else {
    this.pessoasService.salvarPessoa(pessoa).subscribe(resultado=>{
      this.exibirForm=false;
      this.exibirTable=true;
      alert("Pessoa inserida com sucesso");
      this.pessoasService.pegarTodos().subscribe((pessoas) => {
        this.pessoas = pessoas;
      });
    }); 
  }     
}

 

  voltar(): void {    
    this.exibirTable = true;
    this.exibirForm = false;
  }

  

  excluir(): void {
    alert("Falta implementar");
  }

  
  excluirPessoa(pessoaId: any): void {
    this.pessoasService.excluir(pessoaId).subscribe(resultado => { 
      this.modalRef?.hide(); 
      alert("Pessoa excluída com sucesso");        
      this.pessoasService.pegarTodos().subscribe((pessoas) => {
        this.pessoas = pessoas;
      });
    });
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
