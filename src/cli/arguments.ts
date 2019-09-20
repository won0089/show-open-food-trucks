import { Command } from 'commander';
import { LIMIT } from '../config/constants';

/**
 * Initializes cli arguments to be parsed utilizing commanderjs library.
 * 
 * @returns arguments - commanderjs Command object that parses cli arguments
 * 
 */
export function initializeArgs(): Command {
    const program = new Command();

    program
        .name('show-open-food-trucks')
        .version('1.0.0')
        .description(`Shows open food trucks right now in alphabetical order. 
        Will be prompted to show more results if there are more than specified limit (default: ${LIMIT})`)
        .option('-l, --limit [limit]', '[limit] number of results per page', LIMIT);

    return program;
}