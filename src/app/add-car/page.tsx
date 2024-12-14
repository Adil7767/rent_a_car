import { AddCarForm } from '@/components/add-car-form'

export default function AddCarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Vehicle</h1>
      <div className="rounded-lg border bg-white p-8">
        <AddCarForm />
      </div>
    </div>
  )
}

