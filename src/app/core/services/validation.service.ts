import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Injectable({
    providedIn: 'root',
})

export class ValidationService {

    static getValidatorErrorMessage(code: string) {
        const config = {
            'invalidEmailAddress': 'Invalid email address',
        };
        return config[code];
    }

    static emailValidator(control: AbstractControl) : ValidationErrors{
        console.log(control)
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }
}