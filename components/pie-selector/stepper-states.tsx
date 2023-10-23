import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Step, StepConfig, Steps } from "@/components/ui/stepper"
import { useStepper } from "@/components/ui/use-stepper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Percent, PiggyBank, Settings } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AssetsDataTable } from "./assets-data-table"
import { CustomizePie } from "./customize-pie"

const steps = [
  { label: "Add slices to the pie", icon: <PiggyBank /> },
  { label: "Customize your pie", icon: <Percent /> },
  { label: "Investing options", icon: <Settings /> },
] satisfies StepConfig[]

const pieFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Pie's name must be at least 3 characters.",
    })
    .max(30, {
      message: "Pie's name must not be longer than 30 characters.",
    }),
  slices: z
    .array(
      z.object({
        name: z.string(),
        symbol: z.string(),
        target: z.string(),
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
  const {
    nextStep,
    prevStep,
    resetSteps,
    activeStep,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
  } = useStepper({
    initialStep: 0,
    steps,
  })
  const form = useForm<PieFormValues>({
    resolver: zodResolver(pieFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: PieFormValues) {
    console.log(data)
  }

  useEffect(() => {
    console.log(form.getValues())
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Steps activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step index={index} key={index} {...step}>
              {index === 0 && <AssetsDataTable form={form} />}
              {index === 1 && <CustomizePie form={form} />}
              {index === 2 && <p>Step 3</p>}
            </Step>
          ))}
        </Steps>
        <div className="flex items-center justify-end gap-2">
          {activeStep === steps.length ? (
            <>
              <h2>All steps completed!</h2>
              <Button onClick={resetSteps}>Reset</Button>
            </>
          ) : (
            <>
              <Button disabled={isDisabledStep} onClick={prevStep}>
                Prev
              </Button>
              <Button onClick={nextStep}>
                {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  )
}
