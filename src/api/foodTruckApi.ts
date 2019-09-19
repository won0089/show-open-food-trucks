import * as Request from 'request-promise';
import { FoodTruck } from '../model/foodTruck';
import { getCurrentDateTime } from '../util/dateUtils';
import { LIMIT, FOOD_TRUCK_API_URL } from '../constants';

export interface Options {
    limit?: number;
    offset?: number;
    sort?: 'asc' | 'desc'
}

export class FoodTruckApi {
    private token: string;
    private baseUrl: string;
    private limit: number;
    private sort: 'asc' | 'desc';
    private offset: number;

    constructor(options?: {
        token?: string;
        baseUrl?: string;
        limit?: number;
    }) {
        const {
            token = '',
            limit = LIMIT,
            baseUrl = FOOD_TRUCK_API_URL,
        } = options || {};

        this.token = token;
        this.baseUrl = baseUrl;
        this.limit = limit;
        this.sort = 'asc';
        this.offset = 0;
    }

    private queryBuilder(queryOptions: Options): string {
        const {
            limit,
            offset,
            sort
        } = queryOptions;
        const { dayOfWeek, hour } = getCurrentDateTime();
        const selectQuery = 'applicant,location';
        const whereQuery = `'${hour}:00' BETWEEN start24 AND end24 AND dayorder=${dayOfWeek}`;
        const orderQuery = `applicant ${sort}`;
        const token = this.token ? `&$$app_token=${this.token}` : '';

        return `$select=${selectQuery}&$limit=${limit}&$offset=${offset}&$where=${whereQuery}&$order=${orderQuery}${token}`;
    }

    async getFoodTrucks(options?: Options): Promise<FoodTruck[]> {
        const {
            limit = this.limit,
            offset = this.offset,
            sort = this.sort,
        } = options || {};

        try {
            const response: FoodTruck[] =
                await Request.get(`${this.baseUrl}?${this.queryBuilder({ limit, offset, sort })}`, { json: true });

            this.offset = offset + limit;

            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}