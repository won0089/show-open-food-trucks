import Table from 'cli-table';
import wrap from 'word-wrap';
import * as Inqueirer from 'inquirer';
import { LIMIT, TABLE_COL_WIDTH } from '../constants';

export interface PrinterOptions {
    width?: number;
}

export interface PrompterOptions {
    limit?: number;
}

export class Prompter {
    private promptModule: () => Promise<{ showNext: boolean; }>;

    constructor(options?: PrompterOptions) {
        const { limit = LIMIT } = options || {};

        this.promptModule = () => Inqueirer.prompt([
            {
                name: 'showNext',
                message: `See the next ${limit} open food trucks?`,
                type: 'confirm',
                prefix: ''
            }
        ]);
    }

    async prompt() {
        return this.promptModule();
    }
}

export class Printer {
    private colWidth: number;

    constructor(options?: PrinterOptions) {
        const { width = TABLE_COL_WIDTH } = options || {};

        // initial column width for the table view
        this.colWidth = width;
    }

    printTable(contents: [string, string][], options?: PrinterOptions) {
        const { width = this.colWidth } = options || {};
        const tableOptions = {
            colWidths: [width, width],
            head: ['NAME', 'LOCATION']
        };
        const table = new Table(tableOptions);

        for (const content of contents) {
            // give extra padding for margins left & right
            table.push(content.map(col => wrap(col, { width: width - 10, indent: '' })));
        }

        process.stdout.write(table.toString() + '\n');
    }

    print(content: string) {
        process.stdout.write(`${content}\n`);
    }
}
