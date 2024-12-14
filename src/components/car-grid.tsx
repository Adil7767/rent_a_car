"use client";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import CarServices from "@/services/carServices";

export function CarGrid() {
  const [cars, setCars] = useState<any>([]);
  useEffect(() => {
    try {
      CarServices.getAllCars().then((res: any) => {
        setCars(res);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars?.length ? (
        cars.map((car: any) => (
          <Card key={car._id}>
            <CardContent className="p-4">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <Image
                  src={car.images?.[0] || "/placeholder.svg"}
                  alt={`${car.carMake} ${car.carModel}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">
                  {car.carMake} {car.carModel} {car.yearOfModel}
                </h3>
                <p className="text-sm text-gray-500">{car.registeredCity}</p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <div>
                <p className="text-sm text-gray-500">Per Day Charge:</p>
                <p className="font-semibold">Rs.{car.ratePerDay}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No cars available</p>
      )}
    </div>
  );
}
