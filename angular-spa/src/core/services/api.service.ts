import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from 'src/core/dtos/weather-forecast.dto';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getWeatherForecasts(): Observable<WeatherForecast[]> {
    return this.httpClient.get<WeatherForecast[]>('https://localhost:7202/v1/weathers');
  }
}