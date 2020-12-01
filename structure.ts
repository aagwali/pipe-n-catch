const completeStructure = {
  init: {
    build: "config",
    connect: "mongo",
    configure: ["damClient", "bam"],
    create: "tmp directory in container - if !exists",
    run: "monitoring server",
    logFluent: "worker start", // done by starting monitoring server
    start: "message listening",
  },
  processMessage: {
    log: "processing job",
    tracer: "start transaction",
    get: "batch",
    processTasks: {
      filter: "need processing",
      log: "process start",
      executeTasksConcurently: {
        set: "upload/downoad callbacks relative to file protocol",
        runDownloadCb: "file is temporary stored in container - expect for file system protocol",
        runUpload: "from container to destination",
        remove: "temporary file - expect for file system protocol",
        // emit: "bam MEDIA_EXPORTED",
        log: "log error if temporary removal failed",
        return: "unitary transferResult even if failed",
      },
      return: "all concurent transferResult",
    },
    updateBatch: "with transfer results - catch saving error",
    emit: "job treated",
    setAppException: {
      set: "bull job status",
      emit: "bam FILE_EXPORT_COMPLETE if success - fluent bam error",
      log: "processMessage result",
    },
  },
}
