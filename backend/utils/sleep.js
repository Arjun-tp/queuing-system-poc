export const sleep = async ({ reason, ms }) => {
  await new Promise((resolve) => {
    console.log(reason)
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
