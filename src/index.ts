import { initializeArgs } from './cli/arguments';
import { Printer, Prompter } from './cli/terminal';
import { FoodTruckApi } from './api/foodTruckApi';
import { FoodTruck } from './model/foodTruck';
import { LIMIT } from './config/constants';

/**
 * Converts FoodTruck object to string tupple
 * 
 * @param foodTruck - FoodTruck object
 * 
 * @returns string tupple where format is [applicant, location]
 * 
 */
function toTupple(foodTruck: FoodTruck): [string, string] {
    const { applicant, location } = foodTruck;

    return [applicant, location];
}

(async function run() {
    const args = initializeArgs();

    args.parse(process.argv);

    const limit = Number(args.limit) || LIMIT;
    const token = process.env.SOCRATA_APP_TOKEN;

    const prompter = new Prompter({ limit });
    const printer = new Printer({ head: ['NAME', 'LOCATION'] });
    const api = new FoodTruckApi({ limit, token });

    try {
        let endOfListMessage = 'No open food trucks at this moment. Please try again at a later time!';

        while (true) {
            const foodTrucks = await api.getFoodTrucks();

            if (foodTrucks.length === 0) {
                printer.print(endOfListMessage);

                break;
            }

            printer.printTable(foodTrucks.map(toTupple));

            if (foodTrucks.length === limit) {
                const { showNext } = await prompter.prompt();

                if (!showNext) {
                    break;
                }
            }

            endOfListMessage = 'No more food trucks to show.';
        }
    } catch (error) {
        printer.print('Something went wrong:');
        printer.print(error);
    } finally {
        printer.print('Good Bye!');
    }
})();
