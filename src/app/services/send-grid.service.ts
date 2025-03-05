import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendGridService {
  private SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'; // ⚠️ НЕБЕЗПЕЧНО (тільки для тесту)
  private SENDGRID_URL = 'https://api.sendgrid.com/v3/mail/send';

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, text: string, file?: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    });

    const emailData: any = {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'your_email@example.com' }, // Замінити на реальний email
      subject: subject,
      content: [{ type: 'text/plain', value: text }]
    };

    // Якщо є файл – додаємо вкладення
    if (file) {
      emailData.attachments = [{
        content: file.base64,
        filename: file.filename,
        type: file.type,
        disposition: 'attachment'
      }];
    }

    return this.http.post(this.SENDGRID_URL, emailData, { headers });
  }
}
