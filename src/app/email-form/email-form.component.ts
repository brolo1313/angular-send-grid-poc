import { Component } from '@angular/core';
import { SendGridService } from '../services/send-grid.service';

@Component({
  selector: 'app-email-form',
  standalone: false,
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent {
  to: string = '';
  subject: string = '';
  message: string = '';
  status: string = '';
  attachment: any = null;

  constructor(private sendGridService: SendGridService) {}

  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Отримуємо Base64 без префікса
        this.attachment = {
          base64: base64String,
          filename: file.name,
          type: file.type
        };
      };
    }
  }

  sendEmail() {
    this.sendGridService.sendEmail(this.to, this.subject, this.message, this.attachment)
      .subscribe({
        next: () => this.status = 'Лист відправлено!',
        error: err => this.status = `Помилка: ${err.message}`
      });
  }
}