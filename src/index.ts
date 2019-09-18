import { initializeArgs } from './cli/arguments';
import { Printer, Prompter } from './cli/terminal';
import { FoodTruckApi } from './api/foodTruckApi';
import { FoodTruck } from './model/foodTruck';
import { LIMIT } from './constants';

function toTupple(foodTruck: FoodTruck): [string, string] {
    const { applicant, location } = foodTruck;

    return [applicant, location];
}

(async function run() {
    const args = initializeArgs();

    args.parse(process.argv);

    const limit = Number(args.limit) || LIMIT;
    const prompter = new Prompter({ limit });
    const printer = new Printer();
    const api = new FoodTruckApi({ limit });

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