import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseUrl = "https://backend-devadil786-gmailcom-devadil.vercel.app";

// Define types for car data and query parameters
export interface Car {
    id?: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    images?: string[];
    [key: string]: any;
}

export interface QueryParams {
    [key: string]: string | number | boolean;
}

class CarServices {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: baseUrl,
        });
    }

    async getAllCars(params?: QueryParams): Promise<Car[]> {
        try {
            const res: AxiosResponse<Car[]> = await this.client.get("/cars", { params });
            return res.data;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error;
        }
    }

    async uploadCar(data: any): Promise<Car> {
        try {
            const res: AxiosResponse<Car> = await this.client.post("/cars", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (error) {
            console.error("Error uploading car:", error);
            throw error;
        }
    }

    async updateCar(id: string, data: Partial<Car>): Promise<Car> {
        try {
            const res: AxiosResponse<Car> = await this.client.patch(`/cars/${id}`, data);
            return res.data;
        } catch (error) {
            console.error("Error updating car:", error);
            throw error;
        }
    }

    async deleteCar(id: string): Promise<Car> {
        try {
            const res: AxiosResponse<Car> = await this.client.delete(`/cars/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error deleting car:", error);
            throw error;
        }
    }
}

const CarServicesInstance = new CarServices();
export default CarServicesInstance;
