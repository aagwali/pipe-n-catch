import chalk from "chalk"
import { selectStyle, formatObj, colors, addLine } from "./behaviors"

export const logAs = <T>(label: string, x: T): void => {
  const logged = (x instanceof Error) ? x.message : x
  console.info("")
  console.info(chalk`{${selectStyle(label)} ${label}}\n{${selectStyle("none")} ${formatObj(logged)}}`)
  addLine(label)
}

export const logDebug = <T>(x: T): void => {
  console.info("")
  console.info(chalk`{${colors.purple} Debug}\n${formatObj(x, Infinity)}`)
}
