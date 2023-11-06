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
import { useInstrumentSelection } from "@/hooks/use-instrument-selection"
import { useRouter } from "next-intl/client"
import { AssetsDataTable } from "./assets-data-table"
import { CustomizePie } from "./customize-pie"

const steps = [
  { label: "Add slices to the pie", icon: <PiggyBank /> },
  { label: "Customize your pie", icon: <Percent /> },
] satisfies StepConfig[]

const pieFormSchema = z.object({
  id: z.number().optional(),
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

export default function StepperStates() {
  const { setDialogOpen, selectedInstrument } = useInstrumentSelection()
  const { nextStep, prevStep, activeStep, isDisabledStep, isLastStep } =
    useStepper({
      initialStep: selectedInstrument ? 1 : 0,
      steps,
    })
  const form = useForm<PieFormValues>({
    resolver: zodResolver(pieFormSchema),
    defaultValues: selectedInstrument ?? defaultValues,
    mode: "onChange",
  })

  const router = useRouter()
  async function onSubmit(data: PieFormValues) {
    try {
      let response
      if (data.id) {
        response = await fetch("/api/users/edit-pie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      } else {
        response = await fetch("/api/users/create-pie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      }

      if (response.ok) {
        console.log("Pie created successfully!")
        setDialogOpen(false)
        router.refresh()
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
      <div className="bg-red p-2 text-white">
        {process.env.NODE_ENV === "production"
          ? null
          : JSON.stringify(form.formState.errors)}
      </div>
    </Form>
  )
}

//TODO:
// 1. Create the edit-pie endpoint
// 2. Create the delete-pie endpoint
// 3. Make the create pie button and empty canvas
