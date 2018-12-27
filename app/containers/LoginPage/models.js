import { must } from 'validation/rule-builder';
import { beNotEmpty, beValidEmailAddress } from 'validation/predicates';

export const ruleSet = {
    username: must(beNotEmpty)
        .withMessage('Email address is required')
        .and(beValidEmailAddress)
        .withMessage('Please enter a valid email address'),
    password: must(beNotEmpty)
        .withMessage('Password is required')
};
