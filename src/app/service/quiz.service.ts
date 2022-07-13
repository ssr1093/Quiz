import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { QuestionsComponent } from '../questions/questions.component';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http :HttpClient) { }
  getQuestion(){
    return this.http.get<any>("assets/Question.json")
  }
}