import util from "util"

export const colors = {
  green: "rgb(0,180,100).underline",
  orange: "rgb(180,120,10).underline",
  red: "rgb(240,80,120).underline",
  purple: "rgb(204,102,255).underline",
  blue: "rgb(30,102,255).underline",
  cyan: "rgb(0,200,200).underline",
  grey: "rgb(150,150,150).underline",
}

export const selectStyle = (x: string): string => {
  switch (x) {
    case "Execution Info":
      return colors.grey
    case "Execution started":
      return colors.cyan
    case "Execution success":
      return colors.green
    case "Execution error":
      return colors.orange
    case "Application error":
      return colors.red
    default:
      return "white"
  }
}

export const addLine = (label: string): void => {
  if (label === "Execution error" || label === "Execution success") {
    console.info("")
  }
}

export const formatObj = (x: any, maxArrayLength = 2): string =>
  typeof x === "object"
    ? util.inspect(x, {
        maxArrayLength,
        colors: true,
        breakLength: 120,
      })
    : x
