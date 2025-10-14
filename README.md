🧠 Page Replacement Algorithm Visualizer

(**FIFO** | **LRU** | **OPT** Simulation)

📋 Overview

This project is a web-based visualizer for understanding Page Replacement Algorithms used in Operating Systems.

It helps demonstrate how pages are loaded, replaced, and managed in memory for different algorithms:

**FIFO** (First In First Out)

**LRU** (Least Recently Used)

**OPT** (Optimal / **MIN** Algorithm)

The app dynamically simulates each step of page replacement, visually showing:

Pages in frames

Page faults and hits

Which page was replaced

A short explanation for each operation

🖥️ Features

✅ Interactive input for reference strings and frame count ✅ Step-by-step simulation with explanations ✅ Real-time visual animation of memory frames ✅ Comparison across **FIFO**, **LRU**, and **OPT** ✅ Educational and beginner-friendly interface

🧩 Algorithms Explained 1️⃣ **FIFO** (First-In, First-Out)

Concept: Replaces the oldest page — the one that entered memory first.

Working Steps:

Maintain a queue of loaded pages.

When a new page comes:

If it’s already in memory → Hit

If not and space is available → load it

If not and memory is full → remove the page at the front (oldest), and load the new page.

Example Snapshot: (attach your screenshot here – e.g. ![**FIFO** Simulation](./screenshots/fifo.png))

In code: The algorithm keeps a queue and frames array:

if (!frames.includes(page)) {
    fault = true;
    if (frames.length < frameCount) frames.push(page);
    else {
    replaced = queue.shift();
    frames[frames.indexOf(replaced!)] = page;
    }
    queue.push(page);
}

2️⃣ **LRU** (Least Recently Used)

Concept: Replaces the page that hasn’t been used for the longest time.

Working Steps:

Track when each page was last used.

When a page is accessed:

If present → Hit, update its timestamp

If not → Fault, and if memory is full, remove the least recently used page

Example Snapshot: (attach your screenshot here – e.g. ![**LRU** Simulation](./screenshots/lru.png))

In code: Uses a Map<number, number> to record each page’s last access index:

if (!frames.includes(page)) {
    fault = true;
    if (frames.length < frameCount) frames.push(page);
    else {
    let lruPage = [...recent.entries()].sort((a, b) => a[1] - b[1])[0][0];
    frames[frames.indexOf(lruPage)] = page;
    }
}
recent.set(page, i);

3️⃣ **OPT** (Optimal Algorithm)

Concept: Replaces the page that will not be used for the longest time in the future. It provides the minimum possible number of page faults.

Working Steps:

When a page fault occurs and memory is full:

For each page in frames, look ahead in the reference string.

Find the one that will be used farthest in the future (or never again).

Replace it.

Example Snapshot: (attach your screenshot here – e.g. ![**OPT** Simulation](./screenshots/opt.png))

In code:

for (const f of frames) {
    const nextUse = refs.slice(i + 1).indexOf(f);
    if (nextUse === -1) { victim = f; break; }
    if (nextUse > farthestIndex) { farthestIndex = nextUse; victim = f; }
}
frames[frames.indexOf(victim!)] = page;

⚙️ Tech Stack

Frontend: React + TypeScript

Styling: Tailwind **CSS**

Visualization: Dynamic rendering of frames and page faults

Logic: Custom simulation functions for **FIFO**, **LRU**, **OPT**

📸 Pictorial Representation

Add sections with your screenshots (these make it visually understandable):

### 🧾 Input Screen

![Input](./screenshots/input.png)

### 📊 FIFO Simulation

![**FIFO**](./screenshots/fifo.png)

### 🔁 LRU Simulation

![**LRU**](./screenshots/lru.png)

### 🔮 OPT Simulation

![**OPT**](./screenshots/opt.png)

🧠 How It Works Internally

Each simulation returns an array of steps, where each step includes:

{
    frames: number[],        // Current memory frame content
    page: number,            // Current page being processed
    fault: boolean,          // Whether it caused a fault
    replacedPage?: number,   // Page replaced (if any)
    explanation: string      // Human-readable explanation
}

The frontend iterates through these steps and visually updates the table/grid — highlighting faults and replacements.

🚀 Run Locally git clone [https://github.com/your-username/page-replacement-visualizer.git](https://github.com/your-username/page-replacement-visualizer.git) cd page-replacement-visualizer npm install npm run dev

Then open [http://localhost:**5173**](http://localhost:**5173**) (or your default dev **URL**).
