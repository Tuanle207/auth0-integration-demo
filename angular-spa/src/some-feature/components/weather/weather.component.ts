import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.getData().subscribe((data) => {
      console.log(data);
    })
  }
}
