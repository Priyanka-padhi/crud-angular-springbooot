import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent {

  constructor(private tutorialService : TutorialService){}

  title: '';
  currentTutorial : Tutorial = {};
  currentIndex = -1;
  tutorials ?: Tutorial[];
  
  searchTitle():void{

    this.currentIndex = -1;
    this.currentTutorial = {};

    this.tutorialService.findByTitle(this.title).subscribe({
      next:(data) => {
        this.tutorials = data;
        console.log(data);  
      },
      error : (e) => console.error(e)
    });
  }

  setActiveTutorial(tutorial:Tutorial, index:number): void{
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(){
    this.tutorialService.deleteAll().subscribe({
      next:(res) => { console.log(res);
      this.refreshList();
    },
      error: (e) => console.error(e)

    })
  }

  refreshList(){
    this.retrieveTutorials();
    this.currentIndex = -1;
    this.currentTutorial = {};
  }

  retrieveTutorials(){
    this.tutorialService.getAll().subscribe({
      next:(data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  
}
