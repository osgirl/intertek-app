import dateFnsToDate from 'date-fns/toDate';
import dateFnsIsValid from 'date-fns/isValid';
import dateFnsformat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { isNaN, isString, isArray, isDate, isEmpty } from 'lodash';

export const ISO_8601 = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

export function tryParseJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}

export function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}

export function isNullOrWs(value) {
    return value == null || (isString(value) && value.trim().length === 0);
}

export function isNullOrEmpty(value) {
    return value == null || isEmpty(value);
}

export function tryParseInt(str) {
    const response = isNumeric(str)
        ? parseInt(str, 10)
        : null;
    return response || null;
}

export function isValidDate(value) {
    const date = !isDate(value) ? parseDate(value) : value;
    return dateFnsIsValid(date);
}

export function formatDate(value, format = 'dd. MM. yyyy.') {
    const date = !isDate(value) ? dateFnsToDate(value) : value;
    return dateFnsformat(date, format);
}

export function formatDateAsIso(date) {
    return dateFnsformat(date, ISO_8601);
}

export function parseDate(value, formats = [ISO_8601]) {
    if (!isString(formats) && !isArray(formats))
        throw new Error('Date format needs to be specified as either string or an array');
    if (isString(formats))
        return dateFnsParse(value, formats, new Date());

    for (let i = 0; i < formats.length; i += 1) {
        const format = formats[i];
        const date = dateFnsParse(value, format, new Date());
        if (isValidDate(date)) return date;
    }

    return dateFnsParse('Invalid Date', 'dd-MM-yyyy', new Date());
}

export function displayNullable(stringValue) {
    return isNullOrWs(stringValue) ? '-' : stringValue;
}

export function trunc(str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
}

export function joinWithOr(array) {
    if (array.length === 0)
        return '';
    if (array.length === 1)
        return array[0];

    const last = array[array.length - 1];
    const rest = array.slice(0, array.length - 1);

    return `${rest.join(', ')} or ${last}`;
}
