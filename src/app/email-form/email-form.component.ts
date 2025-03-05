import { Component, OnInit } from '@angular/core';
import { SendGridService } from '../services/send-grid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailgunService } from '../services/mailgun.service';

@Component({
  selector: 'app-email-form',
  standalone: false,
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent implements OnInit {
  emailForm!: FormGroup;
  attachment: any | null = null;
  fileName: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      to: ['test@example.com', [Validators.required, Validators.email]],
      subject: ['Test Subject', Validators.required],
      message: ['Hello from Angular!']
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Видаляємо data:image...
        this.attachment = {
          base64: base64String,
          filename: file.name,
          type: file.type
        };
      };
    }
  }

  sendEmail() {
    if (this.emailForm.invalid) return;

    const { to, subject, message } = this.emailForm.value;

    let emailBody = message;

    if (this.attachment) {
      emailBody += `\n\n=== Вкладення: ${this.attachment.filename} ===\n${this.attachment.base64}`;
    }

    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  }

}