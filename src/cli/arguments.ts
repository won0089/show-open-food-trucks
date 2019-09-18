import * as Commander from 'commander';
import { LIMIT } from '../constants';

export function initializeArgs() {
    const program = new Commander.Command();

    program
        .name('show-open-food-trucks')
        .version('1.0.0')
        .description(`Shows open food trucks right now in alphabetical order. 
        Will be prompted to show more results if there are more than specified limit (default: ${LIMIT})`)
        .option('-l, --limit [limit]', '[limit] number of results per page', LIMIT);

    return program;
}