import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Controllers } from './classes/Controllers';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
loadFile(event: Event) {
  const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
      console.log("FileUpload -> files", fileList);
    }

}
private file?: File;
  constructor(private apiService: ApiService,
    private router: Router
    ){

  }
  title = 'Sec21-frontend';
  async LoadVeicles() {
    var content = await this.file?.arrayBuffer();
    this.apiService.postObs(Controllers.LoadVeicoli, content, undefined, undefined, undefined, undefined).pipe((take(1))).subscribe(x=> {this.router.navigate(['/','veicles']);
  });
    
  }
  async LoadProducts() {
    var content = await this.file?.arrayBuffer();
    this.apiService.postObs(Controllers.LoadProprietari, content, undefined, undefined, undefined, undefined).pipe((take(1))).subscribe(x=> {this.router.navigate(['/','veicles']);
    });
  }
}
