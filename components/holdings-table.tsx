"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useInstrumentSelection } from "@/hooks/use-instrument-selection"

export function HoldingsTable() {
  const { selectedInstrument } = useInstrumentSelection()

  return (
    <Table>
      <TableHeader>
        <TableRow className="uppercase">
          <TableHead className="w-2/5">Instrument</TableHead>
          <TableHead>Actual/Target</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="text-right">Return</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedInstrument?.slices.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item.asset}</TableCell>
            <TableCell>-/{item.target}</TableCell>
            <TableCell>{"-"}</TableCell>
            <TableCell className="text-right">{"-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
