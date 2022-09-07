import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  base64:string = "data:image/png;base64, ";
  id: string = '0000000000000001';
  images: string[] = [];

  constructor(private http: HttpClient) {}
  
  async ngOnInit(): Promise<void> {
    for(let i = 0; i < 3; i++) {
      const req = this.http
      .get('https://swordcraft-image-generator.herokuapp.com/create-image/'+ this.id)
      // TODO: type this into Data Transfer Object (DTO)
      const res: any = await firstValueFrom(req);
      this.images.push(this.base64+res.raw_image);
    }
    // console.log(this.images);
  }
}
