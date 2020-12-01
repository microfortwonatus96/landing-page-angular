import { FormGroup } from '@angular/forms';

export function equalValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.equalValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ equalValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
