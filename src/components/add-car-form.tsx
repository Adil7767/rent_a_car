"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import CarServices from "@/services/carServices";
import { useState } from "react";

const formSchema = z.object({
  registrationNo: z.string().min(1, "Registration number is required"),
  yearOfModel: z.string().min(1, "Year of model is required"),
  registeredCity: z.string().min(1, "Registered city is required"),
  carType: z.string().min(1, "Car type is required"),
  carMake: z.string().min(1, "Car make is required"),
  carModel: z.string().min(1, "Car model is required"),
  color: z.string(),
  transmissionType: z.string(),
  engineCapacity: z.string().min(1, "Engine capacity is required"),
  chassisNo: z.string().min(1, "Chassis number is required"),
  engineNo: z.string().min(1, "Engine number is required"),
  fuelType: z.string(),
  fuelTankCapacity: z.string(),
  maxSpeed: z.string(),
  seatingCapacity: z.string(),
  inspectionDate: z.string(),
  inspectionMileage: z.string(),
  inspectionLocation: z.string(),
  ratePerDay: z.coerce.number().min(0, "Rate per day must be positive"),
  priceOfVehicle: z.coerce.number().min(0, "Price of vehicle must be positive"),
  fuelAverage: z.string(),
  features: z.object({
    airConditioner: z.boolean(),
    heater: z.boolean(),
    sunRoof: z.boolean(),
    cdDvdPlayer: z.boolean(),
    androidPlayer: z.boolean(),
    frontCamera: z.boolean(),
    rearCamera: z.boolean(),
    cigaretteLighter: z.boolean(),
    steeringLock: z.boolean(),
    wheelCups: z.boolean(),
    spareWheel: z.boolean(),
    airCompressor: z.boolean(),
    jackHandle: z.boolean(),
    wheelPanna: z.boolean(),
    mudFlaps: z.boolean(),
    floorMats: z.boolean(),
    vehicleDocuments: z.boolean(),
  }),
  images: z.array(z.string()).default([]),
});

export function AddCarForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationNo: "",
      yearOfModel: "",
      registeredCity: "",
      carType: "",
      carMake: "",
      carModel: "",
      color: "",
      transmissionType: "",
      engineCapacity: "",
      chassisNo: "",
      engineNo: "",
      fuelType: "",
      fuelTankCapacity: "",
      maxSpeed: "",
      seatingCapacity: "",
      inspectionDate: "",
      inspectionMileage: "",
      inspectionLocation: "",
      ratePerDay: 0,
      priceOfVehicle: 0,
      fuelAverage: "",
      features: {
        airConditioner: false,
        heater: false,
        sunRoof: false,
        cdDvdPlayer: false,
        androidPlayer: false,
        frontCamera: false,
        rearCamera: false,
        cigaretteLighter: false,
        steeringLock: false,
        wheelCups: false,
        spareWheel: false,
        airCompressor: false,
        jackHandle: false,
        wheelPanna: false,
        mudFlaps: false,
        floorMats: false,
        vehicleDocuments: false,
      },
      images: [],
    },
  });

  const [images, setImages] = useState<File[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "features" && key !== "images") {
        formData.append(key, value.toString());
      }
    });

    formData.append("features", JSON.stringify(values.features));

    images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      await CarServices.uploadCar(formData);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error uploading car:", error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  Vehicle Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="registrationNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration No</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter registration number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearOfModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Model</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter year"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="carType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Car Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="carMake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car Make</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Car Make" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="suzuki">Suzuki</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="carModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter car model" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter color" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transmissionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="engineCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Engine Capacity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter engine capacity"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chassisNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chassis No</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter chassis number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="engineNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Engine No</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter engine number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  Vehicle Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Fuel Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelTankCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Tank Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter capacity" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxSpeed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Speed</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter max speed" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seatingCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seating Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter seating capacity"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inspectionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspection Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inspectionMileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspection Mileage</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mileage" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inspectionLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspection Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ratePerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate per Day</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter daily rate"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priceOfVehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price of Vehicle</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter vehicle price"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelAverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Average</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter fuel average" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-600">
                  Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.keys(form.getValues().features).map((feature) => (
                    <FormField
                      key={feature}
                      control={form.control}
                      name={`features.${feature}` as any}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0 capitalize">
                            {feature.replace(/([A-Z])/g, " $1").trim()}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-600">Images</h2>
                <div className="space-y-2">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const newImages = [...images, ...files].slice(0, 10); // Limit to 10 images
                      setImages(newImages);
                      form.setValue(
                        "images",
                        newImages.map((file) => URL.createObjectURL(file))
                      );
                    }}
                  />
                  <p className="text-sm text-gray-500">
                    Maximum 10 images allowed
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Car Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => {
                            const newImages = images.filter(
                              (_, i) => i !== index
                            );
                            setImages(newImages);
                            form.setValue(
                              "images",
                              newImages.map((file) => URL.createObjectURL(file))
                            );
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
