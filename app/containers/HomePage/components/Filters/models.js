import { must } from 'validation/rule-builder';
import { isValidDate } from 'common/util';
import { beValidDate, beAfter } from 'validation/predicates';

export const ruleSetFactory = (receivedDateFrom, dueDateFrom) => ({
    receivedDateFrom: must(beValidDate)
        .withMessage('Please enter a valid date'),
    receivedDateUntil: must(beValidDate)
        .withMessage('Please enter a valid date')
        .and(beAfter(receivedDateFrom))
        .when(() => isValidDate(receivedDateFrom))
        .withMessage('Period end must be before start'),
    dueDateFrom: must(beValidDate)
        .withMessage('Please enter a valid date'),
    dueDateUntil: must(beValidDate)
        .withMessage('Please enter a valid date')
        .and(beAfter(dueDateFrom))
        .when(() => isValidDate(dueDateFrom))
        .withMessage('Period end must be before start')
});
