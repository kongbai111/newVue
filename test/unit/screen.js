const dimensions = () => {
  const w = window
  const d = document
  const e = d.documentElement
  const g = d.getElementsByTagName('body')[0]
  const x = w.innerWidth || e.clientWidth || g.clientWidth
  const h = w.innerHeight || e.clientHeight || g.clientHeight
  return {
    x, h
  }
}

export {
  dimensions
}
