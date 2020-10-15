import chalk from "chalk"
import util from "util"

const colors = {
  green: "rgb(0,180,100).underline",
  orange: "rgb(180,120,10).underline",
  red: "rgb(240,80,120).underline",
  purple: "rgb(204,102,255).underline",
  blue: "rgb(30,102,255).underline",
  cyan: "rgb(0,200,200).underline",
  grey: "rgb(150,150,150).underline",
}

const selectStyle = (x: any) => {
  switch (x) {
    case "Application Info":
      return colors.grey
    case "Application started":
      return colors.cyan
    case "Application success":
      return colors.green
    case "Application error":
      return colors.orange
    case "Initiation error":
      return colors.red
    default:
      return "white"
  }
}

const formatObj = (x: any, maxArrayLength = 2): string =>
  typeof x === "object"
    ? util.inspect(x, {
        maxArrayLength,
        colors: true,
        breakLength: 120,
      })
    : x

export const logAs = <T>(label: string) => (x: T): void => {
  console.info(chalk`{${selectStyle(label)} ${label}}\n{${selectStyle("none")} ${formatObj(x)}}`)
  console.info("")
}

export const logDebug = <T>(x: T): void => {
  console.info(chalk`{${colors.purple} Debug}\n${formatObj(x, Infinity)}\n`)
}
