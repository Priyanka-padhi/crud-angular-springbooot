import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  constructor(private tutorialService: TutorialService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  @Input() viewMode = false;

  @Input() currentTutorial :Tutorial = {
    title : '',
    description: '',
    published: false
  };

  message = '';

  ngOnInit(): void {
    if(!this.viewMode){
      this.message = '',
      this.getTutorial(this.route.snapshot.params["id"])
    }
  }

  getTutorial(id:string){
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data,
        console.log(data);
      },
      error: (e) => console.error(e)
    });

  }

  updatePublished(status:boolean){
    const data = {
      title: this.currentTutorial.title,
      descripion: this.currentTutorial.description,
      published: status
    };
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id,data).subscribe({
      next:(res) => {
        console.log(res);
        this.currentTutorial.published = status;
        this.message = res.message ? res.message : 'The status was updated successfully';
      },
      error: (e)=> console.error(e)
    });
  }

  deleteTutorial(){
    this.message = '';
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next:(res) =>{
        console.log(res);
        console.log("data deleted")
        this.router.navigate(['/tutorials'])
        
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(){
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id,this.currentTutorial).subscribe({
      next :(res) => {
        console.log(res);
        this.message = res.message ? res.message : 'Data updated Successfully'
      },
      error:(e)=> console.error(e)
    });
  }

}
