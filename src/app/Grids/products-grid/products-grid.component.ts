import { Component, OnInit } from '@angular/core';
import { BaseGridComponent } from '../base-grid/base-grid.component';
import { Proprietario } from '../../classes/Proprietario';
import { ApiService } from '../../services/api.service';
import { Observable, take } from 'rxjs';
import { Controllers } from '../../classes/Controllers';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [BaseGridComponent],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.css'
})
export class ProductsGridComponent implements OnInit {
public questionData: Proprietario[];
public TableTitle: string;

constructor(private apiService: ApiService){
  this.TableTitle = "Proprietari"
  this.questionData = [];
}
  public ngOnInit(): void {
    this.GeProprietari().pipe(take(1)).subscribe(x=> this.questionData = x);
  }

private GeProprietari() : Observable<Proprietario[]>{
  return this.apiService.getObs<Proprietario[]>(Controllers.GetProprietari, undefined, undefined, undefined, undefined);
}

}
