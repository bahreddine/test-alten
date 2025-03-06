import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="contact-container">
      <h2>Nous contacter</h2>

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            formControlName="email"
            [class.invalid]="showErrors && emailControl.invalid">

          @if (showErrors && emailControl.invalid) {
            <div class="error">
              @if (emailControl.hasError('required')) {
                <span>Champ obligatoire</span>
              }
              @if (emailControl.hasError('email')) {
                <span>Format email invalide</span>
              }
            </div>
          }
        </div>

        <div class="form-group">
          <label>Message</label>
          <textarea
            formControlName="message"
            [class.invalid]="showErrors && messageControl.invalid"
            maxlength="300"></textarea>

          <div class="char-counter">{{ messageControl.value?.length || 0 }}/300</div>

          @if (showErrors && messageControl.invalid) {
            <div class="error">
              @if (messageControl.hasError('required')) {
                <span>Champ obligatoire</span>
              }
              @if (messageControl.hasError('maxlength')) {
                <span>Maximum 300 caractères</span>
              }
            </div>
          }
        </div>

        <button type="submit" [disabled]="isSubmitting">
          @if (isSubmitting) {
            Envoi en cours...
          } @else {
            Envoyer
          }
        </button>
      </form>

      @if (showSuccess) {
        <div class="success-message">
          ✔ Demande de contact envoyée avec succès
        </div>
      }
    </div>
  `,
  styles: `
    .contact-container { max-width: 600px; margin: 2rem auto; padding: 20px; }
    .form-group { margin-bottom: 1.5rem; }
    .invalid { border-color: #ff4444 !important; }
    .error { color: #ff4444; font-size: 0.9rem; }
    .char-counter { text-align: right; font-size: 0.8rem; }
    .success-message {
      background: #4CAF50;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
  `
})
export class ContactComponent {
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(300)
    ])
  });

  showErrors = false;
  showSuccess = false;
  isSubmitting = false;

  get emailControl() { return this.contactForm.controls.email; }
  get messageControl() { return this.contactForm.controls.message; }

  onSubmit() {
    this.showErrors = true;

    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Simulation appel API
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.contactForm.reset();
        this.showErrors = false;
      }, 1500);
    }
  }
}
