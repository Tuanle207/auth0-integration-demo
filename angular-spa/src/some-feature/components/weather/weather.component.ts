import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from 'src/core/dtos/weather-forecast.dto';
import { ApiService } from 'src/core/services/api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherForecasts: WeatherForecast[] = [];

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.getWeatherForecasts().subscribe((data) => {
      this.weatherForecasts = data;
    });
  }
}
