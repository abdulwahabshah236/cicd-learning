import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container">
      <h1>Project 2 - Angular + Java Backend</h1>
      <p>Status: {{ message }}</p>
      
      <button (click)="fetchFromBackend()">Test Backend Connection</button>
      
      <div *ngIf="backendData">
        <h3>Backend Response:</h3>
        <pre>{{ backendData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 10px 0;
    }
    button:hover {
      background-color: #0056b3;
    }
    pre {
      background: #f4f4f4;
      padding: 10px;
      border-radius: 4px;
    }
  `]
})
export class AppComponent implements OnInit {
  message = 'Angular app running';
  backendData: any = null;
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    console.log('Angular app initialized');
  }
  
  fetchFromBackend() {
    this.http.get('http://localhost:8080/api/hello')
      .subscribe({
        next: (data) => {
          this.backendData = data;
          this.message = 'Connected to backend!';
        },
        error: (err) => {
          this.message = 'Backend not available';
          console.error(err);
        }
      });
  }
}
