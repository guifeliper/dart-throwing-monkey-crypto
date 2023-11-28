import { Button } from "@/components/ui/button"
import { Step, StepConfig, Steps } from "@/components/ui/stepper"
import { useStepper } from "@/components/ui/use-stepper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Percent, PiggyBank } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { DialogFooter } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useInstrumentSelection } from "@/hooks/use-instrument-selection"
import { useRouter } from "next/navigation"
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
        target: z.number().min(0).max(100).optional(),
      })
    )
    .refine((slices) => {
      const sum = slices.reduce((acc, slice) => acc + (slice.target ?? 0), 0)
      return sum <= 100
    }, "The sum of all slice targets cannot be greater than 100")
    .optional(),
})
type PieFormValues = z.infer<typeof pieFormSchema>

const defaultValues: Partial<PieFormValues> = {
  name: " ",
  slices: [],
}

export default function StepperStates() {
  const router = useRouter()
  const { dialogType, setDialogOpen, selectedInstrument } =
    useInstrumentSelection()
  const { nextStep, prevStep, activeStep, isDisabledStep, isLastStep } =
    useStepper({
      initialStep: dialogType === "edit" ? 1 : 0,
      steps,
    })

  const value =
    (dialogType === "edit" ? selectedInstrument : defaultValues) ??
    defaultValues

  const form = useForm<PieFormValues>({
    resolver: zodResolver(pieFormSchema),
    defaultValues: value,
    mode: "onChange",
  })

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
        router.replace("/dashboard")
        console.log("Pie created successfully!")
        toast({
          title: "Pie created/edit successfully",
          description: "Your pie has been created/edited.",
        })
        setDialogOpen(false)
      } else {
        toast({
          title: "An error occurred",
          description: "Sorry, something went wrong. Please try again.",
        })
        console.error("Failed to create pie")
      }
    } catch (error) {
      console.error("Failed to create pie", error)
      toast({
        title: "Failed to create pie",
        description: "Sorry, something went wrong. Please try again.",
      })
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
