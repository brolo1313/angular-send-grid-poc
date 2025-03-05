import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailgunService {
  private MAILGUN_API_KEY = 'your-mailgun-api-key'; 
  private DOMAIN = 'your-domain.com'; 

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, message: string, attachment?: any): Observable<any> {
    const url = `https://api.mailgun.net/v3/${this.DOMAIN}/messages`;

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`api:${this.MAILGUN_API_KEY}`),
    });

    const formData = new FormData();
    formData.append('from', `Your Name <mailgun@${this.DOMAIN}>`);
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('text', message);

    if (attachment) {
      formData.append('attachment', attachment.file, attachment.filename);
    }

    return this.http.post(url, formData, { headers });
  }
}
