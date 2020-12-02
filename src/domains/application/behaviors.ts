import polly from "polly-js"
import url from "url"

import { exitAs } from "./"
import { AppException, GetStreamCb, UrlProtocol, WriteStreamCb } from "./types"

export const parseProtocol = (path: string): string => {
  if (path.includes("mnt/")) {
    return UrlProtocol.File
  } else {
    return url.parse(path)?.protocol?.split(":")[0]
  }
}

export const getStreamFromHttp = async (srcPath: string): Promise<NodeJS.ReadWriteStream> => {
  // to do get Stream from http adress
  const stream = await undefined

  return stream
}

export const getStreamFromFtp = async (srcPath: string): Promise<NodeJS.ReadWriteStream> => {
  // to do get Stream from ftp adress
  const stream = await undefined

  return stream
}

export const writeStreamToFtp = async (srcStream: NodeJS.ReadWriteStream, dstPath): Promise<void> => {
  // to do get Stream from ftp adress
  await undefined
}

export const getStreamFromSftp = async (srcPath: string): Promise<NodeJS.ReadWriteStream> => {
  // to do get Stream from sftp adress
  const stream = await undefined

  return stream
}

export const writeStreamToSftp = async (srcStream: NodeJS.ReadWriteStream, dstPath: string): Promise<void> => {
  // to do write Stream from sftp adress
  await undefined
}

export const getStreamFromDam = async (srcPath: string): Promise<NodeJS.ReadWriteStream> => {
  // to do get Stream with DamClient
  const stream = await undefined

  return stream
}

export const writeStreamToDam = async (srcStream: NodeJS.ReadWriteStream, dstPath: string): Promise<void> => {
  // to do write Stream with DamClient
  await undefined
}

export const getStreamFromFs = async (srcPath: NodeJS.ReadWriteStream, dstPath: string): Promise<void> => {
  // to do get Stream from fs
  const stream = await undefined

  return stream
}

export const writeStreamToFs = async (srcStream: NodeJS.ReadWriteStream, dstPath: string): Promise<void> => {
  // to do write Stream to fs
  await undefined
}

export const getTransferCb = (
  transferType: "getStream" | "writeStream",
  protocol: string,
): GetStreamCb | WriteStreamCb => {
  const getStream = transferType === "getStream"

  switch (protocol) {
    case UrlProtocol.Http:
    case UrlProtocol.Https:
      return getStream ? getStreamFromHttp : async (_, __) => exitAs(AppException.HttpProtocolUploadError)

    case UrlProtocol.Ftp:
      return getStream ? getStreamFromFtp : writeStreamToFtp

    case UrlProtocol.Sftp:
      return getStream ? getStreamFromSftp : writeStreamToSftp

    case UrlProtocol.Dam:
      return getStream ? getStreamFromDam : writeStreamToDam

    case UrlProtocol.File:
      return getStream ? getStreamFromFs : writeStreamToFs

    default:
      exitAs(AppException.UrlProtocolUnrecognized, { context: protocol })
  }
}

export const addRetry = <T>(fn: () => Promise<T>, tryMax = 3): Promise<T> =>
  polly()
    .waitAndRetry(tryMax)
    .executeForPromise((i) => {
      if (i.count > 0) console.log(`Retry ${i.count} time ...`)
      return fn()
    })
