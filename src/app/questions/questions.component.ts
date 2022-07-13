import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuizService } from '../service/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public name : string="";
  public questionList: any=[];
  public currentQuestion:number=0;
  public points: number=0;
  counter=60;
  correctAnswer:number =0;
  incorrectAnswer:number=0;
  interval$:any;
  progress:string="0";
  constructor(private quizservice : QuizService) { }

  ngOnInit(): void {
    this.name =localStorage.getItem('name')!;
    this.getAllQuestion();
    this.startCounter();
    }
getAllQuestion(){
  this.quizservice.getQuestion().subscribe(res=>{
    this.questionList =res.questions;
  })
}
nextQuestion(){
this.currentQuestion++;
}
previousQuestion(){
  this.currentQuestion--;
}
Answer(currentQuestion:number,option:any){
if(option.correct){
  this.points += 10;
  this.currentQuestion++;
  this.correctAnswer++;
  this.getProgresspercent();
}else{
  this.points-=10;
  this.incorrectAnswer++;
  this.currentQuestion++
  this.getProgresspercent();
}
}
startCounter(){
this.interval$ =interval(1000)
.subscribe(val=>{
  this.counter--;
  if(this.counter===0){
    this.currentQuestion++;
    this.counter=60;
    this.points-=10;
  }
})
setTimeout(()=>{
  this.interval$.unsubscribe();
},60000);
}
StopCounter(){
this.interval$.unsubscribe();
this.counter=0;
}
resetCounter(){
this.StopCounter();
this.counter=60;
this.startCounter();
}
resetQuiz(){
  this.resetCounter();
  this.getAllQuestion();
  this.points=0;
  this.counter=60;
  this.currentQuestion=0;
  this.progress="0";
}
getProgresspercent(){
  this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
  return this.progress;
}
}