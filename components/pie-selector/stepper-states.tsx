import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Step, StepConfig, Steps } from "@/components/ui/stepper"
import { useStepper } from "@/components/ui/use-stepper"
import { AssetsDataTable } from "./assets-data-table"

const steps = [
  { label: "Add slices to the pie" },
  { label: "Customize your pie" },
  { label: "Investing options" },
] satisfies StepConfig[]

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

  const [value, setValue] = useState<"loading" | "error">("loading")

  return (
    <div className="flex w-full flex-col gap-4">
      <Steps state={value} activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step index={index} key={index} {...step}>
            {index === 0 && <AssetsDataTable />}
            {index === 1 && <p>Step 2</p>}
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
    </div>
  )
}
