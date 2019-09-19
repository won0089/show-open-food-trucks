import Table from 'cli-table';
import wrap from 'word-wrap';
import * as Inqueirer from 'inquirer';
import { LIMIT, TABLE_COL_WIDTH } from '../config/constants';

export interface PrinterOptions {
    width?: number;
    head?: string[];
}

export interface PrompterOptions {
    limit?: number;
}

export class Prompter {
    /**
     * Prompt module that returns Promise of user interaction upon execution.
     * Utilizes inquirer.js
     */
    private promptModule: () => Promise<{ showNext: boolean; }>;

    /**
     * 
     * Initializes a new Prompter
     * 
     * @param options - constructor options of PrompterOptions
     */
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

    /**
     * 
     * Prompts user interaction. 
     * 
     * @returns Boolean value of user interaction. Y -> true | N -> false
     * 
     */
    async prompt() {
        return this.promptModule();
    }
}

export class Printer {
    /**
     * Width of the table columns
     */
    private colWidth: number;
    /**
     * Table header columns
     */
    private head: string[];

    /**
     * 
     * Initializes a new Printer
     * 
     * @param options - constructor options of PrinterOptions
     * 
     */
    constructor(options?: PrinterOptions) {
        const { 
            head = undefined, 
            width = TABLE_COL_WIDTH
         } = options || {};

        this.colWidth = width;
        this.head = head;
    }

    /**
     * 
     * Prints a tabular view of contents using cli-table library
     * 
     * @param contents - contents to print
     * @param options - control options for the table. Refer to PrinterOptions
     * 
     */
    printTable(contents: [string, string][], options?: PrinterOptions) {
        const { 
            head = this.head,
            width = this.colWidth
         } = options || {};
        const tableOptions = {
            head,
            colWidths: [width, width],
        };
        const table = new Table(tableOptions);

        for (const content of contents) {
            // give extra padding for margins left & right with - 10
            table.push(content.map(col => wrap(col, { width: width - 10, indent: '' })));
        }

        process.stdout.write(table.toString() + '\n');
    }

    /**
     * 
     * Prints string content to the terminal
     * 
     * @param content - content to print
     * 
     */
    print(content: string) {
        process.stdout.write(`${content}\n`);
    }
}
