export const viewTransitionCallback = (callback: () => void) => {
  callback()
  document.addEventListener('astro:after-swap', () => {
    callback()
  })
}
