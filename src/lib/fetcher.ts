export async function fetcher (
  input : RequestInfo | URL,
  init ?: RequestInit | undefined
) {
  const res = await fetch(input, init)

   // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    try {
      const { error } = await res.json()
      throw new Error(`${res.status}: ${error}`)
    } catch {
      throw new Error(`${res.status}: ${res.statusText}`)
    }
  }
  
  return res.json()
}
