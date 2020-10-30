import chalk from "chalk"
import { addLine, colors, formatObj, selectStyle } from "./behaviors"

export const logAs = (label: string, x: any): void => {
  const logged = x instanceof Error ? x.message : x
  console.info("")
  console.info(chalk`{${selectStyle(label)} ${label}}\n{${selectStyle("none")} ${formatObj(logged)}}`)
  addLine(label)
}

export const logDebug = <T>(x: T): void => {
  console.info("")
  console.info(chalk`{${colors.purple} Debug}\n${formatObj(x, Infinity)}`)
}
