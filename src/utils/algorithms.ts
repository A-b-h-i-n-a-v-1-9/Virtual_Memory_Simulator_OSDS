// utils/algorithms.ts
export type Step = {
    frames: number[];
    page: number;
    fault: boolean;
    explanation: string;
};

export function simulateFIFO(refs: number[], frameCount: number): Step[] {
    const steps: Step[] = [];
    const frames: number[] = [];
    const queue: number[] = [];
    
    for (let page of refs) {
        let fault = false;
        let explanation = "";
        
        if (!frames.includes(page)) {
            fault = true;
            if (frames.length < frameCount) {
                frames.push(page);
                queue.push(page);
                explanation = `Page ${page} not in memory → loaded into empty frame.`;
            } else {
                const victim = queue.shift()!;
                const idx = frames.indexOf(victim);
                frames[idx] = page;
                queue.push(page);
                explanation = `Page ${page} not in memory → replaced oldest page ${victim} (FIFO).`;
            }
        } else {
            explanation = `Page ${page} is already in memory → no page fault.`;
        }
        
        steps.push({ frames: [...frames], page, fault, explanation });
    }
    return steps;
}

export function simulateLRU(refs: number[], frameCount: number): Step[] {
    const steps: Step[] = [];
    const frames: number[] = [];
    const recentlyUsed: number[] = [];
    
    for (let page of refs) {
        let fault = false;
        let explanation = "";
        
        // Update recently used list
        const pageIndex = recentlyUsed.indexOf(page);
        if (pageIndex > -1) {
            recentlyUsed.splice(pageIndex, 1);
        }
        recentlyUsed.push(page);
        
        if (!frames.includes(page)) {
            fault = true;
            if (frames.length < frameCount) {
                frames.push(page);
                explanation = `Page ${page} not in memory → loaded into empty frame.`;
            } else {
                // Find least recently used page (first in the recentlyUsed list that's in frames)
                let victim = -1;
                for (let i = 0; i < recentlyUsed.length; i++) {
                    if (frames.includes(recentlyUsed[i])) {
                        victim = recentlyUsed[i];
                        recentlyUsed.splice(i, 1);
                        break;
                    }
                }
                
                const idx = frames.indexOf(victim);
                frames[idx] = page;
                explanation = `Page ${page} not in memory → replaced least recently used page ${victim} (LRU).`;
            }
        } else {
            explanation = `Page ${page} is already in memory → no page fault.`;
        }
        
        steps.push({ frames: [...frames], page, fault, explanation });
    }
    return steps;
}

export function simulateOPT(refs: number[], frameCount: number): Step[] {
    const steps: Step[] = [];
    const frames: number[] = [];
    
    for (let i = 0; i < refs.length; i++) {
        const page = refs[i];
        let fault = false;
        let explanation = "";
        
        if (!frames.includes(page)) {
            fault = true;
            if (frames.length < frameCount) {
                frames.push(page);
                explanation = `Page ${page} not in memory → loaded into empty frame.`;
            } else {
                // Find which page will not be used for the longest time
                let farthest = -1;
                let victim = -1;
                
                for (let j = 0; j < frames.length; j++) {
                    const framePage = frames[j];
                    let nextUse = Infinity;
                    
                    // Find next use of this page
                    for (let k = i + 1; k < refs.length; k++) {
                        if (refs[k] === framePage) {
                            nextUse = k;
                            break;
                        }
                    }
                    
                    if (nextUse === Infinity) {
                        victim = framePage;
                        break;
                    }
                    
                    if (nextUse > farthest) {
                        farthest = nextUse;
                        victim = framePage;
                    }
                }
                
                const idx = frames.indexOf(victim);
                frames[idx] = page;
                explanation = `Page ${page} not in memory → replaced page ${victim} that won't be used for the longest time (OPT).`;
            }
        } else {
            explanation = `Page ${page} is already in memory → no page fault.`;
        }
        
        steps.push({ frames: [...frames], page, fault, explanation });
    }
    return steps;
}