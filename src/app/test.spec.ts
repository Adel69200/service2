import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { CocktailService } from './cocktail.service';
import { CocktailComponent } from './cocktail/cocktail.component';

describe('Quest Test Suite', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, BrowserModule],
      declarations: [
        CocktailComponent
      ],
    }).compileComponents();
  }));

  fit('service should be created', () => {
    const service: CocktailService = TestBed.inject(CocktailService);
    expect(service).toBeTruthy();
  });

  fit('service should have a "getCocktails" method which returns an Observable<Cocktail[]> object', () => {
    const service: CocktailService = TestBed.inject(CocktailService);
    service.getCocktails().subscribe(
      (cocktails: any[]) => {
        expect(cocktails.length).toBeGreaterThan(0);
      }
    );
  });

  fit('should create a CocktailComponent instance', async(() => {
    const fixture = TestBed.createComponent(CocktailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  fit(
    'component should have a public property named "cocktails"',
    async(
      () => {
        const fixture = TestBed.createComponent(CocktailComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.cocktails).toBeTruthy();
      }
    )
  );

  fit(
    'component should display at least one cocktail',
    async(
      () => {
        const fixture = TestBed.createComponent(CocktailComponent);
        const service: CocktailService = TestBed.inject(CocktailService);
        const mock: Observable<any> = of([
          {
            name: 'bloody mary',
            price: 1,
            img: 'https://i.4pcdn.org/s4s/1398123404333.gif'
          }
        ]);

        spyOn(service, 'getCocktails').and.returnValue( mock );

        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const content = compiled.textContent;
        const first = fixture.componentInstance.cocktails[0];
        console.log(fixture.componentInstance.cocktails, first);
        expect(content).toContain(first.name);
      }
    )
  );
});