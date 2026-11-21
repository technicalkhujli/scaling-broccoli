"use client";

import { useMemo, useState } from "react";

const tools = [
  { name: "Content Ideas", desc: "Find fresh ideas for your next post or video.", icon: "✦", group: "Plan" },
  { name: "AI Script Writer", desc: "Turn a topic into a structured video script.", icon: "▤", group: "Create" },
  { name: "Story Generator", desc: "Build an engaging story around your topic.", icon: "◈", group: "Create" },
  { name: "Hook Generator", desc: "Write scroll-stopping opening lines.", icon: "⚡", group: "Create" },
  { name: "Title Generator", desc: "Create clickable titles for your content.", icon: "T", group: "Polish" },
  { name: "Description Generator", desc: "Draft clear descriptions for your uploads.", icon: "≡", group: "Polish" },
  { name: "Caption Generator", desc: "Create captions for social posts and reels.", icon: "❞", group: "Polish" },
  { name: "Hashtag Generator", desc: "Get relevant hashtag ideas for your niche.", icon: "#", group: "Polish" },
  { name: "Content Repurposer", desc: "Adapt one idea for different platforms.", icon: "⤴", group: "Repurpose" },
  { name: "Video Outline", desc: "Plan scenes and talking points in order.", icon: "▣", group: "Plan" },
  { name: "Thumbnail Text", desc: "Find short, bold thumbnail wording.", icon: "▧", group: "Polish" },
  { name: "Content Calendar", desc: "Make a simple weekly publishing plan.", icon: "▦", group: "Plan" },
];

function makeOutput(tool: string, topic: string, platform: string, tone: string) {
  const subject = topic.trim() || "your next big idea";
  const channel = platform || "YouTube";
  const style = tone || "Engaging";
  const outputs: Record<string, string> = {
    "Content Ideas": `CONTENT IDEAS: ${subject}\n\n1. The beginner's guide to ${subject}\n2. 5 mistakes people make with ${subject}\n3. What nobody tells you about ${subject}\n4. ${subject}: myths vs. facts\n5. A simple 7-day challenge around ${subject}\n6. Before and after: what changes when you try ${subject}\n7. The future of ${subject}\n\nTip: Choose the idea that best matches your audience's biggest question.`,
    "AI Script Writer": `VIDEO SCRIPT — ${subject}\nPlatform: ${channel} | Tone: ${style}\n\n[HOOK — 0:00]\nHave you ever wondered how ${subject} could change the way you do things? Stay with me.\n\n[INTRO]\nToday, we're breaking down ${subject} in a simple, practical way.\n\n[MAIN POINTS]\n1. Start with the most important thing to understand.\n2. Show a practical example your audience can relate to.\n3. Share one common mistake and how to avoid it.\n\n[ENDING / CTA]\nWhat do you think? Share your thoughts and follow for more useful content.`,
    "Story Generator": `STORY: THE TURNING POINT\n\nIt started with a simple question about ${subject}. At first, the challenge seemed bigger than expected. Every attempt revealed something new, and a small breakthrough changed everything.\n\nBy the end, the lesson was clear: progress comes from staying curious, taking action, and learning as you go.\n\nClosing thought: Sometimes the smallest step creates the biggest change.`,
    "Hook Generator": `HOOK IDEAS FOR: ${subject}\n\n1. “You're probably overlooking this about ${subject}.”\n2. “I wish I knew this before I started.”\n3. “Stop scrolling if you want to understand ${subject}.”\n4. “Here are 3 things that make all the difference.”\n5. “The truth about ${subject} is simpler than you think.”`,
    "Title Generator": `TITLE IDEAS\n\n1. ${subject}: The Complete Beginner's Guide\n2. 7 Things You Need to Know About ${subject}\n3. I Tried ${subject} — Here's What Happened\n4. The Truth About ${subject}\n5. How to Get Better at ${subject} (Step by Step)`,
    "Description Generator": `Discover a practical look at ${subject}. In this ${channel} video, we'll cover the key points, useful examples, and simple tips to help you get started.\n\nIf you found this helpful, like, share, and follow for more ${style.toLowerCase()} content.\n\n#${subject.replace(/[^a-z0-9]/gi, "")} #Tips #Learn`,
    "Caption Generator": `A fresh perspective on ${subject} ✨\n\nSmall steps, useful insights, and ideas worth sharing. Save this post for later and tell us what you think!\n\n#ContentCreator #DailyInspiration`,
    "Hashtag Generator": `#${subject.replace(/[^a-z0-9]/gi, "")} #ContentCreation #CreatorTips #LearnSomethingNew #DailyContent #Inspiration #HowTo #SocialMedia #NewIdeas #Explore`,
    "Content Repurposer": `REPURPOSED CONTENT: ${subject}\n\nYOUTUBE: Create a 3–5 minute explainer with examples.\n\nINSTAGRAM REEL: Share one surprising fact in a 20–30 second clip.\n\nTIKTOK: Open with a question, then give one quick actionable tip.\n\nLINKEDIN: Turn the key lesson into a short professional insight.\n\nFACEBOOK: Ask your community a question and invite discussion.`,
    "Video Outline": `VIDEO OUTLINE: ${subject}\n\n1. Opening hook — Ask a question or reveal a surprising fact.\n2. Context — Explain why the topic matters.\n3. Main point one — Introduce the basics.\n4. Main point two — Give a practical example.\n5. Main point three — Share a useful tip.\n6. Summary — Recap the key takeaway.\n7. Call to action — Invite viewers to comment or follow.`,
    "Thumbnail Text": `THUMBNAIL TEXT OPTIONS\n\n• THE REAL TRUTH\n• DON'T MISS THIS\n• ${subject.toUpperCase()} EXPLAINED\n• 5 THINGS TO KNOW\n• START HERE\n\nKeep thumbnail wording short, readable, and focused on one promise.`,
    "Content Calendar": `7-DAY CONTENT PLAN: ${subject}\n\nMON — Beginner tip / educational post\nTUE — Common mistake / short reel\nWED — Quick tutorial / carousel\nTHU — Myth vs. fact / short video\nFRI — Personal insight / story post\nSAT — Audience question / community post\nSUN — Weekly recap / best tip\n\nAdjust the schedule to your posting capacity.`,
  };
  return outputs[tool] || outputs["Content Ideas"];
}

export default function Home() {
  const [activeTool, setActiveTool] = useState("Content Ideas");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [tone, setTone] = useState("Engaging");
  const [output, setOutput] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("Choose a tool and enter your topic to get started.");

  const visibleTools = useMemo(() => tools.filter((tool) =>
    `${tool.name} ${tool.desc} ${tool.group}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  function generate() {
    if (!topic.trim()) {
      setNotice("Please enter a topic first.");
      return;
    }
    setOutput(makeOutput(activeTool, topic, platform, tone));
    setNotice("Demo output created. Connect an AI API to enable real AI generation.");
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setNotice("Copied to clipboard.");
    } catch {
      setNotice("Copy is not available in this browser. Select the output text manually.");
    }
  }

  function saveOutput() {
    if (!output) return;
    setSaved((items) => [output, ...items].slice(0, 5));
    setNotice("Saved in this session's workspace.");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home"><span className="brand-mark">U</span><span>uti<span className="brand-accent">fix</span><b> LAB</b></span></a>
        <nav><a href="#suite">Creator suite</a><a href="#workspace">Workspace</a></nav>
        <a className="top-cta" href="#suite">Start creating <span>↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy-block">
          <div className="eyebrow"><i /> CONTENT CREATOR SUITE <span className="version">V1.0</span></div>
          <h1>Your ideas.<br /><em>Made content.</em></h1>
          <p>Plan, write, polish, and repurpose content — all from one simple workspace.</p>
          <a className="primary-button" href="#suite">Explore creator tools <span>→</span></a>
          <div className="hero-points"><span>✦ 12 creator tools</span><span>✦ One connected workflow</span><span>✦ Free to start</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="visual-ring ring-one"/><div className="visual-ring ring-two"/>
          <div className="visual-card visual-main"><div className="visual-top"><span className="mini-dot"/><span>YOUR CREATOR WORKSPACE</span><b>•••</b></div><div className="visual-spark">✦</div><strong>One idea.<br/>Many possibilities.</strong><div className="visual-bars"><i/><i/><i/></div><small>PLAN&nbsp; · &nbsp;CREATE&nbsp; · &nbsp;PUBLISH</small></div>
          <div className="float-chip chip-a">✎ Script</div><div className="float-chip chip-b"># Hashtags</div><div className="float-chip chip-c">▣ Video plan</div>
        </div>
      </section>

      <section className="stats-row"><div><b>12</b><span>Creator tools</span></div><div><b>04</b><span>Workflow stages</span></div><div><b>01</b><span>Connected workspace</span></div><div><b>∞</b><span>Ideas to explore</span></div></section>

      <section className="suite-section" id="suite">
        <div className="section-intro"><div><div className="eyebrow blue">THE CREATOR TOOLKIT</div><h2>Everything starts<br/><em>with an idea.</em></h2><p>Pick a tool, add your topic, and build your next piece of content.</p></div><div className="tool-total"><b>12</b><span>TOOLS<br/>AVAILABLE</span></div></div>
        <label className="search-field"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search creator tools..."/><kbd>⌕</kbd></label>
        <div className="tool-layout">
          <aside className="tool-sidebar"><div className="sidebar-label">WORKFLOW</div>{["Plan", "Create", "Polish", "Repurpose"].map((group, index) => <div className="workflow-step" key={group}><span className="step-num">0{index + 1}</span><span>{group}</span></div>)}<div className="sidebar-note"><span>✦</span><b>Creator tip</b><p>Start with one clear topic. Reuse your output across multiple tools.</p></div></aside>
          <div className="tool-grid">{visibleTools.map((tool) => <button key={tool.name} className={`tool-card ${activeTool === tool.name ? "selected" : ""}`} onClick={() => {setActiveTool(tool.name); setOutput(""); setNotice(`${tool.name} selected. Add a topic below.`);}}><span className="tool-icon">{tool.icon}</span><span className="tool-group">{tool.group}</span><strong>{tool.name}</strong><small>{tool.desc}</small><span className="tool-open">Open tool <b>↗</b></span></button>)}</div>
        </div>
      </section>

      <section className="workbench" id="workspace">
        <div className="workbench-heading"><div><div className="eyebrow blue">YOUR WORKSPACE</div><h2>Let's make something <em>great.</em></h2><p>Selected tool: <b>{activeTool}</b></p></div><span className="demo-pill"><i/> DEMO MODE</span></div>
        <div className="workspace-grid">
          <div className="input-panel"><div className="panel-heading"><span>01</span><b>CONTENT BRIEF</b></div><label>What's your topic or idea?</label><textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. 5 simple habits for a productive morning..." rows={5}/><div className="field-row"><div><label>Platform</label><select value={platform} onChange={(e) => setPlatform(e.target.value)}><option>YouTube</option><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>LinkedIn</option></select></div><div><label>Tone</label><select value={tone} onChange={(e) => setTone(e.target.value)}><option>Engaging</option><option>Professional</option><option>Friendly</option><option>Funny</option><option>Educational</option></select></div></div><button className="generate-button" onClick={generate}>Generate content <span>✦</span></button><p className="status-line">{notice}</p></div>
          <div className="output-panel"><div className="panel-heading"><span>02</span><b>YOUR OUTPUT</b><div className="output-actions"><button onClick={copyOutput} disabled={!output}>Copy</button><button onClick={saveOutput} disabled={!output}>Save</button></div></div>{output ? <pre className="output-text">{output}</pre> : <div className="output-empty"><div>✧</div><b>Your content will appear here</b><p>Enter a topic and select Generate content to see your result.</p></div>}</div>
        </div>
        <div className="saved-strip"><div><b>My Workspace</b><span>{saved.length} saved in this session</span></div>{saved.length ? <div className="saved-items">{saved.map((item, i) => <button key={i} onClick={() => setOutput(item)}>Saved output {saved.length - i} ↗</button>)}</div> : <small>Your saved outputs will appear here.</small>}</div>
      </section>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">U</span><span>uti<span className="brand-accent">fix</span><b> LAB</b></span></a><p>Free. Fast. Easy. Solved.</p><span>© {new Date().getFullYear()} Utifix Lab · Creator Suite v1.0</span></footer>
    </main>
  );
}
