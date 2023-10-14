import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './Pessoa';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
   })
};

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  url = 'http://localhost:5000/api/pessoas';

  constructor(private http: HttpClient) { }

  pegarTodos(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.url);
  }

  pegarPeloId(id: number): Observable<Pessoa>{
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  salvarPessoa(pessoa: Pessoa): Observable<any>{
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  atualizar(pessoa: Pessoa): Observable<any>{
    return this.http.put<Pessoa>(this.url + '/' + pessoa.pessoaId, pessoa, httpOptions);
  }

  excluir(id: number): Observable<any>{        
    return this.http.delete<number>(this.url + '/' + id, httpOptions);
  }

}
