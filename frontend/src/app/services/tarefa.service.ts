import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tarefa } from '../interfaces/tarefa';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class TarefaService {

    private apiUrl = 'http://localhost:5248/api/Tarefa';

    constructor(private http: HttpClient) { }

    cadastrarTarefa(tarefa: tarefa) {
        return this.http.post(`${this.apiUrl + "/cadastrarTarefa"}`, tarefa);

    }

    editarTarefa(tarefa: tarefa) {
        return this.http.put(`${this.apiUrl}/editarTarefa/${tarefa.id}`, tarefa);
    }

    excluirTarefa(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/excluirTarefa/${id}`);
    }

    buscarTarefaPorId(id: number): Observable<tarefa> {
        return this.http.get<tarefa>(`${this.apiUrl}/buscarTarefaPorId/${id}`);
    }

    listarTarefa(): Observable<tarefa[]> {
        return this.http.get<tarefa[]>(this.apiUrl);
    }
}
