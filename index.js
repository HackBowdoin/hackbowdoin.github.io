/* ----------------- Data ----------------- */
const event = {
  name: "Generative AI Hackathon",
  date: "2025-10-14",
  time: "9:00am - 5:00pm",
  start_iso: "2025-10-14T09:00:00-04:00",
  venue: "Barry Mills Hall",
  location: "Bowdoin College, Brunswick, ME",
  format: "In-person, Individuals or teams of up to 4",
  registrationURL: "<a href='https://forms.gle/fZyPN9LfKVio2ZW99' target='_blank' rel='noopener'>https://forms.gle/fZyPN9LfKVio2ZW99</a>",
  registrationCap: "150",
  notes: ["Open to all Bates, Bowdoin, and Colby students!", "Breakfast, lunch, and snacks provided!"]
};

const faqs = [{
  icon: '🤔',
  title: 'What is this about?',
  user: 'What are the goals for this hackathon?',
  ai: 'The primary goal of this hackathon is to give attendees a chance to explore cutting edge generative AI tools in a freeform project-based learning environment.<br><br>There is a <i>lot</i> of debate/fear about what AI can and can\'t do! 😨<br><br>We want you to get an opportunity to form your own opinions about what AI is/isn\'t capable of and how it can realistically be used to empower humanity! 🤔'
}, {
  icon: '📅',
  title: 'What will the schedule be?',
  user: 'What will the hackathon consist of?',
  ai: 'The hackathon will run from 9:00am until 5:00pm on October 14th.<br><br>The day will begin with an opening breakfast followed by a last-minute team formation period.<br><br>The late morning will then proceed with time to work on projects followed by lunch at noon.<br><br>The afternoon will consist of more project work time, workshops, and mentor time ending at 4:00pm.<br><br>At 4:00pm, our walkthrough showcase and judging will begin with awards and the closing ceremony beginning at 4:30pm.'
}, {
  icon: '✏️',
  title: 'How do I sign up?',
  user: 'How can I register for the hackathon?',
  ai: 'You can register for the hackathon by filling out the following form:<br><a href="https://forms.gle/fZyPN9LfKVio2ZW99" target="_blank" rel="noopener">https://forms.gle/fZyPN9LfKVio2ZW99</a><br><br>Our max attendance is 150 students.'
}, {
  icon: '📍',
  title: 'How do I get there?',
  user: 'How do I get to Barry Mills Hall?',
  ai: "<a href='https://maps.app.goo.gl/DsVc4Ur5KpSvWdb88' target='_blank'>Barry Mills Hall</a> is located on the Bowdoin College campus in Brunswick, ME 🌲<br><br>Visitor parking is available nearby in the <a href='https://maps.app.goo.gl/NACu2cY4t6ayRNDq8' target='_blank'>Coffin Street parking lot</a> 🚗<br><br>Public transportation options are also available — the venue is only a 10 minute walk from <a href='https://maps.app.goo.gl/1pzwTa3U3L6jU8W38' target='_blank'>Brunswick Train Station</a> 🚌"
}, {
  icon: '💻',
  title: 'What should I bring?',
  user: 'What should I bring to the hackathon?',
  ai: 'Please bring your laptop, student ID, device chargers, and anything else you may need for a full day of hacking! 💻<br><br>All meals 🍕, drinks ☕, snacks 🍪, and API keys 🔑 will be provided to you at no cost!'
}, {
  icon: '🏆',
  title: 'Are there prizes?',
  user: 'Will I be able to win anything?',
  ai: 'This hackathon is not meant to be a competition so there will not be prizes in the traditional sense.<br><br>However, we hope to recognize the efforts of all attendees with fun mementos and highlight all standout projects.'
}, {
  icon: '❓',
  title: 'What if I have other questions?',
  user: 'Who can I contact if I have more questions?',
  ai: 'Please contact Christopher Martin (<a href="mailto:c.martin@bowdoin.edu">c.martin@bowdoin.edu</a>) if you have any additional questions about the hackathon not covered by my FAQ.'
}];

/* ----------------- Editor rendering ----------------- */
const codeBlock = document.getElementById('codeBlock');

function buildLines() {
  const lines = [];
  lines.push('{');
  lines.push('  "name": "' + event.name + '",');
  lines.push('  "when": { <span class="countdown" id="countdown">calculating</span><span class="caret"></span>');
  lines.push('    "date": "' + event.date + '",');
  lines.push('    "time": "' + event.time + '"');
  lines.push('  },');
  lines.push('  "where": {');
  lines.push('    "venue": "' + event.venue + '", // 2nd floor');
  lines.push('    "location": "' + event.location + '"');
  lines.push('  },');
  lines.push('  "format": "' + event.format + '",');
  lines.push('  "registration": {');
  lines.push('    "url": "' + event.registrationURL + '", // Click me to sign up!');
  lines.push('    "maxAttendance": ' + event.registrationCap);
  lines.push('  },');
  lines.push('  "notes": [');
  event.notes.forEach((n, i) => {
    lines.push('    "' + n + '"' + (i === event.notes.length - 1 ? '' : ','));
  });
  lines.push('  ]');
  lines.push('}');
  return lines;
}

function renderCode() {
  const lines = buildLines();
  const ol = document.createElement('ol');
  ol.className = 'lines';
  
  lines.forEach(raw => {
    const li = document.createElement('li');
    const commentIndex = raw.lastIndexOf('//');
    let codePart = commentIndex === -1 ? raw : raw.slice(0, commentIndex);
    let commentPart = commentIndex === -1 ? '' : raw.slice(commentIndex);

    codePart = codePart.replace(/"([^"]+)"(?=\s*:)/g, '<span class="tok-key">"$1"</span>');
    codePart = codePart.replace(/:\s*"([^"]*)"/g, ': <span class="tok-str">"$1"</span>');
    codePart = codePart.replace(/\b\d+\b(?![^"]*")/g, '<span class="tok-num">$&</span>');
    codePart = codePart.replace(/\b(true|false|null)\b(?![^"]*")/g, '<span class="tok-bool">$1</span>');
    commentPart = commentPart.replace(/(&lt;\/)?\/\/.*$/g, function(m) {
      return '<span class="tok-comment">' + m.replace(/&lt;/g, '<').replace(/&gt;/g, '>') + '</span>';
    });

    li.innerHTML = codePart + commentPart;
    ol.appendChild(li);
  });

  codeBlock.innerHTML = '';
  codeBlock.appendChild(ol);
}

renderCode();
const target = new Date(event.start_iso).getTime();

/* ----------------- Countdown ----------------- */
function getCountdownEl() {
  return document.getElementById('countdown');
}

function updateCountdown() {
  const el = getCountdownEl();
  if (!el) return;

  const now = Date.now();
  let diff = target - now;

  if (diff <= 0) {
    el.innerHTML = '<span class="tok-comment">// The event has started! 🎉</span>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const mins = Math.floor(diff / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  el.innerHTML = '<span class="tok-comment">// Starting in: ' + days + 'd ' + hours + 'h ' + mins + 'm ' + secs + 's</span>';
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ----------------- Agent UI behaviors ----------------- */
const faqList = document.getElementById('faqList');
const bubbles = document.getElementById('bubbles');
const faqToggle = document.getElementById('faqToggle');
const faqWrap = document.querySelector('.faq-wrapper');
const chatAreaEl = document.getElementById('chatArea');

function isHtmlString(s) {
  return typeof s === 'string' && /<[^>]+>/g.test(s);
}

const ALLOWED_TAGS = new Set(['a', 'strong', 'b', 'em', 'i', 'u', 'code', 'br', 'p', 'ul', 'ol', 'li', 'span']);

function sanitizeHref(href) {
  if (!href) return null;

  const cleaned = href.trim();
  if (/^(https?:|mailto:)/i.test(cleaned)) return cleaned;
  
  return null; // disallow javascript: and other protocols
}

function buildSanitizedFragment(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const frag = document.createDocumentFragment();

  function walk(node, parent) {
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(child.nodeValue));
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();
        if (!ALLOWED_TAGS.has(tag)) {
          walk(child, parent);
          return;
        }

        if (tag === 'br') {
          parent.appendChild(document.createElement('br'));
          return;
        }

        const el = document.createElement(tag);
        if (tag === 'a' && child.hasAttribute('href')) {
          const good = sanitizeHref(child.getAttribute('href'));
          if (good) {
            el.setAttribute('href', good);
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener');
          }
        }

        parent.appendChild(el);
        walk(child, el);
      }
    });
  }

  walk(tmp, frag);
  return frag;
}

function actionsFromHTML(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const actions = [];

  function walk(node) {
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.nodeValue || '';
        for (const ch of text) actions.push({
          type: 'char',
          char: ch
        });
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();
        if (!ALLOWED_TAGS.has(tag)) {
          walk(child);
          return;
        }

        if (tag === 'br') {
          actions.push({
            type: 'open',
            tag: 'br',
            attrs: {}
          });

          actions.push({
            type: 'close'
          });
          return;
        }

        const attrs = {};
        if (tag === 'a' && child.hasAttribute('href')) {
          const good = sanitizeHref(child.getAttribute('href'));
          if (good) attrs.href = good;
        }

        actions.push({
          type: 'open',
          tag,
          attrs
        });

        walk(child);

        actions.push({
          type: 'close'
        });
      }
    });
  }

  walk(tmp);
  return actions;
}

function typeHTML(container, html, interval, onDone) {
  const actions = actionsFromHTML(html);
  const stack = [container];
  let i = 0;
  const timer = setInterval(() => {
    if (i >= actions.length) {
      clearInterval(timer);
      if (onDone) onDone();
      return;
    }

    const a = actions[i++];
    if (a.type === 'open') {
      const el = document.createElement(a.tag);
      if (a.attrs && a.attrs.href) {
        el.setAttribute('href', a.attrs.href);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
      stack[stack.length - 1].appendChild(el);
      if (a.tag !== 'br') stack.push(el);
    } else if (a.type === 'char') {
      stack[stack.length - 1].appendChild(document.createTextNode(a.char));
    } else if (a.type === 'close') {
      if (stack.length > 1) stack.pop();
    }
    // Keep chat scrolled while typing
    try {
      chatAreaEl.scrollTop = chatAreaEl.scrollHeight;
    } catch (e) {}
  }, interval);
  return timer;
}

function scrollChatToBottom(padding = 0, smooth = true) {
  try {
    const c = chatAreaEl;
    if (!c) return;
    const target = c.scrollHeight;
    c.scrollTo({
      top: target,
      behavior: smooth ? 'smooth' : 'auto'
    });
  } catch (e) {}
};

function openFaq() {
  faqList.removeAttribute('hidden');
  faqToggle.classList.add('open');
  faqToggle.setAttribute('aria-expanded', 'true');
}

function closeFaq() {
  faqList.setAttribute('hidden', '');
  faqToggle.classList.remove('open');
  faqToggle.setAttribute('aria-expanded', 'false');
}

closeFaq();

faqToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const hidden = faqList.hasAttribute('hidden');
  if (hidden) openFaq();
  else closeFaq();
});

document.addEventListener('click', (e) => {
  if (!faqWrap.contains(e.target)) closeFaq();
});

faqs.forEach((f, idx) => {
  const btn = document.createElement('button');
  btn.className = 'faq-btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.type = 'button';
  btn.innerHTML = '<div class="faq-icon">' + f.icon + '</div><div style="color:var(--text);flex:1;text-align:left"><strong>' + f.title + '</strong><div style="font-size:12px;color:var(--muted)">' + f.user + '</div></div>';
  
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    
    if (isHtmlString(f.user)) userMsg.innerHTML = f.user;
    else userMsg.textContent = f.user;
    
    bubbles.appendChild(userMsg);
    requestAnimationFrame(() => scrollChatToBottom(120, true));
    
    // AI typing indicator
    const aiMsg = document.createElement('div');
    aiMsg.className = 'msg ai';
    const dots = document.createElement('div');
    dots.className = 'typing-dots';
    dots.innerHTML = '<span></span><span></span><span></span>';
    aiMsg.appendChild(dots);
    bubbles.appendChild(aiMsg);
    
    requestAnimationFrame(() => scrollChatToBottom(120, true));
    
    const typingDelay = 700 + idx * 200;
    setTimeout(() => {
      aiMsg.innerHTML = '';
      const out = document.createElement('div');
      out.className = 'ai-text';
      aiMsg.appendChild(out);
      const content = f.ai;
      if (isHtmlString(content)) {
        const interval = Math.max(6, Math.floor(900 / Math.max(20, content.replace(/<[^>]+>/g, '').length)));
        typeHTML(out, content, interval, () => {
          scrollChatToBottom(140, true);
        });
      } else {
        const text = content;
        let i = 0;
        const interval = Math.max(6, Math.floor(900 / Math.max(20, text.length)));
        const typer = setInterval(() => {
          out.textContent = text.slice(0, i + 1);
          i++;
          // Keep latest in view while typing
          scrollChatToBottom(120, false);
          if (i >= text.length) {
            clearInterval(typer); // Ensure final scroll reserves room for the + button
            scrollChatToBottom(140, true);
          }
        }, interval);
      }
    }, typingDelay);
    closeFaq();
  });
  faqList.appendChild(btn);
});

/* ----------------- Theme toggle ----------------- */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const sun = themeToggle.querySelector('.sun');
const moon = themeToggle.querySelector('.moon');
try {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') {
    body.classList.add('dark');
    sun.style.display = 'block';
    moon.style.display = 'none';
  }
} catch (e) {}

themeToggle.addEventListener('click', () => {
  const dark = body.classList.toggle('dark');
  if (dark) {
    sun.style.display = 'block';
    moon.style.display = 'none';
  } else {
    sun.style.display = 'none';
    moon.style.display = 'block';
  }

  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch (e) {}
});

/* ----------------- Height sync ----------------- */
(function() {
  function syncHeightsExact() {
    try {
      const editor = document.getElementById('editorPanel');
      const preEl = document.getElementById('codeBlock');
      const agent = document.getElementById('agentPanel');
      const chat = document.getElementById('chatArea');
      const frame = document.getElementById('workspace');

      if (!editor || !preEl || !agent || !chat || !frame) return;

      const preRect = preEl.getBoundingClientRect();
      const preH = Math.round(preRect.height);

      // Small safety fallback to the editor total height
      const editorRect = editor.getBoundingClientRect();
      const edH = Math.round(editorRect.height);
      const usedHeight = Math.max(preH, Math.min(edH, preH + 60));

      // Responsive behaviour: on small screens, don't lock heights — allow natural flow.
      const mobileBreakpoint = 720; // px
      if (window.innerWidth <= mobileBreakpoint) {
        frame.style.maxHeight = '';
        agent.style.height = '';
        agent.style.maxHeight = '';
        chat.style.height = '';
        chat.style.maxHeight = '';
        return;
      }

      const framePadding = 20; // px
      frame.style.maxHeight = (usedHeight + framePadding) + 'px';

      // Set the agent (aside) to exactly match the pre height so they align
      agent.style.height = usedHeight + 'px';
      agent.style.maxHeight = usedHeight + 'px';

      // Compute available height for chat content inside agent (subtract header and inner paddings)
      const header = agent.querySelector('.header');
      const headerH = header ? Math.round(header.getBoundingClientRect().height) : 56;
      const internalPad = 32; // internal paddings/margins inside agent
      const avail = Math.max(120, Math.round(usedHeight - headerH - internalPad));
      chat.style.height = avail + 'px';
      chat.style.maxHeight = avail + 'px';
    } catch (e) {
      /* ignore measurement errors */
    }
  }

  window.addEventListener('resize', syncHeightsExact);
  window.addEventListener('load', syncHeightsExact);
  document.addEventListener('DOMContentLoaded', syncHeightsExact);
  // Also run after a short delay to account for web fonts/layout shifts
  setTimeout(syncHeightsExact, 200);
})();