import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AddCarButton() {
  return (
    <Button asChild>
      <Link href="/add-car" className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Add Car</span>
      </Link>
    </Button>
  )
}

