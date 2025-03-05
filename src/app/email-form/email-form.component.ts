import { Component, OnInit } from '@angular/core';
import { SendGridService } from '../services/send-grid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, private sendGridService: SendGridService) {

  }

  ngOnInit() {
    this.emailForm = this.fb.group({
      to: ['brolo1341@gmail..com', [Validators.required]],
      subject: ['Test', Validators.required],
      message: ['with attachment']
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

    console.log('this.emailForm.value', this.emailForm.value);
    console.log('this.attachment', this.attachment);
    // this.sendGridService.sendEmail(to, subject, message, this.attachment)
    //   .subscribe({
    //     next: () => this.status = 'Лист відправлено!',
    //     error: err => this.status = `Помилка: ${err.message}`
    //   });
  }
}