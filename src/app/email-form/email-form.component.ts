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
  status: string = '';
  attachment: any = null;

  constructor(private fb: FormBuilder, private mailgunService: MailgunService) {}

  ngOnInit() {
    this.emailForm = this.fb.group({
      to: ['test@example.com', [Validators.required, Validators.email]],
      subject: ['Test Subject', Validators.required],
      message: ['Hello from Angular & Mailgun!']
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.attachment = {
        file,
        filename: file.name,
        type: file.type
      };
    }
  }

  sendEmail() {
    if (this.emailForm.invalid) return;

    const { to, subject, message } = this.emailForm.value;

    console.log(' this.emailForm.value', this.emailForm.value);
    console.log(' this.attachment', this.attachment);

    // this.mailgunService.sendEmail(to, subject, message, this.attachment)
    //   .subscribe({
    //     next: () => this.status = 'Лист успішно відправлено!',
    //     error: err => this.status = `Помилка: ${err.message}`
    //   });
  }
}