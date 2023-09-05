export function createContainer(tag = 'div'): HTMLElement {
  const container = document.createElement(tag)
  document.body.appendChild(container)
  return container
}
export function waitRAF(): Promise<number> {
  return new Promise(resolve => requestAnimationFrame(resolve))
}
