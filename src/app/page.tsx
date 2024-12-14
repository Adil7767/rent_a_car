import { AddCarButton } from '@/components/add-car-button'
import { CarGrid } from '@/components/car-grid'


export default async function Home() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Vehicle Details</h1>
        <AddCarButton />
      </div>
      <CarGrid  />
    </div>
  )
}

