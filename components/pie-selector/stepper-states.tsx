"use client"

import { Button } from "@/components/ui/button"
import { Step, StepConfig, Steps } from "@/components/ui/stepper"
import { useStepper } from "@/components/ui/use-stepper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Percent, PiggyBank } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { DialogFooter } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Dispatch, SetStateAction } from "react"
import { AssetsDataTable } from "./assets-data-table"
import { CustomizePie } from "./customize-pie"

const steps = [
  { label: "Add slices to the pie", icon: <PiggyBank /> },
  { label: "Customize your pie", icon: <Percent /> },
] satisfies StepConfig[]

const pieFormSchema = z.object({
  name: z.string().optional(),
  slices: z
    .array(
      z.object({
        asset: z.string().optional(),
        target: z.number().optional(),
      })
    )
    .optional(),
})
type PieFormValues = z.infer<typeof pieFormSchema>

const defaultValues: Partial<PieFormValues> = {
  name: " ",
  slices: [],
}

export default function StepperStates({
  setDropdownOpen,
}: {
  setDropdownOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { nextStep, prevStep, activeStep, isDisabledStep, isLastStep } =
    useStepper({
      initialStep: 0,
      steps,
    })
  const form = useForm<PieFormValues>({
    resolver: zodResolver(pieFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: PieFormValues) {
    console.log("data", data)

    try {
      const response = await fetch("/api/users/create-pie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log("Pie created successfully!")
        setDropdownOpen(false)
      } else {
        console.error("Failed to create pie")
      }
    } catch (error) {
      console.error("Failed to create pie", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Steps activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step index={index} key={index} {...step}>
              {index === 0 && <AssetsDataTable />}
              {index === 1 && <CustomizePie />}
            </Step>
          ))}
        </Steps>
        <div className="flex items-center justify-end gap-2">
          <DialogFooter>
            <Button disabled={isDisabledStep} onClick={prevStep}>
              Prev
            </Button>
            {isLastStep && <Button type="submit">Submit</Button>}
            {!isLastStep && <Button onClick={nextStep}>Next</Button>}
          </DialogFooter>
        </div>
      </form>
    </Form>
  )
}
