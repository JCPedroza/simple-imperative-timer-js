const div = document.getElementById('timer')

const MODES = {
  DESCENDING: 0,
  ASCENDING: 1
}

// All times in milliseconds
const timer = {
  mode: MODES.DESCENDING,
  limit: 0,
  time: 5000,
  rate: 100,
  ref: 0
}

const start = (timer) => {
  timer.ref = performance.now()
}

const tick = (timer) => {
  const now = performance.now()
  const delta = now - timer.ref
  timer.ref = now

  if (timer.mode === MODES.DESCENDING) {
    timer.time -= delta
    return timer.time >= timer.limit
  } else if (timer.mode === MODES.ASCENDING) {
    timer.time += delta
    return timer.time <= timer.limit
  } else {
    throw new Error(`Unsupported mode "${timer.mode}"`)
  }
}

const updateDiv = (div, timer) => {
  div.textContent = String(timer.time)
}

const runTimer = (timer) => {
  updateDiv(div, timer)
  const hasNextTick = tick(timer)
  if (!hasNextTick) {
    updateDiv(div, timer)
    return timer.time
  }

  setTimeout(() => runTimer(timer), timer.rate)
}

start(timer)
runTimer(timer)
