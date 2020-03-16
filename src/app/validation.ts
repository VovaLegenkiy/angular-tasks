import { FormControl } from '@angular/forms';
import { FormFields } from './form-fields';
import { Aggregator } from './aggregator';
import { Error } from './error';

function createAggregator(): Aggregator {
    const errors: Error = {};

    return {
        errors,
        add: (name: string, error: string[]) => {
            errors[name] = error;
        }
    };
}

const validateFirstName = (value: FormControl): string[] => {
    const errors: string[] = [];

    if (!value.errors) {
        return;
    }
    if (value.errors.required) {
        errors.push('First name is required');
    } else if (value.errors.pattern) {
        errors.push('First name should contains only letters');
    }

    return errors;
};

const validateLastName = (value: FormControl): string[] => {
    const errors = [];

    if (!value.errors) {
        return;
    }
    if (value.errors.required) {
        errors.push('Last name is required');
    } else if (value.errors.pattern) {
        errors.push('Last name should contains only letters');
    }

    return errors;
};

const validatePhone = (value: FormControl): string[] => {
    const errors = [];

    if (!value.errors) {
        return;
    }
    if (value.errors.required) {
        errors.push('Phone is required');
    } else if (value.errors.pattern) {
        errors.push('Phone should contains only numbers');
    }

    return errors;
};

const validateEmail = (value: FormControl): string[] => {
    const errors = [];

    if (!value.errors) {
        return;
    }

    if (value.errors.required) {
        errors.push('Email is required');
    } else if (value.errors.email) {
        errors.push('Email should match pattern: local-part@domain');
    }

    return errors;
};

export const formValidation = (values: FormFields) => {
    const aggregator = createAggregator();

    aggregator.add('firstname', validateFirstName(values.firstname));
    aggregator.add('lastname', validateLastName(values.lastname));
    aggregator.add('phone', validatePhone(values.phone));
    aggregator.add('email', validateEmail(values.email));

    return aggregator.errors;
};
