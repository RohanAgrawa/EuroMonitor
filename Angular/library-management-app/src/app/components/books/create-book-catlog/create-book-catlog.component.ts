import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-book-catlog',
  templateUrl: './create-book-catlog.component.html',
  styleUrl: './create-book-catlog.component.css'
})
export class CreateBookCatlogComponent {

  @ViewChild('f') public userForm: NgForm;
  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = true;
  public selectedGenre: string = '';
  public bookDescription: string = '';
   
  public onsubmit(): void {
    
    console.log(this.userForm.value)
  }
}
