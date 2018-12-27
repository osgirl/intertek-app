import { tryParseInt, isNullOrWs, isValidDate } from 'common/util';

export function extractParams(urlParams) {
    const { receivedDateFrom, receivedDateUntil, dueDateFrom, dueDateUntil } = urlParams;
    const statuses = !isNullOrWs(urlParams.statuses)
        ? urlParams.statuses.split(',')
            .map((s) => tryParseInt(s)).filter((s) => s != null)
        : [];
    const results = !isNullOrWs(urlParams.results)
        ? urlParams.results.split(',')
            .map((r) => tryParseInt(r)).filter((r) => r != null)
        : [];

    const receivedFrom = !isNullOrWs(receivedDateFrom) && isValidDate(receivedDateFrom)
        ? receivedDateFrom : '';
    const receivedUntil = !isNullOrWs(receivedDateUntil) && isValidDate(receivedDateUntil)
        ? receivedDateUntil : '';
    const dueFrom = !isNullOrWs(dueDateFrom) && isValidDate(dueDateFrom)
        ? dueDateFrom : '';
    const dueUntil = !isNullOrWs(dueDateUntil) && isValidDate(dueDateUntil)
        ? dueDateUntil : '';

    return {
        results,
        statuses,
        search: urlParams.search || '',
        receivedDateFrom: receivedFrom,
        receivedDateUntil: receivedUntil,
        dueDateFrom: dueFrom,
        dueDateUntil: dueUntil
    };
}
