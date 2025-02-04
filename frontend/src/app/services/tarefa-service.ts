import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tarefa } from '../interfaces/tarefa';
import { HttpClient } from '@angular/common/http'; // Importa o HttpClient

@Injectable({
    providedIn: 'root'
})

export class TarefaService {

    private apiUrl = 'http://localhost:5248/api/tarefa';

    constructor(private http: HttpClient) { } 

    listarTarefa(): Observable<tarefa[]> {
        return this.http.get<tarefa[]>(this.apiUrl);  
    }
}
