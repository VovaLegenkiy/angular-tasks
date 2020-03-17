import { FormControl } from '@angular/forms';
import { FormFields } from './form-fields';
import { Aggregator } from './aggregator';
import { Error } from './error';

const START_YEAR = 1970;

function getAge(birthday: string): number {
    const ageDifMs: number = Date.now() - new Date(birthday).getTime();
    const ageDate: Date = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - START_YEAR);
}

function createAggregator(): Aggregator {
    const errors: Error = {};

    return {
        errors,
        add: (name: string, error: string[]) => {
            errors[name] = error;
        }
    };
}

const validateFirstName = (field: FormControl): string[] => {
    const errors: string[] = [];

    if (!field.errors) {
        return;
    }
    if (field.errors.required) {
        errors.push('First name is required');
    } else if (field.errors.pattern) {
        errors.push('First name should contains only letters');
    }

    return errors;
};

const validateLastName = (field: FormControl): string[] => {
    const errors = [];

    if (!field.errors) {
        return;
    }
    if (field.errors.required) {
        errors.push('Last name is required');
    } else if (field.errors.pattern) {
        errors.push('Last name should contains only letters');
    }

    return errors;
};

const validatePhone = (field: FormControl): string[] => {
    const errors = [];

    if (!field.errors) {
        return;
    }
    if (field.errors.required) {
        errors.push('Phone is required');
    } else if (field.errors.pattern) {
        errors.push('Phone should contains only numbers');
    }

    return errors;
};

const validateEmail = (field: FormControl): string[] => {
    const errors = [];

    if (!field.errors) {
        return;
    }

    if (field.errors.required) {
        errors.push('Email is required');
    } else if (field.errors.email) {
        errors.push('Email should match pattern: local-part@domain');
    }

    return errors;
};

const validateBirthday = (field: FormControl): string[] => {
    const errors = [];

    if (field.errors && field.errors.required) {
        errors.push('Birthday is required');
    } else if (!field.errors && !field.value) {
        return;
    } else if (field.value) {
        const age = getAge(field.value);

        if (age > 18) {
            return;
        }

        errors.push('User should be older then 18');
    }

    return errors;
};

const validatePassword = (field: FormControl): string[] => {
    const errors = [];

    if (!field.errors) {
        return;
    }

    if (field.errors.required) {
        errors.push(`Password is required`);
    } else if (field.errors.minlength) {
        errors.push(`Password must be at least 6 character length`);
    } else if (field.errors.pattern) {
        errors.push(`Password should contains: 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character`);
    }

    return errors;
};

const validateRePassowrd = (password: FormControl, rePassword: FormControl): string[] => {
    const errors = [];

    if (!rePassword.errors) {
        return;
    } else if (rePassword.errors.required) {
        errors.push(`Re-Password is required`);
    } else if (password.value !== rePassword.value) {
        errors.push('Re-Password does not match password');
    } else {
        return;
    }

    return errors;
};

export const formValidation = (fields: FormFields): Error => {
    const aggregator = createAggregator();

    aggregator.add('firstName', validateFirstName(fields.firstName));
    aggregator.add('lastName', validateLastName(fields.lastName));
    aggregator.add('phone', validatePhone(fields.phone));
    aggregator.add('email', validateEmail(fields.email));
    aggregator.add('birthday', validateBirthday(fields.birthday));
    aggregator.add('password', validatePassword(fields.password));
    aggregator.add('rePassword', validateRePassowrd(fields.password, fields.rePassword));

    return aggregator.errors;
};
