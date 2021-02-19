import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/News';


@Injectable({
  providedIn: 'root'
})
export class NewService {

  apiUrl="http://localhost:8080/News";
  
  constructor(private http : HttpClient) { }

  findAll(){
    return this.http.get<News[]>(this.apiUrl); 
  }
  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`)
  } 
  add(news){
      return this.http.post<News>(this.apiUrl,news);
  }
  update(news){
    return this.http.put(`${this.apiUrl}/${news.id}`,news);
  }
}