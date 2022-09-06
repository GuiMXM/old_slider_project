import { animation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  base64:string = "data:image/png;base64, ";
  id = '0000000000000001';

   headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };
  
    constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
     interval:false;
     const res =  await this.http.get('https://swordcraft-image-generator.herokuapp.com/create-image/'+ this.id,this.requestOptions).toPromise()
     console.log(res)
     // images.push(this.base64 + res.raw_image) 
  }
  images = [];
  
}
