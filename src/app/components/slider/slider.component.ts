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
  api_url: string = "https://swordcraft-image-generator.herokuapp.com/create-image/";
  id: string = "0000000000000001";
  images: string[] = [];

  constructor(private http: HttpClient) {}
  
  async ngOnInit(): Promise<void> {
    // for loop to get inital 3 images
    for(let i = 0; i < 3; i++) {
      // http request for the api url
      const req = this.http
      // this.id is fixed but in near future with image API updates it could be dynamic too
      .get(this.api_url+this.id);

      // TODO: type this into Data Transfer Object (DTO)
      const res: any = await firstValueFrom(req);
      
      // add the encoded base64 image in the array
      this.images.push(this.base64+res.raw_image);
    }
    // console.log(this.images);
  }
}
