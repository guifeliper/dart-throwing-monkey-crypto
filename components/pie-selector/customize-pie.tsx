"use client"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

function calculateFinalValue(array) {
  const sum = array.reduce((acc, item) => {
    return acc + item.target
  }, 0)

  return sum
}

export const CustomizePie = () => {
  const form = useFormContext()
  const [totalTarget, setTotalTarget] = useState(100)
  const { fields, update, remove } = useFieldArray({
    name: "slices",
    control: form.control,
  })

  useEffect(() => {
    setTotalTarget(calculateFinalValue(fields))
  }, [fields])

  return (
    <div className="flex flex-col space-y-8 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="mx-4 lg:w-1/5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Prosperity Path" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </aside>
      <div className="flex-1 lg:max-w-2xl">
        <div className="grid gap-2 pt-2">
          <div className="text-md flex items-center justify-between font-bold">
            <span>Instrument</span>
            <span
              data-correct={totalTarget === 100}
              className="rounded-md border border-transparent bg-blue-100 px-2 py-0.5 text-right text-blue-600 hover:border-border data-[correct=false]:bg-red-100 data-[correct=false]:text-red-600"
            >
              {totalTarget}%
            </span>
          </div>
          {fields.map((field, index) => (
            <div className="grid gap-4" key={index}>
              <div className="flex items-center justify-between">
                <Label htmlFor="target">{field.symbol}</Label>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  TOTAL - {field.target.toFixed(2)}%
                </span>
              </div>
              <div className="flex gap-4">
                <Slider
                  id="target"
                  max={100}
                  defaultValue={[field.target]}
                  step={1}
                  onValueChange={(value) =>
                    update(index, { ...field, target: value[0] })
                  }
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  aria-label="target"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
