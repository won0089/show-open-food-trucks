import { DateTime } from '../model/dateTime';

export function getCurrentDateTime(): DateTime {
    const date = new Date();

    return {
        dayOfWeek: date.getDay(),
        hour: date.getHours(),
    }
}