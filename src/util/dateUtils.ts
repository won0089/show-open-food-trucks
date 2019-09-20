import { DateTime } from '../model/dateTime';

/**
 * 
 * Calculates current day of the week in integer (0 - 6) and 
 * current hour in 24 hour format (0 - 23).
 * 
 * @returns DateTime object of current dayOfWeek and hour
 * 
 */
export function getCurrentDateTime(): DateTime {
    const date = new Date();

    return {
        dayOfWeek: date.getDay(),
        hour: date.getHours(),
    }
}