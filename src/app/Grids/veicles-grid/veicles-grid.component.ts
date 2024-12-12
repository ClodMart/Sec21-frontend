import { Component, OnInit } from '@angular/core';
import { BaseGridComponent } from '../base-grid/base-grid.component';
import { Veicolo } from '../../classes/Veicolo';
import { ApiService } from '../../services/api.service';
import { Observable, take } from 'rxjs';
import { Controllers } from '../../classes/Controllers';

@Component({
  selector: 'app-veicles-grid',
  standalone: true,
  imports: [BaseGridComponent],
  templateUrl: './veicles-grid.component.html',
  styleUrl: './veicles-grid.component.css'
})
export class VeiclesGridComponent implements OnInit {
  public questionData: Veicolo[];
  public TableTitle: string;
  
  constructor(private apiService: ApiService){
    this.TableTitle = "Proprietari"
    this.questionData = [];
  }
    public ngOnInit(): void {
      this.GeProprietari().pipe(take(1)).subscribe(x=> this.questionData = x);
    }
  
  private GeProprietari() : Observable<Veicolo[]>{
    return this.apiService.getObs<Veicolo[]>(Controllers.GetVeicoli, undefined, undefined, undefined, undefined);
  }
}
