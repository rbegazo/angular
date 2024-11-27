import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userId!:string
 
  constructor(private route:ActivatedRoute){}
 
  ngOnInit() { 
    this.userId = this.route.snapshot.paramMap.get('id')!
  }
}
