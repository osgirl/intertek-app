import isValid from 'date-fns/isValid';
import toDate from 'date-fns/toDate';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import { isNullOrWs } from 'common/util';

export function beNotEmpty(value) {
    return !isNullOrWs(value);
}

export function beValidDate(value) {
    if (isNullOrWs(value))
        return true;
    return isValid(toDate(value));
}

export function beBefore(date) {
    return (value) =>
        isNullOrWs(value) ||
        isNullOrWs(date) ||
        isBefore(toDate(value), toDate(date));
}

export function beAfter(date) {
    return (value) =>
        isNullOrWs(value) ||
        isNullOrWs(date) ||
        isAfter(toDate(value), toDate(date));
}

export function beValidEmailAddress(value) {
    if (isNullOrWs(value) || value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))
        return true;
    return false;
}
