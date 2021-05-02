import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cocktail } from './cocktail/common/Cocktail.model';


@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private service: HttpClient;

  constructor(param_service: HttpClient) {
    this.service = param_service;
  }

  public getCocktails(): Observable<Cocktail[]> {
    const obs: Observable<any> = this.service.get('assets/data.json');

    const treatment = (param_data: Cocktail[]) => {
      return param_data as Cocktail[];
    };
    return obs.pipe(map(treatment));
  }
}


    

