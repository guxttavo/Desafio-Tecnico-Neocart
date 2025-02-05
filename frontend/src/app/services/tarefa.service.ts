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
    listarTarefa(): Observable<tarefa[]> {
        return this.http.get<tarefa[]>(this.apiUrl);
    }

}
