export interface Step {
  frames: number[];
  page: number;
  fault: boolean;
  explanation: string;
  replacedPage?: number; // 👈 add this line
}


// FIFO
export function simulateFIFO(refs: number[], frameCount: number): Step[] {
  const frames: number[] = [];
  const steps: Step[] = [];
  const queue: number[] = [];

  refs.forEach(page => {
    let fault = false;
    let replaced: number | undefined;

    if (!frames.includes(page)) {
      fault = true;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        replaced = queue.shift();
        if (replaced !== undefined) {
          const idx = frames.indexOf(replaced);
          frames[idx] = page;
        }
      }
      queue.push(page);
    }

    steps.push({
      frames: [...frames],
      page,
      fault,
      explanation: fault
        ? replaced !== undefined
          ? `Page ${page} caused a fault. Replaced ${replaced} (FIFO).`
          : `Page ${page} caused a fault and was loaded.`
        : `Page ${page} was a hit.`,
      replacedPage: replaced,
    });
  });

  return steps;
}

// LRU
export function simulateLRU(refs: number[], frameCount: number): Step[] {
  const frames: number[] = [];
  const steps: Step[] = [];
  const recent: Map<number, number> = new Map();

  refs.forEach((page, i) => {
    let fault = false;
    let replaced: number | undefined;

    if (!frames.includes(page)) {
      fault = true;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        // least recently used
        let lruPage = [...recent.entries()].sort((a, b) => a[1] - b[1])[0][0];
        replaced = lruPage;
        const idx = frames.indexOf(lruPage);
        frames[idx] = page;
      }
    }

    recent.set(page, i);

    steps.push({
      frames: [...frames],
      page,
      fault,
      explanation: fault
        ? replaced !== undefined
          ? `Page ${page} caused a fault. Replaced ${replaced} (LRU).`
          : `Page ${page} caused a fault and was loaded.`
        : `Page ${page} was a hit.`,
      replacedPage: replaced,
    });
  });

  return steps;
}

// OPT (Optimal)
export function simulateOPT(refs: number[], frameCount: number): Step[] {
  const frames: number[] = [];
  const steps: Step[] = [];

  refs.forEach((page, i) => {
    let fault = false;
    let replaced: number | undefined;

    if (!frames.includes(page)) {
      fault = true;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        // find the page used farthest in the future
        let farthestIndex = -1;
        let victim: number | undefined;
        for (const f of frames) {
          const nextUse = refs.slice(i + 1).indexOf(f);
          if (nextUse === -1) {
            victim = f;
            break;
          }
          if (nextUse > farthestIndex) {
            farthestIndex = nextUse;
            victim = f;
          }
        }
        if (victim !== undefined) {
          replaced = victim;
          const idx = frames.indexOf(victim);
          frames[idx] = page;
        }
      }
    }

    steps.push({
      frames: [...frames],
      page,
      fault,
      explanation: fault
        ? replaced !== undefined
          ? `Page ${page} caused a fault. Replaced ${replaced} (OPT).`
          : `Page ${page} caused a fault and was loaded.`
        : `Page ${page} was a hit.`,
      replacedPage: replaced,
    });
  });

  return steps;
}
