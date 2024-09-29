let startedAt = 0

export default {
  /**
   * @param {Request} request
   */
  async fetch(request) {
    startedAt ||= Date.now()
    const uptimeSeconds = Math.round((Date.now() - startedAt) / 1000)

    const seconds = +(request.url.match(/\d+$/)?.[0] ?? 1)
    const milliseconds = await sleep(seconds)
    return Response.json({ seconds, milliseconds, uptimeSeconds })
  }
}

function sleep(seconds = 1, start = Date.now()) {
  const ms = seconds * 1000
  return new Promise((resolve) => setTimeout(() => resolve(Date.now() - start), ms))
}
