// Use the host environment's global React (18.2.0) directly so JSX elements share the exact $$typeof symbol
import React, { useState, useEffect, useMemo, useRef } from 'react';

// ============================================================================
// INLINE SVG ICON SET (Self-contained to avoid external React version conflicts)
// ============================================================================

const createIcon = (children) => {
  const IconComponent = ({ className = 'w-4 h-4', ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
  return IconComponent;
};

const BookOpen = createIcon(
  <>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </>
);
const Upload = createIcon(
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </>
);
const Plus = createIcon(
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>
);
const CheckCircle2 = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>
);
const XCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </>
);
const HelpCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </>
);
const Bookmark = createIcon(<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />);
const Search = createIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>
);
const ChevronRight = createIcon(<polyline points="9 18 15 12 9 6" />);
const ChevronDown = createIcon(<polyline points="6 9 12 15 18 9" />);
const ChevronLeft = createIcon(<polyline points="15 18 9 12 15 6" />);
const RotateCcw = createIcon(
  <>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </>
);
const FileText = createIcon(
  <>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </>
);
const Trash2 = createIcon(
  <>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </>
);
const Download = createIcon(
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </>
);
const Play = createIcon(<polygon points="5 3 19 12 5 21 5 3" />);
const Award = createIcon(
  <>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </>
);
const Clock = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
);
const Shuffle = createIcon(
  <>
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </>
);
const Moon = createIcon(<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />);
const Sun = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </>
);
const Menu = createIcon(
  <>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </>
);
const X = createIcon(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>
);
const Layers = createIcon(
  <>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </>
);
const Sparkles = createIcon(
  <>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M3 5h4" />
    <path d="M19 17v4" />
    <path d="M17 19h4" />
  </>
);
const Copy = createIcon(
  <>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </>
);
const Check = createIcon(<polyline points="20 6 9 17 4 12" />);
const AlertCircle = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </>
);
const FolderPlus = createIcon(
  <>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    <line x1="12" y1="10" x2="12" y2="16" />
    <line x1="9" y1="13" x2="15" y2="13" />
  </>
);
const Terminal = createIcon(
  <>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </>
);
const Database = createIcon(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </>
);
const Cpu = createIcon(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </>
);
const Code2 = createIcon(
  <>
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </>
);
const BarChart3 = createIcon(
  <>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </>
);
const Flag = createIcon(
  <>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </>
);
const Lock = createIcon(
  <>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>
);
const Unlock = createIcon(
  <>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </>
);
const Flame = createIcon(
  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
);
const EyeOff = createIcon(
  <>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </>
);
const Maximize2 = createIcon(
  <>
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </>
);
const Minimize2 = createIcon(
  <>
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </>
);
const Edit3 = createIcon(
  <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </>
);

// ============================================================================
// SAFE CLIPBOARD HELPER (Works inside sandboxed iframes & strict browsers)
// ============================================================================

async function copyTextToClipboard(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_err) {
      // Fallback below when Clipboard API is blocked by Permissions-Policy
    }
  }
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textArea);
    return copied;
  } catch (_fallbackErr) {
    return false;
  }
}

// ============================================================================
// INITIAL C-DAC PG-DBDA SYLLABUS & SAMPLE QUESTIONS
// ============================================================================

const FENCE = '`'.repeat(3);

const DEFAULT_ADMIN_PIN = 'banglorecdac2026';

const DIFFICULTY_META = {
  easy: {
    label: 'Easy',
    badgeDark: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    badgeLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500'
  },
  moderate: {
    label: 'Moderate',
    badgeDark: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    badgeLight: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500'
  },
  hard: {
    label: 'Hard',
    badgeDark: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    badgeLight: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500'
  }
};

const INITIAL_DATA = {
  "courseTitle": "C-DAC PG-DBDA Practice Portal",
  "modules": [
    {
      "id": "mod-1794831214262",
      "title": "Linux",
      "shortCode": "LNX",
      "icon": "Layers",
      "topics": [
        {
          "id": "top-1794831229482-0-z6n",
          "title": "Section 1: Linux Evolution, Architecture, and Boot Process"
        },
        {
          "id": "top-1794831229482-33-mh3",
          "title": "Section 2: AlmaLinux Installation and Post-Install Configuration"
        },
        {
          "id": "top-1794831229482-66-9rd",
          "title": "Section 3: Ubuntu 24.04 LTS Installation and Disk Setup"
        },
        {
          "id": "top-1794831229482-93-8k4",
          "title": "Section 4: Linux File, Process, and System Management Commands"
        },
        {
          "id": "top-1794831229482-129-8ru",
          "title": "Section 5: Linux Permissions, Networking, and Hardware Utilities"
        },
        {
          "id": "top-1794831229482-162-sin",
          "title": "Section 6: Linux Text Editors: Vi, Vim, and Nano"
        },
        {
          "id": "top-1794831229482-190-dl8",
          "title": "Section 7: Vi Editor Advanced Navigation and Commands"
        }
      ]
    },
    {
      "id": "mod-1794831438813",
      "title": "Cloud Computing",
      "shortCode": "CC",
      "icon": "Layers",
      "topics": [
        {
          "id": "top-1794831438813-1",
          "title": "General Practice"
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "q-imp-1794831225794-0-wteg",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In which year did Linus Torvalds start developing Linux, and when was Kernel 1.0 released under the GPL license?",
      "options": [
        "Started in 1985; Kernel 1.0 released in 1991",
        "Started in 1990; Kernel 1.0 released in 1994",
        "Started in 1972; Kernel 1.0 released in 1989",
        "Started in 1994; Kernel 1.0 released in 2004"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Linus Torvalds began developing Linux in 1990 and released Linux Kernel 1.0 under the GPL license in 1994."
    },
    {
      "id": "q-imp-1794831225794-1-4042",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In the Linux OS architecture, the ______ acts as a bridge between user applications and physical hardware by managing memory, processes, file systems, and device drivers.",
      "options": [
        "Shell",
        "System Call Interface (SCI)",
        "Kernel",
        "GNU Compiler Collection"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The monolithic Linux kernel sits directly above the hardware layer and manages core system resources for applications."
    },
    {
      "id": "q-imp-1794831225794-2-dasb",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "Which of the following statements about Linux filesystems is INCORRECT?",
      "options": [
        "`ext4` supports a maximum volume size of 1 EB and online grow functionality.",
        "Both `JFS` and `ext4` support metadata-only journaling.",
        "`ext2` natively supports metadata-only journaling, checksums, and online grow.",
        "`ext`, `ext2`, `JFS`, and `ext4` all support a maximum filename length of 255 bytes."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Unlike `ext4` and `JFS`, `ext2` is a non-journaling filesystem and does not support metadata-only journaling, checksums, or online grow."
    },
    {
      "id": "q-imp-1794831225794-3-t7a4",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Which sequence accurately represents the Linux boot process from power-on to user login?",
      "options": [
        "GRUB2 Bootloader -> BIOS/UEFI POST -> `systemd` (PID 1) -> Kernel (`initramfs`) -> Runlevel/Target",
        "BIOS/UEFI POST -> MBR/GPT & GRUB2 Bootloader -> Kernel (`initramfs`) -> `systemd` (PID 1) -> Runlevel/Target",
        "MBR/GPT -> Kernel (`initramfs`) -> BIOS/UEFI POST -> GRUB2 Bootloader -> `systemd` (PID 1)",
        "BIOS/UEFI POST -> Kernel (`initramfs`) -> MBR/GPT & GRUB2 Bootloader -> Runlevel/Target -> `systemd` (PID 1)"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** During startup, BIOS/UEFI performs POST and locates MBR/GPT to load GRUB2, which loads the kernel and `initramfs` before starting `systemd` (PID 1) and target services."
    },
    {
      "id": "q-imp-1794831225794-4-63a1",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In 1972, Ken Thompson and Dennis Ritchie rewrote the Unix operating system using which programming language?",
      "options": [
        "Assembly",
        "C",
        "Fortran",
        "Pascal"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Thompson and Ritchie rewrote Unix in C in 1972, giving Unix and its descendants high portability across hardware platforms."
    },
    {
      "id": "q-imp-1794831225794-5-65us",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In the Linux OS architecture, ______ such as `glibc` provide functions that allow user-space applications to invoke kernel features without needing low-level system call instructions.",
      "options": [
        "Device Drivers",
        "Bootloaders",
        "System Libraries",
        "Runlevel Targets"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** System libraries (`glibc`) sit between user applications and the System Call Interface to simplify kernel service requests."
    },
    {
      "id": "q-imp-1794831225794-6-avgs",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "Which of the following Unix/Linux lineage relationships is documented in the Linux Evolution presentation?",
      "options": [
        "Solaris was developed by IBM, while AIX was developed by HP.",
        "NeXT OS led to macOS, while Minix inspired the creation of Linux.",
        "Linux uses a microkernel design and lacks Symmetric Multi-Processing (SMP) support.",
        "Linux powers approximately 50% of the world's top 500 supercomputers."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The evolution slides trace macOS back to BSD/NeXT OS and Linux to Minix, while noting Linux uses a monolithic kernel with SMP support and powers 100% of TOP500 supercomputers."
    },
    {
      "id": "q-imp-1794831225794-7-rqv3",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux shutdown, reboot, and boot components is INCORRECT?",
      "options": [
        "`init 0` shuts down the system, whereas `init 6` reboots the system.",
        "`shutdown -h +15` schedules a system halt 15 minutes from now.",
        "BIOS firmware reads the Master Boot Record (MBR), whereas UEFI firmware uses GPT.",
        "The `systemd` init process is assigned PID 0 and executes before GRUB2 loads the kernel."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `systemd` is started by the kernel after GRUB2 loads it into memory and is always assigned PID 1, not PID 0."
    },
    {
      "id": "q-imp-1794831225794-8-lypf",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "Which software license governs the GNU Project and was adopted by the Linux kernel?",
      "options": [
        "MIT License",
        "Apache License 2.0",
        "General Public License (GPL)",
        "BSD 3-Clause License"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The GNU General Public License (GPL) provides free software freedoms and governs both GNU tools and the Linux kernel."
    },
    {
      "id": "q-imp-1794831225794-9-mumj",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In the Linux OS architecture, user-space applications request low-level services from the kernel (such as opening files or creating processes) through the ______.",
      "options": [
        "Bootloader Stage 2",
        "System Call Interface (SCI)",
        "Master Boot Record (MBR)",
        "VirtualBox Hypervisor"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The System Call Interface (SCI) serves as the controlled boundary allowing user-space applications to invoke kernel services."
    },
    {
      "id": "q-imp-1794831225794-10-ptcp",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "Which of the following Linux shell and OS characteristic statements is INCORRECT?",
      "options": [
        "Common Linux shells include BASH, Bourne Sh, C Shell, Korn sh, Z Shell, and Fish.",
        "The bare minimum hardware noted for Linux is 1 GB RAM, 10 GB HDD, and a 16-bit processor.",
        "Linux requires a proprietary graphical desktop environment to operate and cannot function purely via CLI.",
        "Linux combines the Linux kernel with GNU applications, tools, and libraries maintained by FOSS."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Linux supports both CLI and GUI interfaces and can run entirely without a graphical environment, especially on servers and embedded systems."
    },
    {
      "id": "q-imp-1794831225794-11-dgx3",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Compare the `JFS` and `ext4` filesystems based on the FileSystem Comparison table in the Linux Evolution presentation. Which statement is CORRECT?",
      "options": [
        "`ext4` supports a larger maximum file size (4 PB) than `JFS` (16 TB).",
        "`JFS` supports a maximum volume size of 32 PB, whereas `ext4` supports a maximum volume size of 1 EB and features online grow.",
        "Both `JFS` and `ext4` natively support filesystem compression and full production encryption.",
        "Neither `JFS` nor `ext4` supports metadata-only journaling."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the comparison table, `JFS` supports 4 PB max file size and 32 PB volume size without online grow, while `ext4` supports 16 TB max file size, 1 EB max volume size, and online grow."
    },
    {
      "id": "q-imp-1794831225794-12-o8md",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "Which statement best describes the relationship between the Linux kernel and GNU in a standard Linux distribution?",
      "options": [
        "GNU provides the monolithic kernel, while Linux provides the text editors and compilers.",
        "Linux provides the kernel, while GNU provides the user-space applications, tools, and libraries.",
        "Both Linux and GNU are proprietary components licensed exclusively by IBM and Red Hat.",
        "GNU replaces the BIOS/UEFI firmware during hardware initialization."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As outlined in the Linux with GNU architecture slides, Linux supplies the kernel while GNU supplies the user-space tools, libraries, and utilities."
    },
    {
      "id": "q-imp-1794831225794-13-hpmi",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In the Linux filesystem hierarchy, which top-level directory contains essential system administration binaries intended primarily for root/system maintenance?",
      "options": [
        "`/home`",
        "`/sbin`",
        "`/tmp`",
        "`/media`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the Linux filesystem directory diagram, `/sbin` holds system binaries used for administrative tasks, alongside `/bin` for user binaries."
    },
    {
      "id": "q-imp-1794831225794-14-0cla",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "Which of the following Linux timeline milestones and OS facts is INCORRECT?",
      "options": [
        "In 2005, Git version control was introduced in the Linux ecosystem.",
        "Major hardware vendors such as IBM and Dell adopted Linux in enterprise offerings.",
        "Linux scalability spans processor counts, users, memory, and I/O from smartwatches to supercomputers.",
        "Linux relies on a hybrid microkernel where device drivers run strictly outside kernel space."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** The Linux Architecture slides explicitly state that Linux uses a monolithic kernel that includes device drivers and file systems inside kernel space."
    },
    {
      "id": "q-imp-1794831225794-15-phqe",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Examine the Linux boot sequence diagram from Power ON/Restart:\n\n```text\n\nSystem Startup/Hardware initialization -> Boot loader Stage 1 -> Boot loader Stage 2 -> Kernel -> INIT process -> User prompt\n```\n\nWhich pairing correctly maps each stage to its corresponding component shown in the diagram?",
      "options": [
        "Boot loader Stage 1: GRUB Boot loader; Boot loader Stage 2: MBR loading",
        "Boot loader Stage 1: MBR loading; Boot loader Stage 2: GRUB Boot loader",
        "Kernel: Run levels; INIT process: User commands",
        "System Startup: Linux OS; Kernel: BIOS/System start"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the Linux boot process diagram, Boot loader Stage 1 corresponds to MBR loading, Boot loader Stage 2 corresponds to the GRUB Boot loader, and INIT maps to Run levels."
    },
    {
      "id": "q-imp-1794831225794-16-9gfr",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "Which statement best describes the origins and distribution model of Linux?",
      "options": [
        "Linux is a proprietary operating system developed exclusively for mainframes with fewer than 10 distributions.",
        "Linux has its roots in Unix, uses an open-source model with over 500 distributions, and co-exists with other operating systems.",
        "Linux was written in 1972 by Ken Thompson and Dennis Ritchie under a closed commercial license.",
        "Linux only runs on x86 desktop computers and cannot run on embedded devices or watches."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Linux evolved from Unix principles into an open-source ecosystem with 500+ distributions spanning embedded devices to supercomputers[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-17-26vv",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In the Linux filesystem hierarchy, which top-level directory holds system configuration files (such as network and user configuration files)?",
      "options": [
        "`/dev`",
        "`/etc`",
        "`/proc`",
        "`/mnt`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As depicted in the Linux Filesystem hierarchy diagram, `/etc` stores host-specific system configuration files, whereas `/dev` holds device files[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-18-etzv",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "Which of the following Linux filesystem comparison entries from the presentation is INCORRECT?",
      "options": [
        "The original `ext` filesystem had a maximum file size and volume size of 2 GB.",
        "`Xiafs` had a maximum filename length of 248 bytes and a maximum file size of 64 MB.",
        "`ext4` supports native transparent compression and full production encryption out of the box.",
        "`ext4` supports partial checksums and experimental encryption."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** According to the FileSystem Comparison table, `ext4` has `No` for compression, `Partial` for checksum, and `Yes - experimental` for encryption[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-19-iwn3",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Consider the following shutdown and reboot commands executed by a Linux administrator:\n\n```bash\nshutdown -r now\nhalt\n```\n\nWhat is the exact behavior of each command?",
      "options": [
        "Both commands immediately power off the machine without rebooting.",
        "`shutdown -r now` immediately reboots the system, whereas `halt` shuts down (halts) the system.",
        "`shutdown -r now` schedules a halt in 15 minutes, whereas `halt` restarts the init process at runlevel 6.",
        "Both commands only log out the current user session while leaving all background services running."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As listed under Reboot/Shutdown in the Linux Evolution slides, `shutdown -r now` triggers an immediate reboot while `halt` (alongside `poweroff` and `init 0`) shuts down the system[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-20-pnmu",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "Which statement best describes the licensing and community structure of Linux with GNU?",
      "options": [
        "Linux with GNU is maintained by a single proprietary vendor and cannot be redistributed.",
        "Linux with GNU is maintained by FOSS (Free and Open Source Software), combining the Linux kernel with GNU applications, tools, and libraries.",
        "GNU provides the bootloader firmware, while Linux provides only the graphical desktop environment.",
        "GPL prohibits modifying or sharing the source code of Linux distributions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As detailed in the Linux Evolution presentation, FOSS maintains the GNU/Linux ecosystem under the GPL license, pairing the Linux kernel with GNU tools and libraries[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-21-bok9",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "In the Linux filesystem hierarchy, which top-level directory serves as the mount point for removable storage media (such as USB drives or CD-ROMs)?",
      "options": [
        "`/proc`",
        "`/media`",
        "`/sys`",
        "`/srv`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the Linux Filesystem hierarchy diagram, `/media` is designated for mounting removable media devices, while `/proc` and `/sys` expose virtual kernel/system interfaces[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-22-lesm",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "Which of the following statements regarding Linux disadvantages and distribution selection is INCORRECT?",
      "options": [
        "Because over 500 distributions exist, choosing one depends on application needs, hardware support, and user experience.",
        "Enterprise support for certain commercial Linux distributions requires a paid subscription.",
        "New users migrating from Windows may face a learning curve due to command names, paths, and application compatibility differences.",
        "Linux distributions never become outdated, and every legacy Linux application receives guaranteed perpetual vendor updates."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** The \"Linux - disadvantages\" slide explicitly notes that distributions can become outdated, some applications become obsolete with no further development, and official support often requires a subscription[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-23-6x89",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Consider the following shutdown commands from the Linux Evolution presentation:\n\n```bash\nshutdown -h now\nshutdown -h +15\n```\n\nHow do these two commands differ in execution?",
      "options": [
        "`shutdown -h now` reboots immediately, whereas `shutdown -h +15` powers off immediately.",
        "`shutdown -h now` halts/shuts down the system immediately, whereas `shutdown -h +15` schedules a system halt in 15 minutes.",
        "`shutdown -h now` halts only user-space processes, whereas `shutdown -h +15` halts the kernel 15 times.",
        "Both commands put the machine into sleep mode after 15 seconds."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Under the Reboot/Shutdown section, `shutdown -h now` initiates an immediate halt, whereas `+15` delays the halt by 15 minutes[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-24-l023",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "Which commercial Unix variant was developed by Hewlett-Packard (HP), as listed in the Linux Evolution presentation?",
      "options": [
        "Solaris",
        "AIX",
        "HP-UX",
        "NeXT OS"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The Unix variants slide maps HP-UX to HP, Solaris to Sun Microsystems (Oracle), and AIX to IBM[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-25-8jmd",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "In the Linux filesystem hierarchy, the ______ directory stores transient runtime data, process IDs, and system logs, whereas ______ holds optional third-party application packages.",
      "options": [
        "`/boot`; `/dev`",
        "`/var`; `/opt`",
        "`/etc`; `/proc`",
        "`/sbin`; `/mnt`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Under the Linux filesystem tree, `/var` contains variable data such as `/var/log`, `/var/cache`, and `/var/spool`, while `/opt` holds add-on application software[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-26-8kcn",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Examine the following filesystem capacity comparison from the Linux Evolution slides:\n\n```text\n\nFilesystem A: Max file size = 2 GB, Max volume size = 2 GB, Metadata journaling = No\n\nFilesystem B: Max file size = 16 GB - 2 TB, Max volume size = 2 TB - 32 TB, Metadata journaling = No\n\nFilesystem C: Max file size = 16 GB - 16 TB, Max volume size = 1 EB, Metadata journaling = Yes\n```\n\nWhich ordered triplet correctly identifies Filesystems A, B, and C?",
      "options": [
        "`Xiafs`, `ext`, `JFS`",
        "`ext`, `ext2`, `ext4`",
        "`ext2`, `JFS`, `ext4`",
        "`ext`, `Xiafs`, `ext2`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the FileSystem Comparison table, `ext` maxes out at 2 GB/2 GB, `ext2` scales up to 2 TB/32 TB without journaling, and `ext4` supports up to 16 TB/1 EB with journaling[cite: 4]."
    },
    {
      "id": "q-imp-1794831225794-27-ydvg",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "Which statement best describes the kernel design and multiprocessing capabilities of Linux?",
      "options": [
        "Linux uses a microkernel design that does not support Symmetric Multi-Processing (SMP).",
        "Linux uses a monolithic kernel that supports Symmetric Multi-Processing (SMP) and runs independently across hardware platforms.",
        "Linux relies on a Windows NT hybrid kernel for desktop accessibility.",
        "Linux kernels cannot manage device drivers or file systems directly."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As outlined in the Linux Evolution and Architecture slides, Linux features a monolithic kernel with full SMP support that manages memory, processes, file systems, and device drivers."
    },
    {
      "id": "q-imp-1794831225794-28-e6kg",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "In the Linux filesystem hierarchy, ______ holds temporary system files cleared on reboot, whereas ______ contains essential user command binaries available in single-user mode.",
      "options": [
        "`/opt`; `/var`",
        "`/tmp`; `/bin`",
        "`/proc`; `/home`",
        "`/etc`; `/media`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the Linux filesystem tree, `/tmp` stores temporary files and `/bin` stores essential user binaries."
    },
    {
      "id": "q-imp-1794831225794-29-y6s5",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Consider the following boot sequence components from the Linux Evolution presentation:\n\n```text\n\nStage A: Performs Power-On Self-Test (POST) and locates the bootloader on the drive.\n\nStage B: Decompresses into memory, mounts the root filesystem using initramfs, and initializes hardware.\n\nStage C: Starts as PID 1 and loads required system services (networking, GUI) based on target configuration.\n```\n\nWhich ordered triplet correctly identifies Stages A, B, and C?",
      "options": [
        "GRUB2 Bootloader, BIOS/UEFI, Kernel",
        "BIOS/UEFI, Kernel, `systemd` (Init Process)",
        "MBR/GPT, `systemd`, BIOS/UEFI",
        "Kernel, GRUB2 Bootloader, User Prompt"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** During Linux startup, BIOS/UEFI runs POST first, the Kernel decompresses and mounts root via `initramfs`, and `systemd` (PID 1) initializes target services."
    },
    {
      "id": "q-imp-1794831225794-30-np7b",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "easy",
      "question": "Which enterprise server workloads are explicitly listed as applications of Linux in the Linux Evolution presentation?",
      "options": [
        "Only desktop word processing and single-user gaming",
        "DNS Server, DHCP Server, Web Server, HPC Cluster, Firewall, and Cloud Servers",
        "Proprietary mainframe COBOL compilers exclusively",
        "Windows Active Directory domain controllers only"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Linux Applications slide highlights DNS, DHCP, Web, HPC Cluster, Firewall, and Cloud Servers among Linux's primary deployments."
    },
    {
      "id": "q-imp-1794831225794-31-v7qk",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "moderate",
      "question": "In the concentric-ring Architecture of OS Linux diagram, the innermost layer is ______, surrounded sequentially outward by the ______, the ______, and finally user applications/commands.",
      "options": [
        "Shell; Kernel; Hardware",
        "Hardware; Kernel; Shell",
        "Kernel; Hardware; Compilers",
        "User Space; Device Drivers; System Libraries"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The concentric OS architecture diagram places Hardware at the center, wrapped by Kernel, then Shell, and outer user utilities (`vi`, `cd`, `grep`, `date`, compilers)."
    },
    {
      "id": "q-imp-1794831225794-32-fj0b",
      "topicId": "top-1794831229482-0-z6n",
      "difficulty": "hard",
      "question": "Compare the `Xiafs` and `ext2` filesystems from the FileSystem Comparison table in the Linux Evolution presentation. Which statement is CORRECT?",
      "options": [
        "`Xiafs` supports a larger maximum volume size (32 TB) than `ext2` (2 GB).",
        "`Xiafs` has a maximum filename length of 248 bytes and a 64 MB max file size, whereas `ext2` supports 255-byte filenames and up to 2 TB max file size.",
        "Both `Xiafs` and `ext2` natively support online grow and experimental encryption.",
        "`ext2` has a maximum volume size of 2 GB, identical to `Xiafs`."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the comparison table, `Xiafs` is limited to 248-byte filenames, 64 MB files, and 2 GB volumes, while `ext2` scales to 255-byte filenames, 2 TB files, and 32 TB volumes."
    },
    {
      "id": "q-imp-1794831225794-33-au4r",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "AlmaLinux is a free, community-driven enterprise Linux distribution that is binary compatible with which operating system?",
      "options": [
        "Ubuntu Desktop",
        "SUSE Linux Enterprise",
        "Red Hat Enterprise Linux (RHEL)",
        "Debian GNU/Linux"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AlmaLinux is designed as an open-source, forever-free enterprise OS that maintains binary compatibility with RHEL."
    },
    {
      "id": "q-imp-1794831225794-34-geeh",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "During manual disk partitioning in AlmaLinux, the ______ partition is allocated to act as virtual memory.",
      "options": [
        "`/boot`",
        "`/var`",
        "`swap`",
        "`/usr`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the AlmaLinux partitioning scheme, `swap` provides virtual memory, while `/boot`, `/var`, and `/usr` store boot files, logs, and system libraries respectively."
    },
    {
      "id": "q-imp-1794831225794-35-me1h",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "Consider the following post-installation commands executed on an AlmaLinux server:\n\n```bash\ndnf install httpd -y\nsystemctl start httpd\nsystemctl enable httpd\nfirewall-cmd --add-port=80/tcp --permanent\nfirewall-cmd --reload\n```\n\nWhat is the purpose of the final `firewall-cmd --reload` command?",
      "options": [
        "It restarts the `httpd` Apache web server to bind to port 80.",
        "It reloads `firewalld` so the permanent rule opening TCP port 80 takes effect immediately in the active runtime configuration.",
        "It permanently disables `firewalld` so external browsers can reach the server.",
        "It verifies the IP address and OS release version of the AlmaLinux host."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Adding a rule with `--permanent` modifies the saved configuration, requiring `firewall-cmd --reload` to apply the change to the active firewall without dropping connections."
    },
    {
      "id": "q-imp-1794831225794-36-6dru",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Which of the following statements regarding AlmaLinux system requirements and installation options is CORRECT?",
      "options": [
        "AlmaLinux only supports `x86_64` and `ARM64` architectures and requires UEFI firmware.",
        "The minimum hardware requirement for AlmaLinux is 1 Core CPU, 1 GB RAM, and 10 GB disk space.",
        "The \"Minimal Install\" software selection is recommended for desktop students, whereas \"Server with GUI\" is intended for headless servers.",
        "AlmaLinux supports `x86_64`, `ARM64`, `ppc64le`, and `s390x` architectures on both BIOS and UEFI firmware, requiring at least a 2 Core CPU, 2 GB RAM, and 20 GB disk space."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** AlmaLinux supports all four listed architectures across BIOS and UEFI systems, with minimum specs of 2 CPU cores, 2 GB RAM (4 GB recommended), and 20 GB storage."
    },
    {
      "id": "q-imp-1794831225794-37-dblm",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which two utilities are recommended in the AlmaLinux installation guide for creating a bootable USB drive from the ISO image?",
      "options": [
        "Ventoy and UNetbootin",
        "Rufus and Balena Etcher",
        "Win32 Disk Imager and Clonezilla",
        "VirtualBox and QEMU"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The AlmaLinux installation slides explicitly instruct users to create a bootable USB drive using Rufus or Balena Etcher."
    },
    {
      "id": "q-imp-1794831225794-38-nui4",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "After installing AlmaLinux, running `cat ______` displays the operating system name, version, and RHEL compatibility details.",
      "options": [
        "`/etc/hostname`",
        "`/proc/cpuinfo`",
        "`/etc/os-release`",
        "`/var/log/messages`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The post-installation checklist uses `cat /etc/os-release` to verify the installed AlmaLinux release information."
    },
    {
      "id": "q-imp-1794831225794-39-kcrf",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "Consider the following post-installation commands on a newly deployed AlmaLinux system:\n\n```bash\ndnf update -y\nsystemctl status firewalld\nip a\n```\n\nWhat is the combined purpose of running these three commands?",
      "options": [
        "Install Apache HTTP Server, open port 80, and restart the network interface.",
        "Update all system packages without prompting, check whether the firewall service is active, and display network interface IP addresses.",
        "Create a standard user account, add it to the `wheel` group, and set a static hostname.",
        "Format the `/var` partition, enable KDUMP, and verify bootloader installation."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `dnf update -y` applies package updates automatically, `systemctl status firewalld` checks firewall service health, and `ip a` lists interface IP configurations."
    },
    {
      "id": "q-imp-1794831225794-40-qvnw",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Which of the following statements about AlmaLinux installation and partitioning is CORRECT?",
      "options": [
        "`/usr` stores user home directories, while `/home` stores system libraries and binaries.",
        "`/var` stores OS boot loader files, while `/boot` stores variable log files.",
        "Adding a standard user to the `wheel` group grants administrative (`sudo`) privileges, and \"Server with GUI\" is recommended for students and desktops.",
        "Root password setup and Installation Destination are optional steps that can be skipped before clicking \"Begin Installation\"."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the AlmaLinux installer, root password/user settings and Installation Destination must be configured before installation begins, `wheel` provides administrative rights, and \"Server with GUI\" targets students and desktops."
    },
    {
      "id": "q-imp-1794831225794-41-bz3x",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which official URL is specified in the presentation for downloading the AlmaLinux 9 ISO image?",
      "options": [
        "`https://almalinux.com/get`",
        "`https://almalinux.org`",
        "`https://redhat.com/almalinux`",
        "`https://centos.org/alma`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The AlmaLinux installation guide directs users to visit `https://almalinux.org` and download the `x86_64` AlmaLinux 9 ISO."
    },
    {
      "id": "q-imp-1794831225794-42-0y2p",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "During AlmaLinux manual disk partitioning, the ______ mount point stores variable data such as system log files.",
      "options": [
        "`/boot`",
        "`/usr`",
        "`/var`",
        "`/home`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the AlmaLinux partitioning layout, `/var` holds log files and other variable runtime data."
    },
    {
      "id": "q-imp-1794831225794-43-vd41",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "Consider the following AlmaLinux installation flow sequence:\n\n```text\n\nBIOS -> Boot USB -> Installer -> [ Step X ] -> Configure -> Install -> Reboot -> Login\n```\n\nWhich installation phase corresponds to `[ Step X ]` in the AlmaLinux installation flow diagram?",
      "options": [
        "Firewall Setup",
        "Partition",
        "Apache Installation",
        "System Update"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The installation flow diagram progresses from BIOS to Boot USB, Installer, Partition, Configure, Install, Reboot, and Login."
    },
    {
      "id": "q-imp-1794831225794-44-dmr6",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Which of the following statements regarding AlmaLinux installation screens and VirtualBox support is INCORRECT?",
      "options": [
        "On the initial boot menu, users can select \"Install AlmaLinux 9.1\", \"Test this media & install AlmaLinux 9.1\", or \"Troubleshooting\".",
        "On the Installation Summary screen, items marked with a warning icon (such as Installation Destination, Root Password, or User Creation) must be resolved before clicking \"Begin Installation\".",
        "VirtualBox 7.1 added support for macOS/Arm, and VirtualBox 7.2 added support for Windows/Arm.",
        "KDUMP is disabled by default in the AlmaLinux 9.1 Installation Summary screen and cannot be configured during setup."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** As shown in the AlmaLinux 9.1 Installation Summary screenshot, KDUMP is enabled by default and appears under the SYSTEM configuration section."
    },
    {
      "id": "q-imp-1794831225794-45-qe2n",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which utility URL is provided in the AlmaLinux installation slides for downloading the Windows-based bootable USB creation tool?",
      "options": [
        "`https://balena.io/etcher`",
        "`https://rufus.ie/en/`",
        "`https://virtualbox.org/usb`",
        "`https://almalinux.org/usb`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The AlmaLinux guide specifically lists `https://rufus.ie/en/` for downloading Rufus to flash the ISO onto a USB drive."
    },
    {
      "id": "q-imp-1794831225794-46-nul3",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "During AlmaLinux manual disk partitioning, the ______ mount point stores operating system boot files (such as the kernel and bootloader configuration).",
      "options": [
        "`/var`",
        "`/usr`",
        "`/boot`",
        "`/home`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** According to the AlmaLinux partitioning table, `/boot` holds OS boot files, `/` holds root OS files, and `/usr` holds library and system files."
    },
    {
      "id": "q-imp-1794831225794-47-eaqt",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "Consider the following commands executed in an AlmaLinux terminal:\n\n```bash\nsystemctl start httpd\nsystemctl enable httpd\n```\n\nWhat is the difference between these two commands?",
      "options": [
        "`start` installs the Apache package, while `enable` opens TCP port 80 in `firewalld`.",
        "`start` launches the Apache service immediately in the current session, while `enable` configures it to start automatically on system boot.",
        "`start` runs Apache in single-user rescue mode, while `enable` switches the server to a graphical desktop.",
        "`start` checks the service status logs, while `enable` updates `httpd` via `dnf`."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `systemctl start` activates the `httpd` daemon immediately, whereas `systemctl enable` creates the systemd symlinks required for automatic startup at boot."
    },
    {
      "id": "q-imp-1794831225794-48-spbb",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Which of the following statements about AlmaLinux installation options, firewall commands, and troubleshooting is CORRECT?",
      "options": [
        "The \"Manual selection\" software option is designed for beginners who want a preconfigured desktop environment.",
        "Creating a root password automatically disables standard user creation in the AlmaLinux 9.1 installer.",
        "Troubleshooting common AlmaLinux installation failures includes checking for USB not booting, no network, disk not detected, and low RAM issues.",
        "In the AlmaLinux 9.1 boot menu, the installer waits 10 seconds before booting into Troubleshooting mode automatically."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The final troubleshooting slide lists USB Not Booting, No Network, Disk Not Detected, and Low RAM Issues, while the boot screen shows a 60-second countdown to Install AlmaLinux 9.1."
    },
    {
      "id": "q-imp-1794831225794-49-vpeu",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which AlmaLinux software selection option is specifically tailored for headless servers that do not require a graphical desktop environment?",
      "options": [
        "Server with GUI",
        "Minimal Install",
        "Workstation Pro",
        "Manual Desktop"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The AlmaLinux Software Selection slide specifies \"Minimal Install – for servers\" and \"Server with GUI – for students and desktops\"[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-50-lcjz",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "During AlmaLinux manual disk partitioning, the ______ mount point holds the user's personal directories and files.",
      "options": [
        "`/usr`",
        "`/var`",
        "`/home`",
        "`/boot`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the AlmaLinux manual partitioning layout, `/home` is dedicated to user home directories, while `/` holds root OS files[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-51-fgyb",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "Examine the following AlmaLinux installation summary configuration shown in the presentation:\n\n```text\n\nLOCALIZATION: Keyboard (English US), Language Support (English US), Time & Date\n\nSOFTWARE: Installation Source (Local media), Software Selection (Server with GUI)\n\nSYSTEM: Installation Destination, KDUMP, Network & Host Name, Security Profile\n\nUSER SETTINGS: Root Password, User Creation\n```\n\nWhich two items show a warning triangle (`!`) requiring mandatory completion before \"Begin Installation\" becomes clickable in the screenshot?",
      "options": [
        "Keyboard and Software Selection",
        "KDUMP and Security Profile",
        "Installation Destination, Root Password, and User Creation (items marked with the warning icon)",
        "Installation Source and Time & Date"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** As noted at the bottom of the Installation Summary screenshot, items marked with the warning icon (`Installation Destination`, `Root Password`, and `User Creation`) must be completed before continuing[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-52-25w6",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Which of the following statements regarding AlmaLinux network configuration, virtualization, and lab exercises is INCORRECT?",
      "options": [
        "During AlmaLinux setup, administrators enable Ethernet, set the hostname, and can optionally configure a static IP address.",
        "VirtualBox (`https://www.virtualbox.org/`) is a general-purpose full virtualization tool used in the lab to run AlmaLinux VMs.",
        "Lab Exercise 2 covers installing Apache, starting/enabling the service, opening port 80 in the firewall, and verifying via browser.",
        "Pressing `Tab` on the AlmaLinux 9.1 boot screen immediately formats the hard drive and skips the installation wizard."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** As shown on the AlmaLinux 9.1 boot menu screen, pressing `Tab` displays full configuration options for the selected boot menu item rather than formatting disks[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-53-n98i",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which architecture is explicitly recommended in the AlmaLinux downloading guide for standard PCs and servers?",
      "options": [
        "`s390x`",
        "`x86_64`",
        "`ppc64le`",
        "`i386`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The \"Downloading AlmaLinux\" slide instructs users to choose the `x86_64` architecture, noting it is the most common for PCs and servers[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-54-rkvx",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "During AlmaLinux manual disk partitioning, the ______ mount point stores shared system libraries, applications, and read-only system files.",
      "options": [
        "`/boot`",
        "`/usr`",
        "`/var`",
        "`swap`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the AlmaLinux Disk Partitioning slide, `/usr` stores library and system files, whereas `/var` stores logs and `/boot` stores boot files[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-55-vyun",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "Examine the following AlmaLinux installation screens and configuration choices:\n\n```text\n\n1. Welcome to AlmaLinux 9.1 -> Language Selection (English - United States)\n\n2. Installation Summary -> Localization, Software, System, User Settings\n\n3. Post Installation -> dnf update -y, cat /etc/os-release, ip a\n```\n\nWhat is the purpose of configuring \"Network & Host Name\" on the Installation Summary screen before installation?",
      "options": [
        "It partitions the hard drive into `/` and `swap` volumes automatically.",
        "It enables the Ethernet interface, sets the system hostname, and optionally configures a static IP address.",
        "It installs the `httpd` Apache web server and opens port 80 in `firewalld`.",
        "It creates a bootable USB drive using Rufus."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Network Configuration slide specifies enabling Ethernet, setting the hostname, and optionally configuring a static IP during setup[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-56-v3oj",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Which of the following statements regarding AlmaLinux installation and lab exercises is CORRECT?",
      "options": [
        "Lab Exercise 1 requires compiling the Linux kernel from source code before booting the VM.",
        "The recommended RAM for AlmaLinux is 512 MB, while 2 GB is the absolute maximum supported.",
        "On the AlmaLinux 9.1 boot menu, the installer defaults to a 60-second automatic boot countdown unless interrupted by pressing a key or `Tab`.",
        "Running `firewall-cmd --add-port=80/tcp --permanent` automatically starts and enables the `httpd` service."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The AlmaLinux 9.1 boot menu screenshot displays an automatic boot countdown starting at 60 seconds (shown at 58 seconds), while recommended RAM is 4 GB (2 GB minimum)[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-57-up18",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which command-line tool is used in AlmaLinux to install packages such as the Apache HTTP Server (`httpd`)?",
      "options": [
        "`apt-get`",
        "`dnf`",
        "`dpkg`",
        "`snap`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AlmaLinux is RHEL-compatible and uses `dnf` (e.g., `dnf install httpd -y`) for package management[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-58-khq0",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "Which of the following statements about AlmaLinux architectures and boot menus is INCORRECT?",
      "options": [
        "AlmaLinux provides ISO images for `x86_64`, `ARM64`, `ppc64le`, and `s390x` hardware architectures.",
        "Both legacy BIOS and modern UEFI firmware are supported by AlmaLinux.",
        "Selecting \"Test this media & install AlmaLinux 9.1\" skips media verification and immediately boots into single-user rescue mode.",
        "The \"Troubleshooting\" option on the initial boot screen provides recovery and diagnostic boot modes."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Choosing \"Test this media & install AlmaLinux 9.1\" verifies the integrity of the installation medium before launching the Anaconda graphical installer[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-59-uepz",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Consider an AlmaLinux server where a student runs the following commands after installing Apache:\n\n```bash\nsystemctl start httpd\nfirewall-cmd --add-port=80/tcp --permanent\n```\n\nWhen an external browser tries to access `http://<server-ip>` immediately afterward, the connection times out. What are the two missing steps from the AlmaLinux lab guide?",
      "options": [
        "Run `dnf update -y` and `cat /etc/os-release`",
        "Run `firewall-cmd --reload` to apply the firewall rule immediately, and `systemctl enable httpd` so Apache persists across reboots",
        "Switch Software Selection to \"Minimal Install\" and reboot into `init 0`",
        "Format `/var` as `fat32` and disable `KDUMP`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Without `firewall-cmd --reload`, the `--permanent` port 80 rule is not active in the runtime firewall, and `systemctl enable httpd` is needed for boot persistence[cite: 1]."
    },
    {
      "id": "q-imp-1794831225794-60-mbm5",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which virtualization platform is referenced in the AlmaLinux installation presentation for running AlmaLinux guest virtual machines on desktop/laptop hosts?",
      "options": [
        "VMware ESXi",
        "VirtualBox",
        "Hyper-V Server",
        "Citrix XenServer"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The AlmaLinux presentation includes a dedicated slide for VirtualBox (`https://www.virtualbox.org/`) and uses it in Lab Exercise 1."
    },
    {
      "id": "q-imp-1794831225794-61-8v34",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "During AlmaLinux installation, choosing ______ creates standard partitions automatically, whereas choosing ______ lets you explicitly size `/`, `/home`, `swap`, `/boot`, `/usr`, and `/var`.",
      "options": [
        "Minimal Install; Server with GUI",
        "Automatic Partitioning; Manual Partitioning",
        "Test Media; Troubleshooting",
        "Local Media; Network Configuration"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Disk Partitioning slide contrasts Automatic Partitioning against Manual Partitioning across those six standard mount points."
    },
    {
      "id": "q-imp-1794831225794-62-s8cv",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Which of the following statements regarding AlmaLinux installation and post-installation tasks is INCORRECT?",
      "options": [
        "AlmaLinux provides Long Term Support (LTS) and is ideal for both enterprise servers and lab environments.",
        "Running `cat /etc/os-release` after installation verifies the installed AlmaLinux release details.",
        "Running `ip a` displays the assigned IP addresses of network interfaces on the AlmaLinux host.",
        "AlmaLinux requires at least 16 GB of RAM and 100 GB of disk space as its minimum hardware requirement."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** The AlmaLinux System Requirements slide specifies a minimum of 2 Core CPU, 2 GB RAM (4 GB recommended), and 20 GB disk space."
    },
    {
      "id": "q-imp-1794831225794-63-gga4",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "easy",
      "question": "Which two firmware interfaces are supported by AlmaLinux on compatible hardware?",
      "options": [
        "OpenFirmware and Coreboot only",
        "BIOS and UEFI",
        "GRUB1 and LILO only",
        "PXE and NetBoot only"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Supported Architectures slide states that AlmaLinux supports both legacy BIOS and UEFI firmware."
    },
    {
      "id": "q-imp-1794831225794-64-z3ok",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "moderate",
      "question": "During AlmaLinux installation, selecting ______ is recommended for advanced users who want granular package control, whereas ______ is tailored for headless server deployments.",
      "options": [
        "Server with GUI; Manual selection",
        "Manual selection; Minimal Install",
        "Minimal Install; Server with GUI",
        "Automatic Partitioning; KDUMP"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Software Selection slide defines \"Server with GUI\" for students/desktops, \"Minimal Install\" for servers, and \"Manual selection\" for advanced users."
    },
    {
      "id": "q-imp-1794831225794-65-0gig",
      "topicId": "top-1794831229482-33-mh3",
      "difficulty": "hard",
      "question": "Consider the following lab exercise workflow from the AlmaLinux presentation:\n\n```text\n\nLab Exercise 1: Install AlmaLinux in VM -> Create User Account -> Update System -> Check IP Address\n\nLab Exercise 2: Install Apache -> Start & Enable Service -> Open Port 80 in Firewall -> Verify via Browser\n```\n\nWhich ordered sequence of commands completes the final three steps of **Lab Exercise 2**?",
      "options": [
        "`dnf update -y` -> `ip a` -> `cat /etc/os-release`",
        "`systemctl start httpd` & `systemctl enable httpd` -> `firewall-cmd --add-port=80/tcp --permanent` & `firewall-cmd --reload` -> browse `http://<IP>`",
        "`systemctl status firewalld` -> `shutdown -r now` -> `init 0`",
        "`yum list installed` -> `chmod 755 /var/www` -> `reboot`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lab Exercise 2 installs `httpd`, starts and enables the service via `systemctl`, opens TCP port 80 permanently and reloads `firewalld`, then tests in a browser."
    },
    {
      "id": "q-imp-1794831225794-66-9arc",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "Which open-source flashing utility is demonstrated in the Ubuntu installation guide to create a bootable Ubuntu USB drive?",
      "options": [
        "VirtualBox",
        "GParted",
        "balenaEtcher",
        "`ddrescue`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The Ubuntu installation presentation illustrates selecting the ISO image and target USB drive inside balenaEtcher to flash the installation media."
    },
    {
      "id": "q-imp-1794831225794-67-hs1p",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "In the Ubuntu 24.04 LTS installer, selecting \"Automated installation\" allows advanced users to perform consistent, repeatable setups using an ______ configuration file.",
      "options": [
        "`kickstart.cfg`",
        "`autoinstall.yaml`",
        "`cloud-init.json`",
        "`ubuntu-setup.conf`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Ubuntu's desktop installer supports automated provisioning through a user-supplied `autoinstall.yaml` file."
    },
    {
      "id": "q-imp-1794831225794-68-vwc9",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Which of the following statements about Ubuntu 24.04 LTS disk setup and partitioning is INCORRECT?",
      "options": [
        "In manual partitioning, the `/boot/efi` partition uses the `fat32` filesystem type.",
        "The root (`/`) partition in manual setup can be formatted using `ext4`.",
        "ZFS disk setup and hardware-backed full disk encryption are marked as stable default production options in the installer.",
        "The installer offers both \"Erase disk and install Ubuntu\" (with optional LVM/encryption) and \"Manual installation\"."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the Ubuntu 24.04 LTS \"Advanced features\" dialog, both ZFS options and hardware-backed full disk encryption are explicitly labeled as `Experimental`."
    },
    {
      "id": "q-imp-1794831225794-69-3vwx",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "How long does Ubuntu 24.04 LTS provide free security and maintenance updates by default (without Ubuntu Pro)?",
      "options": [
        "2 years",
        "3 years",
        "5 years",
        "10 years"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** As shown on the Ubuntu 24.04 LTS download page, LTS stands for Long-Term Support, providing 5 years of free updates (extendable to 10 years with Ubuntu Pro)."
    },
    {
      "id": "q-imp-1794831225794-70-488k",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "During Ubuntu 24.04 LTS installation, choosing the ______ option installs an offline-friendly selection of office tools and utilities alongside the web browser, rather than just basic essentials.",
      "options": [
        "Minimal selection",
        "Extended selection",
        "Developer selection",
        "Server selection"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Under the \"Applications\" screen, \"Default selection\" installs essentials and a web browser, whereas \"Extended selection\" adds offline-friendly office tools and utilities."
    },
    {
      "id": "q-imp-1794831225794-71-tk91",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Which of the following statements about the Ubuntu 24.04 LTS installation review and setup screens is INCORRECT?",
      "options": [
        "In the \"Ready to install\" summary with LUKS (LVM) encryption enabled, `vda1` is formatted as `fat32` for `/boot/efi` and `vda2` is formatted as `ext4` for `/boot`.",
        "During account creation, users can optionally enable \"Use Active Directory\" integration.",
        "The installer allows users to \"Try Ubuntu\" without making changes to their computer before installing.",
        "Ubuntu 24.04 LTS includes proprietary NVIDIA graphics drivers and MP3/MP4 media codecs enabled out-of-the-box without checking the third-party software options."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Ubuntu ships with no proprietary software by default; users must check the options on the \"Optimise your computer\" screen to install third-party graphics/Wi-Fi drivers and media formats."
    },
    {
      "id": "q-imp-1794831225794-72-nte5",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "What are the minimum hardware requirements listed in the Ubuntu installation presentation?",
      "options": [
        "1 GB RAM, 10 GB HDD, and a DVD drive",
        "2 GB RAM, 20 GB HDD, and a USB port",
        "4 GB RAM, 50 GB SSD, and UEFI Secure Boot",
        "8 GB RAM, 100 GB NVMe, and an active Ethernet connection"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Ubuntu requirements slide specifies a laptop or desktop with 2 GB RAM, 20 GB HDD, and a USB port."
    },
    {
      "id": "q-imp-1794831225794-73-2sa2",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "During the Ubuntu 24.04 LTS installation wizard, which configuration step immediately follows the \"Welcome to Ubuntu\" language selection screen?",
      "options": [
        "Keyboard layout",
        "Accessibility in Ubuntu",
        "Internet connection",
        "Disk setup"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the Ubuntu 24.04 LTS desktop installer sequence, the \"Accessibility in Ubuntu\" screen (Seeing, Hearing, Typing, Pointing and clicking, Zoom) appears right after choosing the language."
    },
    {
      "id": "q-imp-1794831225794-74-xb4c",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Which of the following statements about Ubuntu 24.04 LTS installation options is CORRECT?",
      "options": [
        "The \"Interactive installation\" mode requires writing a YAML configuration file before booting the live USB.",
        "On the \"Optimise your computer\" screen, users can separately opt in to third-party hardware drivers (graphics/Wi-Fi) and additional media format support (MP3, MP4, MOV).",
        "Manual partitioning requires formatting the `/boot/efi` partition as `ext4` and the root (`/`) partition as `fat32`.",
        "The Ubuntu 24.04 LTS ISO download size shown on the official download page is 6.4 GB."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The \"Optimise your computer\" screen presents two separate checkboxes for third-party hardware drivers and additional media formats, while the ISO download size shown is 3.8 GB."
    },
    {
      "id": "q-imp-1794831225794-75-2fgp",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "What is the codename of the computer shown in the Ubuntu 24.04 LTS \"Create your account\" installer screenshot?",
      "options": [
        "JammyJellyfish",
        "FocalFossa",
        "NobleNumbat",
        "LunarLobster"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the \"Create your account\" screenshot for Ubuntu 24.04 LTS, the computer's hostname field is populated with `NobleNumbat`."
    },
    {
      "id": "q-imp-1794831225794-76-uwlx",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "In the Ubuntu 24.04 LTS installer, the ______ screen allows users to configure visual, hearing, typing, pointing/clicking, and zoom aids prior to completing system setup.",
      "options": [
        "Optimise your computer",
        "Accessibility in Ubuntu",
        "Keyboard layout",
        "Select your timezone"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The \"Accessibility in Ubuntu\" screen provides five categories (Seeing, Hearing, Typing, Pointing and clicking, Zoom) right after language selection."
    },
    {
      "id": "q-imp-1794831225794-77-b2go",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Which of the following statements regarding the Ubuntu 24.04 LTS installation workflow is INCORRECT?",
      "options": [
        "Users can choose between \"Wired connection\" or \"Do not connect to the internet\" on the Internet connection screen.",
        "On the \"Create your account\" screen, \"Require my password to log in\" is checked by default.",
        "Clicking \"Continue testing\" after installation finishes lets you keep exploring the live environment without rebooting immediately.",
        "Selecting \"Erase disk and install Ubuntu\" prevents users from enabling LVM or ZFS under \"Advanced features\"."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Clicking \"Advanced features...\" beneath \"Erase disk and install Ubuntu\" opens options for LVM, LVM with encryption, and experimental ZFS setups."
    },
    {
      "id": "q-imp-1794831225794-78-uiq2",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "What is the default username populated in the Ubuntu 24.04 LTS \"Create your account\" installer screenshot?",
      "options": [
        "`ubuntu-admin`",
        "`local-optimum`",
        "`noble-user`",
        "`root`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the \"Create your account\" screenshot, \"Your name\" is `Local Optimum` and \"Your username\" is `local-optimum`[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-79-hzmf",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "During Ubuntu 24.04 LTS installation, if you select \"Try Ubuntu\" instead of \"Install Ubuntu\" on the \"Try or install Ubuntu\" screen, what happens?",
      "options": [
        "Ubuntu immediately erases the primary drive and installs the minimal server edition.",
        "You can test and use Ubuntu in a live session without making any changes to your computer.",
        "The installer reboots into the Windows bootloader automatically.",
        "Ubuntu prompts you to supply an `autoinstall.yaml` file over the network."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As stated on the \"Try or install Ubuntu\" screen, \"Try Ubuntu\" lets you explore the OS without modifying your computer's disk[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-80-k9uk",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Which of the following statements about Ubuntu 24.04 LTS manual partitioning and installation summary screens is CORRECT?",
      "options": [
        "In the manual partitioning screenshot, `sda` is a 500 GB NVMe drive partitioned into four XFS volumes.",
        "In the manual partitioning screenshot on a 100 GB `sda` disk, `sda1` (50 GB) is `ext4` mounted at `/`, `sda2` (1 GB) is `fat32` mounted at `/boot/efi`, and 49 GB remains free space.",
        "In the \"Ready to install\" review screen with LUKS (LVM) enabled, `vda1` is formatted as `ext4` for `/boot/efi` and `vda2` is formatted as `fat32` for `/boot`.",
        "After installation completes, clicking \"Restart now\" discards all installed system files."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The manual partitioning screenshot shows `sda1` (50 GB, `ext4`, `/`), `sda2` (1 GB, `fat32`, `/boot/efi`), and 49 GB free space on a 100 GB QEMU disk[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-81-vnza",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "On the Ubuntu 24.04 LTS \"Try or install Ubuntu\" screen, which option is selected by default to install Ubuntu alongside or instead of the current OS?",
      "options": [
        "Try Ubuntu",
        "Install Ubuntu",
        "Automated installation",
        "OEM install"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The \"Try or install Ubuntu\" screenshot shows the radio button for \"Install Ubuntu\" selected by default above \"Try Ubuntu\"[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-82-188h",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "During Ubuntu 24.04 LTS installation, choosing the ______ option under \"Applications\" installs just the essentials, a web browser, and basic utilities.",
      "options": [
        "Extended selection",
        "Default selection",
        "Minimal server selection",
        "Full developer suite"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** On the \"Applications\" screen, \"Default selection\" installs essentials, a web browser, and basic utilities, whereas \"Extended selection\" adds offline office tools[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-83-d0zn",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Which of the following statements regarding the Ubuntu 24.04 LTS installation screenshots is INCORRECT?",
      "options": [
        "On the \"Select your timezone\" screen, selecting London sets the timezone to `Europe/London`.",
        "On the \"Keyboard layout\" screen, there is a text input box labeled \"Type here to test your keyboard\" and a \"Detect\" button.",
        "On the \"Ready to install\" screen with LUKS (LVM) enabled, `vda3` is created alongside `vda1` (`/boot/efi`) and `vda2` (`/boot`).",
        "On the \"Installation complete\" screen, clicking \"Continue testing\" immediately powers off the machine without saving changes."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** On the \"Installation complete\" screen, clicking \"Restart now\" reboots into the installed system, whereas \"Continue testing\" keeps you in the live test session (warning that live changes won't be saved)[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-84-2ihe",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "On the Ubuntu 24.04 LTS download portal, what is the exact file size listed next to the green \"Download 24.04 LTS\" button?",
      "options": [
        "2.0 GB",
        "3.8 GB",
        "4.7 GB",
        "6.2 GB"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Ubuntu Desktop download screenshot displays `3.8GB` directly beside the `Download 24.04 LTS` button[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-85-vhjz",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "During Ubuntu 24.04 LTS installation, if a user wants to encrypt their disk using LUKS with Logical Volume Management, they should select \"Erase disk and install Ubuntu\", click ______, and choose ______.",
      "options": [
        "Manual installation; `fat32` encryption",
        "Advanced features...; Use LVM and encryption",
        "Automated installation; `autoinstall.yaml`",
        "Extended selection; Hardware-backed full disk encryption"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Clicking \"Advanced features...\" on the Disk setup screen opens a modal containing \"Use LVM and encryption\" as a standard option[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-86-1f69",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Examine the desktop application grid shown on the final slide of the Ubuntu installation presentation:\n\n```text\n\nRow 1: Additional Drivers, AisleRiot Solitaire, Calendar, Cheese, Document Scanner, Files\n\nRow 2: Firefox Web Browser, Image Viewer, Input Method, Language Support, LibreOffice Calc, LibreOffice Draw\n\nRow 3: LibreOffice Impress, LibreOffice Writer, Livepatch, Mahjongg, Mines, Passwords and Keys\n\nRow 4: Power Statistics, Remmina, Rhythmbox, Settings, Shotwell, Software & Updates\n```\n\nWhich utility visible in this default Ubuntu desktop grid is specifically used for remote desktop connections (such as RDP/VNC)?",
      "options": [
        "Rhythmbox",
        "Remmina",
        "Shotwell",
        "Livepatch"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Remmina is Ubuntu's built-in remote desktop client, whereas Rhythmbox is a music player, Shotwell is a photo manager, and Livepatch applies kernel patches[cite: 6]."
    },
    {
      "id": "q-imp-1794831225794-87-b6js",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "Which feature is highlighted under \"What's new\" on the Ubuntu 24.04 LTS Desktop download page screenshot?",
      "options": [
        "Built-in Windows `.exe` native kernel execution",
        "New Desktop installer with support for autoinstall",
        "Removal of Long-Term Support (LTS) updates",
        "Mandatory cloud subscription before booting the ISO"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Ubuntu 24.04 LTS download page explicitly lists \"New Desktop installer with support for autoinstall\" under What's new."
    },
    {
      "id": "q-imp-1794831225794-88-pp13",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "In the Ubuntu 24.04 LTS installer, if a user wants to connect to the internet during setup, which option is selected in the \"Internet connection\" screenshot?",
      "options": [
        "Connect via Bluetooth PAN",
        "Use wired connection",
        "Configure PPPoE dial-up",
        "Skip network drivers permanently"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** On the \"Connect to the internet\" wizard screen, \"Use wired connection\" is selected alongside the \"Do not connect to the internet\" option."
    },
    {
      "id": "q-imp-1794831225794-89-f8mg",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Consider the following Ubuntu 24.04 LTS installation review details shown on the \"Ready to install\" screen:\n\n```text\n\nDisk setup: Erase disk and install Ubuntu\n\nInstallation disk: vda\n\nApplications: Default selection\n\nDisk encryption: LUKS (LVM)\n\nProprietary software: Codecs & drivers\n```\n\nWhich partition layout is displayed under \"Partitions\" for this configuration?",
      "options": [
        "`vda1` formatted as `ntfs` for `/`, and `vda2` formatted as `swap`",
        "`vda1` formatted as `fat32` for `/boot/efi`, `vda2` formatted as `ext4` for `/boot`, and `vda3` created",
        "`vda1` formatted as `xfs` for `/home`, and `vda2` formatted as `ext2` for `/var`",
        "Only a single `vda1` partition formatted as `ext4` with no EFI partition"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The \"Ready to install\" review screen shows `vda1` (`fat32` for `/boot/efi`), `vda2` (`ext4` for `/boot`), and `vda3` created for the encrypted LVM volume."
    },
    {
      "id": "q-imp-1794831225795-90-x43m",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "easy",
      "question": "Which Ubuntu 24.04 LTS installation mode guides users step-by-step through graphical setup screens rather than reading an `autoinstall.yaml` file?",
      "options": [
        "Automated installation",
        "Interactive installation",
        "OEM network boot",
        "Headless kickstart"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** On the \"Type of installation\" screen, \"Interactive installation\" is described as guiding users step by step through setup."
    },
    {
      "id": "q-imp-1794831225795-91-szpw",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "moderate",
      "question": "In the Ubuntu 24.04 LTS \"Disk setup\" screen, if you choose \"Erase disk and install Ubuntu\" without clicking \"Advanced features...\", the summary label next to the button displays ______.",
      "options": [
        "LVM active",
        "None selected",
        "ZFS Experimental",
        "LUKS Enabled"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Disk setup screenshot shows `None selected` beside the `Advanced features...` button by default until LVM or ZFS options are chosen."
    },
    {
      "id": "q-imp-1794831225795-92-aazr",
      "topicId": "top-1794831229482-66-9rd",
      "difficulty": "hard",
      "question": "Which of the following statements regarding the Ubuntu 24.04 LTS installation screenshots is INCORRECT?",
      "options": [
        "On the \"Select your keyboard layout\" screen, `English (US)` is selected for both layout and variant by default.",
        "On the \"Create your account\" screen, password strength feedback (such as `Fair password`) appears beside the Password field.",
        "On the \"Ready to install\" screen, clicking the green `Install` button begins writing partitions to disk.",
        "In the \"Advanced features\" modal, `Use LVM` is marked with a blue `Experimental` badge while `Erase disk and use ZFS` has no badge."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** In the \"Advanced features\" dialog, `None`, `Use LVM`, and `Use LVM and encryption` have no badge, whereas the two ZFS options and hardware-backed full disk encryption carry the `Experimental` badge."
    },
    {
      "id": "q-imp-1794831225795-93-i00u",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "To display the last 10 lines of a log file and continue printing new lines in real time as the file grows, you execute `tail ______ filename`.",
      "options": [
        "`-n`",
        "`-f`",
        "`-l`",
        "`-a`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-f` (follow) flag instructs `tail` to output the last 10 lines of a file and continuously stream newly appended data."
    },
    {
      "id": "q-imp-1794831225795-94-gnxh",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which terminal keyboard shortcut stops (suspends) the currently running foreground process so that it can later be resumed using `fg` or `bg`?",
      "options": [
        "`Ctrl + C`",
        "`Ctrl + D`",
        "`Ctrl + Z`",
        "`Ctrl + U`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `Ctrl + Z` sends a suspend signal to pause the current foreground job, whereas `Ctrl + C` terminates it and `Ctrl + D` logs out of the session."
    },
    {
      "id": "q-imp-1794831225795-95-z49p",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following two directory listing commands:\n\n```bash\nls -al\nls -lt\n```\n\nWhat is the primary difference between their outputs?",
      "options": [
        "`ls -al` lists only directories, while `ls -lt` lists only regular files.",
        "`ls -al` displays a long listing including hidden files, while `ls -lt` displays a long listing sorted by modification time.",
        "`ls -al` sorts files alphabetically in reverse, while `ls -lt` displays inode numbers.",
        "`ls -al` lists files recursively across subdirectories, while `ls -lt` displays file sizes in human-readable units."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-a` option includes hidden dot-files in the long (`-l`) listing, whereas `-t` sorts the long listing by modification timestamp."
    },
    {
      "id": "q-imp-1794831225795-96-1ege",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux process, disk, and terminal control commands is CORRECT?",
      "options": [
        "`df -h` displays inode usage counts, whereas `df -i` displays human-readable block space.",
        "`kill pid` terminates all processes matching a given name pattern, whereas `pkill` requires an exact numeric PID.",
        "`du -sh *` shows summarized human-readable sizes of items in the current directory, and `tput smul` enables underlined terminal text.",
        "`bg` brings the most recent background job to the foreground, whereas `fg` lists stopped background jobs."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `du -sh *` summarizes disk usage per item in human-readable format and `tput smul` turns on underline mode, while the other pairs have their definitions swapped."
    },
    {
      "id": "q-imp-1794831225795-97-uobe",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "To create a symbolic (soft) link pointing to an existing file in Linux, you execute `ln ______ /path/to/target link_name`.",
      "options": [
        "`-f`",
        "`-h`",
        "`-s`",
        "`-l`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The `ln -s` command creates a symbolic link referencing the specified target file path."
    },
    {
      "id": "q-imp-1794831225795-98-hajp",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which `tput` command resets terminal settings back to their default state?",
      "options": [
        "`tput clear`",
        "`tput reset`",
        "`tput cols`",
        "`tput rmul`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `tput reset` reinitializes and resets terminal attributes, whereas `tput clear` clears the screen and `tput rmul` removes underline formatting."
    },
    {
      "id": "q-imp-1794831225795-99-yu61",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following Linux command pipeline:\n\n```bash\ndmesg | tee boot_log.txt >/dev/null\n```\n\nWhat does this command accomplish?",
      "options": [
        "It appends `boot_log.txt` to the kernel ring buffer and prints all lines to the screen.",
        "It saves the output of `dmesg` into `boot_log.txt` while suppressing output to the terminal screen.",
        "It encrypts `boot_log.txt` using GPG and deletes the original log output.",
        "It displays only the first 10 lines of `dmesg` on the terminal without creating a file."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `tee` writes standard input to `boot_log.txt` and stdout simultaneously, and redirecting stdout to `/dev/null` discards the terminal display."
    },
    {
      "id": "q-imp-1794831225795-100-n84c",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux process management and shell commands is CORRECT?",
      "options": [
        "`pidof [process_name]` immediately terminates all running instances of the named process.",
        "`nohup [command] &` runs a command in the foreground and terminates it as soon as the user logs out.",
        "`lsof` lists files currently opened by running processes, and `trap \"[commands]\" [signal]` executes commands when a specified signal is caught in a script.",
        "`watch -n 5 [command]` delays execution of a command once by 5 seconds and then exits."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `lsof` lists open files per process and `trap` catches signals in shell scripts, whereas `pidof` only prints PIDs, `nohup` ignores hangup signals, and `watch` repeats a command every `n` seconds."
    },
    {
      "id": "q-imp-1794831225795-101-y0zy",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which command displays the full path of the current working directory in Linux?",
      "options": [
        "`cd -`",
        "`dirs`",
        "`pwd`",
        "`whereis`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `pwd` (print working directory) outputs the absolute path of the directory you are currently in."
    },
    {
      "id": "q-imp-1794831225795-102-yfld",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Pressing ______ in a Linux terminal clears the entire terminal screen, performing the same visual action as the `clear` command.",
      "options": [
        "`Ctrl + L` (or typing `clear` / `tput clear`; in the cheat sheet, `clear` clears the terminal screen while `Ctrl + R` searches history)",
        "`clear`",
        "`Ctrl + G`",
        "`Ctrl + O`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Linux Commands Cheat Sheet, the `clear` command clears the terminal screen, whereas `Ctrl + R` recalls matching history commands and `Ctrl + G` exits history search."
    },
    {
      "id": "q-imp-1794831225795-103-ttfl",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following command sequence executed in a Bash terminal:\n\n```bash\nsleep 10 && echo \"Backup Complete\"\n```\n\nWhat happens when this command is run?",
      "options": [
        "`Backup Complete` is printed immediately, and the terminal pauses for 10 seconds afterward.",
        "Execution is postponed for 10 seconds, after which `Backup Complete` is printed to the terminal.",
        "`Backup Complete` is printed every 10 seconds indefinitely until `Ctrl + C` is pressed.",
        "The shell schedules `Backup Complete` to run at 10:00 AM via the `at` daemon."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `sleep [time-interval] && [command]` delays execution for the specified number of seconds before running the chained command."
    },
    {
      "id": "q-imp-1794831225795-104-fhrd",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux search, text processing, and variable commands is INCORRECT?",
      "options": [
        "`find /home -size +100M` locates files and directories larger than 100 MB inside `/home`.",
        "`wc -w filename` outputs the word count of `filename`.",
        "`unset VARIABLE_NAME` removes an environment or shell variable.",
        "`source filename` encrypts `filename` using GPG and removes the unencrypted original."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `source [file_name]` reads and executes commands from `filename` within the current shell environment, whereas `gpg -c` encrypts a file."
    },
    {
      "id": "q-imp-1794831225795-105-o4ey",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which command outputs the first 10 lines of a specified text file by default?",
      "options": [
        "`tail`",
        "`head`",
        "`more`",
        "`cut`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `head [file_name]` displays the first 10 lines of a file, whereas `tail` displays the last 10 lines."
    },
    {
      "id": "q-imp-1794831225795-106-862f",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "In a Linux terminal, typing `!!` executes ______.",
      "options": [
        "the manual page for the current shell",
        "the most recently run command again",
        "a forced shutdown of all background jobs",
        "a reverse search through `/etc/passwd`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Both the Linux Commands presentation and the Cheat Sheet list `!!` as the history shortcut to repeat the last executed command."
    },
    {
      "id": "q-imp-1794831225795-107-gyko",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following command executed in a Linux shell:\n\n```bash\ncat error.log >> archive.log\n```\n\nWhat does this operation perform?",
      "options": [
        "It overwrites `archive.log` with the contents of `error.log`.",
        "It appends the contents of `error.log` to the end of `archive.log` without overwriting existing data.",
        "It compares `error.log` and `archive.log` line by line and prints differences.",
        "It deletes `error.log` after compressing it into `archive.log`."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `>>` redirection operator appends standard output from `cat error.log` onto the end of `archive.log`."
    },
    {
      "id": "q-imp-1794831225795-108-vd6e",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux directory navigation, file inspection, and terminal shortcuts is INCORRECT?",
      "options": [
        "`cd -` switches the current working directory back to the previous directory.",
        "`Ctrl + W` cuts/erases one word before the cursor in the terminal line.",
        "`tput bold` enables bold text attributes in the terminal, while `tput lines` reports the number of terminal lines.",
        "`more` supports full backward scrolling and interactive search navigation, whereas `less` can only scroll forward one page at a time."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `less` provides full forward and backward navigation, whereas `more` is the simpler pager that displays file contents page by page."
    },
    {
      "id": "q-imp-1794831225795-109-xnuq",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which command outputs the contents of a file one page at a time in a Linux terminal?",
      "options": [
        "`touch`",
        "`more` (or `less`)",
        "`mkdir`",
        "`which`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Both `more [file_name]` and `less [file_name]` paginate file contents screen by screen, whereas `touch` creates an empty file[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-110-mami",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "To erase from the cursor position to the beginning of the current command line in a Bash terminal, you press ______.",
      "options": [
        "`Ctrl + K`",
        "`Ctrl + U`",
        "`Ctrl + Y`",
        "`Ctrl + W`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `Ctrl + U` cuts/erases the line before the cursor, whereas `Ctrl + K` cuts after the cursor and `Ctrl + Y` pastes from the clipboard[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-111-lq65",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following Linux shell command sequence:\n\n```bash\nhistory\n!102\nCtrl + R\n```\n\nWhat is the purpose of `Ctrl + R` in this context?",
      "options": [
        "It deletes the entire `.bash_history` file permanently.",
        "It interactively searches backward through command history to recall the last command matching typed characters.",
        "It reboots the Linux kernel into single-user recovery mode.",
        "It refreshes the `top` process list every second."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As documented in the Keyboard Shortcuts section of the cheat sheet, `Ctrl + R` recalls the last command matching the provided characters[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-112-qvdm",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux file comparison, system info, and job control commands is INCORRECT?",
      "options": [
        "`diff first_file second_file` compares two files and displays the line-by-line differences.",
        "`uname -r` displays kernel release information, whereas `uname -a` prints all system/kernel information.",
        "`pstree` displays running processes in a hierarchical tree-like diagram.",
        "`ulimit` displays the current month's calendar, whereas `cal` restricts user memory and file descriptor limits."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `cal` displays the calendar and `ulimit [flags] [limit]` views or restricts system resource limits for shell processes[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-113-sj9y",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which command creates a new empty directory in Linux?",
      "options": [
        "`touch`",
        "`mkdir`",
        "`cd`",
        "`pwd`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `mkdir [directory_name]` creates a new directory, whereas `touch` creates an empty file or updates timestamps[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-114-vg12",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Pressing ______ in a Linux terminal cancels or kills the currently running foreground operation.",
      "options": [
        "`Ctrl + Z`",
        "`Ctrl + C`",
        "`Ctrl + D`",
        "`Ctrl + Y`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Both the presentation and cheat sheet list `Ctrl + C` as the shortcut to cancel/kill the active foreground command[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-115-kmv6",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following Linux directory and file operations:\n\n```bash\ncp -r project_dir backup_dir\nmv old_report.txt final_report.txt\n```\n\nWhat is the difference between these two commands?",
      "options": [
        "`cp -r` deletes `project_dir` after moving it, whereas `mv` duplicates `old_report.txt`.",
        "`cp -r` recursively copies `project_dir` and its contents to `backup_dir`, whereas `mv` renames (or moves) `old_report.txt` to `final_report.txt`.",
        "`cp -r` compresses `project_dir` into a `.tar` archive, whereas `mv` compares two files.",
        "Both commands only create symbolic links without copying or moving data."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `cp -r` performs a recursive copy of directories, while `mv` moves or renames files and directories[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-116-ysxe",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux system monitoring, process control, and shell utilities is CORRECT?",
      "options": [
        "`uptime` displays the system's IP address and active DNS resolvers.",
        "`killall proc` terminates only the single process with PID equal to `proc`.",
        "`pmap` displays a memory usage map of processes, and `htop` provides an interactive, colorful process viewer.",
        "`wait` immediately kills all background jobs started with `nohup`."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** As listed under Processes in the Linux Commands Cheat Sheet, `pmap` shows process memory maps and `htop` is an interactive process viewer, whereas `uptime` shows system uptime/load and `wait` pauses until a background process completes[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-117-2pht",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which command creates an empty file (or updates the access/modification timestamps of an existing file)?",
      "options": [
        "`mkdir`",
        "`touch`",
        "`rm`",
        "`stat`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `touch [file_name]` creates a new zero-byte file if it does not already exist[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-118-42jx",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "To search for a command's executable path inside the directories listed in your `$PATH` environment variable, you run ______ `[command]`.",
      "options": [
        "`find`",
        "`which`",
        "`grep`",
        "`locate`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `which [command]` searches `$PATH` and prints the full path of the executable that will run when invoked[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-119-gcro",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following pipeline executed in a Linux directory:\n\n```bash\nls | xargs wc\n```\n\nWhat output does this pipeline produce?",
      "options": [
        "It deletes every file in the current directory and prints the total freed disk space.",
        "It lists the line, word, and character/byte counts for each file in the directory along with a total.",
        "It compresses every file in the directory into individual `.gz` archives.",
        "It searches all files for the string `wc` and prints matching filenames."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As documented in the Files section of the Linux Commands Cheat Sheet, `ls | xargs wc` counts lines, words, and characters for every file in the current directory[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-120-617l",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following `awk` and `sed` command usages from the Linux Commands Cheat Sheet is CORRECT?",
      "options": [
        "`sed 's/old/new/' file` prints the number of lines in `file` without modifying text.",
        "`awk '/pattern/ {print $0}' file` prints every line in `file` that matches `pattern`, while `sed 's/old/new/' file` performs text substitution.",
        "`awk` is used exclusively to partition hard drives, whereas `sed` manages systemd services.",
        "`cut -d ',' file` compresses `file` using bzip2 before printing it."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The cheat sheet defines `awk '/search_pattern/ {print $0}' [file_name]` for printing pattern-matching lines and `sed 's/[old_text]/[new_text]/' [file_name]` for find-and-replace[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-121-i54i",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which command displays the manual (built-in reference documentation) for any Linux command?",
      "options": [
        "`which`",
        "`man`",
        "`echo`",
        "`wall`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Running `man [command]` opens the built-in manual page explaining options and usage for that command."
    },
    {
      "id": "q-imp-1794831225795-122-a9lk",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "To recursively delete a directory and all its contents without being prompted for confirmation, you execute `rm ______ [directory_name]`.",
      "options": [
        "`-i`",
        "`-rf`",
        "`-l`",
        "`-s`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Combining `-r` (recursive) and `-f` (force) instructs `rm` to delete a directory tree immediately without confirmation prompts."
    },
    {
      "id": "q-imp-1794831225795-123-kvm3",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following file inspection commands:\n\n```bash\nwc -w report.txt\ncut -d ',' -f1 data.csv\n```\n\nWhat does each command output?",
      "options": [
        "`wc -w` deletes duplicate words in `report.txt`, while `cut -d ','` merges columns in `data.csv`.",
        "`wc -w` prints the number of words in `report.txt`, while `cut -d ','` extracts a comma-delimited section from `data.csv`.",
        "`wc -w` counts directories in `/`, while `cut -d ','` compresses `data.csv` with `gzip`.",
        "Both commands encrypt files using GPG symmetric keys."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `wc -w` counts words in a file, and `cut -d [delimiter]` slices fields from delimited lines and writes them to standard output."
    },
    {
      "id": "q-imp-1794831225795-124-71aa",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux file encryption, comparison, and archiving commands is INCORRECT?",
      "options": [
        "`gpg -c [file_name]` encrypts a file, and `gpg [file_name].gpg` decrypts it.",
        "`tar zxvf [file_name.tar.gz]` extracts a gzip-compressed tar archive.",
        "`ls -lt` sorts a formatted directory listing by modification time.",
        "`locate [name]` compiles C source code into an executable binary using `./configure` and `make`."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `locate [name]` searches an indexed database for files and directories matching a name, whereas `./configure && make && make install` compiles software from source."
    },
    {
      "id": "q-imp-1794831225795-125-2kyx",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "Which command creates a compressed `.bz2` file from an input file in Linux?",
      "options": [
        "`tar cf`",
        "`bzip2`",
        "`gunzip`",
        "`unzip`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `bzip2 [file_name]` compresses a file into `.bz2` format, whereas `bunzip2` decompresses `.bz2` files."
    },
    {
      "id": "q-imp-1794831225795-126-1f2b",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "easy",
      "question": "To search for a specific text pattern inside a single file and print matching lines, you run ______ `[search_pattern] [file_name]`.",
      "options": [
        "`which`",
        "`grep`",
        "`touch`",
        "`rmdir`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `grep` searches for lines matching a specified pattern inside files."
    },
    {
      "id": "q-imp-1794831225795-127-zwxv",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "moderate",
      "question": "Examine the following piped data-slicing command from the Linux Commands Cheat Sheet:\n\n```bash\ncat employees.txt | cut -d ':' -f1\n```\n\nWhat does the `-d ':'` flag specify in this command?",
      "options": [
        "It deletes every line containing a colon character.",
        "It sets the colon (`:`) as the field delimiter used to split each line before extracting fields.",
        "It decrypts `employees.txt` using a colon-separated passphrase.",
        "It sorts lines in descending alphabetical order."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In `[data] | cut -d [delimiter]`, `-d` defines the character delimiter separating fields in piped or file input."
    },
    {
      "id": "q-imp-1794831225795-128-fsps",
      "topicId": "top-1794831229482-93-8k4",
      "difficulty": "hard",
      "question": "Which of the following archive and source-compilation commands from the Linux Commands Cheat Sheet is INCORRECT?",
      "options": [
        "`tar cf archive.tar dir/` creates an uncompressed tar archive of `dir/`.",
        "`tar czf archive.tar.gz dir/` creates a gzip-compressed tar archive.",
        "`whereis [command]` locates the binary, source, and manual page files for a command.",
        "`make install` extracts a `.tar.gz` archive before running `./configure`."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Installing from source follows the order: extract (`tar zxvf`), enter directory (`cd`), configure (`./configure`), compile (`make`), and finally install (`make install`)."
    },
    {
      "id": "q-imp-1794831225795-129-nr8h",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command searches recursively for a specified text pattern across all files inside a target directory?",
      "options": [
        "`find /var/log -name \"error\"`",
        "`grep -r \"error\" /var/log`",
        "`locate -r \"error\"`",
        "`which \"error\"`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Passing the `-r` flag to `grep` searches for matching text patterns recursively through every file in the specified directory tree."
    },
    {
      "id": "q-imp-1794831225795-130-iwly",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "Consider the following Linux commands run on a script file:\n\n```bash\nchmod 755 backup.sh\nls -l backup.sh\n```\n\nWhich symbolic permission string will be displayed for `backup.sh`?",
      "options": [
        "`-rwxrwxrwx`",
        "`-rwxrw-rw-`",
        "`-rwxr-xr-x`",
        "`-rw-r--r--`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Octal `755` grants read, write, and execute (`7` = `rwx`) to the owner, and read and execute (`5` = `r-x`) to both group and others."
    },
    {
      "id": "q-imp-1794831225795-131-myp9",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "To securely overwrite a sensitive file so its contents cannot be recovered before deleting it, you should run the ______ command.",
      "options": [
        "`rm -rf [file_name]`",
        "`shred -u [file_name]`",
        "`gpg -c [file_name]`",
        "`dd if=/dev/zero`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `shred -u` command overwrites a file's data to prevent forensic recovery and then unlinks (deletes) the file."
    },
    {
      "id": "q-imp-1794831225795-132-k0rd",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Which of the following statements regarding package managers, networking, and disk utilities is INCORRECT?",
      "options": [
        "`dpkg -i package.deb` installs a local Debian package, while `rpm -i package.rpm` installs a local RPM package.",
        "`dig -x [IP_address]` performs a reverse DNS lookup on an IP address.",
        "`badblocks -s /dev/[device_name]` scans a storage device for unreadable blocks.",
        "`fsck /dev/[device_name]` should be executed while the target disk or partition is actively mounted in read-write mode."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Running `fsck` on a mounted read-write filesystem can cause severe corruption; it must be run on an unmounted disk or partition."
    },
    {
      "id": "q-imp-1794831225795-133-ifl8",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command modifies the group ownership of a file or directory without changing its user owner?",
      "options": [
        "`chmod`",
        "`usermod`",
        "`chgrp`",
        "`groupadd`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The `chgrp [group_name] [file/directory]` command updates the group association of a file or directory."
    },
    {
      "id": "q-imp-1794831225795-134-9qmc",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "Consider the following commands executed by an administrator:\n\n```bash\nchmod 766 report.txt\nls -l report.txt\n```\n\nWhat permissions are assigned to the owner, group, and others on `report.txt`?",
      "options": [
        "Owner: `rwx`, Group: `r-x`, Others: `r-x`",
        "Owner: `rwx`, Group: `rw-`, Others: `rw-`",
        "Owner: `rwx`, Group: `rwx`, Others: `rwx`",
        "Owner: `rw-`, Group: `r--`, Others: `r--`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Octal `766` translates to `7` (`rwx`) for the owner, `6` (`rw-`) for the group, and `6` (`rw-`) for others."
    },
    {
      "id": "q-imp-1794831225795-135-z88a",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "To inspect active TCP and UDP listening ports along with their associated program names on a Linux host, you can run `netstat ______`.",
      "options": [
        "`-r`",
        "`-tuln` or `-pnl` (listed as `-tuln` / `-pnitu` in the cheat sheet)",
        "`-i`",
        "`-s`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As shown in the Linux Commands Cheat Sheet, `netstat -tuln` and `netstat -pnitu` display active TCP/UDP ports and listening services."
    },
    {
      "id": "q-imp-1794831225795-136-kacq",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Which of the following statements about Linux hardware, archive, and network utilities is INCORRECT?",
      "options": [
        "`tar czf archive.tar.gz [dir]` creates a gzip-compressed tar archive, while `tar xf archive.tar` extracts an archive.",
        "`lspci -tv` displays PCI devices in a tree-like diagram, and `lsusb -tv` displays USB devices in a tree-like diagram.",
        "`sudo dmidecode` retrieves hardware information directly from the system BIOS.",
        "`hdparm -tT /dev/[device_name]` tests a disk for bad sectors and repairs corrupted filesystem inodes."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `hdparm -tT` conducts a cached and buffered read-speed benchmark on a disk device, whereas `badblocks` checks for unreadable blocks and `fsck` checks filesystems."
    },
    {
      "id": "q-imp-1794831225795-137-ljbo",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command displays free and used system memory in human-readable format?",
      "options": [
        "`df -h`",
        "`free -h`",
        "`du -sh`",
        "`lscpu`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `free -h` reports total, used, and available physical and swap memory in human-readable units, whereas `df -h` reports mounted filesystem disk space."
    },
    {
      "id": "q-imp-1794831225795-138-2jso",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "Consider the following file permission and ownership commands:\n\n```bash\nchmod 777 deploy.sh\nchown alice:developers deploy.sh\n```\n\nWhat is the resulting state of `deploy.sh`?",
      "options": [
        "Only `alice` can execute `deploy.sh`, and its group is set to `root`.",
        "Everyone (owner, group, and others) has read, write, and execute (`rwxrwxrwx`) permissions, and ownership is assigned to user `alice` and group `developers`.",
        "The owner has full permissions while group and others have read-only access, owned by `developers`.",
        "All permissions are revoked (`---------`), and `alice` is deleted from the `developers` group."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `chmod 777` grants `rwxrwxrwx` permissions to all users, and `chown user:group` sets both user and group ownership simultaneously."
    },
    {
      "id": "q-imp-1794831225795-139-elje",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "To transfer a local file named `data.csv` securely to `/tmp/` on a remote server `192.168.1.50` as user `admin` over SSH, you run ______ `data.csv admin@192.168.1.50:/tmp/`.",
      "options": [
        "`ftp`",
        "`scp`",
        "`telnet`",
        "`wget`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `scp [source_file] [user]@[remote_host]:[destination_path]` securely copies files between local and remote hosts over SSH."
    },
    {
      "id": "q-imp-1794831225795-140-2wp9",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux package managers and remote access protocols is CORRECT?",
      "options": [
        "Telnet connects on default port 22 with full encryption, whereas SSH connects on default port 23 in plaintext.",
        "`snap install` compiles software directly from `.tar.gz` source code using `./configure`, `make`, and `make install`.",
        "`yum list installed` lists packages installed via YUM on Red Hat/CentOS/Fedora systems, while `dpkg -l` lists packages installed via `dpkg` on Debian/Ubuntu systems.",
        "`curl -O [link]` is exclusively used to generate SSH key pairs on a local host."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `yum list installed` and `dpkg -l` list installed packages on RPM-based and Debian-based systems respectively, whereas SSH uses port 22 and Telnet uses port 23."
    },
    {
      "id": "q-imp-1794831225795-141-hdr6",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command queries DNS servers to resolve a domain name to its IP address (and vice versa)?",
      "options": [
        "`ping`",
        "`nslookup` (or `dig` / `host`)",
        "`ifconfig`",
        "`netstat`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `nslookup [domain_name]` (along with `dig` and `host`) acts as a domain name resolver to query DNS records."
    },
    {
      "id": "q-imp-1794831225795-142-mlgj",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "Consider the following command run on a file named `notes.txt`:\n\n```bash\nchmod 766 notes.txt\n```\n\nWhich user class receives **execute (`x`)** permission on `notes.txt`?",
      "options": [
        "Owner, group, and others",
        "Owner only",
        "Group and others only",
        "No one (none of the user classes)"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In `766`, only the first digit (`7` = `rwx`) includes the execute bit (`1`), while `6` (`rw-`) grants only read and write to group and others."
    },
    {
      "id": "q-imp-1794831225795-143-1j6f",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "To display detailed system memory statistics directly from the virtual kernel filesystem, you can run `cat ______`.",
      "options": [
        "`/proc/cpuinfo`",
        "`/proc/meminfo`",
        "`/proc/mounts`",
        "`/etc/fstab`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As shown in the Hardware Information section of the cheat sheet, `cat /proc/meminfo` outputs detailed system memory metrics, while `/proc/cpuinfo` shows CPU details."
    },
    {
      "id": "q-imp-1794831225795-144-9faa",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Which of the following statements about Linux user management, networking, and archive utilities is CORRECT?",
      "options": [
        "`useradd [user_name]` deletes an existing user account and removes their home directory.",
        "`ip address add [IP] dev eth0` performs a reverse DNS lookup on the specified IP address.",
        "`sudo usermod -aG [group_name] [user_name]` appends a user to a supplementary group without removing existing group memberships.",
        "`gunzip file.gz` compresses an uncompressed file into `.gz` format, whereas `gzip file.gz` decompresses it."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `usermod -aG` adds a user to an additional group, whereas `userdel` removes users, `ip address add` assigns an IP to an interface, and `gunzip` decompresses `.gz` files."
    },
    {
      "id": "q-imp-1794831225795-145-v7sg",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command displays a list of currently logged-in users along with their terminal and login activity?",
      "options": [
        "`id`",
        "`w` (or `who`)",
        "`passwd`",
        "`groupadd`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `w` and `who` display currently logged-in users (with `w` also showing their active processes), whereas `id` prints UID/GID numbers[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-146-j97y",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "Consider the following command run on a file named `config.ini`:\n\n```bash\nchmod 755 config.ini\n```\n\nWhich permission set is granted to **group** and **others**?",
      "options": [
        "Read, write, and execute (`rwx`)",
        "Read and execute (`r-x`)",
        "Read and write (`rw-`)",
        "Read only (`r--`)"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In octal mode `755`, the owner gets `7` (`rwx`) while group and others each get `5` (`4 + 1` = `r-x`)[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-147-0weg",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "To interactively download or transfer files over an encrypted SSH session using the SSH File Transfer Protocol, you run ______ `[user_name]@[host]`.",
      "options": [
        "`ftp`",
        "`sftp`",
        "`telnet`",
        "`whois`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `sftp [user_name]@[host]` opens an interactive encrypted file transfer session over SSH, unlike unencrypted `ftp` or `telnet`[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-148-864z",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux hardware inspection, archiving, and DNS tools is INCORRECT?",
      "options": [
        "`lscpu` displays CPU architecture details, and `lsblk` lists information about block storage devices.",
        "`tar cf archive.tar [dir]` creates an uncompressed tar archive, whereas `tar xf archive.tar` extracts it.",
        "`whois [domain_name]` retrieves registration details about an internet domain.",
        "`findmnt` formats a newly attached USB partition with the `ext4` filesystem."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `findmnt` displays mounted filesystems and their target mount points; it does not format partitions[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-149-3lo8",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command tests network reachability and connectivity to a remote host by sending ICMP echo requests?",
      "options": [
        "`nslookup`",
        "`ping`",
        "`ifconfig`",
        "`whois`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `ping [remote_host]` checks basic network connectivity to a target host[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-150-6nwx",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "Consider the following ownership command executed by root:\n\n```bash\nchown bob:staff report.pdf\n```\n\nWhat change does this command apply to `report.pdf`?",
      "options": [
        "It changes only the file permissions to `rwxr-xr-x`.",
        "It sets the user owner of `report.pdf` to `bob` and the group owner to `staff`.",
        "It adds user `bob` to the `staff` group in `/etc/group`.",
        "It creates a new user named `bob` and a new group named `staff`."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As documented under File Permissions in the cheat sheet, `chown [user_name]:[group_name] [file_name]` changes both the user and group ownership of a file[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-151-3hc8",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "To display all currently mounted filesystems and their device/mount details in Linux, you can run `mount` or inspect `cat ______`.",
      "options": [
        "`/proc/cpuinfo`",
        "`/proc/mounts`",
        "`/proc/meminfo`",
        "`/etc/os-release`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Hardware Information section of the cheat sheet specifies `cat /proc/mounts` to view currently mounted filesystems[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-152-qt3z",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux user management, compression, and package commands is INCORRECT?",
      "options": [
        "`sudo groupmod -n new_name old_name` renames an existing user group.",
        "`bzip2 file_name` compresses a file into `.bz2` format, and `bunzip2 file_name.bz2` decompresses it.",
        "`flatpak list` displays installed Flatpak packages, while `sudo snap list` displays installed Snap packages.",
        "`finger [user_name]` permanently deletes a user account and locks their password in `/etc/shadow`."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `finger [user_name]` displays profile and login information about a user, whereas `userdel` deletes user accounts[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-153-ihhu",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command displays a real-time, continuously updating view of all running Linux processes and system resource usage?",
      "options": [
        "`ps`",
        "`top`",
        "`pwd`",
        "`cal`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `top` provides a live interactive view of running processes, whereas `ps` outputs a static snapshot[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-154-en0q",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "Suppose you launch a long-running script in the background using `nohup ./backup.sh &` and later want to inspect or schedule one-time tasks at a specific clock time (`hh:mm`). Which command schedules a one-time job at a given time?",
      "options": [
        "`watch -n 60 ./backup.sh`",
        "`at 23:30`",
        "`sleep 2330`",
        "`fg 1`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As listed in the Shell Commands section of the cheat sheet, `at [hh:mm]` schedules a job to execute at a specific clock time (using `Ctrl+D` to exit the prompt)[cite: 5]."
    },
    {
      "id": "q-imp-1794831225795-155-jisv",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Consider the following terminal job control sequence:\n\n```bash\n./data_sync.sh\n# User presses Ctrl + Z\nbg\nfg %1\n```\n\nWhat happens at each stage of this sequence?",
      "options": [
        "`Ctrl + Z` permanently kills `./data_sync.sh`, `bg` deletes the script, and `fg %1` restarts the computer.",
        "`Ctrl + Z` suspends the foreground job, `bg` resumes it in the background, and `fg %1` brings job 1 back to the foreground.",
        "`Ctrl + Z` backgrounds the job silently, `bg` pauses it, and `fg %1` sends a `SIGKILL` signal.",
        "`Ctrl + Z` logs out of the terminal, `bg` opens a new SSH tunnel, and `fg %1` prints environment variables."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Pressing `Ctrl + Z` stops (suspends) the active foreground process, `bg` resumes stopped jobs in the background, and `fg [job]` brings a specific job back to the foreground[cite: 3, 5]."
    },
    {
      "id": "q-imp-1794831225795-156-ak6g",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command prints all current environment variables and their values to the terminal screen?",
      "options": [
        "`hostname`",
        "`printenv`",
        "`uname -r`",
        "`uptime`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `printenv` displays all exported environment variables in the current shell session."
    },
    {
      "id": "q-imp-1794831225795-157-vmtb",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "In a Bash shell, `declare VAR=\"10\"` defines a variable, `export VAR` makes it available to child processes, and ______ `VAR` removes the variable completely.",
      "options": [
        "`let`",
        "`unset`",
        "`alias`",
        "`set`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Variables section of the Linux Commands Cheat Sheet, `unset [variable_name]` deletes a shell or environment variable."
    },
    {
      "id": "q-imp-1794831225795-158-t1y5",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Consider the following system administration commands from the Linux Commands Cheat Sheet:\n\n```bash\nwatch -n 2 free -h\nmodprobe usb_storage\nlast reboot\n```\n\nWhich statement accurately explains what these three commands do?",
      "options": [
        "The first reboots every 2 seconds, the second deletes USB drivers, and the third shuts down the system.",
        "The first runs `free -h` repeatedly every 2 seconds, the second loads the `usb_storage` kernel module, and the third lists system reboot history.",
        "The first limits RAM to 2 GB, the second formats a USB drive, and the third displays the current calendar.",
        "The first pauses for 2 minutes, the second lists PCI devices, and the third prints logged-in users."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `watch -n [seconds] [command]` executes a command at fixed intervals, `modprobe` adds a kernel module, and `last reboot` displays past reboot timestamps."
    },
    {
      "id": "q-imp-1794831225795-159-zjk8",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "easy",
      "question": "Which command displays the kernel release version string of a running Linux system?",
      "options": [
        "`hostname`",
        "`uname -r`",
        "`cal`",
        "`whoami`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `uname -r` prints the active Linux kernel release version, whereas `uname -a` prints all system and kernel details."
    },
    {
      "id": "q-imp-1794831225796-160-stul",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "moderate",
      "question": "In a Bash shell, `export VAR` exports a variable to child processes, `echo $VAR` prints its value, and ______ lists the names and values of all shell variables and functions.",
      "options": [
        "`unset`",
        "`set`",
        "`let`",
        "`alias`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Variables section of the Linux Commands Cheat Sheet, `set` lists all shell variables and functions."
    },
    {
      "id": "q-imp-1794831225796-161-dpgy",
      "topicId": "top-1794831229482-129-8ru",
      "difficulty": "hard",
      "question": "Consider the following terminal history and control shortcuts from the Linux Commands Cheat Sheet:\n\n```text\n\nShortcut 1: Ctrl + O\n\nShortcut 2: Ctrl + G\n\nShortcut 3: Ctrl + K\n```\n\nWhich mapping accurately describes all three shortcuts?",
      "options": [
        "`Ctrl + O`: Logout; `Ctrl + G`: Kill process; `Ctrl + K`: Clear screen",
        "`Ctrl + O`: Run the previously recalled history command; `Ctrl + G`: Exit command history search without running a command; `Ctrl + K`: Cut text from cursor to end of line",
        "`Ctrl + O`: Open file in `nano`; `Ctrl + G`: Go to line number; `Ctrl + K`: Undo last edit",
        "`Ctrl + O`: Paste from clipboard; `Ctrl + G`: Suspend job; `Ctrl + K`: Erase word before cursor"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Under Keyboard Shortcuts in the Linux Commands Cheat Sheet, `Ctrl + O` runs a recalled command, `Ctrl + G` exits history mode, and `Ctrl + K` cuts from the cursor to the end of the line."
    },
    {
      "id": "q-imp-1794831225796-162-c674",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "Who originally created the `vi` (Visual Editor) in 1976?",
      "options": [
        "Linus Torvalds",
        "Ken Thompson",
        "Bill Joy",
        "Richard Stallman"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Bill Joy created the `vi` editor in 1976 while at UC Berkeley before co-founding Sun Microsystems."
    },
    {
      "id": "q-imp-1794831225796-163-ofjp",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "In the `vi` editor, pressing `Esc` and typing `:%s/old/new/g` in Last Line Mode performs a ______ across the entire file.",
      "options": [
        "case-insensitive search for the word `old`",
        "global search and replace of every occurrence of `old` with `new`",
        "deletion of all lines containing `old` or `new`",
        "save and quit operation creating a backup file named `new`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `:%s/old/new/g` command substitutes (`s`) all occurrences (`g`) of `old` with `new` across every line (`%`) in the buffer."
    },
    {
      "id": "q-imp-1794831225796-164-6jih",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "Which of the following statements accurately contrasts `nano` and `vi`?",
      "options": [
        "`vi` displays available shortcut commands at the bottom of the screen by default, whereas `nano` hides all shortcuts.",
        "`nano` opens in Command Mode by default and requires pressing `i` to type text, whereas `vi` opens directly in typing mode.",
        "`nano` starts directly in typing mode and uses `Ctrl+O` to save and `Ctrl+X` to exit, whereas `vi` starts in Command Mode and uses `:wq` to save and quit.",
        "Both classic `vi` and `vim` lack syntax highlighting and plugin support."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `nano` is beginner-friendly with a default typing mode, on-screen shortcut hints (`Ctrl+O` write out, `Ctrl+X` exit), whereas `vi` defaults to Command Mode and `vim` adds syntax highlighting and plugins."
    },
    {
      "id": "q-imp-1794831225796-165-76z3",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "When you open a new or blank file in the `vi` editor, what does the `~` (tilde) character at the beginning of each line indicate?",
      "options": [
        "The line contains hidden syntax errors.",
        "The line is blank and not yet part of the file.",
        "The file is opened in read-only mode.",
        "The cursor is currently in Insert Mode on that line."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `vi` displays a `~` character at the start of every empty screen line below the end of the buffer to indicate blank lines."
    },
    {
      "id": "q-imp-1794831225796-166-j1t9",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "In the `nano` text editor, pressing ______ cuts (deletes) the entire current line, while pressing ______ pastes the cut text.",
      "options": [
        "`Ctrl + X` and `Ctrl + V`",
        "`Ctrl + K` and `Ctrl + U`",
        "`Alt + 6` and `Ctrl + Y`",
        "`Ctrl + C` and `Ctrl + P`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Nano Cheat Sheet, `Ctrl + K` cuts/deletes the current line or selected text, and `Ctrl + U` pastes it."
    },
    {
      "id": "q-imp-1794831225796-167-c8g1",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Which of the following `vi` command-line invocation options is INCORRECT?",
      "options": [
        "`view file` and `vi -R file` both open `file` in read-only mode.",
        "`vi -r file` recovers `file` and recent edits after a system crash.",
        "`vi + file` opens `file` with the cursor positioned at the last line.",
        "`vi +/pattern file` deletes every line matching `pattern` before opening `file`."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Invoking `vi +/pattern file` opens `file` and places the cursor at the first occurrence of `pattern`; it does not delete any lines."
    },
    {
      "id": "q-imp-1794831225796-168-73rs",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "Which command-line invocation opens a file named `config.txt` in `vi` in read-only mode so accidental edits are prevented?",
      "options": [
        "`vi -r config.txt`",
        "`view config.txt` (or `vi -R config.txt`)",
        "`vi + config.txt`",
        "`vi -w config.txt`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Both `view file` and `vi -R file` open the specified file in `vi` read-only mode, whereas `vi -r` is used for crash recovery."
    },
    {
      "id": "q-imp-1794831225796-169-qclq",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "In the `nano` editor, pressing ______ allows you to search for text, while pressing ______ initiates a search-and-replace operation.",
      "options": [
        "`Ctrl + F` and `Ctrl + H`",
        "`Ctrl + W` and `Ctrl + \\`",
        "`Alt + U` and `Alt + E`",
        "`Ctrl + A` and `Ctrl + E`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As listed in the Nano Cheat Sheet, `Ctrl + W` searches for text (and `Alt + W` moves to the next match), while `Ctrl + \\` performs search and replace."
    },
    {
      "id": "q-imp-1794831225796-170-flmt",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Which of the following statements comparing `vi`, `vim`, and `nano` is INCORRECT?",
      "options": [
        "`vim` stands for \"Vi Improved\" and adds syntax highlighting, multiple undo levels, and plugin support over classic `vi`.",
        "Classic `vi` is case-sensitive and operates in three main modes: Command Mode, Insert Mode, and Last Line Mode.",
        "In `nano`, `Alt + U` undoes the last action and `Alt + E` redoes the last action.",
        "In `vi`, `:q!` saves all modified buffers to disk before forcefully exiting the editor."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** In `vi`, `:q!` quits immediately while discarding all unsaved changes; `:wq`, `:x`, or `ZZ` are used to save and quit."
    },
    {
      "id": "q-imp-1794831225796-171-gm8s",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "In the `nano` text editor, which shortcut displays a prompt to jump the cursor directly to a specific line and column location?",
      "options": [
        "`Ctrl + A`",
        "`Ctrl + _`",
        "`Ctrl + 6`",
        "`Alt + A`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Nano Cheat Sheet, `Ctrl + _` moves the cursor to a specified line/column location, while `Ctrl + A` moves to the start of the line."
    },
    {
      "id": "q-imp-1794831225796-172-j782",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "In `vi` Command Mode, typing `/error` and pressing `Enter` searches ______ for the pattern `error`, and pressing ______ jumps to the next match in the same direction.",
      "options": [
        "backward; `N`",
        "forward; `n`",
        "forward; `f`",
        "backward; `F`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `/pattern` searches forward through the file, and lowercase `n` repeats the search in the same direction (while `?pattern` searches backward and `N` reverses direction)."
    },
    {
      "id": "q-imp-1794831225796-173-t73h",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Which of the following statements regarding `vi` and `nano` features and commands is INCORRECT?",
      "options": [
        "Classic `vi` is an unformatted text editor with no fonts or graphics, and comes preinstalled on virtually every Unix/Linux system.",
        "Multiple files can be opened sequentially in `vi` using `vi file1 file2 file3`.",
        "In `nano`, `Alt + A` sets a text selection marker, `Alt + 6` copies the selected text, and `Ctrl + 6` cancels the selection.",
        "In `vi`, `:set ic` enables line numbering on the left margin, whereas `:set num` makes pattern searches case-insensitive."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `:set num` (or `:set number`) displays line numbers, whereas `:set ic` enables ignore-case (`ic`) for case-insensitive searches."
    },
    {
      "id": "q-imp-1794831225796-174-irpy",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "In the `nano` text editor, which keyboard shortcut saves the current file modifications (\"Write Out\")?",
      "options": [
        "`Ctrl + X`",
        "`Ctrl + O`",
        "`Ctrl + K`",
        "`Ctrl + W`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Nano Cheat Sheet, `Ctrl + O` saves modifications to disk, whereas `Ctrl + X` exits the editor[cite: 2]."
    },
    {
      "id": "q-imp-1794831225796-175-o1in",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "In `vi` Command Mode, pressing `i` inserts text ______ the cursor, whereas pressing `a` inserts text ______ the cursor.",
      "options": [
        "at the beginning of the line; at the end of the line",
        "before; after",
        "on a new line above; on a new line below",
        "after; before"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In `vi`, `i` enters Insert Mode before the current cursor character, whereas `a` (append) enters Insert Mode after the cursor character[cite: 2, 7]."
    },
    {
      "id": "q-imp-1794831225796-176-y6j9",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Which of the following statements regarding `vi` and `nano` shortcuts and modes is INCORRECT?",
      "options": [
        "In `nano`, `Ctrl + A` moves the cursor to the start of the line, and `Ctrl + E` moves it to the end of the line.",
        "In `nano`, `Ctrl + Y` and `Ctrl + V` scroll page up and page down respectively.",
        "In `vi`, pressing `Esc` returns the editor from Insert Mode back to Command Mode.",
        "In `vi`, typing `:w!` quits the editor immediately without saving any changes."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** In `vi`, `:w!` writes (saves) the file by overriding read-only protection, whereas `:q!` quits without saving[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-177-7xgf",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "In the `nano` text editor, which keyboard shortcut exits the editor?",
      "options": [
        "`Ctrl + O`",
        "`Ctrl + X`",
        "`Ctrl + K`",
        "`Ctrl + U`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Nano Cheat Sheet, `Ctrl + X` exits `nano` (prompting to save if modified), while `Ctrl + O` saves the file[cite: 2]."
    },
    {
      "id": "q-imp-1794831225796-178-2we2",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "In `vi` Last Line Mode, typing `:w` saves the current file, `:q` quits the editor, and ______ saves the file and quits in a single command.",
      "options": [
        "`:q!`",
        "`:wq` (or `:x` / `ZZ`)",
        "`:w!`",
        "`:e!`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `:wq` (as well as `:x` in Last Line Mode or `ZZ` in Command Mode) writes changes and exits `vi`[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-179-kzqf",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Which of the following statements comparing `vi`, `vim`, and `nano` is CORRECT?",
      "options": [
        "`nano` does not support undo or redo actions once text is modified.",
        "Classic `vi` provides built-in syntax highlighting and plugin management, whereas `vim` removes them.",
        "In `vi`, `:show mode` displays the active editor mode, and `Q` quits `vi` and invokes the `ex` line editor.",
        "In `nano`, `Arrow keys` cannot move the cursor; users must use `h`, `j`, `k`, and `l`."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** As shown in the `vi` presentation and cheat sheet, `:show mode` displays modes in `vi` and `Q` switches to `ex`, while `nano` supports arrow keys and undo/redo (`Alt+U`/`Alt+E`)[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-180-v18k",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "Which protocol and default port are used for encrypted remote terminal login in Linux, as opposed to unencrypted Telnet on port 23?",
      "options": [
        "FTP on port 21",
        "SSH on port 22",
        "HTTP on port 80",
        "DNS on port 53"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The SSH Login section of the cheat sheet specifies that `ssh` connects securely over default port 22, whereas `telnet` uses unencrypted port 23[cite: 5]."
    },
    {
      "id": "q-imp-1794831225796-181-sppu",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "To synchronize the contents of a local folder `src_data/` with a backup directory on a remote server over SSH while preserving attributes (archive mode), you run `rsync ______ src_data/ user@host:/backup/`.",
      "options": [
        "`-x`",
        "`-a`",
        "`-p`",
        "`-i`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The cheat sheet specifies `rsync -a [source_directory] [user]@[remote_host]:[destination_directory]` for synchronizing directory contents with a backup directory[cite: 5]."
    },
    {
      "id": "q-imp-1794831225796-182-b7e1",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "Which command displays detailed hardware configuration information (such as motherboard, memory slots, and buses) or CPU architecture details on a Linux system?",
      "options": [
        "`last reboot`",
        "`lshw` (or `lscpu`)",
        "`printenv`",
        "`wall`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Under Hardware Information in the cheat sheet, `lshw` lists full hardware configuration details and `lscpu` shows CPU information[cite: 5]."
    },
    {
      "id": "q-imp-1794831225796-183-2a2m",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Examine the following network diagnostic commands from the Linux Commands Cheat Sheet:\n\n```bash\nip address add 192.168.10.25/24 dev eth0\ndig -x 192.168.10.25\nhostname -I\n```\n\nWhich statement accurately describes what these three commands perform?",
      "options": [
        "All three commands delete IP configurations and flush the local DNS cache.",
        "The first assigns an IP address to `eth0`, the second performs a reverse DNS lookup on that IP, and the third displays all local IP addresses of the host.",
        "The first pings `eth0`, the second downloads a file from `192.168.10.25`, and the third renames the system hostname.",
        "The first starts the SSH daemon, the second lists open TCP sockets, and the third displays domain WHOIS records."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In the Network section of the cheat sheet, `ip address add` assigns an IP to an interface, `dig -x [IP_address]` performs reverse DNS lookup, and `hostname -I` prints local IP addresses[cite: 5]."
    },
    {
      "id": "q-imp-1794831225796-184-cx96",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "Which command downloads files non-interactively from web or FTP servers directly via a URL in the terminal?",
      "options": [
        "`scp`",
        "`wget`",
        "`ssh-keygen`",
        "`ping`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `wget [link]` downloads files directly from HTTP, HTTPS, or FTP URLs into the current working directory."
    },
    {
      "id": "q-imp-1794831225796-185-u6b7",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "To check free and used disk space on mounted filesystems in human-readable units, you run `df -h`, whereas to check available and used **inode** counts on mounted filesystems, you run `df ______`.",
      "options": [
        "`-a`",
        "`-i`",
        "`-l`",
        "`-s`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `df -i` displays inode utilization and free inode counts across mounted filesystems, while `df -h` shows block storage space."
    },
    {
      "id": "q-imp-1794831225796-186-ai7t",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux disk, network, and remote access commands is INCORRECT?",
      "options": [
        "`ssh-keygen` generates public/private SSH key pairs for key-based authentication.",
        "`hdparm -i /dev/[device_name]` displays hardware identification and configuration details for a disk device.",
        "`whois [domain_name]` queries domain registration information, while `host [domain_name]` performs an IP lookup.",
        "`showmount` partitions raw block devices and creates LVM logical volumes."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `showmount` displays NFS mount information for a server, whereas `fdisk -l` displays disk partitions."
    },
    {
      "id": "q-imp-1794831225796-187-mm5n",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "easy",
      "question": "Which command displays disk partition tables, partition sizes, and partition types on attached storage drives?",
      "options": [
        "`df -i`",
        "`fdisk -l`",
        "`du -sh`",
        "`free -h`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `fdisk -l` lists disk partitions, their sizes, and filesystem types across block devices."
    },
    {
      "id": "q-imp-1794831225796-188-n6x9",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "moderate",
      "question": "To display all active listening network ports along with associated TCP/UDP sockets and program names, you can run `netstat ______`.",
      "options": [
        "`-r`",
        "`-tuln` (or `-pnitu`)",
        "`-c`",
        "`-g`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Network section of the Linux Commands Cheat Sheet lists `netstat -tuln` and `netstat -pnitu` for viewing active listening TCP/UDP ports and programs."
    },
    {
      "id": "q-imp-1794831225796-189-1two",
      "topicId": "top-1794831229482-162-sin",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux DNS, hardware, and remote file transfer commands is CORRECT?",
      "options": [
        "`dig [domain_name]` transfers files interactively over SFTP, whereas `sftp` queries DNS records.",
        "`curl -O [link]` tests a hard drive's sequential read speed in MB/s.",
        "`hdparm -tT /dev/[device_name]` conducts a read speed test on a storage device, while `badblocks -s /dev/[device_name]` scans for unreadable blocks.",
        "`ftp [remote_host]` encrypts all traffic using SSH key pairs generated by `ssh-keygen`."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `hdparm -tT` benchmarks disk read speed and `badblocks -s` scans for bad sectors, whereas `dig` queries DNS, `curl -O` downloads URLs, and standard `ftp` is unencrypted."
    },
    {
      "id": "q-imp-1794831225796-190-c3r4",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "In `vi` Command Mode, which four keys move the cursor left, down, up, and right respectively?",
      "options": [
        "`a, s, w, d`",
        "`h, j, k, l`",
        "`j, k, l, h`",
        "`w, b, e, 0`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In `vi`, `h` moves left, `j` moves down, `k` moves up, and `l` moves right."
    },
    {
      "id": "q-imp-1794831225796-191-8bpc",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Suppose your cursor is currently on line 10 of a 50-line file in `vi` Command Mode and you execute the following sequence of commands:\n\n```bash\n3dd\nG\np\n```\n\nWhat is the resulting effect on the file?",
      "options": [
        "Line 10 is copied three times and pasted at line 1 of the file.",
        "Three words are deleted from line 10 and pasted before the cursor on line 10.",
        "Three lines starting at line 10 are deleted and pasted immediately below the last line of the file.",
        "All lines from line 10 to the end of the file are deleted and undone."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `3dd` deletes 3 lines starting at the current line, `G` moves the cursor to the last line of the file, and `p` puts the deleted lines after the cursor line."
    },
    {
      "id": "q-imp-1794831225796-192-88e3",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following `vi` commands and descriptions from the Vi Cheat Sheet is INCORRECT?",
      "options": [
        "`:30,60w newfile` writes lines 30 through 60 into `newfile`.",
        "`:e#` switches to editing the alternate file.",
        "`U` undoes all changes made to the current line, whereas `u` undoes only the last edit.",
        "`x` deletes the character to the left of the cursor, whereas `X` deletes the character under the cursor."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Lowercase `x` deletes the character at the current cursor position, while uppercase `X` deletes the character to the left of the cursor."
    },
    {
      "id": "q-imp-1794831225796-193-xr5e",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "In `vi` Command Mode, which key opens a new blank line directly above the current cursor line and enters Insert Mode?",
      "options": [
        "`o`",
        "`O`",
        "`a`",
        "`I`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lowercase `o` opens a new line below the cursor, whereas uppercase `O` opens a new line above the cursor."
    },
    {
      "id": "q-imp-1794831225796-194-w9b2",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Suppose a line in `vi` contains `Hello World Example` with the cursor resting on the `W` of `World`, and you execute the following commands in Command Mode:\n\n```bash\nd$\n:set num\n```\n\nWhat happens to the buffer and editor display?",
      "options": [
        "`Hello ` is deleted, and case-insensitive searching is enabled.",
        "`World Example` is deleted from the cursor to the end of the line, and line numbers are displayed.",
        "The entire line is deleted, and the current editor mode is displayed at the bottom.",
        "Only the word `World` is deleted, and the file is saved."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `d$` deletes from the cursor position to the end of the current line, and `:set num` turns on line numbering in `vi`."
    },
    {
      "id": "q-imp-1794831225796-195-pmxu",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following `vi` movement or editing commands from the Vi Editor Cheat Sheet is INCORRECT?",
      "options": [
        "`H`, `M`, and `L` move the cursor to the top, middle, and last line of the visible screen respectively.",
        "`0` moves the cursor to the first position of the current line, whereas `^` moves to the first non-blank character.",
        "`~` changes the case of the character under the cursor between uppercase and lowercase.",
        "`yy` deletes the current line into the clipboard, whereas `dd` yanks (copies) the current line without deleting it."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `yy` (or `Y`) yanks (copies) the current line without removing it, whereas `dd` deletes the current line."
    },
    {
      "id": "q-imp-1794831225796-196-o0di",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "In `vi` Command Mode, which command joins the current line with the line immediately below it?",
      "options": [
        "`j`",
        "`J`",
        "`dd`",
        "`cc`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Uppercase `J` joins two lines together in `vi`, whereas lowercase `j` moves the cursor down one line."
    },
    {
      "id": "q-imp-1794831225796-197-50vq",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Suppose you are editing a file in `vi` Command Mode and execute the following commands:\n\n```bash\n:e file2\n:e#\n```\n\nWhat is the effect of executing these two commands in order?",
      "options": [
        "`file2` is deleted from disk, and the current buffer is saved as `file2.new`.",
        "`vi` opens `file2` for editing without leaving the editor, and `:e#` switches back to the previous (alternate) file.",
        "Lines from `file2` are appended to the end of the current file, and line numbers are hidden.",
        "`vi` exits to the `ex` line editor and discards all changes in both files."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `:e file2` loads `file2` into the active editor session, and `:e#` toggles back to the alternate (previously edited) file."
    },
    {
      "id": "q-imp-1794831225796-198-fd48",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following `vi` commands and descriptions from the Vi Editor Cheat Sheet is INCORRECT?",
      "options": [
        "`mx` marks the current cursor position as `x`, and `` `x `` moves the cursor back to mark `x`.",
        "`dw` deletes from the cursor to the next word, whereas `cw` changes the next word.",
        "`G` moves the cursor to the last line in the file, whereas `nG` moves the cursor to line number `n`.",
        "`r` enters continuous Replace Mode to type over multiple characters, whereas `R` replaces only a single character with the next typed character."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Lowercase `r` replaces only a single character under the cursor with the next typed character, whereas uppercase `R` enters continuous overtype/replace mode."
    },
    {
      "id": "q-imp-1794831225796-199-tmg9",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "In `vi` Command Mode, which key deletes the single character at the current cursor position and immediately enters Insert Mode so you can continue typing?",
      "options": [
        "`x`",
        "`s`",
        "`r`",
        "`d`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lowercase `s` substitutes (deletes) the character under the cursor and enters Insert Mode, whereas `x` deletes the character while staying in Command Mode."
    },
    {
      "id": "q-imp-1794831225796-200-ucfy",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Suppose you are editing a file in `vi` and execute the following Last Line Mode command:\n\n```bash\n:30,60w>> backup.txt\n```\n\nWhat does this command do?",
      "options": [
        "It deletes lines 30 through 60 and moves them into a new buffer named `backup.txt`.",
        "It appends lines 30 through 60 of the current file to the end of `backup.txt`.",
        "It overwrites `backup.txt` with the entire file except lines 30 through 60.",
        "It searches lines 30 through 60 for the string `backup.txt`."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As documented in the Vi Cheat Sheet under Exit and Save Commands, `:30,60w>> file` appends lines 30 through 60 onto `file`."
    },
    {
      "id": "q-imp-1794831225796-201-rw1y",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following `vi` movement or scrolling commands from the Vi Editor Cheat Sheet is INCORRECT?",
      "options": [
        "`Ctrl + F` scrolls forward one full screen, and `Ctrl + B` scrolls backward one full screen.",
        "`Ctrl + D` scrolls down one-half screen, and `Ctrl + U` scrolls up one-half screen.",
        "`(` and `)` move to the beginning of the previous and next sentence, while `{` and `}` move by paragraph.",
        "`D` deletes from the cursor to the beginning of the current line, whereas `d0` deletes from the cursor to the end of the current line."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** `d0` deletes from the cursor back to position `0` (beginning of the line), whereas `D` (equivalent to `d$`) deletes from the cursor to the end of the line."
    },
    {
      "id": "q-imp-1794831225796-202-u0j9",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "In `vi` Command Mode, which key repeats the last text-editing command (such as a deletion or insertion)?",
      "options": [
        "`u`",
        "`.` (period)",
        "`;`",
        "`n`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As listed under Other Commands in the Vi Cheat Sheet, `.` repeats the last edit command, whereas `u` undoes the last edit[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-203-e971",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Suppose you are editing a file in `vi` Command Mode and execute the following commands:\n\n```bash\n\"ayy\nG\n\"aP\n```\n\nWhat does this sequence accomplish?",
      "options": [
        "It deletes the current line and appends it to an external file named `a`.",
        "It yanks (copies) the current line into named buffer `a`, moves to the last line of the file, and puts the yanked line before (above) the last line.",
        "It searches backward for the letter `a` and deletes all matching lines.",
        "It marks the current line as `a` and quits `vi` without saving."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `\"ayy` yanks the current line into named buffer `a`, `G` jumps to the last line, and `\"aP` puts the contents of buffer `a` before the cursor line[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-204-a5r3",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following `vi` commands and descriptions from the Vi Editor Cheat Sheet is INCORRECT?",
      "options": [
        "`fx` searches forward in the current line for character `x`, whereas `tx` searches forward to the character just before `x`.",
        "`Ctrl + G` displays the current line number and file status.",
        "`vi +n file` opens `file` with the cursor positioned at line number `n`.",
        "`C` changes from the cursor to the beginning of the line, whereas `cc` deletes only a single character under the cursor."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Uppercase `C` changes text from the cursor to the end of the line (equivalent to `c$`), and `cc` changes the entire current line[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-205-n605",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "In `vi` Command Mode, which key moves the cursor forward to the beginning of the next word?",
      "options": [
        "`b`",
        "`w`",
        "`0`",
        "`h`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In `vi`, `w` moves forward by word, `b` moves backward by word, and `e` moves to the end of a word[cite: 2, 7]."
    },
    {
      "id": "q-imp-1794831225796-206-0r8h",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Suppose you are editing a file in `vi` Command Mode and execute the following commands:\n\n```bash\n:e!\n```\n\nWhat is the effect of running `:e!` in `vi`?",
      "options": [
        "It saves the current buffer to a new file and exits `vi`.",
        "It discards all unsaved changes made since the last save and reloads the current file from disk.",
        "It opens a shell prompt without closing `vi`.",
        "It deletes every line in the file starting with an exclamation mark."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As listed under Exit and Save Commands in the Vi Editor Cheat Sheet, `:e!` discards all changes since the last save and reverts to the saved file[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-207-y5uh",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following `vi` commands and descriptions from the Vi Editor Cheat Sheet is INCORRECT?",
      "options": [
        "`I` inserts text at the beginning of the current line, and `A` appends text at the end of the current line.",
        "`[[` and `]]` move to the beginning of the previous and next section respectively.",
        "`Ctrl + L` or `Ctrl + R` redraws the terminal screen in `vi`.",
        "`S` deletes only a single character without entering Insert Mode, whereas `s` deletes the entire current line and stays in Command Mode."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Lowercase `s` deletes a single character and enters Insert Mode, whereas uppercase `S` deletes the entire current line and enters Insert Mode to continue typing[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-208-jfn1",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "In the `nano` text editor, which shortcut pastes text that was previously cut with `Ctrl + K` or copied with `Alt + 6`?",
      "options": [
        "`Ctrl + V`",
        "`Ctrl + U`",
        "`Ctrl + P`",
        "`Ctrl + Y`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Nano Cheat Sheet, `Ctrl + U` pastes the cut or copied text buffer, whereas `Ctrl + V` moves down one page[cite: 2]."
    },
    {
      "id": "q-imp-1794831225796-209-ao4a",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "Which command broadcasts a text message to the terminals of all currently logged-in users on a Linux system?",
      "options": [
        "`mail`",
        "`wall`",
        "`echo`",
        "`mesg`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As listed under General Commands in the Linux Commands presentation, `wall` sends a message to all logged-in users[cite: 3]."
    },
    {
      "id": "q-imp-1794831225796-210-pwig",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "In `vi` Command Mode, pressing `w` moves forward to the start of the next word, whereas pressing ______ moves to the ______ of the current/next word.",
      "options": [
        "`b`; beginning of the previous sentence",
        "`e`; end",
        "`0`; first non-blank character",
        "`G`; top line of the screen"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** On the Vi Editor Cheat Sheet, `e` (and `E`) moves the cursor to the end of a word, while `w` moves forward to the start of the next word[cite: 2, 7]."
    },
    {
      "id": "q-imp-1794831225796-211-obpf",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Consider the following `vi` recovery and startup scenario:\n\n```bash\nvi -r report.txt\n```\n\nWhen would a Linux administrator use this specific `vi` invocation flag?",
      "options": [
        "When opening `report.txt` in strict read-only mode so changes cannot be saved.",
        "When recovering `report.txt` and recent unsaved edits from a swap file after a system or terminal crash.",
        "When opening `report.txt` directly at the very last line of the file.",
        "When replacing all occurrences of `r` in `report.txt` upon startup."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As documented under Invoking `vi` in the cheat sheet, `vi -r file` recovers a file and recent edits after a system crash, whereas `vi -R` opens read-only[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831225796-212-1ygo",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following Linux user and environment administration statements is INCORRECT?",
      "options": [
        "`export VAR_NAME` exports a Bash variable so child processes inherit it, while `set` lists shell variables and functions.",
        "`sudo passwd [user_name]` allows an administrator to change another user's password.",
        "`alias ll='ls -la'` creates a custom command shortcut in the shell.",
        "`chmod 666 file.txt` grants execute (`x`) permission to the owner while denying read and write permissions to everyone."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Octal `666` (`rw-rw-rw-`) grants read (`4`) and write (`2`) permissions to owner, group, and others, with zero execute (`x`) bits set[cite: 5]."
    },
    {
      "id": "q-imp-1794831225796-213-oke8",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "Which command changes the password of the currently logged-in user (or another user when run with `sudo`)?",
      "options": [
        "`id`",
        "`passwd`",
        "`useradd`",
        "`chgrp`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `passwd` updates user account passwords in Linux, while `id` displays UID and GID values."
    },
    {
      "id": "q-imp-1794831225796-214-oy26",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "In `vi` Command Mode, pressing `dd` deletes the entire current line, whereas pressing ______ deletes from the cursor position to the ______ of the current word.",
      "options": [
        "`d0`; beginning of the line",
        "`dw`; end (start of next word)",
        "`d$`; beginning of the file",
        "`ndd`; previous paragraph"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `dw` deletes a word starting from the cursor position, whereas `d0` deletes back to the start of the line and `d$` deletes to the end of the line."
    },
    {
      "id": "q-imp-1794831225796-215-ejnt",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "In the `nano` text editor, pressing ______ cancels an active text selection marker, whereas pressing ______ copies the currently selected text without deleting it.",
      "options": [
        "`Ctrl + K` and `Ctrl + U`",
        "`Ctrl + 6` and `Alt + 6`",
        "`Ctrl + W` and `Ctrl + \\`",
        "`Ctrl + A` and `Ctrl + E`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As listed on the Nano Cheat Sheet, `Ctrl + 6` cancels a selection started with `Alt + A`, and `Alt + 6` copies the selected text to the cutbuffer."
    },
    {
      "id": "q-imp-1794831225796-216-qqfn",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Consider the following `vi` Last Line Mode commands:\n\n```bash\n:set num\n:set ic\n```\n\nWhat happens in the `vi` editor after executing both commands?",
      "options": [
        "Line numbers are hidden, and all uppercase letters are converted to lowercase.",
        "Line numbers are displayed on the left margin, and text searches ignore uppercase/lowercase differences.",
        "The file is saved in read-only mode, and syntax highlighting is disabled.",
        "All blank lines marked with `~` are permanently deleted from the file."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `:set num` enables line numbering and `:set ic` (ignore case) makes pattern searches case-insensitive in `vi`."
    },
    {
      "id": "q-imp-1794831225796-217-orai",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux user/group administration and `sudo` privileges is CORRECT?",
      "options": [
        "`sudo groupdel [group_name]` adds a new supplementary group to `/etc/group`.",
        "`su - [user_name]` permanently deletes `[user_name]`'s home directory and login shell.",
        "`sudo [command]` temporarily elevates a permitted user's privileges to execute a command as superuser (`root`), while `userdel [user_name]` deletes a user account.",
        "`chmod 755 file` grants write (`w`) permission to group and others so any user can modify `file`."
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `sudo` executes a single command with elevated root privileges and `userdel` removes user accounts, whereas `groupdel` deletes groups and `755` (`rwxr-xr-x`) denies write access to group/others."
    },
    {
      "id": "q-imp-1794831225796-218-7ln2",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Examine the following Linux disk maintenance and file permission workflow:\n\n```bash\numount /dev/sdb1\nfsck /dev/sdb1\nmount /dev/sdb1 /mnt/data\nchmod 766 /mnt/data/shared.log\n```\n\nWhich statement accurately describes the outcome of this sequence?",
      "options": [
        "It formats `/dev/sdb1` as NTFS, mounts it at `/mnt/data`, and makes `shared.log` executable by everyone.",
        "It unmounts `/dev/sdb1`, runs a filesystem consistency check safely on the unmounted partition, remounts it at `/mnt/data`, and grants `rwx` to owner and `rw-` to group/others on `shared.log`.",
        "It copies `/dev/sdb1` to `/mnt/data` using `rsync` and restricts `shared.log` to read-only for the root user.",
        "It displays inode statistics for `/dev/sdb1` and revokes all permissions from the file owner."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Unmounting `/dev/sdb1` first ensures `fsck` checks the filesystem safely before remounting at `/mnt/data`, and `chmod 766` sets `rwxrw-rw-` permissions."
    },
    {
      "id": "q-imp-1794831225796-219-9c1s",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "easy",
      "question": "Which command displays a user's numeric User ID (UID), primary Group ID (GID), and supplementary group memberships?",
      "options": [
        "`who`",
        "`id`",
        "`finger`",
        "`last`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `id` prints the UID and GID details of the current or specified user, whereas `who` and `last` show login sessions."
    },
    {
      "id": "q-imp-1794831225796-220-a0nw",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "In `vi` Command Mode, typing `cw` changes text from the cursor to the end of the current word, whereas typing ______ changes the entire current line and typing ______ changes from the cursor to the end of the line.",
      "options": [
        "`C`; `cc`",
        "`cc`; `C`",
        "`dd`; `D`",
        "`yy`; `Y`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** In `vi`, `cc` replaces the whole current line, while uppercase `C` replaces text from the cursor position to the end of the line."
    },
    {
      "id": "q-imp-1794831225796-221-5wgj",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "In the `nano` editor, pressing ______ moves the cursor to the beginning of the current line, and pressing ______ moves the cursor to the end of the current line.",
      "options": [
        "`Ctrl + Y` and `Ctrl + V`",
        "`Ctrl + A` and `Ctrl + E`",
        "`Alt + U` and `Alt + E`",
        "`Ctrl + W` and `Ctrl + \\`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** According to the Nano Cheat Sheet, `Ctrl + A` jumps to the start of the line and `Ctrl + E` jumps to the end of the line."
    },
    {
      "id": "q-imp-1794831225796-222-opvj",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "moderate",
      "question": "Consider the following `vi` line-range write command executed in Last Line Mode:\n\n```bash\n:30,60w newfile\n```\n\nWhat does this command accomplish?",
      "options": [
        "It deletes lines 30 through 60 from the current buffer without saving them.",
        "It saves lines 30 through 60 of the current file into a file named `newfile`.",
        "It opens `newfile` at line 30 and highlights lines up to line 60.",
        "It replaces lines 30 through 60 with the contents of `newfile`."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** As shown in the Exit and Save Commands section of the Vi Cheat Sheet, `:30,60w newfile` writes lines 30 through 60 into `newfile`."
    },
    {
      "id": "q-imp-1794831225796-223-h975",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Which of the following statements regarding Linux permissions, user accounts, and `vi` buffer commands is INCORRECT?",
      "options": [
        "`chmod 777 [file_name]` grants `rwxrwxrwx` permissions to owner, group, and others.",
        "`sudo adduser [user_name]` creates a new user account through the interactive `adduser` utility.",
        "In `vi`, `p` puts deleted or yanked text after/below the cursor, while `P` puts it before/above the cursor.",
        "In `vi`, `np` (such as `\"2p`) saves the current buffer as `file.new` and exits to the `ex` editor."
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** In `vi`, `\"np` retrieves deleted text from numbered delete buffer `n` and puts it after the cursor, whereas `:w %.new` saves the buffer as `file.new`."
    },
    {
      "id": "q-imp-1794831225796-224-361u",
      "topicId": "top-1794831229482-190-dl8",
      "difficulty": "hard",
      "question": "Examine the following Linux user and directory permission administration commands:\n\n```bash\ngroupadd devops\nuseradd -m rahul\nusermod -aG devops rahul\nchown rahul:devops /opt/deploy\nchmod 755 /opt/deploy\n```\n\nWhat is the resulting access configuration for `/opt/deploy`?",
      "options": [
        "Only members of `devops` can read `/opt/deploy`, while `rahul` is denied all access.",
        "User `rahul` (owner) has full `rwx` access, members of `devops` (group) and all other users have `r-x` (read and traverse/execute) access, and `rahul` belongs to `devops`.",
        "Everyone on the system has full `rwx` write access to `/opt/deploy`.",
        "User `rahul` is deleted from the `devops` group and `/opt/deploy` is unmounted."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `usermod -aG` adds `rahul` to `devops`, `chown rahul:devops` sets owner and group, and `chmod 755` sets `rwxr-xr-x` permissions on `/opt/deploy`."
    },
    {
      "id": "q-imp-1794831407980-0-n86e",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the AWS S3 and Lambda file-organizing lab, what happens to files that do not have a file extension?",
      "options": [
        "They are deleted immediately without copying",
        "They are placed in the `Documents/` folder",
        "They are placed in the `Others/` folder",
        "They remain in the `incoming/` prefix"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The lab specifies that files with unrecognized or missing extensions must be handled and placed in the `Others/` destination folder[cite: 1, 9]."
    },
    {
      "id": "q-imp-1794831407980-1-hbs9",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is configuring an `incoming/` prefix filter critical for the S3 event notification in the file-organizing lab?",
      "options": [
        "S3 buckets cannot trigger Lambda functions from the bucket root",
        "It prevents Lambda's own destination copy operations from repeatedly invoking the function",
        "It automatically encrypts uploaded files before processing",
        "It reduces the storage cost of S3 objects"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Because copying a file to a destination prefix creates an S3 object event, filtering only on `incoming/` prevents infinite or repeated Lambda invocations[cite: 3, 13]."
    },
    {
      "id": "q-imp-1794831407980-2-joms",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does Amazon S3 implement a file \"move\" operation in the Python Lambda function?",
      "options": [
        "By calling the native `s3.move_object()` API method",
        "By renaming the object key metadata in place",
        "By copying the object to the destination key and then deleting the original object",
        "By downloading the file to `/tmp` and re-uploading it"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "S3 does not provide a single atomic move operation, so the function copies the source object first and deletes the original only after copying succeeds[cite: 8]."
    },
    {
      "id": "q-imp-1794831407980-3-e4fi",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which Python function is used in the S3 file organizer Lambda code to handle spaces and special characters in S3 event object keys?",
      "options": [
        "`os.path.splitext()`",
        "`urllib.parse.unquote_plus()`",
        "`json.dumps()`",
        "`source_key.rsplit()`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 event notifications URL-encode object keys, so `urllib.parse.unquote_plus()` is used to decode characters like `+` or percent-encoded spaces before copying and deleting[cite: 10, 12]."
    },
    {
      "id": "q-imp-1794831407980-4-a3yb",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the difference between a Lambda execution role and a Lambda resource-based permission?",
      "options": [
        "The execution role allows S3 to invoke Lambda, while resource-based permissions allow Lambda to write logs",
        "The execution role allows Python code to access S3 and write logs, while resource-based permissions allow S3 to invoke Lambda",
        "Both permissions perform the exact same function but apply to different AWS regions",
        "Resource-based permissions are only required when using Python 3.14"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The execution role grants the function access to AWS services like S3 and CloudWatch, whereas resource-based permissions authorize S3 to trigger the function[cite: 7]."
    },
    {
      "id": "q-imp-1794831407980-5-dvhm",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the S3 file organizer lab, how does the Lambda function preserve filename capitalization while performing case-insensitive classification?",
      "options": [
        "It renames all files to lowercase before uploading them to destination folders",
        "It converts only the extracted extension to lowercase for comparison while keeping the original `filename` variable for `destination_key`",
        "It configures S3 bucket properties to ignore case sensitivity",
        "It stores the original filename in object tags and restores it after moving"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "`os.path.splitext(filename)` extracts the extension, which is converted to lowercase for matching, while the original `filename` preserves its capitalization in `destination_key`[cite: 7, 9, 10, 11]."
    },
    {
      "id": "q-imp-1794831407980-6-m2ot",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which three S3 IAM actions are granted to the `S3FileOrganizer` Lambda execution role?",
      "options": [
        "`s3:ListBucket`, `s3:GetObject`, `s3:PutObject`",
        "`s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`",
        "`s3:*`, `s3:CreateBucket`, `s3:DeleteBucket`",
        "`s3:CopyObject`, `s3:MoveObject`, `s3:ReadObject`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lambda requires `s3:GetObject` to read the source, `s3:PutObject` to create the destination copy, and `s3:DeleteObject` to remove the original[cite: 6, 7]."
    },
    {
      "id": "q-imp-1794831407980-7-u3um",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the Git, Flask, and Docker lab, why is the Flask application configured to run on host `0.0.0.0` instead of `127.0.0.1`?",
      "options": [
        "To enable HTTPS encryption automatically",
        "To allow the application to listen on container network interfaces when running inside Docker",
        "To bypass Windows Firewall restrictions on port 5000",
        "To enable Flask's interactive debug mode"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Binding to `0.0.0.0` allows the Flask server to accept incoming traffic across container network interfaces when deployed inside Docker[cite: 22]."
    },
    {
      "id": "q-imp-1794831407980-8-0han",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the difference between `git diff` and `git diff --cached`?",
      "options": [
        "`git diff` compares local and remote branches; `git diff --cached` compares two commits",
        "`git diff` shows unstaged changes; `git diff --cached` shows staged changes",
        "`git diff` shows deleted files; `git diff --cached` shows untracked files",
        "`git diff` works only offline; `git diff --cached` requires a GitHub connection"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "`git diff` displays modifications in the working tree that have not yet been staged, whereas `git diff --cached` shows changes already staged for the next commit[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831407980-9-gq8x",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which Git command discards uncommitted edits to a tracked file (`app.py`) in the working tree and restores it to the last committed version?",
      "options": [
        "`git restore --staged app.py`",
        "`git restore app.py`",
        "`git reset --soft HEAD`",
        "`git branch -d app.py`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git restore app.py` discards unstaged working-tree edits and reverts the file to its last committed state[cite: 25]."
    },
    {
      "id": "q-imp-1794831407980-10-y0ac",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why does `git pull --ff-only origin main` stop instead of creating a merge commit when histories have diverged?",
      "options": [
        "Because `--ff-only` deletes local commits that conflict with origin",
        "Because `--ff-only` instructs Git to update the branch only if it can advance via a fast-forward",
        "Because fast-forward pulls are only permitted on feature branches",
        "Because `--ff-only` requires administrator privileges on GitHub"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `--ff-only` flag ensures Git updates the local branch only when a linear fast-forward is possible, stopping so you can inspect diverged histories manually[cite: 30]."
    },
    {
      "id": "q-imp-1794831407980-11-un9b",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In a Dockerfile, what is the purpose of the `EXPOSE 5000` instruction?",
      "options": [
        "It automatically publishes port 5000 to the host machine's public IP",
        "It configures Windows Firewall to allow inbound traffic on port 5000",
        "It documents the network port used by the containerized application without publishing it",
        "It starts the Flask server on port 5000 during the `docker build` phase"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "`EXPOSE 5000` serves as documentation indicating which port the application listens on inside the container; publishing requires `-p` during `docker run`[cite: 37, 38]."
    },
    {
      "id": "q-imp-1794831407980-12-tlm3",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In a Dockerfile, why is `COPY requirements.txt .` and `RUN pip install` placed before `COPY app.py .`?",
      "options": [
        "Because Python cannot install packages if `.py` files are already in the directory",
        "To optimize Docker layer caching so dependencies are not reinstalled every time application code changes",
        "Because `COPY app.py .` automatically deletes `requirements.txt`",
        "To reduce the size of the `.dockerignore` file"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Placing dependency installation before copying application source code leverages Docker layer caching, avoiding slow dependency reinstalls when only source code changes[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831407980-13-lpnm",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What happens to a Docker image when you stop and remove its running container using `docker stop` and `docker rm`?",
      "options": [
        "The image is automatically deleted to free up disk space",
        "The image tag is reverted to `latest`",
        "The image remains intact locally and is not deleted",
        "The image is pushed automatically to Docker Hub"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Stopping or removing a container only affects that container instance; the underlying read-only Docker image remains stored locally[cite: 39]."
    },
    {
      "id": "q-imp-1794831407980-14-1nh4",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does a Centralized VCS (like SVN) differ from a Distributed VCS (like Git) regarding offline work?",
      "options": [
        "Centralized VCS supports full offline commits, while Distributed VCS requires constant internet access",
        "Centralized VCS cannot commit, branch, or view diffs offline, whereas Distributed VCS has full offline capability",
        "Both systems require a network roundtrip to view commit logs",
        "Distributed VCS stores only working copies on developer machines without history"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "In a Distributed VCS like Git, every clone holds the entire repository history locally, enabling offline commits, branching, and log inspection[cite: 46]."
    },
    {
      "id": "q-imp-1794831407980-15-gxe5",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Git's internal architecture, what are the three local states a file moves through?",
      "options": [
        "Working Directory, Staging Area (Index), and Local Repository (`.git`)",
        "Untracked Zone, Remote Origin, and Pull Request",
        "Local Cache, Branch Pointer, and Cloud Registry",
        "Master Branch, Blob Storage, and Commit Tree"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "** Files are edited in the Working Directory, prepared in the Staging Area (Index), and permanently saved as snapshots in the Local Repository (`.git`)[cite: 47]."
    },
    {
      "id": "q-imp-1794831407980-16-wd80",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "When does a Git 3-Way Merge occur instead of a Fast-Forward Merge?",
      "options": [
        "When no new commits have been made on the target branch since the feature branch was created",
        "When branch histories have diverged with new commits on both branches, requiring a new merge commit",
        "Whenever a branch is deleted using `git branch -d`",
        "Only when merging changes from a remote repository using `git fetch`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A 3-way merge is required when both branches have diverged with independent commits since their common ancestor, creating a new merge commit[cite: 49]."
    },
    {
      "id": "q-imp-1794831407980-17-heoo",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the key difference between Continuous Delivery and Continuous Deployment?",
      "options": [
        "Continuous Delivery runs unit tests, while Continuous Deployment skips testing",
        "Continuous Delivery requires a manual approval gate before deploying to production, whereas Continuous Deployment deploys to production automatically",
        "Continuous Delivery uses Docker containers, while Continuous Deployment only uses virtual machines",
        "Continuous Delivery happens once a month, while Continuous Deployment happens once a year"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Continuous Delivery automates deployment to staging and requires a manual approval click for production, while Continuous Deployment automates production releases completely[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831407980-18-jd2w",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the CALMS framework for DevOps adoption, what does the letter \"L\" stand for?",
      "options": [
        "Logging",
        "Latency",
        "Lean",
        "Linux"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the CALMS framework (Culture, Automation, Lean, Measurement, Sharing), Lean refers to minimizing work-in-progress, using small batch sizes, and reducing waste[cite: 55]."
    },
    {
      "id": "q-imp-1794831407980-19-xf5g",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which two underlying Linux kernel features enable Docker containers to achieve process isolation and resource limits?",
      "options": [
        "Hypervisors and Guest Kernels",
        "Namespaces and Control Groups (cgroups)",
        "Virtual NICs and Swap Partitions",
        "BIOS Virtualization and SAN Storage"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Linux Namespaces isolate what a process can see, while Control Groups (cgroups) limit CPU, RAM, and I/O resources[cite: 61]."
    },
    {
      "id": "q-imp-1794831407980-20-mcjg",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "When a Docker container starts, what does Docker add on top of the read-only stacked image layers?",
      "options": [
        "A secondary guest operating system kernel",
        "A thin, writable Container Layer for runtime modifications, temp files, and logs",
        "A hardware hypervisor translation layer",
        "An immutable backup snapshot"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Running a container adds a thin writable layer on top of the read-only image layers for runtime file modifications[cite: 61, 62]."
    },
    {
      "id": "q-imp-1794831407980-21-810x",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In a Dockerfile, how does `ENTRYPOINT` differ from `CMD`?",
      "options": [
        "`ENTRYPOINT` runs during `docker build`, while `CMD` runs during `docker push`",
        "`ENTRYPOINT` defines a fixed executable that cannot be easily overridden at runtime, whereas `CMD` provides default arguments or commands that can be overridden",
        "`ENTRYPOINT` sets environment variables, while `CMD` exposes network ports",
        "`ENTRYPOINT` is only valid on Windows containers, while `CMD` is for Linux"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `CMD` specifies a default command that can be overridden when launching a container, whereas `ENTRYPOINT` sets a fixed executable[cite: 63]."
    },
    {
      "id": "q-imp-1794831407980-22-fap9",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the AWS Application Load Balancer (ALB) lab, why must you create at least two public subnets in different Availability Zones?",
      "options": [
        "Because an ALB cannot route traffic to EC2 instances inside a single subnet",
        "To ensure high availability so the load balancer can route traffic to a healthy zone if one physical data center zone experiences an outage",
        "Because AWS restricts each subnet to a maximum of one EC2 instance",
        "To separate inbound HTTP traffic from outbound HTTPS traffic"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS Application Load Balancers require at least two subnets across different Availability Zones to maintain high availability during a zone outage[cite: 73]."
    },
    {
      "id": "q-imp-1794831407980-23-959j",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, how is the EC2 Security Group (`flask-ec2-sg`) configured to prevent users from bypassing the load balancer?",
      "options": [
        "By blocking all outbound traffic from the EC2 instances",
        "By allowing inbound traffic on port 8000 strictly from the ALB Security Group (`flask-alb-sg`) rather than `0.0.0.0/0`",
        "By disabling auto-assign public IPv4 addresses on both subnets",
        "By configuring a Network ACL that blocks HTTP requests"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Restricting port 8000 inbound rules on `flask-ec2-sg` to accept traffic only from `flask-alb-sg` prevents direct access to the application port[cite: 74, 75]."
    },
    {
      "id": "q-imp-1794831407980-24-hs0c",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the AWS ALB lab, what is the role of the Target Group (`flask-api-tg`)?",
      "options": [
        "It translates private subnet IP addresses to public Internet addresses",
        "It acts as a registration inventory for backend servers, defining the routing port (8000) and health check endpoint (`/api/products`)",
        "It stores SSH private keys (`.pem`) for authenticating to Ubuntu instances",
        "It assigns static public DNS names to individual EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Target Group registers target instances on port 8000 and continuously probes health endpoints to manage traffic routing[cite: 80]."
    },
    {
      "id": "q-imp-1794831407980-25-ffcp",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, what happens if you try to delete resources out of order, such as deleting the VPC before detaching the Internet Gateway?",
      "options": [
        "AWS automatically deletes all dependent resources in the background",
        "Deletion will fail or be blocked because resources must be torn down in the reverse order of creation",
        "The EC2 instances are migrated to the default VPC",
        "The Internet Gateway is converted into a NAT Gateway"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud resource dependencies require resources to be deleted in the reverse order of creation[cite: 84]."
    },
    {
      "id": "q-imp-1794831407980-26-uc5o",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In cloud architecture, what is the primary difference between Horizontal Scaling and Vertical Scaling?",
      "options": [
        "Horizontal scaling adds more CPU/RAM to a single server, while vertical scaling adds more server instances behind a load balancer",
        "Horizontal scaling adds more server instances in parallel behind a load balancer, while vertical scaling upgrades hardware resources on an existing single server",
        "Horizontal scaling always requires server downtime, while vertical scaling has zero downtime",
        "Vertical scaling has no upper hardware limit, while horizontal scaling is capped at 128 cores"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Horizontal scaling adds parallel nodes behind a load balancer, whereas vertical scaling upgrades a single server's hardware[cite: 88]."
    },
    {
      "id": "q-imp-1794831407980-27-kdub",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "If a single VM has an availability SLA of 99.9%, what is the total system availability when deploying two independent VMs in parallel across separate Availability Zones?",
      "options": [
        "99.9%",
        "99.95%",
        "99.99%",
        "99.9999%"
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Simultaneous failure probability is $(1 - 0.999) \\times (1 - 0.999) = 0.000001$, yielding $1 - 0.000001 = 99.9999\\%$ availability[cite: 89]."
    },
    {
      "id": "q-imp-1794831407980-28-vs2y",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In disaster recovery planning, what does Recovery Point Objective (RPO) measure?",
      "options": [
        "The maximum acceptable duration between a service outage and full restoration",
        "The maximum acceptable age of data that can be lost during a disaster (data loss window)",
        "The time required to provision a new virtual machine from a golden image",
        "The percentage of uptime guaranteed by a cloud service provider"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** RPO defines the maximum acceptable data loss window measured from the last backup point to when a disaster occurs[cite: 89]."
    },
    {
      "id": "q-imp-1794831407980-29-3wgl",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In a classic Three-Tier Cloud Architecture, how do backend servers in the Private Subnet (App Tier) download security patches from the internet without being directly reachable from the public internet?",
      "options": [
        "Through an Internet Gateway attached directly to the private subnet",
        "Through an outbound-only NAT Gateway located in the Public Subnet",
        "By temporarily assigning public IP addresses during maintenance windows",
        "Through an Application Load Balancer forwarding outbound requests"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Private subnet instances route outbound-only internet traffic for updates through a NAT Gateway in the public subnet[cite: 90]."
    },
    {
      "id": "q-imp-1794831407980-30-lh8w",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does a Layer 4 Load Balancer differ from a Layer 7 Load Balancer?",
      "options": [
        "Layer 4 routes based on HTTP headers and URL paths, while Layer 7 routes based on IP address and TCP/UDP port",
        "Layer 4 routes at the transport layer (TCP/UDP) based on IP and port, while Layer 7 routes at the application layer (HTTP/HTTPS) based on URL paths, headers, and cookies",
        "Layer 4 supports health checks, while Layer 7 cannot detect unhealthy nodes",
        "Layer 4 is used exclusively for serverless functions, while Layer 7 is only for physical servers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Network Load Balancers (Layer 4) route transport-layer traffic by IP/port, while Application Load Balancers (Layer 7) inspect HTTP/HTTPS content[cite: 92]."
    },
    {
      "id": "q-imp-1794831407980-31-bfxz",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the purpose of a Cooldown Period in an Auto-Scaling Group?",
      "options": [
        "To allow physical servers to cool down after high CPU utilization",
        "To prevent rapid oscillations (\"flapping\") by pausing scaling actions while newly launched instances stabilize",
        "To delay health checks until a database finishes replicating",
        "To reduce cloud billing rates during off-peak hours"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A cooldown period pauses further scaling actions while new instances initialize, preventing rapid scale-out/scale-in oscillations[cite: 93]."
    },
    {
      "id": "q-imp-1794831407980-32-pttk",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Under the Cloud Shared Responsibility Model for an IaaS service like Amazon EC2, which task is the customer's responsibility?",
      "options": [
        "Securing physical data center facilities with guards and biometrics",
        "Patching and maintaining the host virtualization hypervisor",
        "Applying guest operating system security patches and configuring network security groups",
        "Maintaining global backbone network cables and power generators"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "Customers are responsible for security \"IN\" the cloud, including OS patches, data encryption, and firewall rules[cite: 93, 94]."
    },
    {
      "id": "q-imp-1794831407980-33-sklq",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which AWS EC2 purchasing option provides discounts of up to 90% on spare compute capacity but can be reclaimed by AWS with a 2-minute warning?",
      "options": [
        "Reserved Instances",
        "On-Demand Instances",
        "Spot Instances",
        "Dedicated Hosts"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Spot Instances bid on unused AWS capacity for up to 90% savings, ideal for stateless batch jobs[cite: 97]."
    },
    {
      "id": "q-imp-1794831407980-34-lclc",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How do AWS Security Groups differ from Network Access Control Lists (NACLs)?",
      "options": [
        "Security Groups operate at the subnet edge and are stateless, while NACLs operate at the instance level and are stateful",
        "Security Groups operate at the instance level and are stateful, while NACLs operate at the subnet edge and are stateless",
        "Security Groups support explicit deny rules, while NACLs only support allow rules",
        "Security Groups apply only to S3 buckets, while NACLs apply only to EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security Groups are stateful firewalls at the instance level, whereas NACLs are stateless rules evaluated sequentially at the subnet boundary[cite: 100]."
    },
    {
      "id": "q-imp-1794831407980-35-y2b7",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why is Amazon S3 unsuitable for installing and running a live operating system directly?",
      "options": [
        "Because S3 has a maximum object size limit of 64 TiB",
        "Because S3 is object storage that overwrites whole immutable objects via HTTP APIs rather than supporting in-place block modifications like EBS",
        "Because S3 offers only single-AZ durability",
        "Because S3 does not support encryption at rest"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "S3 is immutable object storage accessed via HTTP APIs, whereas operating systems require block storage supporting in-place block updates[cite: 100]."
    },
    {
      "id": "q-imp-1794831407980-36-a2z4",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the maximum execution duration timeout for a single AWS Lambda function invocation?",
      "options": [
        "60 seconds",
        "5 minutes",
        "15 minutes",
        "1 hour"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS Lambda enforces a maximum execution timeout of 15 minutes per function invocation[cite: 102]."
    },
    {
      "id": "q-imp-1794831407980-37-a6mi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Microsoft Azure's resource hierarchy, what is the purpose of a Resource Group?",
      "options": [
        "To manage compliance and policies across multiple subscriptions",
        "To act as a logical container grouping related resources that share the same lifecycle",
        "To serve as the fundamental billing boundary for an enterprise",
        "To provide a globally distributed NoSQL database engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Resource Groups are logical containers holding related resources that share a deployment lifecycle[cite: 103]."
    },
    {
      "id": "q-imp-1794831407980-38-u8vh",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Azure Functions, what is the difference between a Trigger and a Binding?",
      "options": [
        "A Trigger defines what causes a function to execute, while a Binding provides declarative connections to input/output data sources without custom SDK boilerplate",
        "A Trigger schedules backups, while a Binding encrypts environment variables",
        "A Trigger scales the function outward, while a Binding limits memory usage",
        "A Trigger is used for HTTP requests, while a Binding is only used for Azure SQL Database"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "Triggers initiate function execution, whereas Bindings declaratively connect input and output data sources[cite: 104]."
    },
    {
      "id": "q-imp-1794831407980-39-h8wv",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which pair of AWS and Azure services records every API call and user interaction for governance and security auditing?",
      "options": [
        "Amazon CloudWatch and Azure Monitor Metrics",
        "AWS CloudTrail and Azure Activity Log",
        "AWS X-Ray and Application Insights",
        "AWS Systems Manager and Azure Automation"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS CloudTrail and Azure Activity Log provide governance audit trails by logging API calls[cite: 105]."
    },
    {
      "id": "q-imp-1794831407980-40-imzm",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What major efficiency challenge plagued the Client-Server architecture era of the 1980s–1990s?",
      "options": [
        "Complete inability to connect client workstations to central databases",
        "Organizations had to purchase physical servers sized for peak seasonal capacity, resulting in 10–15% average utilization",
        "Lack of any local corporate data centers",
        "Mandatory pay-per-millisecond billing models"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Provisioning physical servers for peak seasonal demand left hardware idle most of the time, averaging 10–15% utilization[cite: 109]."
    },
    {
      "id": "q-imp-1794831407980-41-sts2",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which NIST essential cloud characteristic describes the provider dynamically assigning and reassigning physical and virtual resources across multiple consumers in a multi-tenant model?",
      "options": [
        "Broad Network Access",
        "Rapid Elasticity",
        "Resource Pooling",
        "Measured Service"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "Resource Pooling enables multi-tenant providers to dynamically allocate shared physical and virtual resources[cite: 113]."
    },
    {
      "id": "q-imp-1794831407980-42-x7p0",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "How does cloud computing transform IT financial expenditure compared to traditional on-premises infrastructure?",
      "options": [
        "It shifts spending from variable Operational Expenditure (OpEx) to upfront Capital Expenditure (CapEx)",
        "It shifts spending from heavy upfront Capital Expenditure (CapEx) to variable pay-as-you-go Operational Expenditure (OpEx)",
        "It eliminates all operational costs once servers are provisioned",
        "It requires 5-year hardware depreciation schedules for virtual machines"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud computing replaces large upfront hardware investments with flexible monthly operational expenses[cite: 114, 117]."
    },
    {
      "id": "q-imp-1794831407980-43-xfke",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In cloud global infrastructure terminology, what is an Availability Zone (AZ)?",
      "options": [
        "A single server rack inside a local corporate data center",
        "One or more discrete data centers with redundant power, networking, and cooling within a geographic Region",
        "An edge cache location deployed in metropolitan cities for CDN delivery",
        "An entire continent containing multiple cloud regions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Availability Zone consists of one or more physically separated data centers with independent infrastructure within a Region[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831407980-44-bxed",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which Google Cloud Platform (GCP) service is the direct counterpart to Amazon S3 and Azure Blob Storage for object storage?",
      "options": [
        "Persistent Disk",
        "Cloud Storage",
        "Cloud Bigtable",
        "Compute Engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Google Cloud Storage provides scalable object storage for unstructured data[cite: 116]."
    },
    {
      "id": "q-imp-1794831407980-45-e6f0",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the Cloud Service Delivery Models (IaaS, PaaS, SaaS), which layers does the customer manage when using Platform as a Service (PaaS)?",
      "options": [
        "Applications and Data only",
        "Operating System, Runtime, Middleware, Applications, and Data",
        "Virtualization, Servers, Storage, and Networking",
        "None; the cloud provider manages every layer including applications and data"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "** Under PaaS, the provider manages OS, runtime, middleware, and infrastructure, leaving the customer to manage Applications and Data[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407980-46-5z0q",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does a Type 1 (Bare-Metal) Hypervisor differ from a Type 2 (Hosted) Hypervisor?",
      "options": [
        "Type 1 runs on top of an existing host OS, whereas Type 2 runs directly on physical hardware",
        "Type 1 runs directly on bare physical server hardware for near-native speed, whereas Type 2 runs on top of a host OS",
        "Type 1 is used primarily on developer laptops, whereas Type 2 powers enterprise public clouds",
        "Type 1 relies on container namespaces, whereas Type 2 uses hardware virtualization"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Type 1 hypervisors run directly on bare-metal hardware with minimal overhead, while Type 2 hypervisors run atop a host OS[cite: 122]."
    },
    {
      "id": "q-imp-1794831407980-47-3qbb",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "During Live VM Migration (such as VMware vMotion), how is zero perceptible disconnection achieved for end users?",
      "options": [
        "By powering down the VM and shipping physical hard drives to the new host",
        "By mirroring memory pages across network links while the VM runs and transferring the final dirty page delta in milliseconds",
        "By converting the VM into a static Docker image before moving it",
        "By pausing all network traffic for 15 minutes during disk replication"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Live migration mirrors active memory over the network while the VM runs, transferring the final dirty memory delta in milliseconds[cite: 123]."
    },
    {
      "id": "q-imp-1794831407980-48-5dih",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which cloud deployment strategy describes running normal baseline workloads on an on-premises private cloud and dynamically scaling into a public cloud during peak traffic spikes?",
      "options": [
        "Community Cloud",
        "Cloud Bursting in a Hybrid Cloud",
        "Multi-Cloud Vendor Arbitrage",
        "Bare-Metal Virtualization"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Hybrid cloud architectures enable \"cloud bursting,\" where baseline workloads stay on-premises and demand spikes overflow into the public cloud[cite: 124]."
    },
    {
      "id": "q-imp-1794831407980-49-0gnp",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is gRPC typically chosen over REST or SOAP for high-performance internal microservice communication?",
      "options": [
        "It uses human-readable XML envelopes over SMTP",
        "It uses multiplexed HTTP/2 streams and ultra-lightweight binary Protocol Buffers (Protobuf)",
        "It requires no schema definition and works exclusively over HTTP/1.0",
        "It runs directly inside web browsers without any proxy or translation layer"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** gRPC leverages HTTP/2 multiplexed streams and binary Protocol Buffers, making it significantly faster than text-based REST APIs[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831407980-50-6iwv",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which computing era, spanning the 1960s to 1970s, was characterized by centralized, monolithic mainframes and \"dumb terminals\" connected to a massive central processor with scheduled timesharing?",
      "options": [
        "Mainframe Computing Era[cite: 107]",
        "Client-Server Architecture[cite: 107]",
        "Cluster and Grid Computing[cite: 107]",
        "Utility Computing[cite: 107]"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "** The mainframe era (1960s-1970s) featured centralized monolithic systems like the IBM System/360 with dumb terminals[cite: 107]."
    },
    {
      "id": "q-imp-1794831407980-51-3rgn",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "How does cloud computing transform IT financial expenditure compared to traditional on-premises data centers?",
      "options": [
        "It requires heavy upfront capital expenditure (CapEx) for physical server purchases[cite: 114].",
        "It replaces large upfront capital expenditures (CapEx) with flexible pay-as-you-go operational expenditures (OpEx)[cite: 114, 117].",
        "It eliminates all operating costs entirely once infrastructure is deployed[cite: 114].",
        "It mandates 5-year hardware depreciation schedules for virtual machines[cite: 114]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud computing shifts financial models from heavy upfront CapEx to variable, usage-based monthly OpEx[cite: 114, 117]."
    },
    {
      "id": "q-imp-1794831407981-52-tvrp",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which NIST essential characteristic of cloud computing refers to capabilities that can be elastically provisioned and released to scale outward or inward automatically according to demand?",
      "options": [
        "Broad Network Access[cite: 113]",
        "Resource Pooling[cite: 113]",
        "Rapid Elasticity[cite: 113, 114]",
        "Measured Service[cite: 113]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Rapid elasticity enables computing capabilities to scale dynamically to match fluctuating demand without manual intervention[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831407981-53-1ua6",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "According to the cloud infrastructure market share overview in the course materials, what is the approximate market share percentage of Amazon Web Services (AWS)?",
      "options": [
        "25%[cite: 115]",
        "33%[cite: 115]",
        "31%[cite: 115]",
        "11%[cite: 115]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS holds approximately 31% of the cloud infrastructure market share[cite: 115]."
    },
    {
      "id": "q-imp-1794831407981-54-g82e",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In cloud global infrastructure, what is an Availability Zone (AZ)?",
      "options": [
        "An edge cache location deployed in metropolitan cities for CDN delivery[cite: 115, 117]",
        "One or more discrete data centers with redundant power, networking, and cooling within a geographic Region[cite: 115, 117]",
        "An entire continent containing multiple independent cloud providers[cite: 115]",
        "A single server rack inside a corporate on-premise data center[cite: 115]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Availability Zone consists of one or more physically separated data centers with independent infrastructure within a Region[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831407981-55-oe1v",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the Cloud Service Delivery Models, who manages the operating system, runtime, middleware, applications, and data under the SaaS (Software as a Service) model?",
      "options": [
        "The customer[cite: 119]",
        "A third-party security auditor[cite: 119]",
        "The cloud provider[cite: 119]",
        "Shared equally between customer and provider[cite: 119]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In SaaS, the cloud provider manages all underlying layers including applications, data, runtime, OS, and infrastructure[cite: 119]."
    },
    {
      "id": "q-imp-1794831407981-56-e4dt",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which of the following is a classic example of a Type 1 (Bare-Metal) Hypervisor?",
      "options": [
        "Oracle VirtualBox[cite: 122]",
        "VMware Workstation[cite: 122]",
        "Parallels Desktop[cite: 122]",
        "VMware ESXi[cite: 122]"
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** VMware ESXi, Linux KVM, and Microsoft Hyper-V are Type 1 bare-metal hypervisors running directly on physical hardware[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-57-mfhe",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How does a Live VM Migration (such as VMware vMotion) ensure zero perceptible disconnection for end users?",
      "options": [
        "By shutting down the virtual machine and shipping physical hard drives to the new host[cite: 123]",
        "By mirroring memory pages across network links while the VM runs and transferring the final dirty memory delta in milliseconds[cite: 123]",
        "By pausing all network traffic for 10 minutes while disk snapshots copy[cite: 123]",
        "By converting the VM into a static Docker container before migration[cite: 123]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Live migration mirrors active memory over the network while the VM runs, transferring the final delta in milliseconds without downtime[cite: 123]."
    },
    {
      "id": "q-imp-1794831407981-58-z5q6",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What cloud deployment strategy involves running normal baseline workloads on an on-premises private cloud and dynamically overflowing into a public cloud during unexpected traffic spikes?",
      "options": [
        "Community Cloud[cite: 124]",
        "Multi-Cloud Arbitrage[cite: 124]",
        "Cloud Bursting in a Hybrid Cloud[cite: 124]",
        "Bare-Metal Virtualization[cite: 124]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Hybrid cloud architectures enable \"cloud bursting\" to absorb peak capacity spikes in the public cloud[cite: 124]."
    },
    {
      "id": "q-imp-1794831407981-59-p68c",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which web service communication standard uses HTTP/2 multiplexed streams and ultra-lightweight binary Protocol Buffers (Protobuf) for high-performance internal microservices?",
      "options": [
        "SOAP[cite: 125]",
        "REST[cite: 125]",
        "gRPC[cite: 125, 126]",
        "XML-RPC[cite: 125]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** gRPC relies exclusively on HTTP/2 and binary Protobuf serialization, making it up to 7-10x faster than REST[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831407981-60-c2v4",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In cloud scalability principles, why is Horizontal Scaling preferred over Vertical Scaling for modern web applications?",
      "options": [
        "Vertical scaling has a limitless hardware ceiling[cite: 88].",
        "Horizontal scaling provides practically limitless elastic capacity across commodity instances with zero downtime[cite: 88].",
        "Vertical scaling never requires restarting the server[cite: 88].",
        "Horizontal scaling uses monstrous physical servers that are cheaper[cite: 88]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Horizontal scaling avoids hardware ceilings and expensive monster instances, offering linear, cost-effective elasticity behind load balancers[cite: 88]."
    },
    {
      "id": "q-imp-1794831407981-61-njmu",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "If a cloud system has a target Availability SLA of 99.99% (Four 9s), what is the maximum permitted unscheduled downtime across an entire year?",
      "options": [
        "3.65 days[cite: 89]",
        "8.77 hours[cite: 89]",
        "52.60 minutes[cite: 89]",
        "5.26 minutes[cite: 89]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** An SLA of 99.99% permits a maximum of 52.60 minutes of downtime per year[cite: 89]."
    },
    {
      "id": "q-imp-1794831407981-62-lt3k",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In disaster recovery planning, what does Recovery Time Objective (RTO) define?",
      "options": [
        "The maximum acceptable age of data that can be lost during an outage[cite: 89]",
        "The maximum acceptable duration between a service outage and full system restoration[cite: 89]",
        "The duration required to perform a full weekly database backup[cite: 89]",
        "The time it takes for an auto-scaling group to launch a new virtual machine[cite: 89]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** RTO specifies the maximum allowable time window to restore system functionality after a disaster[cite: 89]."
    },
    {
      "id": "q-imp-1794831407981-63-rsn4",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In a Three-Tier Cloud Architecture, which tier houses relational databases and caching clusters and is strictly isolated from external routing?",
      "options": [
        "Presentation / Web Tier[cite: 90]",
        "Application / Business Logic Tier[cite: 90]",
        "Data Tier[cite: 90]",
        "Public DMZ Tier[cite: 90]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The Data Tier is isolated in private subnets, accessible strictly by the application tier[cite: 90]."
    },
    {
      "id": "q-imp-1794831407981-64-jkif",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary characteristic that distinguishes a Layer 7 Application Load Balancer from a Layer 4 Network Load Balancer?",
      "options": [
        "Layer 7 operates at the transport layer using TCP/UDP ports only[cite: 92].",
        "Layer 7 inspects application-layer content like HTTP headers, cookies, and URL paths to route traffic[cite: 92].",
        "Layer 7 cannot perform health checks on backend servers[cite: 92].",
        "Layer 7 is restricted to single-AZ deployments[cite: 92]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Layer 7 load balancers route traffic based on application-layer data (HTTP/HTTPS paths and headers)[cite: 92]."
    },
    {
      "id": "q-imp-1794831407981-65-ql8t",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What triggers dynamic scaling in an Auto-Scaling Group?",
      "options": [
        "Pre-scheduled calendar events only[cite: 93]",
        "Real-time operational metrics such as CPU utilization exceeding a threshold or queue depth[cite: 93]",
        "Manual administrative intervention every time traffic changes[cite: 93]",
        "Random interval timers set by the cloud provider[cite: 93]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Dynamic scaling responds automatically to real-time performance metrics like CPU load or SQS queue depth[cite: 93]."
    },
    {
      "id": "q-imp-1794831407981-66-rn4m",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Where does an In-Memory Caching cluster like Redis typically sit in a cloud architecture to accelerate response times?",
      "options": [
        "Directly inside the client's web browser[cite: 93]",
        "In front of the relational database to cache frequent query results and session states[cite: 93]",
        "Inside the Internet Gateway router[cite: 93]",
        "On the local administrator's workstation[cite: 93]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Redis and Memcached sit between the application tier and the database to serve frequent queries in under 2 milliseconds[cite: 93]."
    },
    {
      "id": "q-imp-1794831407981-67-j0n4",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Under the Cloud Shared Responsibility Model, which component is strictly the customer's responsibility when running an EC2 instance?",
      "options": [
        "Physical data center security guards and biometric scanners[cite: 94]",
        "Underlying host virtualization hypervisors[cite: 94]",
        "Guest operating system security patches, IAM credentials, and firewall rules[cite: 94]",
        "Global fiber-optic network backbone cables[cite: 94]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The customer is responsible for security \"IN\" the cloud, including OS patches, data encryption, IAM, and Security Groups[cite: 94]."
    },
    {
      "id": "q-imp-1794831407981-68-kpko",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which EC2 purchasing option provides physical servers dedicated entirely to a single customer for regulatory compliance or strict software licensing requirements?",
      "options": [
        "Spot Instances[cite: 97]",
        "On-Demand Instances[cite: 97]",
        "Reserved Instances[cite: 97]",
        "Dedicated Hosts[cite: 97]"
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Dedicated Hosts provide physical hardware dedicated to a single account for specialized compliance or licensing needs[cite: 97]."
    },
    {
      "id": "q-imp-1794831407981-69-k1mi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the default remote access protocol and port used to manage a Windows EC2 instance?",
      "options": [
        "Secure Shell (SSH) over Port 22[cite: 97]",
        "Remote Desktop Protocol (RDP) over Port 3389[cite: 97]",
        "Hypertext Transfer Protocol (HTTP) over Port 80[cite: 97]",
        "Secure File Transfer Protocol (SFTP) over Port 21[cite: 97]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Windows EC2 instances use RDP over port 3389, whereas Linux instances use SSH over port 22[cite: 97]."
    },
    {
      "id": "q-imp-1794831407981-70-kux5",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How do Network Access Control Lists (NACLs) differ from Security Groups in an AWS VPC?",
      "options": [
        "NACLs are stateful and operate at the instance level[cite: 100].",
        "NACLs are stateless and operate at the subnet boundary using numbered rules[cite: 100].",
        "NACLs automatically allow return traffic without explicit rules[cite: 100].",
        "NACLs cannot support explicit deny rules[cite: 100]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NACLs act as stateless firewall boundaries evaluated sequentially at the subnet level, unlike stateful Security Groups[cite: 100]."
    },
    {
      "id": "q-imp-1794831407981-71-qfdq",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the maximum single volume size supported by an Amazon EBS (Elastic Block Store) volume?",
      "options": [
        "5 TB[cite: 100]",
        "100 GB[cite: 100]",
        "Up to 64 TiB[cite: 100]",
        "10 PB[cite: 100]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Amazon EBS block storage supports individual volumes up to 64 TiB[cite: 100]."
    },
    {
      "id": "q-imp-1794831407981-72-7zkz",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which S3 storage class is intended for long-term compliance archival storage where retrieval times range from minutes to 12 hours?",
      "options": [
        "S3 Standard[cite: 101]",
        "S3 Standard-IA[cite: 101]",
        "S3 Glacier Flexible Retrieval & Deep Archive[cite: 101]",
        "S3 Intelligent-Tiering[cite: 101]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** S3 Glacier Flexible Retrieval and Deep Archive provide ultra-low-cost archival storage with retrieval times from minutes to hours[cite: 101]."
    },
    {
      "id": "q-imp-1794831407981-73-fseu",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the maximum execution duration timeout for a single AWS Lambda function invocation?",
      "options": [
        "60 seconds[cite: 102]",
        "5 minutes[cite: 102]",
        "15 minutes[cite: 102]",
        "2 hours[cite: 102]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS Lambda enforces a maximum execution timeout of 15 minutes per function invocation[cite: 102]."
    },
    {
      "id": "q-imp-1794831407981-74-oh8z",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Microsoft Azure's resource hierarchy, what serves as the fundamental billing and access boundary?",
      "options": [
        "Management Groups[cite: 103]",
        "Resource Groups[cite: 103]",
        "Subscriptions[cite: 103]",
        "Azure Resource Manager (ARM)[cite: 103]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Subscriptions act as the core administrative and billing boundary in Azure[cite: 103]."
    },
    {
      "id": "q-imp-1794831407981-75-nffo",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a key feature of Azure Cosmos DB?",
      "options": [
        "It is a legacy single-node relational database requiring manual sharding[cite: 103].",
        "It is a globally distributed, multi-model NoSQL database service offering single-digit millisecond latencies[cite: 103].",
        "It only supports SMB file share mountings for Windows[cite: 103].",
        "It requires local hypervisor virtualization to run[cite: 103]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Cosmos DB provides globally distributed, low-latency multi-model NoSQL data storage[cite: 103]."
    },
    {
      "id": "q-imp-1794831407981-76-vf3x",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What storage mechanism does Azure Files provide?",
      "options": [
        "Block storage disks attached exclusively to virtual machines as local drives[cite: 104]",
        "Fully managed SMB and NFS cloud file shares mountable directly across Windows, Linux, and macOS[cite: 104]",
        "Immutable object storage with 11 nines of durability accessed only via REST APIs[cite: 104]",
        "In-memory Redis caching clusters[cite: 104]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Files offers fully managed SMB and NFS cloud file shares mountable by standard OS clients[cite: 104]."
    },
    {
      "id": "q-imp-1794831407981-77-s7e5",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which AWS service records every API call and user action across your infrastructure for compliance and security auditing?",
      "options": [
        "Amazon CloudWatch[cite: 105]",
        "AWS CloudTrail[cite: 105]",
        "AWS X-Ray[cite: 105]",
        "Amazon Route 53[cite: 105]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS CloudTrail logs every API action, user, IP, and timestamp for auditing and governance[cite: 105]."
    },
    {
      "id": "q-imp-1794831407981-78-x7g2",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a primary cause of \"bill shock\" in cloud computing environments?",
      "options": [
        "Fixed monthly pricing models with zero variable fees[cite: 105]",
        "Unmonitored auto-scaling, orphaned test virtual machines, and unattached storage disks[cite: 105]",
        "Mandatory upfront hardware purchases[cite: 105]",
        "Free data egress across all regions[cite: 105]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Unmonitored resource sprawl and forgotten development environments are primary contributors to unexpected cloud bill shock[cite: 105]."
    },
    {
      "id": "q-imp-1794831407981-79-vh25",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the AWS S3 and Lambda file-organizing lab, which file extensions are categorized under `Images/`?",
      "options": [
        "`.txt`, `.text`[cite: 1]",
        "`.pdf`, `.doc`, `.docx`[cite: 1]",
        "`.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.svg`, `.tif`, `.tiff`, `.ico`[cite: 1]",
        "`.zip`, `.json`, `.xml`, `.py`, `.mp4`[cite: 1]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The lab specifies a wide array of image extensions including `.jpg`, `.png`, `.gif`, `.svg`, etc., under `Images/`[cite: 1]."
    },
    {
      "id": "q-imp-1794831407981-80-9pjk",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the S3 file-organizing lab architecture, what is the role of Amazon CloudWatch Logs?",
      "options": [
        "To store the original uploaded documents permanently[cite: 3]",
        "To record the Lambda function's execution output, prints, and any runtime errors[cite: 3]",
        "To manage S3 bucket versioning policies[cite: 3]",
        "To route incoming HTTP traffic from the user to S3[cite: 3]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CloudWatch Logs captures execution print statements and error logs generated during Lambda function runs[cite: 3]."
    },
    {
      "id": "q-imp-1794831407981-81-x81d",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the S3 and Lambda lab prerequisites, why is no local Python installation or third-party package required for Lambda?",
      "options": [
        "Because Lambda runs exclusively in JavaScript[cite: 4]",
        "Because the Lambda runtime environment already supplies `boto3`, the AWS SDK for Python[cite: 4]",
        "Because AWS Lambda does not support Python functions[cite: 4]",
        "Because Lambda requires local EC2 instances to compile code[cite: 4]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The AWS Lambda Python runtime comes pre-equipped with `boto3`, eliminating the need for third-party packaging for standard tasks[cite: 4]."
    },
    {
      "id": "q-imp-1794831407981-82-pi4h",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What object ownership setting is configured when creating the S3 bucket in the file-organizing lab?",
      "options": [
        "ACLs enabled[cite: 4]",
        "ACLs disabled / Bucket owner enforced[cite: 4]",
        "Public read access enabled[cite: 4]",
        "Versioning enforced[cite: 4]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The lab instructs configuring \"ACLs disabled / Bucket owner enforced\" under Object Ownership[cite: 4]."
    },
    {
      "id": "q-imp-1794831407981-83-367o",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the S3 file-organizing lab IAM inline policy, what does the resource ARN ending with `/*` signify?",
      "options": [
        "The policy applies to every S3 bucket in the entire AWS account[cite: 6, 7].",
        "The policy applies specifically to objects within the specified lab bucket, not every bucket in the account[cite: 6, 7].",
        "The policy grants administrative root access to EC2[cite: 6, 7].",
        "The policy disables all encryption on the bucket[cite: 6, 7]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Appending `/*` restricts the IAM policy permissions to objects inside that specific bucket rather than all buckets[cite: 6, 7]."
    },
    {
      "id": "q-imp-1794831407981-84-tqsf",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "When setting up the Flask lab on Windows, what command activates the local Python virtual environment in Command Prompt (CMD)?",
      "options": [
        "`source venv/bin/activate`[cite: 21]",
        "`.venv\\Scripts\\activate.bat`[cite: 21]",
        "`python -m activate`[cite: 21]",
        "`pip install venv`[cite: 21]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** On Windows CMD, virtual environments are activated using `.venv\\Scripts\\activate.bat`[cite: 21]."
    },
    {
      "id": "q-imp-1794831407981-85-wzsz",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which file is created in the Git and Flask lab to prevent local virtual environments, Python cache files, and editor settings from being tracked by Git?",
      "options": [
        "`Dockerfile`[cite: 23]",
        "`requirements.txt`[cite: 23]",
        "`.gitignore`[cite: 23]",
        "`app.py`[cite: 23]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** A `.gitignore` file excludes `.venv/`, `__pycache__/`, and `.vscode/` from being tracked[cite: 23]."
    },
    {
      "id": "q-imp-1794831407981-86-e7fg",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which Git command unstages a file while keeping its edits intact in the working tree?",
      "options": [
        "`git restore app.py`[cite: 25]",
        "`git restore --staged app.py`[cite: 25]",
        "`git reset --hard HEAD`[cite: 25]",
        "`git commit -a`[cite: 25]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git restore --staged app.py` removes the file from the staging area while preserving its working tree modifications[cite: 25]."
    },
    {
      "id": "q-imp-1794831407981-87-m8c2",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the purpose of the `-u` flag when running `git push -u origin main`?",
      "options": [
        "It forces an overwrite of the remote repository history[cite: 28, 29].",
        "It sets upstream tracking for the main branch so subsequent pushes and pulls can omit remote and branch names[cite: 28, 29].",
        "It deletes the remote branch after pushing[cite: 28, 29].",
        "It encrypts the commit history using SSH keys[cite: 28, 29]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-u` (upstream) flag links the local branch to the remote tracking branch for simplified future pushes and pulls[cite: 28, 29]."
    },
    {
      "id": "q-imp-1794831407981-88-1l2j",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What does `git fetch --prune origin` accomplish?",
      "options": [
        "It deletes all local commit history permanently[cite: 30].",
        "It removes stale local remote-tracking references for branches that have already been deleted on GitHub[cite: 30].",
        "It forces a merge conflict resolution[cite: 30].",
        "It pushes local changes to origin immediately[cite: 30]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--prune` cleans up local references to remote branches that no longer exist on GitHub[cite: 30]."
    },
    {
      "id": "q-imp-1794831407981-89-tt3z",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "When a Git merge conflict occurs due to simultaneous edits on the same line, how does Git indicate the conflict inside the file?",
      "options": [
        "By deleting the file automatically[cite: 27, 50]",
        "By inserting conflict markers like `<<<<<<< HEAD`, `=======`, and `>>>>>>>`[cite: 27, 50]",
        "By throwing a fatal syntax error and aborting Python execution[cite: 27, 50]",
        "By appending `.conflict` to the filename[cite: 27, 50]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Git annotates conflicting files with conflict markers separating the current branch changes from the incoming branch changes[cite: 27, 50]."
    },
    {
      "id": "q-imp-1794831407981-90-zpob",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the Dockerfile created for the Flask lab, what does the instruction `ENV PYTHONDONTWRITEBYTECODE=1` do?",
      "options": [
        "It compiles all Python files into binary executables[cite: 37].",
        "It prevents Python from writing `.pyc` bytecode files to disk inside the container[cite: 37].",
        "It disables Python error logging[cite: 37].",
        "It upgrades pip automatically[cite: 37]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `PYTHONDONTWRITEBYTECODE=1` stops Python from generating unnecessary `.pyc` files in container layers[cite: 37]."
    },
    {
      "id": "q-imp-1794831407981-91-x6oy",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which Docker command is used to view detailed configuration and metadata for a running container like `flask-api`?",
      "options": [
        "`docker logs flask-api`[cite: 38, 41]",
        "`docker ps -a`[cite: 38, 41]",
        "`docker inspect flask-api`[cite: 38, 41]",
        "`docker exec flask-api`[cite: 38, 41]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `docker inspect` outputs detailed low-level configuration data for containers or images[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407981-92-t5ma",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "According to the Student Assessment Checklist in the Git/Docker lab, what is the normal day-to-day workflow cycle?",
      "options": [
        "Write code directly in production and reboot the server[cite: 43].",
        "Update local main, create feature branch, edit/test API, commit, push, open PR, merge, and test container[cite: 43].",
        "Push code to Docker Hub without version control[cite: 43].",
        "Run manual SSH scripts daily without version tracking[cite: 43]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The standard engineering cycle involves branching, testing, committing, pushing, opening PRs, merging, and containerizing[cite: 43]."
    },
    {
      "id": "q-imp-1794831407981-93-fu7y",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, what is the purpose of selecting the IPv4 CIDR block `10.0.0.0/16` for the custom VPC?",
      "options": [
        "It provides exactly 256 public IP addresses[cite: 72].",
        "It provides 65,536 private IP addresses ranging from `10.0.0.0` to `10.0.255.255`[cite: 72].",
        "It restricts network traffic exclusively to IPv6 addresses[cite: 72].",
        "It connects the VPC directly to the public internet without an Internet Gateway[cite: 72]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A `/16` CIDR block provides a total of 65,536 private IP addresses for the VPC[cite: 72]."
    },
    {
      "id": "q-imp-1794831407981-94-4ezk",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the AWS ALB lab, why must you enable \"Auto-assign public IPv4 address\" on the public subnets?",
      "options": [
        "So the subnets can route traffic to internal databases[cite: 73]",
        "So that EC2 instances launched inside those public subnets receive a public IPv4 address for SSH administration[cite: 73]",
        "To disable Security Groups entirely[cite: 73]",
        "To allow the Application Load Balancer to bypass subnets[cite: 73]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Enabling auto-assign public IPv4 ensures launched instances get public IPs for administrative access[cite: 73]."
    },
    {
      "id": "q-imp-1794831407981-95-lup1",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of an Internet Gateway (IGW) attached to a VPC?",
      "options": [
        "It acts as a relational database storage engine[cite: 73, 74].",
        "It provides bi-directional network address translation (NAT) between private subnet IP addresses and public internet addresses[cite: 73, 74].",
        "It executes Lambda functions serverless-style[cite: 73, 74].",
        "It replaces the need for Route Tables[cite: 73, 74]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Internet Gateway routes traffic between the VPC subnets and the public internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831407981-96-2q6d",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab route table configuration, what destination route is added to direct external traffic out through the Internet Gateway?",
      "options": [
        "`10.0.0.0/16`[cite: 74]",
        "`0.0.0.0/0` targeted to the Internet Gateway[cite: 74]",
        "`127.0.0.1/32`[cite: 74]",
        "`192.168.1.1/24`[cite: 74]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A route for `0.0.0.0/0` pointing to the Internet Gateway directs all external internet traffic correctly[cite: 74]."
    },
    {
      "id": "q-imp-1794831407981-97-g11y",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What private key file format is recommended when creating an EC2 Key Pair for Windows users leveraging built-in OpenSSH or Git Bash?",
      "options": [
        "`.ppk`[cite: 76]",
        "`.pem`[cite: 76]",
        "`.exe`[cite: 76]",
        "`.docx`[cite: 76]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `.pem` format works directly with Windows PowerShell OpenSSH, Git Bash, and EC2 Instance Connect[cite: 76]."
    },
    {
      "id": "q-imp-1794831407981-98-4eqi",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, how is the Flask REST API launched inside the Ubuntu EC2 instance in the background using Gunicorn?",
      "options": [
        "`python app.py`[cite: 79]",
        "`nohup gunicorn -w 2 -b 0.0.0.0:8000 app:app > app.log 2>&1 &`[cite: 79]",
        "`docker run flask-api`[cite: 79]",
        "`flask run --host=localhost`[cite: 79]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Gunicorn is launched with `nohup` bound to `0.0.0.0:8000` to keep running in the background and log output[cite: 79]."
    },
    {
      "id": "q-imp-1794831407981-99-lxpo",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "During AWS ALB target group verification, what success response code is configured for health checks to confirm target instances are healthy?",
      "options": [
        "HTTP 404[cite: 80, 82]",
        "HTTP 500[cite: 80, 82]",
        "HTTP 200[cite: 80, 82]",
        "HTTP 301[cite: 80, 82]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Success codes are set to `200` so that the ALB considers target instances healthy when they return an HTTP 200 OK[cite: 80, 82]."
    },
    {
      "id": "q-imp-1794831407981-100-06mi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary function of a Content Delivery Network (CDN) like Amazon CloudFront in cloud architecture?",
      "options": [
        "To manage relational database failovers across regions",
        "To cache static and dynamic assets geographically close to users to minimize latency[cite: 87]",
        "To execute serverless event-driven Python functions",
        "To provision Docker containers on EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CDNs cache web content at edge locations worldwide to reduce network latency and server load[cite: 87]."
    },
    {
      "id": "q-imp-1794831407981-101-bzoz",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Under the Cloud Shared Responsibility Model, who is responsible for configuring Network Security Groups and firewall rules?",
      "options": [
        "The cloud provider exclusively",
        "The customer[cite: 93, 94]",
        "The hardware hypervisor manufacturer",
        "Third-party CDN providers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Network security groups and firewall rules fall entirely under customer responsibility as part of security \"IN\" the cloud[cite: 93, 94]."
    },
    {
      "id": "q-imp-1794831407981-102-p4qr",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which cloud computing model offers raw compute, storage disks, and virtual networks while leaving operating system and application management to the customer?",
      "options": [
        "SaaS (Software as a Service)[cite: 119, 120]",
        "PaaS (Platform as a Service)[cite: 119, 120]",
        "IaaS (Infrastructure as a Service)[cite: 119, 120]",
        "FaaS (Function as a Service)[cite: 119, 120]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** IaaS provides virtualized hardware infrastructure, requiring the customer to manage OS patches and runtimes[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407981-103-5dgy",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the main operational advantage of using an open-source database engine like PostgreSQL on the cloud rather than proprietary vendor-locked databases?",
      "options": [
        "It guarantees zero network latency.",
        "It reduces vendor lock-in and migration barriers[cite: 125].",
        "It eliminates the need for any backups.",
        "It runs entirely without a virtual network."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Standard open-source engines minimize vendor lock-in, making it easier to migrate or run across multi-cloud environments[cite: 125]."
    },
    {
      "id": "q-imp-1794831407981-104-nsdc",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the context of database management systems, what is a Read Replica used for?",
      "options": [
        "To process write transactions exclusively",
        "To scale read query performance by maintaining an asynchronous copy of the primary database[cite: 90]",
        "To store static images and logs",
        "To replace application load balancers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Read replicas handle read-heavy traffic by asynchronously replicating data from the primary database instance[cite: 90]."
    },
    {
      "id": "q-imp-1794831407981-105-6mgz",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Why should developers never commit sensitive secrets, such as API keys or database passwords, to a public or private Git repository?",
      "options": [
        "Because Git automatically deletes files larger than 1 MB.",
        "Because exposed credentials can be scraped and exploited by attackers, compromising security[cite: 53].",
        "Because Flask applications will fail to compile.",
        "Because Dockerfiles cannot build images containing secrets."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Committing secrets to version control risks exposure, even in private repositories, prompting the use of environment variables or secret managers[cite: 53]."
    },
    {
      "id": "q-imp-1794831407981-106-glaj",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the purpose of `.dockerignore` when building Docker images?",
      "options": [
        "To ignore Python syntax errors",
        "To prevent unnecessary local files (like `.git/`, `.venv/`, and cache files) from being sent to the Docker build context[cite: 36]",
        "To specify which database ports to open",
        "To automatically push images to Docker Hub"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `.dockerignore` excludes unwanted local files from the build context, optimizing build times and image security[cite: 36]."
    },
    {
      "id": "q-imp-1794831407981-107-x9ac",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Git, what does the command `git log --oneline --graph --all` display?",
      "options": [
        "A flat list of all modified files in the working directory",
        "A compact, graphical representation of commit histories across all branches[cite: 26, 48]",
        "The exact diff of staged changes",
        "The remote repository URL history"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** This command visualizes the branch and commit topology compactly using text-based graphs[cite: 26, 48]."
    },
    {
      "id": "q-imp-1794831407981-108-i3md",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of an Application Load Balancer's default action in a listener configuration?",
      "options": [
        "It encrypts all traffic using SSH keys.",
        "It specifies where incoming requests on a given port should be forwarded (e.g., to a Target Group)[cite: 81]",
        "It terminates the VPC network.",
        "It scales the Auto-Scaling group automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Listener rules define how the load balancer handles incoming requests, routing them to target groups via actions like forwarding[cite: 81]."
    },
    {
      "id": "q-imp-1794831407981-109-ak0f",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which AWS compute option provides a fully managed web application platform (PaaS) where developers deploy code without managing underlying servers or scaling?",
      "options": [
        "Amazon EC2[cite: 102]",
        "Amazon ECS[cite: 102]",
        "AWS Elastic Beanstalk[cite: 102]",
        "AWS Lambda[cite: 102]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Elastic Beanstalk is a PaaS offering that handles deployment details, capacity provisioning, and load balancing automatically[cite: 102]."
    },
    {
      "id": "q-imp-1794831407981-110-mxlu",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary purpose of a Database Migration script in an application deployment lifecycle?",
      "options": [
        "To move files from S3 to local storage",
        "To programmatically update database schemas, tables, and records safely across environments[cite: 79]",
        "To scale Docker containers horizontally",
        "To convert Python code into binary executables"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Database migration tools (like Flask-Migrate or Alembic) manage and apply schema changes reliably across deployments[cite: 79]."
    },
    {
      "id": "q-imp-1794831407981-111-qwve",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Python Flask development, what is the purpose of the `jsonify()` function?",
      "options": [
        "To compress Python scripts into zip files",
        "To serialize Python dictionaries or lists into formatted JSON HTTP responses with appropriate headers[cite: 22]",
        "To connect directly to SQLite databases",
        "To parse incoming command-line arguments"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `jsonify()` constructs a response object with an application/json mimetype containing the serialized JSON data[cite: 22]."
    },
    {
      "id": "q-imp-1794831407981-112-9fzn",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Why is SQLite typically used in introductory web development labs rather than enterprise databases like PostgreSQL or Oracle?",
      "options": [
        "Because SQLite supports distributed multi-region sharding.",
        "Because it is a lightweight, file-based database requiring zero complex server configuration or external service setup[cite: 79].",
        "Because SQLite provides 11 nines of data durability.",
        "Because SQLite cannot run inside Docker containers."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SQLite stores data in a single local file, making it exceptionally easy to set up for local development and introductory labs[cite: 79]."
    },
    {
      "id": "q-imp-1794831407981-113-vrwv",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What does a non-fast-forward Git push rejection protect against?",
      "options": [
        "Syntax errors in Python source code",
        "Overwriting someone else's committed work on the remote repository without integrating it first[cite: 33, 42]",
        "Exceeding S3 storage quotas",
        "Invalid AWS IAM credentials"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Rejecting non-fast-forward pushes prevents developers from silently overwriting remote commits that are missing from their local history[cite: 33, 42]."
    },
    {
      "id": "q-imp-1794831407981-114-isss",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Docker, what command displays all containers, including both active running containers and stopped containers?",
      "options": [
        "`docker ps`[cite: 41]",
        "`docker ps -a`[cite: 41]",
        "`docker images`[cite: 41]",
        "`docker container list`[cite: 41]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-a` flag instructs `docker ps` to list all container instances regardless of their current running state[cite: 41]."
    },
    {
      "id": "q-imp-1794831407981-115-skpg",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which tool or service is typically used for distributed tracing across microservice call chains to detect performance bottlenecks?",
      "options": [
        "AWS CloudTrail[cite: 105]",
        "Amazon S3[cite: 105]",
        "AWS X-Ray / Application Insights[cite: 105]",
        "AWS IAM[cite: 105]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Application performance monitoring tools like AWS X-Ray and Azure Application Insights track requests across microservices[cite: 105]."
    },
    {
      "id": "q-imp-1794831407981-116-u525",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the fundamental difference between a public subnet and a private subnet inside an AWS VPC?",
      "options": [
        "Public subnets have more CPU power than private subnets.",
        "Public subnets have a route table pointing to an Internet Gateway, whereas private subnets do not have direct inbound internet routes[cite: 74, 99].",
        "Public subnets cannot run Linux EC2 instances.",
        "Private subnets are managed exclusively by Azure."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public subnets communicate directly with the public internet via an Internet Gateway, while private subnets are isolated[cite: 74, 99]."
    },
    {
      "id": "q-imp-1794831407981-117-be90",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of an AWS NAT Gateway?",
      "options": [
        "To host public web applications",
        "To enable instances in a private subnet to initiate outbound internet traffic (such as package updates) while preventing unrequested inbound traffic[cite: 90, 99]",
        "To translate domain names into IP addresses",
        "To balance load across Availability Zones"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A NAT Gateway provides secure, outbound-only internet connectivity for private subnet resources[cite: 90, 99]."
    },
    {
      "id": "q-imp-1794831407981-118-s6xm",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Git collaboration workflows, what does a Pull Request (PR) represent?",
      "options": [
        "A command executed in the terminal to download remote branches",
        "A web-based GitHub review mechanism to propose, review, and discuss code changes before merging them into a target branch[cite: 35, 50]",
        "An automated script that deletes conflicting files",
        "A local merge conflict resolution tool"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Pull requests provide a platform for code review and discussion before merging feature branches into production[cite: 35, 50]."
    },
    {
      "id": "q-imp-1794831407981-119-kzag",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which command downloads remote repository history and ref references without automatically merging or modifying your current local branch?",
      "options": [
        "`git pull`[cite: 30, 51]",
        "`git fetch`[cite: 30, 51]",
        "`git clone`[cite: 30, 51]",
        "`git push`[cite: 30, 51]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git fetch` downloads remote updates safely without altering your working tree or current branch state[cite: 30, 51]."
    },
    {
      "id": "q-imp-1794831407981-120-2l0a",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What happens during a Docker build process when a Dockerfile instruction (such as `COPY requirements.txt .`) has not changed since the last build?",
      "options": [
        "Docker throws a build error.",
        "Docker reuses the cached layer instantly, speeding up the build time.",
        "Docker deletes the previous image automatically.",
        "Docker downloads the layer from Docker Hub."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker utilizes layer caching, skipping steps whose instructions and context files remain identical to previous builds[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831407981-121-yg80",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Why is it a security risk to store database passwords or cloud deployment tokens inside source code files?",
      "options": [
        "Because Python interpreters cannot read plain text passwords.",
        "Because anyone with access to the source code or repository history can extract and abuse those credentials[cite: 16, 23].",
        "Because Git automatically encrypts all source files.",
        "Because Docker containers refuse to run code containing passwords."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Hardcoding secrets in source code risks accidental exposure through version control history or unauthorized repository access[cite: 16, 23]."
    },
    {
      "id": "q-imp-1794831407981-122-w38z",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary benefit of containerization over traditional hardware virtualization (Virtual Machines)?",
      "options": [
        "Containers require a full independent guest operating system for each instance.",
        "Containers share the host OS kernel, resulting in instantaneous startup times, minimal resource overhead, and high density[cite: 60].",
        "Containers can only run on Windows operating systems.",
        "Containers eliminate the need for any network configuration."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** By sharing the host kernel rather than running a full guest OS, containers achieve lightweight and rapid execution[cite: 60]."
    },
    {
      "id": "q-imp-1794831407981-123-guq5",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the DevOps lifecycle, what stage immediately follows coding and precedes deployment?",
      "options": [
        "Requirements backlog grooming",
        "Build and Automated Testing (CI)[cite: 57, 59]",
        "Customer feedback surveys",
        "Physical server procurement"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** After writing code, the next phases involve building artifacts, compiling packages, and executing automated tests[cite: 57, 59]."
    },
    {
      "id": "q-imp-1794831407981-124-b0uj",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does MTTR stand for in the context of DevOps measurement metrics?",
      "options": [
        "Maximum Transfer Time Rate",
        "Memory Tier Traffic Response",
        "Mean Time to Recovery (or Mean Time to Repair)[cite: 55]",
        "Multi-Tenant Transfer Routine"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** MTTR measures how quickly an organization can recover from system failures or production outages[cite: 55]."
    },
    {
      "id": "q-imp-1794831407981-125-a6t3",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which cloud service provider pioneered commercial cloud computing in 2006 with the launch of S3 and EC2?",
      "options": [
        "Microsoft Azure[cite: 112]",
        "Google Cloud Platform[cite: 112]",
        "Amazon Web Services (AWS)[cite: 112]",
        "DigitalOcean[cite: 112]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Amazon Web Services pioneered modern public cloud computing by launching S3 and EC2 in 2006[cite: 112]."
    },
    {
      "id": "q-imp-1794831407981-126-u9s4",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS IAM (Identity and Access Management) Role?",
      "options": [
        "To encrypt S3 buckets at rest",
        "To provide temporary, secure permissions and access policies that can be assumed by AWS services (like Lambda) or users[cite: 7, 116]",
        "To manage DNS routing records",
        "To balance HTTP traffic across EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IAM roles grant temporary, least-privilege permissions to AWS resources and applications without embedding static keys[cite: 7, 116]."
    },
    {
      "id": "q-imp-1794831407981-127-1yfc",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the context of S3 storage, what does \"11 nines of durability\" (`99.999999999%`) mean?",
      "options": [
        "The system will never experience network latency above 11 milliseconds.",
        "The probability of losing stored data is exceptionally infinitesimal, equating to an average expectation of losing 1 object out of 100 billion over millions of years[cite: 100].",
        "Files can be up to 11 terabytes in size.",
        "Buckets must be replicated across 11 distinct global regions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Eleven nines of durability signifies extreme reliability and data persistence against permanent loss[cite: 100]."
    },
    {
      "id": "q-imp-1794831407981-128-v625",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is a \"Cold Start\" in serverless computing architectures like AWS Lambda?",
      "options": [
        "The time it takes to boot a physical server data center after a power outage",
        "The brief initialization latency experienced when a cloud provider provisions a new micro-VM container for a function after an idle period[cite: 102]",
        "The time required to restore a database from a cold backup",
        "The cooling downtime required by CPU cores under heavy load"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A cold start occurs when serverless functions initialize execution environments upon invocation following a period of inactivity[cite: 102]."
    },
    {
      "id": "q-imp-1794831407981-129-s4mi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which Azure service corresponds functionally to Amazon S3 for storing massive amounts of unstructured object data?",
      "options": [
        "Azure Files[cite: 104]",
        "Azure Blob Storage[cite: 104]",
        "Azure SQL Database[cite: 104]",
        "Azure Queue Storage[cite: 104]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Blob Storage is Azure's massively scalable object storage solution for unstructured data[cite: 104]."
    },
    {
      "id": "q-imp-1794831407981-130-luji",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of a Kusto Query Language (KQL) in Azure?",
      "options": [
        "To provision virtual machines using Infrastructure as Code",
        "To query and analyze large volumes of log and telemetry data inside Azure Log Analytics[cite: 105]",
        "To configure load balancer target groups",
        "To manage Kubernetes container orchestration clusters"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** KQL is a powerful expressive query language used to search and analyze telemetry data in Azure Monitor[cite: 105]."
    },
    {
      "id": "q-imp-1794831407981-131-i70u",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which cloud computing deployment model is shared among several organizations with common security, policy, or regulatory missions?",
      "options": [
        "Public Cloud[cite: 124]",
        "Private Cloud[cite: 124]",
        "Community Cloud[cite: 124]",
        "Hybrid Cloud[cite: 124]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** A community cloud model serves specialized organizations sharing mutual concerns, compliance, or research objectives[cite: 124]."
    },
    {
      "id": "q-imp-1794831407981-132-r4bw",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary risk of adopting proprietary vendor-specific cloud APIs and serverless workflows?",
      "options": [
        "Enhanced hardware performance",
        "Severe vendor lock-in, making future migration to alternative clouds or on-premise infrastructure complex and expensive[cite: 125]",
        "Elimination of all security vulnerabilities",
        "Instant reduction in monthly cloud bills"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Proprietary services bind architectures tightly to a single provider, raising barriers and costs for future migration[cite: 125]."
    },
    {
      "id": "q-imp-1794831407981-133-zr3m",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In web service communication, what is the data format exclusively mandated by SOAP (Simple Object Access Protocol)?",
      "options": [
        "JSON[cite: 125]",
        "Protocol Buffers (Protobuf)[cite: 125]",
        "Strict XML[cite: 125]",
        "Plain text CSV[cite: 125]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** SOAP relies strictly on rigid XML envelopes and schemas for message transmission[cite: 125]."
    },
    {
      "id": "q-imp-1794831407981-134-kbvh",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary benefit of Serverless architectures (like AWS Lambda) regarding billing economics?",
      "options": [
        "Fixed monthly subscription fees regardless of usage",
        "Pure pay-per-execution pricing with zero cost when idle (scales to zero)[cite: 91, 102]",
        "Higher costs offset by permanent VM allocation",
        "Mandatory upfront reservation fees for 3 years"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Serverless computing charges strictly for compute duration and memory consumed, dropping to zero cost when inactive[cite: 91, 102]."
    },
    {
      "id": "q-imp-1794831407981-135-3sev",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Amazon EC2 terminology, what does AMI stand for?",
      "options": [
        "Automated Managed Instance",
        "Amazon Machine Image[cite: 97]",
        "Application Migration Interface",
        "Advanced Memory Index"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An AMI is a templated virtual appliance containing the OS and software configurations needed to launch an EC2 instance[cite: 97]."
    },
    {
      "id": "q-imp-1794831407981-136-q78y",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which virtualization component intercepts guest OS hardware instructions and allocates physical CPU, memory, and I/O?",
      "options": [
        "An Internet Gateway",
        "A Hypervisor (Virtual Machine Monitor)[cite: 122]",
        "A Container Registry",
        "A Route Table"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The hypervisor acts as the abstraction layer managing physical hardware allocation across concurrent virtual machines[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-137-vun2",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the main security purpose of keeping cloud S3 buckets private and blocking public access?",
      "options": [
        "To increase the upload speed of large video files",
        "To prevent unauthorized external users from reading or stealing sensitive corporate data[cite: 4]",
        "To comply with Kubernetes networking rules",
        "To reduce object storage billing rates"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Keeping buckets private prevents data breaches and unauthorized public access to confidential documents[cite: 4]."
    },
    {
      "id": "q-imp-1794831407981-138-tkmg",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In Python, what does `os.path.splitext(\"report.PDF\")` return?",
      "options": [
        "`(\"report.PDF\", \"\")`",
        "`(\"report\", \".PDF\")`[cite: 11]",
        "`(\".PDF\", \"report\")`",
        "`(\"report\", \"PDF\")`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `os.path.splitext()` splits a filename path into a tuple containing the root name and the extension[cite: 11]."
    },
    {
      "id": "q-imp-1794831407981-139-rvw9",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is `git push --force` discouraged as a routine solution to a rejected push in team environments?",
      "options": [
        "Because it deletes the local repository entirely.",
        "Because it forcefully overwrites remote history, potentially destroying commits and work contributed by teammates[cite: 34].",
        "Because it converts Git into a centralized VCS.",
        "Because it requires administrator access on local Windows machines."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Force-pushing discards remote commits blindly, leading to lost work and broken collaboration histories[cite: 34]."
    },
    {
      "id": "q-imp-1794831407981-140-mh1g",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of the `FROM` instruction in a Dockerfile?",
      "options": [
        "It copies source code from the host machine into the container.",
        "It specifies the parent base image (such as Python or Node.js) upon which subsequent instructions build[cite: 37, 63].",
        "It opens network ports on the host.",
        "It executes unit tests during build time."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `FROM` establishes the foundational base image for building custom container layers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407981-141-rt5o",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In AWS VPC networking, what does CIDR stand for?",
      "options": [
        "Centralized Internet Data Route",
        "Classless Inter-Domain Routing[cite: 72]",
        "Cloud Infrastructure Directory Record",
        "Container Instance Definition Rule"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CIDR notation defines IP address ranges and subnet masks in network engineering[cite: 72]."
    },
    {
      "id": "q-imp-1794831407981-142-4hfi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which AWS database service provides fully managed MySQL and PostgreSQL relational engines with automated backups and scaling?",
      "options": [
        "Amazon DynamoDB[cite: 116]",
        "Amazon RDS (Relational Database Service)[cite: 116]",
        "Amazon S3[cite: 116]",
        "Amazon CloudFront[cite: 116]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Amazon RDS simplifies relational database administration, patching, backups, and scaling in the cloud[cite: 116]."
    },
    {
      "id": "q-imp-1794831407981-143-v9nn",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary function of Azure Resource Manager (ARM)?",
      "options": [
        "To manage Linux container namespaces",
        "To serve as the unified deployment and management layer processing all Azure API requests[cite: 103]",
        "To host static web pages on GitHub",
        "To execute automated unit tests in CI/CD pipelines"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ARM handles all resource creation, updates, and deletions across Azure subscriptions programmatically[cite: 103]."
    },
    {
      "id": "q-imp-1794831407981-144-u2ny",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In cloud governance, what is a Management Group in Azure used for?",
      "options": [
        "Managing single virtual machine disk partitions",
        "Applying governance, compliance policies, and access controls across multiple subscriptions[cite: 103]",
        "Storing user authentication passwords",
        "Balancing incoming HTTP traffic"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Management groups provide hierarchical scoping for governance and policy enforcement across multiple subscriptions[cite: 103]."
    },
    {
      "id": "q-imp-1794831407981-145-9k87",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What feature distinguishes a Type 2 Hypervisor from a Type 1 Hypervisor regarding operating systems?",
      "options": [
        "Type 2 runs directly on bare metal without any OS.",
        "Type 2 runs on top of an existing host operating system, whereas Type 1 runs directly on bare-metal hardware[cite: 122].",
        "Type 2 supports containerization while Type 1 cannot.",
        "Type 2 is used exclusively in enterprise cloud data centers."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Hosted hypervisors (Type 2) require an underlying host OS, introducing virtualization scheduling latency[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-146-qfvd",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why are URL-encoded object keys common in S3 event notifications?",
      "options": [
        "To encrypt file contents using SSL certificates",
        "To ensure spaces and special characters in filenames are safely transmitted via HTTP URLs (e.g., representing spaces as `+` or `%20`)[cite: 12]",
        "To convert PDF files into plain text",
        "To compress file sizes prior to uploading"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 event notifications encode special characters and spaces in object keys, requiring URL-decoding in application logic[cite: 12]."
    },
    {
      "id": "q-imp-1794831407981-147-gzfj",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In the Git version control system, what is a \"branch\"?",
      "options": [
        "A physical backup copy of the entire project stored on GitHub",
        "A lightweight, movable pointer to a specific commit snapshot[cite: 26, 48]",
        "An automated script that compiles Python code",
        "A locked storage directory in the `.git` folder"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Branches in Git are inexpensive pointers to specific commits, enabling isolated feature development[cite: 26, 48]."
    },
    {
      "id": "q-imp-1794831407981-148-7gdn",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the purpose of the `WORKDIR` instruction in a Dockerfile?",
      "options": [
        "It downloads application code from GitHub.",
        "It sets the working directory inside the container for any subsequent `RUN`, `COPY`, or `CMD` instructions[cite: 37, 63].",
        "It defines container environment variables.",
        "It compiles C++ libraries."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `WORKDIR` establishes the active directory context inside the container image filesystem[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407981-149-izv7",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary role of an AWS Internet Gateway in a custom VPC architecture?",
      "options": [
        "To provide internal database replication",
        "To connect the VPC's public subnets directly to the external public Internet[cite: 73, 74]",
        "To secure instances using stateful firewalls",
        "To manage IAM user roles and permissions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Internet Gateway enables communication between VPC instances and the internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831407981-150-zz4w",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which command initializes a brand-new local Git repository in the current working directory?",
      "options": [
        "`git clone`",
        "`git remote add`",
        "`git init`",
        "`git status`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `git init` creates the local repository metadata inside a hidden `.git` folder[cite: 23, 47]."
    },
    {
      "id": "q-imp-1794831407981-151-ouaa",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary purpose of the `s3:PutObject` permission in an AWS Lambda execution role?",
      "options": [
        "To delete the original source file after copying",
        "To create and write the destination copied object to S3[cite: 7]",
        "To read the source object during copy operations[cite: 7]",
        "To create a new S3 bucket[cite: 7]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `s3:PutObject` grants the permission required to create destination objects in S3[cite: 7]."
    },
    {
      "id": "q-imp-1794831407981-152-1033",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which component in Docker architecture communicates directly with the Docker client via a REST API to manage images and containers?",
      "options": [
        "Docker Registry",
        "Docker Daemon[cite: 61]",
        "Hypervisor Type 1",
        "Internet Gateway"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Docker daemon runs on the host machine and listens for Docker API requests from clients[cite: 61]."
    },
    {
      "id": "q-imp-1794831407981-153-vff0",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What distinguishes Continuous Integration (CI) from Continuous Delivery (CD)?",
      "options": [
        "CI involves deploying directly to production without tests, while CD runs unit tests.",
        "CI focuses on frequent automated builds and test executions upon code commits, whereas CD extends this by automating staging deployments and release pipelines[cite: 59, 60].",
        "CI uses Docker containers, while CD uses virtual machines.",
        "CI requires manual approvals for every commit."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CI validates code integrity through automated builds and testing upon every merge, while CD packages and delivers it toward release[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831407981-154-3cb9",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which AWS storage service provides object storage with high scalability and 11 nines of durability?",
      "options": [
        "Amazon EBS",
        "Amazon EC2",
        "Amazon S3[cite: 100]",
        "Amazon RDS"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Amazon S3 is an object storage service designed for 99.999999999% durability[cite: 100]."
    },
    {
      "id": "q-imp-1794831407981-155-33uq",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is `git switch -c feature/name` preferred in modern Git workflows over older checkout syntax?",
      "options": [
        "It automatically pushes the branch to GitHub.",
        "It provides a dedicated, unambiguous command (`switch`) specifically for switching branches and creating new ones[cite: 25, 29].",
        "It deletes the main branch automatically.",
        "It resolves merge conflicts without user interaction."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git switch` was introduced to separate branch switching operations cleanly from file-restoration tasks previously conflated in `git checkout`[cite: 25, 29]."
    },
    {
      "id": "q-imp-1794831407981-156-l92l",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of the `CMD` instruction in a Dockerfile?",
      "options": [
        "It installs operating system patches during image build time.",
        "It specifies the default executable and arguments run when a container starts from the image[cite: 37, 63].",
        "It exposes container network ports to the host machine.",
        "It copies requirements files into the container."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `CMD` defines the default command executed when a container is launched[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407981-157-1vmi",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what HTTP status code is returned by default when a route executes successfully without explicit error codes?",
      "options": [
        "404 Not Found",
        "500 Internal Server Error",
        "200 OK",
        "201 Created"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Flask routes return an HTTP 200 OK status code by default upon successful execution[cite: 22]."
    },
    {
      "id": "q-imp-1794831407981-158-cxdi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary role of a Load Balancer in cloud infrastructure?",
      "options": [
        "To encrypt all incoming database connections using AES-256",
        "To evenly distribute incoming client network traffic across a pool of healthy backend servers[cite: 71, 92]",
        "To store static web files and images",
        "To manage Kubernetes cluster nodes"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Load balancers distribute requests across multiple backend instances to ensure high availability and prevent overload[cite: 71, 92]."
    },
    {
      "id": "q-imp-1794831407981-159-i94h",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Under the AWS Shared Responsibility Model, who is responsible for managing the hardware and virtualization host hypervisors?",
      "options": [
        "The Customer",
        "The Cloud Provider (AWS)[cite: 94]",
        "Third-Party Security Auditors",
        "Database Administrators"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security \"OF\" the cloud—including physical data centers, hardware, and hypervisors—is managed entirely by AWS[cite: 94]."
    },
    {
      "id": "q-imp-1794831407981-160-env5",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which command lists all local Git branches in your repository?",
      "options": [
        "`git status`",
        "`git log`",
        "`git branch`[cite: 26, 49]",
        "`git remote -v`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `git branch` lists all local branches, marking the active branch with an asterisk[cite: 26, 49]."
    },
    {
      "id": "q-imp-1794831407981-161-13ue",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the purpose of the `COPY` instruction in a Dockerfile?",
      "options": [
        "To download packages from an external URL repository",
        "To copy new files or directories from the host build context into the container filesystem[cite: 37, 63]",
        "To backup container logs to Amazon S3",
        "To create symbolic links between containers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `COPY` transfers files and folders from your local project directory into the container image during the build process[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407981-162-kga1",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does SLA stand for in cloud computing contracts?",
      "options": [
        "Secured Local Area",
        "Service Level Agreement[cite: 89]",
        "Scalable Logging Architecture",
        "Serverless Lambda Application"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An SLA defines the guaranteed uptime and availability commitments provided by a cloud vendor[cite: 89]."
    },
    {
      "id": "q-imp-1794831407981-163-05jf",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is horizontal auto-scaling dependent on stateless application design?",
      "options": [
        "Because stateful applications cannot use Docker containers.",
        "Because if requests are distributed across multiple instances by a load balancer, any instance must be able to handle any request without relying on local session state stored in RAM[cite: 88, 93].",
        "Because stateless servers require more CPU power.",
        "Because databases cannot connect to stateless instances."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Stateless architectures ensure that scaling instances up or down does not cause user data loss, as sessions are stored externally (e.g., in Redis or databases)[cite: 88, 93]."
    },
    {
      "id": "q-imp-1794831407981-164-u9ls",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which cloud service model is Microsoft 365 or Google Workspace classified under?",
      "options": [
        "IaaS",
        "PaaS",
        "SaaS[cite: 119, 120]",
        "FaaS"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Ready-to-consume productivity applications delivered over the web are classified as Software as a Service (SaaS)[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407981-165-1a9f",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary benefit of setting up a Python virtual environment (`venv`) for a project?",
      "options": [
        "It encrypts source code files.",
        "It isolates project dependencies and packages from the global Python installation, preventing version conflicts[cite: 21].",
        "It compiles Python scripts into native machine code.",
        "It automates GitHub deployments."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtual environments keep project-specific libraries isolated, ensuring dependencies do not clash across different applications[cite: 21]."
    },
    {
      "id": "q-imp-1794831407981-166-2hsh",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does an Availability Zone (AZ) consist of in AWS infrastructure?",
      "options": [
        "A single physical computer server",
        "One or more discrete data centers with redundant power, cooling, and networking[cite: 115, 117]",
        "An entire global continent",
        "A DNS routing endpoint"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An AZ comprises one or more fully isolated data centers equipped with redundant infrastructure within a Region[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831407981-167-ccgo",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which command displays the remote repository URLs linked to your local Git repository?",
      "options": [
        "`git status`",
        "`git branch -r`",
        "`git remote -v`[cite: 28, 40, 50]",
        "`git log`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `git remote -v` lists the configured remote repository names and their corresponding fetch/push URLs[cite: 28, 40, 50]."
    },
    {
      "id": "q-imp-1794831407981-168-t0ys",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS Security Group?",
      "options": [
        "To manage database table schemas",
        "To act as a virtual firewall controlling inbound and outbound traffic at the EC2 instance level[cite: 74, 99]",
        "To assign public IP addresses automatically",
        "To store encrypted passwords"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security Groups function as stateful virtual firewalls attached directly to instances to control network traffic[cite: 74, 99]."
    },
    {
      "id": "q-imp-1794831407981-169-ovrv",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does Docker ensure that containerized applications run identically across different host machines?",
      "options": [
        "By virtualizing full hardware motherboards",
        "By packaging the application code, runtime libraries, and environment dependencies together into an immutable image container layer[cite: 61]",
        "By translating Python code into Java bytecode",
        "By requiring Windows Server on all hosts"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker packages all application dependencies into an isolated image, guaranteeing environment parity across development and production[cite: 61]."
    },
    {
      "id": "q-imp-1794831407981-170-greg",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command is used to start a stopped Docker container?",
      "options": [
        "`docker run`",
        "`docker start`",
        "`docker build`",
        "`docker up`"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** `docker start` resumes an existing stopped container instance."
    },
    {
      "id": "q-imp-1794831407981-171-rnf4",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Python Flask, how are URL path parameters captured in route definitions (e.g., `/api/products/<int:product_id>`)?",
      "options": [
        "Using query strings like `?id=5`",
        "Using angle brackets with optional converters like `<int:product_id>`[cite: 22]",
        "Using environment variables",
        "Using global request headers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Flask routes support dynamic path converters such as `<int:product_id>` to pass variables directly into view functions[cite: 22]."
    },
    {
      "id": "q-imp-1794831407981-172-bq11",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of the `RUN` instruction in a Dockerfile?",
      "options": [
        "It runs when a container starts.",
        "It executes build-time commands (such as installing package dependencies) and creates a new cached image layer[cite: 37, 63].",
        "It connects the container to an external database.",
        "It maps host ports to container ports."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `RUN` executes commands during the image build phase, committing results into stacked image layers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407981-173-ns8a",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is it important to execute `git fetch` before reviewing remote branch updates?",
      "options": [
        "Because `git fetch` automatically merges all remote changes into your working tree.",
        "Because `git fetch` securely downloads remote commits and updates tracking references without modifying your working files or current branch[cite: 30, 31].",
        "Because Git forbids checking branch history while offline.",
        "Because it compiles project dependencies."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git fetch` updates local remote-tracking branches safely so you can inspect incoming work before deciding to merge or pull[cite: 30, 31]."
    },
    {
      "id": "q-imp-1794831407981-174-g8wk",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary benefit of serverless computing over provisioning EC2 virtual machines?",
      "options": [
        "Full root shell access to the underlying OS",
        "Zero server management, automatic scaling, and pay-per-execution billing with zero idle cost[cite: 102]",
        "Guaranteed 100% CPU allocation 24/7",
        "Elimination of all security policies"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Serverless platforms eliminate OS patching and capacity planning while scaling automatically and charging strictly for execution time[cite: 102]."
    },
    {
      "id": "q-imp-1794831407981-175-otnh",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the role of an Application Load Balancer Health Check?",
      "options": [
        "To scan container code for security vulnerabilities",
        "To continuously probe backend target endpoints to verify availability and automatically route traffic away from unhealthy instances[cite: 80, 92]",
        "To calculate monthly cloud billing costs",
        "To backup database files to S3"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Health checks monitor backend availability continuously, ensuring traffic is sent solely to healthy instances[cite: 80, 92]."
    },
    {
      "id": "q-imp-1794831407981-176-s9or",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does IaaS stand for in cloud computing service models?",
      "options": [
        "Internet Application and Service",
        "Infrastructure as a Service[cite: 119, 120]",
        "Integrated API Software",
        "Isolated Account Security"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IaaS delivers fundamental computing infrastructure like virtual servers, storage, and networking[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407981-177-7rqv",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Git, what happens when you run `git add` on modified files?",
      "options": [
        "The changes are permanently committed to the repository history.",
        "The changes are moved from the working directory into the staging area (index) in preparation for the next commit[cite: 47, 48].",
        "The changes are pushed to GitHub immediately.",
        "The files are deleted from disk."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git add` stages modifications, capturing a snapshot of changes ready to be locked into a commit[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831407981-178-ejou",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which AWS storage class is optimized for frequently accessed data with low latency requirements?",
      "options": [
        "S3 Glacier",
        "S3 Standard-IA",
        "S3 Standard[cite: 101]",
        "S3 Deep Archive"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** S3 Standard is designed for high-frequency data access with low latency[cite: 101]."
    },
    {
      "id": "q-imp-1794831407981-179-hf6q",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the purpose of an AWS VPC Route Table?",
      "options": [
        "To manage IAM user passwords",
        "To contain a set of rules (routes) that determine where network traffic directed from subnets is routed[cite: 74]",
        "To compile Python Lambda code",
        "To balance load across EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Route tables define network traffic pathways for subnets, determining whether traffic goes to an Internet Gateway or NAT Gateway[cite: 74]."
    },
    {
      "id": "q-imp-1794831407981-180-iuid",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command stops a running Docker container gracefully?",
      "options": [
        "`docker kill`",
        "`docker stop`[cite: 39, 64]",
        "`docker rm`[cite: 39, 64]",
        "`docker pause`[cite: 39, 64]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker stop` sends a SIGTERM signal to allow the containerized application to shut down gracefully[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831407981-181-c3k4",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what decorator defines a route URL endpoint?",
      "options": [
        "`@app.route()`[cite: 22]",
        "`@app.endpoint()`",
        "`@flask.define()`",
        "`@api.get()`"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** The `@app.route()` decorator binds a URL path to a Python view function in Flask[cite: 22]."
    },
    {
      "id": "q-imp-1794831407981-182-ggzj",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a major advantage of using Git for version control?",
      "options": [
        "It requires a centralized server to perform any commits.",
        "It tracks project history, enables branching, and allows seamless collaboration across distributed teams[cite: 46].",
        "It automatically deletes unused code files.",
        "It prevents all syntax errors in source code."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Git's distributed architecture tracks historical snapshots and empowers robust multi-developer collaboration[cite: 46]."
    },
    {
      "id": "q-imp-1794831407981-183-qtzn",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why do cloud architects deploy multi-tier applications across private subnets rather than putting every server in public subnets?",
      "options": [
        "To increase internet speed",
        "To enforce security in depth by isolating backend databases and application logic from direct public internet exposure[cite: 90, 99]",
        "To reduce cloud hosting costs to zero",
        "To eliminate the need for load balancers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Isolating backend tiers in private subnets prevents unauthorized direct access from external threats[cite: 90, 99]."
    },
    {
      "id": "q-imp-1794831407981-184-ieg5",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of the `docker images` command?",
      "options": [
        "It lists all running and stopped containers.",
        "It lists all local Docker images stored on your machine[cite: 41, 64].",
        "It deletes unused container layers.",
        "It builds an image from a Dockerfile."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker images` displays locally available container images, tags, and sizes[cite: 41, 64]."
    },
    {
      "id": "q-imp-1794831407981-185-oasc",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary function of an AWS Key Pair in EC2 instance management?",
      "options": [
        "To encrypt S3 bucket objects at rest",
        "To securely authenticate users over SSH when logging into Linux instances without passwords[cite: 76, 97]",
        "To manage IAM user roles",
        "To balance network traffic across subnets"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EC2 Key Pairs use public-key cryptography to authenticate SSH connections securely[cite: 76, 97]."
    },
    {
      "id": "q-imp-1794831407981-186-e33s",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does PaaS stand for in cloud computing?",
      "options": [
        "Public Application and Storage Service",
        "Platform as a Service[cite: 119, 120]",
        "Private Automated Security System",
        "Primary Access Software"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** PaaS delivers managed execution platforms and runtimes for developers to build applications[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407981-187-xiuj",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does a Fast-Forward merge differ from a 3-Way merge in Git?",
      "options": [
        "A Fast-Forward merge creates a new merge commit, while a 3-Way merge moves pointers.",
        "A Fast-Forward merge simply moves the target branch pointer forward to the tip of the incoming branch without divergence, whereas a 3-Way merge combines diverged histories into a new merge commit[cite: 49].",
        "A Fast-Forward merge requires conflict resolution.",
        "A Fast-Forward merge can only be executed on GitHub."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** When histories have not diverged, Git performs a fast-forward by advancing the pointer; diverged histories require a 3-way merge commit[cite: 49]."
    },
    {
      "id": "q-imp-1794831407981-188-bykw",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS S3 bucket?",
      "options": [
        "To execute serverless Python functions",
        "To store and retrieve any amount of data as objects in a globally unique namespace[cite: 100]",
        "To act as a relational SQL database",
        "To route DNS traffic"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 buckets serve as foundational storage containers for holding objects and files[cite: 100]."
    },
    {
      "id": "q-imp-1794831407981-189-u50p",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the purpose of the `ENV` instruction in a Dockerfile?",
      "options": [
        "To delete temporary build files",
        "To set environment variables inside the container environment[cite: 37, 63]",
        "To open firewall ports",
        "To clone GitHub repositories"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `ENV` defines persistent environment variables accessible during both build and runtime inside containers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407981-190-xois",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the main characteristic of a Monolithic Architecture?",
      "options": [
        "Applications are broken down into independent microservice containers.",
        "All application components (UI, business logic, data access) are bundled into a single unified codebase and deployment package[cite: 91].",
        "Code runs strictly on serverless event triggers.",
        "Every module runs on a separate cloud region."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Monoliths combine all software modules into one single executable or package[cite: 91]."
    },
    {
      "id": "q-imp-1794831407981-191-2j3s",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why do microservices architectures reduce the risk of catastrophic system failures compared to monoliths?",
      "options": [
        "Microservices never experience bugs.",
        "Services are decoupled and deployed independently, so a failure in one service (e.g., billing) does not necessarily crash the entire application[cite: 91].",
        "Microservices require zero network communication.",
        "Microservices run without operating systems."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Decoupled microservices isolate domains, preventing a bug in one module from taking down the entire system[cite: 91]."
    },
    {
      "id": "q-imp-1794831407981-192-6zq7",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command removes a stopped Docker container?",
      "options": [
        "`docker stop`",
        "`docker rm`[cite: 39, 64]",
        "`docker rmi`",
        "`docker clear`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker rm` deletes a stopped container instance from disk[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831407981-193-9dis",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Git, what does `git commit -m \"message\"` do?",
      "options": [
        "It stages modified files in the working directory.",
        "It records a permanent cryptographic snapshot of the staged changes into the local repository history with an explanatory message[cite: 47, 48].",
        "It pushes commits to GitHub.",
        "It downloads remote branch updates."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `commit` creates an immutable snapshot of staged changes in Git history[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831407981-194-j6r8",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS Virtual Private Cloud (VPC)?",
      "options": [
        "To host static web pages on S3",
        "To provide a logically isolated private virtual network dedicated to your AWS account[cite: 72, 98]",
        "To manage relational database transactions",
        "To execute Lambda functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A VPC provides custom network isolation, subnets, and routing control over your cloud resources[cite: 72, 98]."
    },
    {
      "id": "q-imp-1794831407981-195-2n9r",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the function of `git status`?",
      "options": [
        "It pushes local commits to GitHub.",
        "It displays the state of the working directory and staging area, showing tracked, untracked, and modified files[cite: 24, 47].",
        "It merges feature branches into main.",
        "It deletes untracked files permanently."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git status` reports which files are modified, staged, or untracked in your local workspace[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831407981-196-hs7e",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does SaaS stand for in cloud service delivery models?",
      "options": [
        "Secure Automated Server Software",
        "Software as a Service[cite: 119, 120]",
        "Scalable Application Infrastructure System",
        "Simple Administrative Storage Solution"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SaaS delivers fully managed application software over the internet on a subscription basis[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407981-197-7knm",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the purpose of Docker layer caching during image builds?",
      "options": [
        "To encrypt container images before pushing to registries",
        "To accelerate build times by reusing previously built image layers when instructions and files have not changed[cite: 62, 68]",
        "To limit CPU and RAM consumption inside containers",
        "To synchronize databases across availability zones"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Caching unchanged instruction layers speeds up subsequent `docker build` executions significantly[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831407981-198-0ygx",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which AWS service provides fully managed NoSQL key-value and document databases with single-digit millisecond latency?",
      "options": [
        "Amazon RDS",
        "Amazon DynamoDB[cite: 116]",
        "Amazon S3",
        "Amazon CloudFront"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Amazon DynamoDB is a fully managed NoSQL database service offering high performance at any scale[cite: 116]."
    },
    {
      "id": "q-imp-1794831407981-199-xocj",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is automated CI/CD pipeline testing considered superior to manual testing on production servers?",
      "options": [
        "It requires manual login via SSH for every test run.",
        "It catches integration bugs and regressions immediately (\"fail fast\") in isolated environments before code ever reaches production[cite: 59, 60].",
        "It eliminates the need for version control systems.",
        "It guarantees 100% hardware uptime."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Automated pipelines execute tests instantly upon every commit, catching errors early and ensuring safe, reliable deployments[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831407981-200-axem",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does the acronym NIST stand for in the context of cloud computing definitions?",
      "options": [
        "National Institute of Storage Technology",
        "National Institute of Standards and Technology[cite: 113]",
        "Network Information Security Team",
        "New Infrastructure Software Transition"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NIST stands for the National Institute of Standards and Technology, which defines essential cloud characteristics[cite: 113]."
    },
    {
      "id": "q-imp-1794831407981-201-u4sk",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which utility computing paradigm pioneered the concept of packaging CPU, storage, and bandwidth like public utilities?",
      "options": [
        "Client-Server Architecture",
        "Utility Computing[cite: 111]",
        "Mainframe Timesharing",
        "Peer-to-Peer Grid Computing"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Utility computing packages computing resources like electricity, water, and gas, charging users based on consumption[cite: 111]."
    },
    {
      "id": "q-imp-1794831407981-202-216z",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What was a key limitation of scientific grid computing in the late 1990s and 2000s?",
      "options": [
        "It could not run Python scripts.",
        "It was primarily designed for heavy batch jobs and scientific simulations rather than elastic commercial web applications[cite: 110].",
        "It required wireless broadband connections.",
        "It lacked high-speed LAN/WAN connectivity."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Grids were tailored for specialized batch and simulation processing like SETI@home rather than on-demand enterprise workloads[cite: 110]."
    },
    {
      "id": "q-imp-1794831407981-203-zbvk",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In NIST SP 800-145, how many essential characteristics define cloud computing?",
      "options": [
        "Three",
        "Four",
        "Five[cite: 113, 114]",
        "Seven"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** NIST outlines five essential characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831407981-204-zo87",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which front-end component allows administrators to manage cloud resources via command-line terminals?",
      "options": [
        "Web Browsers",
        "Cloud CLI tools and SDKs[cite: 113]",
        "Local Database Servers",
        "Hypervisor Virtualization Layers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud CLIs (like `aws-cli` or `az`) and SDKs form part of the front-end client interface layer[cite: 113]."
    },
    {
      "id": "q-imp-1794831407981-205-lxi8",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary function of Software-Defined Networking (SDN) within cloud data centers?",
      "options": [
        "To manufacture physical router cables",
        "To provision and manage virtual network topologies, subnets, and firewalls programmatically[cite: 113]",
        "To replace hypervisors entirely",
        "To compile application source code"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Software-defined networking abstracts physical hardware to manage VPCs and subnets dynamically[cite: 113]."
    },
    {
      "id": "q-imp-1794831407981-206-1ty2",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which cloud vendor launched commercial cloud computing by introducing Amazon S3 and EC2 in 2006?",
      "options": [
        "Microsoft Azure",
        "Google Cloud Platform",
        "Amazon Web Services (AWS)[cite: 112]",
        "Alibaba Cloud"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS pioneered modern commercial cloud computing by releasing S3 and EC2 in 2006[cite: 112]."
    },
    {
      "id": "q-imp-1794831407981-207-r60q",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In cloud infrastructure market comparisons, what is a primary historical strength of Microsoft Azure?",
      "options": [
        "Pioneering object storage in 2006",
        "Deep enterprise integration with Active Directory, Windows Server, and Office 365 licensing[cite: 115]",
        "Originating Kubernetes container orchestration",
        "Exclusive focus on open-source AI research"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure's core strength lies in seamless hybrid cloud and enterprise integration with the Microsoft ecosystem[cite: 115]."
    },
    {
      "id": "q-imp-1794831407981-208-lc7g",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a primary differentiator of Google Cloud Platform (GCP) in the hyperscale market?",
      "options": [
        "Exclusive ownership of Windows Server licenses",
        "Leadership in data analytics (BigQuery), AI/ML, and container orchestration as the originator of Kubernetes[cite: 115]",
        "Requiring physical mainframe terminals for setup",
        "Restricting services to single-AZ deployments"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** GCP is recognized for its strengths in big data analytics, machine learning, and container technologies[cite: 115]."
    },
    {
      "id": "q-imp-1794831407981-209-0z1t",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What term describes a physical geographic location containing multiple isolated, redundant data centers connected by ultra-low-latency fiber?",
      "options": [
        "Availability Zone",
        "Cloud Region[cite: 115, 117]",
        "Edge Point of Presence",
        "Subnet Gateway"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A cloud Region represents a geographic area housing multiple physically separated data center zones[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831407981-210-q6jb",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the purpose of Edge Locations or Points of Presence (PoPs) in global cloud architecture?",
      "options": [
        "To host primary relational database clusters",
        "To cache content globally close to end users to reduce delivery latency[cite: 117]",
        "To execute long-running batch data analytics jobs",
        "To replace regional Virtual Private Clouds"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Edge locations cache static and dynamic assets worldwide to serve users with minimal network latency[cite: 117]."
    },
    {
      "id": "q-imp-1794831407981-211-x5gm",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which domain in core cloud product catalogs covers user authentication, cryptographic key management, and perimeter defense?",
      "options": [
        "Compute",
        "Storage",
        "Security & Identity[cite: 116]",
        "Management & Governance"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Security and identity domains encompass services like IAM, KMS, and WAF[cite: 116]."
    },
    {
      "id": "q-imp-1794831407981-212-f572",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the Azure counterpart to AWS IAM for user identity management and role permissions?",
      "options": [
        "Azure SQL Database",
        "Microsoft Entra ID (formerly Azure Active Directory)[cite: 116]",
        "Azure Blob Storage",
        "Azure Functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Microsoft Entra ID handles user authentication, access control, and identity management in Azure[cite: 116]."
    },
    {
      "id": "q-imp-1794831407981-213-zq31",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the Google Cloud equivalent to Amazon Route 53 for domain name registration and DNS routing?",
      "options": [
        "Cloud SQL",
        "Cloud DNS[cite: 116]",
        "Cloud Storage",
        "Compute Engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud DNS is Google's scalable Domain Name System service matching AWS Route 53[cite: 116]."
    },
    {
      "id": "q-imp-1794831407981-214-zvfz",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Under the Cloud SPI Model, what does the \"P\" stand for?",
      "options": [
        "Private",
        "Platform[cite: 118, 119]",
        "Physical",
        "Per-second"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Cloud SPI Model stands for Software, Platform, and Infrastructure as a Service[cite: 118, 119]."
    },
    {
      "id": "q-imp-1794831407981-215-zmpx",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In the Cloud Stack Pyramid, which service model targets software developers needing managed runtimes without OS administration?",
      "options": [
        "IaaS",
        "PaaS (Platform as a Service)[cite: 119]",
        "SaaS",
        "Bare Metal"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** PaaS delivers ready-to-code execution environments tailored for developers[cite: 119]."
    },
    {
      "id": "q-imp-1794831407981-216-yefq",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which software delivery model eliminates client installation entirely by delivering applications exclusively through web browsers?",
      "options": [
        "IaaS",
        "PaaS",
        "SaaS (Software as a Service)[cite: 120]",
        "Client-Server Architecture"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** SaaS delivers fully managed applications accessible instantly via web browsers without local installations[cite: 120]."
    },
    {
      "id": "q-imp-1794831407981-217-04fq",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is a primary disadvantage of adopting the SaaS model for enterprise organizations?",
      "options": [
        "Inability to use web browsers",
        "Limited customizability and potential data privacy/compliance hurdles[cite: 121]",
        "Mandatory manual software patching on client PCs",
        "High upfront capital expenditure requirements"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SaaS limits deep code-level customization and introduces data governance dependencies on third-party vendors[cite: 121]."
    },
    {
      "id": "q-imp-1794831407981-218-xkgr",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which of the following is a prominent example of an enterprise SaaS productivity suite?",
      "options": [
        "Amazon EC2",
        "Linux KVM",
        "Microsoft 365 / Google Workspace[cite: 121]",
        "SQLite Database"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Microsoft 365 and Google Workspace are classic SaaS collaboration and productivity suites[cite: 121]."
    },
    {
      "id": "q-imp-1794831407981-219-7s9n",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary characteristic of storage virtualization?",
      "options": [
        "Attaching physical hard drives directly to local motherboards",
        "Pooling physical storage from multiple network storage devices (like SAN or NAS) to be managed as unified virtual storage volumes[cite: 122]",
        "Encrypting object keys in S3 buckets",
        "Converting block storage into serverless functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Storage virtualization abstracts physical storage arrays into flexible, pooled virtual storage pools[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-220-6ock",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is Desktop Virtualization (VDI)?",
      "options": [
        "Running mobile apps on smartwatches",
        "Hosting user desktop operating systems inside virtual machines on centralized servers, accessible remotely[cite: 122]",
        "Emulating Windows executables on Linux via WINE",
        "Caching static web pages at CDN edge nodes"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtual Desktop Infrastructure (VDI) runs centralized desktop environments accessible from remote thin clients[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-221-bw0c",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How do Type 1 and Type 2 hypervisors differ in terms of performance overhead?",
      "options": [
        "Type 1 has higher overhead because it runs inside a guest operating system.",
        "Type 1 offers near-native performance by interacting directly with bare-metal hardware, whereas Type 2 incurs overhead from host OS scheduling[cite: 122].",
        "Both hypervisors have identical performance profiles.",
        "Type 2 runs faster than bare-metal hardware."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bare-metal Type 1 hypervisors eliminate host OS overhead, delivering superior performance for cloud workloads[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-222-tcuw",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a \"Golden Image\" (or Template) in virtual machine provisioning?",
      "options": [
        "A corrupted disk backup",
        "A standardized, security-hardened virtual machine image used as a baseline for rapidly provisioning new instances[cite: 123]",
        "A physical server rack",
        "An unencrypted SSH key pair"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Golden images provide consistent, pre-configured baseline templates for spinning up virtual machines[cite: 123]."
    },
    {
      "id": "q-imp-1794831407981-223-zpeh",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What occurs during a Cold (Offline) Virtual Machine Migration?",
      "options": [
        "The VM continues running while memory pages transfer.",
        "The VM is powered down, its disk and memory states are transferred to a new host, and it is powered back on, causing downtime[cite: 123].",
        "The virtual machine is converted into a Docker container automatically.",
        "Network routing tables are reconfigured without stopping the OS."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cold migration requires powering off the VM, resulting in service downtime during transfer[cite: 123]."
    },
    {
      "id": "q-imp-1794831407981-224-a9f4",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which cloud deployment model refers to multi-tenant infrastructure owned and operated by a third-party vendor accessible over the public internet?",
      "options": [
        "Private Cloud",
        "Public Cloud[cite: 124]",
        "Community Cloud",
        "On-Premise Data Center"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public clouds deliver shared, multi-tenant computing resources over the public internet on a pay-as-you-go basis[cite: 124]."
    },
    {
      "id": "q-imp-1794831407981-225-5qmz",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary driver for an enterprise to adopt a Private Cloud infrastructure?",
      "options": [
        "Eliminating all operational expenses",
        "Meeting strict regulatory compliance, data sovereignty, and security mandates[cite: 124]",
        "Achieving zero network latency worldwide",
        "Bypassing the need for virtualization software"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Private clouds provide dedicated single-tenant isolation required by regulated industries like banking and defense[cite: 124]."
    },
    {
      "id": "q-imp-1794831407981-226-c18b",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What defines a Multi-Cloud operational strategy?",
      "options": [
        "Using only a single cloud provider for all workloads",
        "Leveraging services from two or more independent public cloud vendors (e.g., AWS + Azure + GCP)[cite: 124]",
        "Combining on-premises servers with a private cloud",
        "Running virtual machines without a hypervisor"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Multi-cloud involves utilizing multiple public cloud providers to prevent lock-in and leverage best-of-breed services[cite: 124]."
    },
    {
      "id": "q-imp-1794831407981-227-g4t8",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is a Community Cloud?",
      "options": [
        "A public cloud open to individual consumers only",
        "A shared cloud infrastructure managed and used by several organizations with common compliance or regulatory missions[cite: 124]",
        "A virtual machine cluster hosted on developer laptops",
        "A global CDN network"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Community clouds pool infrastructure across organizations with shared security or industry requirements[cite: 124]."
    },
    {
      "id": "q-imp-1794831407981-228-l0rs",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is cloud \"sprawl\"?",
      "options": [
        "The physical expansion of data center real estate",
        "The uncontrolled accumulation of unmonitored cloud resources, orphaned VMs, and unused disks driving up costs[cite: 125]",
        "The speed at which virtual machines migrate across hosts",
        "The automatic scaling of serverless functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud sprawl occurs when unmanaged resources accumulate, leading to unexpected financial waste[cite: 125]."
    },
    {
      "id": "q-imp-1794831407981-229-uaro",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does FinOps help mitigate cloud cost challenges?",
      "options": [
        "By shutting down all internet gateways permanently",
        "By bringing financial accountability to cloud spending through cross-functional collaboration, budgeting, and cost optimization[cite: 125]",
        "By forcing developers to use physical mainframes",
        "By eliminating multi-region deployments"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** FinOps combines finance and engineering to monitor, allocate, and optimize cloud spending[cite: 125]."
    },
    {
      "id": "q-imp-1794831407981-230-4hxl",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which web service protocol relies strictly on XML envelopes and can operate over SMTP, TCP, or HTTP?",
      "options": [
        "REST",
        "SOAP (Simple Object Access Protocol)[cite: 125, 126]",
        "gRPC",
        "JSON-RPC"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SOAP is a heavy protocol utilizing strict XML messaging formats across various transport protocols[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831407981-231-hnvu",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What data serialization format does gRPC use instead of text-based JSON or XML?",
      "options": [
        "CSV",
        "Protocol Buffers (Protobuf) binary format[cite: 125, 126]",
        "YAML",
        "HTML"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** gRPC serializes messages into compact binary Protocol Buffers for high-speed transmission[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831407981-232-0k5y",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary role of a Hypervisor?",
      "options": [
        "To route DNS queries across regions",
        "To abstract physical hardware and manage concurrent virtual machines[cite: 122]",
        "To compile Python Flask code",
        "To execute CI/CD build pipelines"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The hypervisor allocates CPU, memory, and I/O resources to guest virtual machines[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-233-g796",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why are Type 1 hypervisors preferred over Type 2 hypervisors in enterprise cloud data centers?",
      "options": [
        "They require a Windows host operating system.",
        "They run directly on bare metal with minimal overhead, superior performance, and hardened security[cite: 122].",
        "They are easier to install on laptop computers.",
        "They eliminate the need for virtual networks."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bare-metal hypervisors provide maximum performance and isolation required for multi-tenant cloud infrastructure[cite: 122]."
    },
    {
      "id": "q-imp-1794831407981-234-5lzi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does the term \"Stateless Compute\" mean in cloud architecture?",
      "options": [
        "Compute instances that cannot connect to the internet.",
        "Instances that store no local session data, allowing them to be created or destroyed instantly without state loss[cite: 88].",
        "Servers running without operating systems.",
        "Databases that do not persist records."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Stateless compute instances treat every request independently, enabling seamless horizontal auto-scaling[cite: 88]."
    },
    {
      "id": "q-imp-1794831407981-235-69ii",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In three-tier cloud architectures, why is direct public SSH access to backend application servers strictly prohibited?",
      "options": [
        "To comply with Python syntax rules",
        "To enforce security in depth and protect internal application logic from direct external attacks[cite: 90]",
        "Because SSH protocols are incompatible with Linux",
        "To reduce the performance of load balancers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Restricting access protects sensitive backend tiers, requiring administrative access through secure bastion hosts or VPNs[cite: 90]."
    },
    {
      "id": "q-imp-1794831407981-236-55q3",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is an AWS VPC Subnet?",
      "options": [
        "A physical server rack",
        "A segment of a VPC's IP address range used to isolate and group cloud resources[cite: 73, 98]",
        "An object storage bucket",
        "A caching proxy server"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Subnets divide a VPC's IP address space into smaller segments for public or private resource placement[cite: 73, 98]."
    },
    {
      "id": "q-imp-1794831407982-237-555x",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the function of a State Table in a Stateful Firewall like an AWS Security Group?",
      "options": [
        "To store database transaction logs",
        "To track active network connection states, automatically allowing return response traffic without needing explicit outbound rules[cite: 100]",
        "To record HTTP request headers",
        "To manage IAM role permissions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Stateful firewalls remember established connections, automatically permitting return packets for allowed inbound flows[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-238-rmmc",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the maximum size of a single object uploaded to Amazon S3?",
      "options": [
        "64 TiB",
        "5 TB[cite: 100]",
        "10 GB",
        "Unlimited"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Amazon S3 supports single object sizes ranging from zero bytes up to 5 terabytes[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-239-3yce",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary operational difference between S3 Standard and S3 Standard-Infrequent Access (Standard-IA)?",
      "options": [
        "Standard-IA offers 5 nines of durability while Standard offers 11 nines.",
        "Standard-IA provides lower storage costs for data accessed less frequently, but incurs a per-GB retrieval fee[cite: 101].",
        "Standard-IA requires virtual machine attachments.",
        "Standard-IA has sub-millisecond block storage speeds."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Standard-IA reduces storage costs for infrequently accessed data while charging retrieval fees for access[cite: 101]."
    },
    {
      "id": "q-imp-1794831407982-240-cjmp",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What metric is used to bill customers for AWS Lambda function executions?",
      "options": [
        "Hourly flat rate per server",
        "Execution duration (in milliseconds) and memory allocated[cite: 102]",
        "Number of S3 buckets owned",
        "Volume of inbound network traffic only"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lambda billing is based strictly on the number of requests, execution duration in milliseconds, and configured memory[cite: 102]."
    },
    {
      "id": "q-imp-1794831407982-241-mnw0",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why might a serverless Lambda function experience a \"Cold Start\" delay?",
      "options": [
        "Because the local database is out of disk space.",
        "Because the cloud provider must provision a new micro-VM execution environment when a request arrives after a period of inactivity[cite: 102].",
        "Because Git pushes were rejected.",
        "Because network security groups blocked the port."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cold starts happen when Lambda spins up a fresh container instance to handle an invocation following idle periods[cite: 102]."
    },
    {
      "id": "q-imp-1794831407982-242-5vlr",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is an Azure Subscription?",
      "options": [
        "A recurring magazine delivery",
        "A foundational administrative and billing boundary for managing Azure services and resources[cite: 103]",
        "A local Python virtual environment",
        "A Docker image tag"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Subscriptions form the core billing and management boundary in Microsoft Azure[cite: 103]."
    },
    {
      "id": "q-imp-1794831407982-243-d12i",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the purpose of Azure Resource Manager (ARM) templates?",
      "options": [
        "To write Python Flask REST APIs",
        "To define infrastructure declaratively as code using JSON/Bicep for automated deployments[cite: 103]",
        "To manage local Git repositories",
        "To configure container namespaces"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ARM templates enable declarative Infrastructure as Code deployments across Azure resource groups[cite: 103]."
    },
    {
      "id": "q-imp-1794831407982-244-gax1",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which Azure storage tier is optimized for data accessed rarely, requiring a minimum storage duration of 90 days?",
      "options": [
        "Hot Tier",
        "Cool Tier",
        "Cold Tier[cite: 104]",
        "Premium Tier"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Azure's Cold storage tier is designed for infrequently accessed data retained for extended periods[cite: 104]."
    },
    {
      "id": "q-imp-1794831407982-245-cp2i",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How does Azure Log Analytics query telemetry and log data?",
      "options": [
        "Using SQL queries exclusively",
        "Using Kusto Query Language (KQL)[cite: 105]",
        "Using bash shell scripts",
        "Using Dockerfiles"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Kusto Query Language (KQL) is the expressive query language used across Azure Monitor logs[cite: 105]."
    },
    {
      "id": "q-imp-1794831407982-246-0800",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does the acronym CapEx stand for in IT financial management?",
      "options": [
        "Capital Expenditure[cite: 114]",
        "Capacity Planning Execution",
        "Centralized Application Engine",
        "Cloud Processing Exchange"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** CapEx refers to major upfront capital investments in physical hardware and infrastructure[cite: 114]."
    },
    {
      "id": "q-imp-1794831407982-247-yyax",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary financial advantage of shifting from CapEx to OpEx in cloud computing?",
      "options": [
        "Eliminating all tax obligations",
        "Converting large fixed upfront costs into flexible, predictable variable operating expenses aligned with actual usage[cite: 114]",
        "Guaranteeing 100% fixed monthly bills regardless of scale",
        "Bypassing cloud provider invoices"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The OpEx model avoids large initial investments, matching cloud spending directly to business utility[cite: 114]."
    },
    {
      "id": "q-imp-1794831407982-248-ezw3",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which NIST characteristic ensures that users can access cloud capabilities over network mechanisms using phones, tablets, or laptops?",
      "options": [
        "On-demand self-service",
        "Broad Network Access[cite: 113, 114]",
        "Resource Pooling",
        "Measured Service"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Broad network access guarantees that cloud services are accessible across heterogeneous client platforms over networks[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831407982-249-ia49",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why are enterprise data centers transitioning from monolithic architectures to microservices?",
      "options": [
        "To increase the complexity of local network wiring",
        "To decouple business domains, enabling independent scaling, faster deployments, and isolated failure fault lines[cite: 91]",
        "To eliminate the need for version control systems",
        "To ensure all code runs in a single process"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Microservices break monoliths into autonomous services, improving deployment velocity and fault isolation[cite: 91]."
    },
    {
      "id": "q-imp-1794831407982-250-3w2h",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command initializes Git repository metadata in a project folder?",
      "options": [
        "`git clone`",
        "`git init`[cite: 23, 47]",
        "`git commit`",
        "`git add`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git init` creates the hidden `.git` tracking folder for a new local repository[cite: 23, 47]."
    },
    {
      "id": "q-imp-1794831407982-251-u50y",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the function of `git branch -M main`?",
      "options": [
        "To merge remote branches",
        "To rename the current branch to `main`[cite: 23, 47]",
        "To delete the main branch",
        "To view commit logs"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-M` flag forces the current branch name to be updated to `main`[cite: 23, 47]."
    },
    {
      "id": "q-imp-1794831407982-252-f7z9",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which command displays the tracked and untracked status of files in your working tree?",
      "options": [
        "`git diff`",
        "`git status`[cite: 24, 47]",
        "`git log`",
        "`git fetch`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git status` provides a summary of modified, staged, and untracked files[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831407982-253-wxz3",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What does staging a file in Git accomplish?",
      "options": [
        "It pushes the file to GitHub immediately.",
        "It adds changes to the staging area (index) to prepare them for the next commit snapshot[cite: 24, 47].",
        "It deletes local editing history.",
        "It converts the file into binary format."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Staging selects specific changes to be bundled into the upcoming cryptographic commit snapshot[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831407982-254-ou0j",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a commit in Git?",
      "options": [
        "A temporary text backup",
        "An immutable cryptographic snapshot of staged changes identified by a hash[cite: 47, 48]",
        "An active connection to GitHub",
        "A branch pointer alias"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Commits record permanent, immutable snapshots of project history in Git[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831407982-255-xa0s",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the difference between `git diff` and `git diff --staged`?",
      "options": [
        "`git diff` shows staged changes; `git diff --staged` shows remote changes.",
        "`git diff` displays unstaged changes in the working tree, whereas `git diff --staged` shows changes prepared in the staging area[cite: 24, 48].",
        "Both commands show identical output.",
        "`git diff --staged` deletes uncommitted code."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git diff` compares working tree to staging, while `--staged` compares staging to the last commit[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831407982-256-pf5n",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "How do you discard unstaged edits to a tracked file and revert to the last commit?",
      "options": [
        "`git reset --hard`",
        "`git restore <file>`[cite: 25]",
        "`git branch -d`",
        "`git rm <file>`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git restore` discards uncommitted working tree modifications for specified files[cite: 25]."
    },
    {
      "id": "q-imp-1794831407982-257-awog",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is a Git branch pointer?",
      "options": [
        "A physical file duplicate on disk",
        "A lightweight, movable reference to a specific commit[cite: 26, 48]",
        "An upstream remote URL alias",
        "A staging buffer index"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Branches are simply cheap, movable pointers pointing to commit hashes[cite: 26, 48]."
    },
    {
      "id": "q-imp-1794831407982-258-l8rn",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command creates and switches to a new feature branch simultaneously?",
      "options": [
        "`git branch feature/name`",
        "`git switch -c feature/name`[cite: 26, 49]",
        "`git checkout main`",
        "`git push origin`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git switch -c` creates a new branch and checks it out in one atomic step[cite: 26, 49]."
    },
    {
      "id": "q-imp-1794831407982-259-m0jq",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "When merging branches, what does Git do when no diverged commits exist on the target branch?",
      "options": [
        "It aborts with a merge conflict error.",
        "It performs a Fast-Forward merge by simply advancing the target branch pointer[cite: 30, 49].",
        "It creates a 3-way merge commit with two parents.",
        "It deletes both branches."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Fast-forward merges require no new commit object; the branch pointer just slides forward to the latest commit[cite: 30, 49]."
    },
    {
      "id": "q-imp-1794831407982-260-25py",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What are Git conflict markers used for?",
      "options": [
        "To encrypt commit hashes",
        "To annotate conflicting lines within a file during a merge conflict so developers can manually resolve them[cite: 27, 50]",
        "To establish SSH authentication with GitHub",
        "To optimize Docker layer builds"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) highlight differing changes needing manual resolution[cite: 27, 50]."
    },
    {
      "id": "q-imp-1794831407982-261-flg0",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the conventional alias name for a primary remote repository linked in Git?",
      "options": [
        "`upstream`",
        "`origin`[cite: 28, 50]",
        "`master`",
        "`remote-repo`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `origin` is the standard shorthand alias assigned to a repository's primary remote server[cite: 28, 50]."
    },
    {
      "id": "q-imp-1794831407982-262-k3v7",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command links an existing local Git repository to a remote GitHub URL?",
      "options": [
        "`git init origin`",
        "`git remote add origin <URL>`[cite: 28, 50]",
        "`git link remote`",
        "`git push connect`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git remote add origin` configures the remote repository connection reference[cite: 28, 50]."
    },
    {
      "id": "q-imp-1794831407982-263-l78a",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is a remote-tracking branch in Git?",
      "options": [
        "A physical server running inside AWS",
        "An uneditable local reference representing the last known state of a remote branch on GitHub[cite: 30]",
        "A branch that automatically deletes local files",
        "An active SSH tunnel to a container"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Remote-tracking branches (like `origin/main`) cache the remote repository's branch state locally[cite: 30]."
    },
    {
      "id": "q-imp-1794831407982-264-usiz",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does `git pull` execute under the hood?",
      "options": [
        "`git push` followed by `git commit`",
        "`git fetch` followed by merging the remote branch into the current local branch[cite: 30, 51]",
        "`git init` followed by `git clone`",
        "`git add` followed by `git restore`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git pull` combines fetching remote updates and integrating them locally in one step[cite: 30, 51]."
    },
    {
      "id": "q-imp-1794831407982-265-4e0l",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is `git pull --ff-only` recommended to maintain a clean history?",
      "options": [
        "It forces merge conflict resolution on every pull.",
        "It prevents unwanted automatic merge commits by ensuring pulls only succeed via fast-forward updates[cite: 30].",
        "It deletes local commits automatically.",
        "It requires administrator privileges."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--ff-only` stops pulls from creating stray merge commits when histories diverge, allowing manual inspection[cite: 30]."
    },
    {
      "id": "q-imp-1794831407982-266-7fvn",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command clones an existing GitHub repository into a new local directory?",
      "options": [
        "`git init`",
        "`git clone <URL>`[cite: 31, 51]",
        "`git remote add`",
        "`git fetch origin`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git clone` downloads a full copy of a remote repository and configures its remote origin[cite: 31, 51]."
    },
    {
      "id": "q-imp-1794831407982-267-932q",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What security protocol does GitHub enforce for HTTPS Git operations instead of account passwords?",
      "options": [
        "Plain text transmission",
        "Personal Access Tokens (PATs) or secure browser-based authentication flows[cite: 29]",
        "Secure FTP credentials",
        "Static database keys"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** GitHub deprecates direct password authentication over HTTPS, requiring token or browser authentication[cite: 29]."
    },
    {
      "id": "q-imp-1794831407982-268-vif8",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a Pull Request (PR)?",
      "options": [
        "A Git command to pull remote changes",
        "A GitHub web-based collaboration workflow for code review and merging proposed changes[cite: 35, 50]",
        "An automated script that compiles Docker images",
        "A local merge conflict resolution tool"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Pull requests provide a platform for team code review before merging feature branches[cite: 35, 50]."
    },
    {
      "id": "q-imp-1794831407982-269-jtj6",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary function of a Dockerfile?",
      "options": [
        "To manage IAM users in AWS",
        "A plain-text configuration file containing sequential instructions used by Docker to build an immutable image[cite: 37, 63]",
        "To execute Python unit tests in CI pipelines",
        "To configure VPC subnets and route tables"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Dockerfiles define the recipe of layers, dependencies, and code packaged into a container image[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407982-270-d7hy",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which Docker command builds an image from a Dockerfile in the current directory?",
      "options": [
        "`docker run .`",
        "`docker build -t tag_name .`[cite: 38, 41]",
        "`docker create image`",
        "`docker push .`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker build` reads the Dockerfile in the build context (`.`) to assemble an image[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-271-rzch",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What does the `-d` flag signify when running `docker run -d`?",
      "options": [
        "Delete the container after execution.",
        "Run the container in detached mode (in the background)[cite: 38, 41]",
        "Debug container Python errors.",
        "Disable network port mapping."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Detached mode (`-d`) runs containers in the background, freeing up the terminal prompt[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-272-msj8",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does the `-p 5000:5000` flag accomplish in a `docker run` command?",
      "options": [
        "It publishes container logs to CloudWatch.",
        "It maps port 5000 on the host machine to port 5000 inside the container[cite: 38, 41]",
        "It sets the container's private IP address.",
        "It limits RAM consumption to 5000 MB."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Port mapping (`-p host:container`) allows external traffic on the host to reach services running inside the container[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-273-5jau",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Which command opens an interactive shell terminal inside a running container like `flask-api`?",
      "options": [
        "`docker logs flask-api`",
        "`docker exec -it flask-api sh`[cite: 39, 41]",
        "`docker ssh flask-api`",
        "`docker open flask-api`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker exec -it` spawns an interactive shell session (like `sh`) within an active container instance[cite: 39, 41]."
    },
    {
      "id": "q-imp-1794831407982-274-s4sx",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command displays logs output by a running or stopped container?",
      "options": [
        "`docker ps`",
        "`docker logs <container_name>`[cite: 39, 41]",
        "`docker inspect`",
        "`docker images`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker logs` prints standard output and error streams generated by the container application[cite: 39, 41]."
    },
    {
      "id": "q-imp-1794831407982-275-2bnh",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why do containerized applications require rebuilding Docker images after editing source code?",
      "options": [
        "Because Docker deletes source files automatically.",
        "Because application code is baked into the immutable image layers during build time; running containers use their existing image layers until recreated[cite: 39, 61]",
        "Because Python scripts cannot be modified.",
        "Because host port mappings expire."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker images are read-only templates, so code changes require a new build and container restart to take effect[cite: 39, 61]."
    },
    {
      "id": "q-imp-1794831407982-276-m4f1",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the purpose of a `.dockerignore` file?",
      "options": [
        "To ignore Python syntax errors",
        "To exclude unnecessary local files and directories from the Docker build context[cite: 36]",
        "To block inbound firewall traffic",
        "To disable container logging"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `.dockerignore` prevents local clutter like `.git` or virtual environments from inflating build transfer sizes[cite: 36]."
    },
    {
      "id": "q-imp-1794831407982-277-p8m4",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What role does GitHub Actions play in modern DevOps workflows?",
      "options": [
        "It hosts relational databases on physical servers.",
        "It provides automated CI/CD pipeline execution runners that trigger tests, builds, and cloud deployments upon code events[cite: 52, 53]",
        "It replaces Git version control.",
        "It manages local Windows PowerShell commands."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** GitHub Actions automates workflows like CI testing and CD deployments directly from repository events[cite: 52, 53]."
    },
    {
      "id": "q-imp-1794831407982-278-jhqi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary cultural goal of DevOps?",
      "options": [
        "Isolating developers from operations engineers completely.",
        "Breaking down silos between development and operations to foster shared responsibility, collaboration, and rapid quality delivery[cite: 54, 55]",
        "Eliminating all automated testing.",
        "Restricting software releases to once a year."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** DevOps bridges the gap between dev and ops teams to streamline software delivery velocity and stability[cite: 54, 55]."
    },
    {
      "id": "q-imp-1794831407982-279-c9j1",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What does the \"C\" in the CALMS DevOps framework represent?",
      "options": [
        "Containerization",
        "Culture[cite: 55]",
        "Continuous Integration",
        "Cloud Storage"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CALMS stands for Culture, Automation, Lean, Measurement, and Sharing[cite: 55]."
    },
    {
      "id": "q-imp-1794831407982-280-ar2p",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does the \"A\" in CALMS stand for?",
      "options": [
        "Availability",
        "Automation[cite: 55]",
        "Architecture",
        "Application"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Automation refers to eliminating manual toil in build, test, and release pipelines[cite: 55]."
    },
    {
      "id": "q-imp-1794831407982-281-85zi",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What does the \"M\" in CALMS represent?",
      "options": [
        "Migration",
        "Measurement[cite: 55]",
        "Monolith",
        "Microservices"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Measurement tracks performance metrics like deployment frequency, lead time, and MTTR[cite: 55]."
    },
    {
      "id": "q-imp-1794831407982-282-iuif",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does the \"S\" in CALMS stand for?",
      "options": [
        "Security",
        "Sharing[cite: 55]",
        "Storage",
        "Scalability"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Sharing promotes open visibility of tooling, logs, and lessons learned across organizations[cite: 55]."
    },
    {
      "id": "q-imp-1794831407982-283-wbtf",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How do Agile and DevOps complement each other in software delivery?",
      "options": [
        "Agile replaces DevOps entirely.",
        "Agile accelerates business concept-to-code velocity, while DevOps accelerates code into customer hands and production operations[cite: 58]",
        "Agile focuses on operations while DevOps focuses on user UI design.",
        "They have conflicting goals."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Agile and DevOps form a continuous continuum from initial requirement planning through production operations[cite: 58]."
    },
    {
      "id": "q-imp-1794831407982-284-cubq",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary benefit of Continuous Integration (CI)?",
      "options": [
        "Deploying code to production without human review.",
        "Detecting integration bugs and code regressions immediately by running automated builds and tests upon every commit[cite: 59, 60]",
        "Eliminating version control systems.",
        "Reducing cloud storage costs."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CI catches integration conflicts early through automated testing (\"fail fast\")[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831407982-285-4z2q",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What differentiates Continuous Delivery from Continuous Deployment?",
      "options": [
        "Continuous Delivery skips automated testing.",
        "Continuous Delivery deploys validated code to staging automatically while requiring a manual approval gate for production; Continuous Deployment automates production releases entirely[cite: 59, 60]",
        "Continuous Deployment is only used for physical servers.",
        "Continuous Delivery takes months per release."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Continuous Deployment removes the manual production approval gate, deploying 100% automatically[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831407982-286-zm9f",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary virtualization abstraction layer in a Virtual Machine compared to a Docker Container?",
      "options": [
        "VMs abstract container layers, while containers abstract physical motherboards.",
        "VMs abstract physical hardware via a Hypervisor, whereas containers abstract the host operating system kernel via Docker Engine[cite: 60].",
        "VMs share the host kernel, while containers use Type 1 hypervisors.",
        "There is no architectural difference."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** VMs virtualize hardware and guest OS instances, while containers virtualize OS-level kernel processes[cite: 60]."
    },
    {
      "id": "q-imp-1794831407982-287-54vg",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How do Linux Control Groups (cgroups) contribute to Docker containerization?",
      "options": [
        "By isolating filesystem mounts and process IDs",
        "By limiting and monitoring resource consumption (CPU, RAM, I/O bandwidth) allocated to container processes[cite: 61]",
        "By routing HTTP traffic across Availability Zones",
        "By generating Docker image layers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** cgroups enforce hard boundaries on physical resource usage per container[cite: 61]."
    },
    {
      "id": "q-imp-1794831407982-288-sjlg",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the role of Linux Namespaces in container isolation?",
      "options": [
        "Limiting maximum RAM usage",
        "Isolating system views so a container process only sees its own assigned PIDs, network interfaces, and mounts[cite: 61]",
        "Compiling Python bytecode files",
        "Managing AWS IAM permissions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Namespaces provide process-level isolation for system resources like network stacks and mount points[cite: 61]."
    },
    {
      "id": "q-imp-1794831407982-289-sz80",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What happens when a Docker container modifies a file stored in its read-only image layers?",
      "options": [
        "The build fails with an error.",
        "Docker copies the file up into the writable container layer and modifies the copy (Copy-on-Write)[cite: 61, 62]",
        "The underlying image layer is permanently overwritten.",
        "The container shuts down automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker uses a Copy-on-Write mechanism, applying runtime changes strictly to the top writable container layer[cite: 61, 62]."
    },
    {
      "id": "q-imp-1794831407982-290-fyj1",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "In a Dockerfile, what does the `WORKDIR` instruction do?",
      "options": [
        "It downloads external GitHub repositories.",
        "It sets the working directory for subsequent instructions inside the container filesystem[cite: 37, 63]",
        "It defines environment variables.",
        "It opens public network ports."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `WORKDIR` establishes the active path context for commands like `COPY`, `RUN`, and `CMD`[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407982-291-w9as",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "Why is ordering instructions carefully in a Dockerfile critical for build optimization?",
      "options": [
        "To comply with Python syntax standards",
        "To maximize Docker layer caching efficiency by placing frequently changed source code after stable dependency installation steps[cite: 62, 68]",
        "To reduce the length of image names",
        "To bypass VPC security groups"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Strategic instruction ordering prevents unnecessary cache invalidations during builds[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831407982-292-mzb3",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary role of an AWS Application Load Balancer (ALB)?",
      "options": [
        "To store database backups",
        "To route incoming HTTP/S traffic across target instances across multiple Availability Zones at Layer 7[cite: 71, 92]",
        "To manage SSH key pairs",
        "To provision custom VPC subnets"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ALBs provide intelligent application-layer load balancing across redundant backend servers[cite: 71, 92]."
    },
    {
      "id": "q-imp-1794831407982-293-9dmj",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the purpose of an ALB Target Group health check path (e.g., `/api/products`)?",
      "options": [
        "To serve static images to end users",
        "To periodically probe backend instances to ensure application health, routing traffic away from failing servers[cite: 80, 92]",
        "To compile Python REST code",
        "To encrypt S3 object storage"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Health checks continuously monitor backend endpoint availability to ensure robust traffic routing[cite: 80, 92]."
    },
    {
      "id": "q-imp-1794831407982-294-pho1",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is a Virtual Private Cloud (VPC)?",
      "options": [
        "A public website hosted on S3",
        "An isolated private virtual network dedicated to your AWS account, mirroring an on-premise network in software[cite: 72, 98]",
        "A physical data center in Mumbai",
        "A serverless container engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A VPC provides isolated virtual networking, subnets, and gateways for secure cloud architectures[cite: 72, 98]."
    },
    {
      "id": "q-imp-1794831407982-295-razj",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "How do AWS Security Groups and Network ACLs differ in scope and evaluation?",
      "options": [
        "Security Groups apply to subnets and are stateless; NACLs apply to instances and are stateful.",
        "Security Groups act as stateful firewalls at the individual EC2 instance level, whereas NACLs act as stateless firewalls evaluated sequentially at the subnet boundary[cite: 100].",
        "There is no functional difference between them.",
        "NACLs are managed exclusively by Azure."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security Groups operate statefully per instance, while NACLs operate statelessly per subnet[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-296-d4ul",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is an Amazon Elastic Block Store (EBS) volume?",
      "options": [
        "A globally distributed NoSQL database",
        "A high-performance, persistent block storage disk attached to EC2 instances as a local filesystem volume[cite: 100]",
        "An S3 object storage bucket",
        "A serverless compute runtime"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EBS provides raw block storage volumes attached to virtual machines for operating systems and databases[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-297-g9sd",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary architectural difference between Block Storage (EBS) and Object Storage (S3)?",
      "options": [
        "Block storage uses HTTP REST APIs while object storage attaches via local SCSI cables.",
        "Block storage provides raw disk blocks supporting in-place modifications for databases/OSs, whereas object storage stores complete immutable objects accessible via HTTP REST APIs[cite: 100].",
        "Object storage has a maximum size of 64 TiB.",
        "There is no difference in data units."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Block storage handles transactional filesystem blocks, while object storage manages immutable files with metadata via REST APIs[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-298-i6ef",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is AWS Lambda?",
      "options": [
        "A relational database engine",
        "A serverless event-driven compute service that executes code without managing servers[cite: 102]",
        "A virtual machine container registry",
        "A network load balancer"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS Lambda runs backend code in response to events with automatic scaling and pay-per-millisecond billing[cite: 102]."
    },
    {
      "id": "q-imp-1794831407982-299-4j0b",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the maximum execution timeout limit for a single AWS Lambda function invocation?",
      "options": [
        "60 seconds",
        "5 minutes",
        "15 minutes[cite: 102]",
        "24 hours"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS Lambda enforces a 15-minute execution timeout limit per individual function invocation[cite: 102]."
    },
    {
      "id": "q-imp-1794831407982-300-uwt6",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an S3 event notification configured with a bucket root prefix create an infinite recursive invocation loop when a Lambda function processes uploaded files?",
      "options": [
        "Because S3 objects are encrypted multiple times during copy operations.",
        "Because copying a file to a destination prefix and deleting the original both generate new `ObjectCreated` events that match a bucket-wide root trigger, continuously re-triggering the function.",
        "Because Python Lambda functions cannot execute asynchronous loops.",
        "Because the Lambda execution role lacks `s3:PutObject` permissions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** If the trigger listens to the entire bucket, the function's own destination copies generate new object creation events that re-invoke the Lambda function infinitely[cite: 3, 13]."
    },
    {
      "id": "q-imp-1794831407982-301-7rww",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What specific operational risk occurs if a Lambda file-organizing function executes `s3.delete_object()` before `s3.copy_object()` completes successfully?",
      "options": [
        "The S3 bucket automatically enters versioning recovery mode.",
        "Data loss can occur if the copy operation fails after the source object has already been deleted.",
        "The Lambda execution role automatically revokes its IAM inline policy.",
        "S3 triggers an infinite recursive loop."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The function must copy first; if deletion precedes copying and the copy fails, it results in permanent data loss[cite: 8]."
    },
    {
      "id": "q-imp-1794831407982-302-6771",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How does S3 handle file path and space encoding in event notifications, and why must Python Lambda code use `urllib.parse.unquote_plus()`?",
      "options": [
        "S3 converts all filenames to lowercase hexadecimal strings.",
        "S3 event notifications URL-encode object keys, representing spaces as `+` or percent-encoded characters, which must be decoded before processing file keys[cite: 10, 12].",
        "S3 automatically strips all special characters from incoming filenames.",
        "URL-encoding is only required when uploading files via PowerShell."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 event notifications URL-encode object keys where spaces appear as `+`, requiring explicit decoding via `unquote_plus()`[cite: 10, 12]."
    },
    {
      "id": "q-imp-1794831407982-303-uv9g",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does the IAM inline policy resource ARN for the S3 file organizer end with `/*` instead of referencing the bucket root?",
      "options": [
        "To grant global administrator access across all S3 buckets in the AWS account.",
        "To restrict permissions specifically to objects within the specified bucket rather than every bucket in the account[cite: 6, 7].",
        "To allow the Lambda function to delete the S3 bucket itself.",
        "To enable public read access on uploaded documents."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Appending `/*` ensures the policy applies strictly to objects inside the target bucket according to the principle of least privilege[cite: 6, 7]."
    },
    {
      "id": "q-imp-1794831407982-304-f773",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What architectural limitation prevents S3 from providing a single, atomic file \"move\" operation across prefixes?",
      "options": [
        "S3 is a relational database management system.",
        "S3 does not have traditional filesystem folders; objects are stored with independent keys, requiring an explicit copy followed by a delete[cite: 2, 8].",
        "S3 restricts object creation to the root directory only.",
        "Python SDK boto3 does not support object copying."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Because S3 stores objects with flat key prefixes rather than hierarchical directories, moves require copying to a new key and deleting the original[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831407982-305-vedm",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does Windows Command Prompt (CMD) require explicit virtual environment activation (`.venv\\Scripts\\activate.bat`) whereas Linux shells use `source`?",
      "options": [
        "Because CMD does not support Python 3.",
        "Because virtual environment activation scripts are platform-specific batch scripts (`.bat`) tailored for Windows CMD syntax rather than POSIX shell scripts[cite: 21].",
        "Because Windows restricts Python script execution permissions entirely.",
        "Because PowerShell and CMD share identical execution parsers."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Windows command prompt executes `.bat` script wrappers to modify shell path variables for the virtual environment[cite: 21]."
    },
    {
      "id": "q-imp-1794831407982-306-1b04",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the underlying reason behind a Git non-fast-forward push rejection when two developers push to the same remote branch?",
      "options": [
        "The local repository lacks an internet connection.",
        "The remote branch contains commits that the local history lacks, protecting remote history from being overwritten by an unrelated update[cite: 33, 42].",
        "The local user lacks `git add` permissions.",
        "The commit message exceeds SHA-1 character limits."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Non-fast-forward rejections prevent local pushes from overwriting unseen remote commits made by other contributors[cite: 33, 42]."
    },
    {
      "id": "q-imp-1794831407982-307-jzj2",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why is running `git push --force` strongly discouraged as a routine fix for a rejected push in a team environment?",
      "options": [
        "It permanently deletes the local `.git` directory.",
        "It forcefully overwrites remote history, potentially erasing commits and work published by other team members[cite: 34].",
        "It converts the Git repository into a centralized Subversion server.",
        "It automatically downgrades the installed Git version."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Force-pushing discards remote work blindly, breaking collaboration history for other contributors[cite: 34]."
    },
    {
      "id": "q-imp-1794831407982-308-4f49",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How does `git fetch` fundamentally differ from `git pull` regarding local working tree safety?",
      "options": [
        "`git fetch` automatically merges remote commits into the working tree, whereas `git pull` requires manual confirmation.",
        "`git fetch` downloads remote history and updates remote-tracking references without modifying your current branch or working tree, whereas `git pull` fetches and immediately integrates changes[cite: 30, 31, 51].",
        "`git fetch` requires a GitHub personal access token, while `git pull` does not.",
        "There is no functional difference between them."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git fetch` is entirely safe because it only updates local tracking references without altering working files[cite: 30, 31, 51]."
    },
    {
      "id": "q-imp-1794831407982-309-k6ag",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What happens during a Git 3-Way Merge when both branches have modified the exact same line in a file?",
      "options": [
        "Git automatically selects the most recent commit timestamp.",
        "Git pauses the merge, marks the file with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), and requires manual resolution and staging[cite: 27, 50].",
        "Git deletes the conflicting file from both branches.",
        "Git aborts the repository initialization."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Conflicting edits on identical lines trigger Git conflict pauses requiring manual intervention and resolution[cite: 27, 50]."
    },
    {
      "id": "q-imp-1794831407982-310-v438",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In a Dockerfile, why does placing `COPY requirements.txt .` and `RUN pip install` before copying source code optimize build times?",
      "options": [
        "It ensures Python dependencies are installed outside the container.",
        "It leverages Docker layer caching so that dependency installation layers are reused when only application source code changes[cite: 62, 68].",
        "It reduces the size of the `.git` directory.",
        "It prevents container root privilege escalation."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Caching layer re-use avoids slow, redundant pip installs when source code updates occur independently of dependencies[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831407982-311-lm62",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What mechanism allows Docker containers to achieve near-native execution performance compared to traditional Virtual Machines?",
      "options": [
        "Hardware virtualization hypervisors emulating physical BIOS chips.",
        "OS-level virtualization sharing the host operating system kernel directly, avoiding the overhead of booting a full guest OS[cite: 60].",
        "Dedicated physical RAM allocation per container.",
        "Translating container binaries into Java bytecode."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Containers bypass guest OS overhead by sharing the host kernel directly through OS virtualization[cite: 60]."
    },
    {
      "id": "q-imp-1794831407982-312-5u4z",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How do Linux Control Groups (`cgroups`) restrict resource consumption in Docker containers?",
      "options": [
        "By encrypting filesystem storage blocks.",
        "By imposing hard resource limits on CPU cores, RAM allocation, and I/O bandwidth assigned to isolated process groups[cite: 61].",
        "By routing container network traffic through NAT gateways.",
        "By managing S3 bucket object ownership."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** cgroups regulate physical resource utilization limits for containerized processes[cite: 61]."
    },
    {
      "id": "q-imp-1794831407982-313-o06l",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the function of Linux Namespaces in Docker container architecture?",
      "options": [
        "Limiting maximum CPU clock speeds.",
        "Isolating system view perspectives so a containerized process sees exclusively its own process IDs, network interfaces, and filesystem mounts[cite: 61].",
        "Compiling Dockerfile instructions into image layers.",
        "Managing SSH public key authentication."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Namespaces provide isolated system resource visibility for container processes[cite: 61]."
    },
    {
      "id": "q-imp-1794831407982-314-r5p0",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In Docker storage mechanics, how does the Copy-on-Write (CoW) pattern operate when a running container modifies a file in a read-only image layer?",
      "options": [
        "The container crashes due to filesystem write protection.",
        "Docker copies the target file from the read-only image layer up into the thin writable container layer and applies modifications to that copy[cite: 61, 62].",
        "The base image layer is permanently overwritten on disk.",
        "The file is uploaded automatically to Amazon S3."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Copy-on-Write ensures base image layers remain pristine while modifications occur inside the writable runtime layer[cite: 61, 62]."
    },
    {
      "id": "q-imp-1794831407982-315-obxs",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why must the ALB Security Group (`flask-alb-sg`) allow inbound traffic on port 80 from anywhere (`0.0.0.0/0`), whereas the EC2 Security Group (`flask-ec2-sg`) restricts port 8000 strictly to the ALB security group?",
      "options": [
        "To comply with AWS IAM role expiration rules.",
        "To allow public clients to reach the load balancer while preventing external users from bypassing the ALB and accessing backend EC2 instances directly[cite: 74, 75].",
        "Because Lambda functions require public port 80 access.",
        "To enable S3 bucket event notifications."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Restricting EC2 inbound rules to accept traffic only from the ALB security group enforces secure architecture best practices[cite: 74, 75]."
    },
    {
      "id": "q-imp-1794831407982-316-tarz",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In the AWS ALB lab, what happens if an EC2 instance target fails the target group's health check path (`/api/products`) consecutively beyond the unhealthy threshold?",
      "options": [
        "The EC2 instance is terminated automatically by IAM.",
        "The load balancer automatically deregisters or stops routing client traffic to that unhealthy instance until it passes subsequent health checks[cite: 80, 92].",
        "The VPC route table deletes the Internet Gateway.",
        "Gunicorn restarts the Flask application."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ALB health checks remove unhealthy targets from the routing pool dynamically to maintain system reliability[cite: 80, 92]."
    },
    {
      "id": "q-imp-1794831407982-317-675z",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer require target instances to be deployed across at least two Availability Zones?",
      "options": [
        "To reduce hourly EC2 instance pricing.",
        "To guarantee high availability and fault tolerance so that traffic routing continues uninterrupted if an entire data center zone experiences an outage[cite: 73].",
        "To satisfy S3 object versioning requirements.",
        "To enable SQL database replication."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Multi-AZ ALB deployment ensures high availability across independent physical data center zones[cite: 73]."
    },
    {
      "id": "q-imp-1794831407982-318-cq14",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the exact routing role of an Internet Gateway (IGW) in an AWS custom VPC?",
      "options": [
        "It manages relational database transactions.",
        "It provides bi-directional network address translation (NAT) between private IP addresses within VPC subnets and public internet IP addresses[cite: 73, 74].",
        "It compiles Python Flask REST APIs.",
        "It enforces IAM least-privilege policies."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An IGW acts as the VPC router bridging internal subnets with the external public internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831407982-319-q9ke",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does Windows OpenSSH reject `.pem` private key permissions if they are too permissive, requiring explicit restriction commands (`icacls`)?",
      "options": [
        "Because Windows does not support RSA keys.",
        "To prevent unauthorized local user accounts from reading private cryptographic keys, protecting SSH authentication integrity[cite: 78].",
        "Because Git Bash overwrites `.pem` files upon opening.",
        "Because AWS EC2 encrypts keys automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** OpenSSH mandates strict file permission restrictions on private keys to prevent unauthorized local access[cite: 78]."
    },
    {
      "id": "q-imp-1794831407982-320-p372",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How does mathematical availability calculate across multi-AZ redundant systems compared to single-instance deployments?",
      "options": [
        "Availability is averaged across all connected instances.",
        "Simultaneous failure probability multiplies (e.g., $0.001 \\times 0.001$), drastically increasing total system availability uptime percentages (e.g., six nines)[cite: 89].",
        "Availability decreases due to network transit latency.",
        "Multi-AZ deployment has zero impact on SLA calculations."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Parallel redundancy multiplies independent failure probabilities, exponentially increasing overall system uptime availability[cite: 89]."
    },
    {
      "id": "q-imp-1794831407982-321-txor",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the distinction between Fault Tolerance (FT) and High Availability (HA) in cloud architecture?",
      "options": [
        "FT minimizes recovery time to minutes, while HA requires manual intervention.",
        "HA focuses on minimizing downtime with rapid recovery, whereas FT achieves zero downtime through redundant hot standbys that absorb failures instantly without interruption[cite: 89].",
        "FT applies only to storage volumes, while HA applies to S3 buckets.",
        "There is no architectural distinction between them."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** High availability minimizes recovery duration, while fault tolerance ensures continuous operation without service interruption during component failure[cite: 89]."
    },
    {
      "id": "q-imp-1794831407982-322-rg6k",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In cloud capacity planning, what specific risk does \"Cloud Sprawl\" introduce to enterprise organizations?",
      "options": [
        "Immediate hardware obsolescence across physical data centers.",
        "Uncontrolled accumulation of orphaned virtual machines, idle databases, and unattached storage disks resulting in unexpected financial \"bill shock\"[cite: 125].",
        "Permanent loss of S3 object durability.",
        "Automatic revocation of AWS IAM administrative roles."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud sprawl leads to severe financial waste from unmonitored and forgotten idle cloud assets[cite: 125]."
    },
    {
      "id": "q-imp-1794831407982-323-ttyw",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does adopting proprietary vendor-specific APIs (such as specialized serverless streams) complicate multi-cloud migration strategies?",
      "options": [
        "Proprietary APIs run exclusively on physical mainframes.",
        "It creates severe vendor lock-in, making migration to alternative cloud providers or on-premise infrastructure economically and architecturally prohibitive[cite: 125].",
        "Proprietary APIs violate NIST essential characteristics.",
        "It forces the use of SOAP XML protocols."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Proprietary vendor services tightly couple application logic to a single cloud provider, raising migration barriers[cite: 125]."
    },
    {
      "id": "q-imp-1794831407982-324-5vqh",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What underlying architectural mechanism enables serverless architectures (like AWS Lambda) to \"scale to zero\"?",
      "options": [
        "Permanent background virtual machine allocation.",
        "Decoupling compute execution from persistent server allocation, allowing the provider to provision and terminate micro-VM environments dynamically based strictly on incoming event invocations[cite: 91, 102].",
        "Automatic database sharding across S3 buckets.",
        "Eliminating the need for IAM security roles."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Serverless design abstracts server provisioning, allowing infrastructure scaling down to absolute zero resource consumption when idle[cite: 91, 102]."
    },
    {
      "id": "q-imp-1794831407982-325-6eel",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In Microsoft Azure resource management, what is the hierarchical relationship between Management Groups, Subscriptions, and Resource Groups?",
      "options": [
        "Resource Groups contain Management Groups, which contain Subscriptions.",
        "Management Groups govern multiple Subscriptions, Subscriptions act as billing/access boundaries, and Subscriptions contain Resource Groups holding specific resources[cite: 103].",
        "Subscriptions operate independently without Resource Groups.",
        "Resource Groups govern global cloud regions directly."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure governance flows hierarchically from Management Groups down through Subscriptions and Resource Groups[cite: 103]."
    },
    {
      "id": "q-imp-1794831407982-326-3r4q",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why is Azure Cosmos DB classified as a globally distributed NoSQL database rather than a traditional relational database?",
      "options": [
        "It requires SQL Server licenses.",
        "It offers multi-model data structures, horizontal partitioning, and multi-region replication delivering single-digit millisecond latencies without rigid relational schema enforcement[cite: 103].",
        "It stores data exclusively in immutable S3 buckets.",
        "It supports block storage disk attachments only."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cosmos DB provides distributed NoSQL capabilities designed for planet-scale low-latency workloads[cite: 103]."
    },
    {
      "id": "q-imp-1794831407982-327-4z5v",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How does Azure Files differ from Azure Blob Storage regarding workload mounting?",
      "options": [
        "Azure Files is object storage accessed via REST APIs only.",
        "Azure Files provides fully managed SMB and NFS cloud file shares mountable directly by standard operating system clients, whereas Blob Storage is unstructured object storage[cite: 104].",
        "Azure Files attaches only to relational SQL databases.",
        "Azure Blob Storage supports Linux kernel booting."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Files acts as a cloud file share supporting standard file protocols (SMB/NFS), unlike object-based Blob Storage[cite: 104]."
    },
    {
      "id": "q-imp-1794831407982-328-uny7",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What specific function does Azure Log Analytics perform when paired with Kusto Query Language (KQL)?",
      "options": [
        "It compiles container Dockerfiles.",
        "It enables high-speed expressive querying and telemetry analysis across massive collections of centralized logs and metrics[cite: 105].",
        "It provisions custom virtual networks.",
        "It manages SSH key pair permissions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Log Analytics uses KQL to execute rapid analytical queries against aggregated cloud telemetry[cite: 105]."
    },
    {
      "id": "q-imp-1794831407982-329-h1ck",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Under the NIST definition of cloud computing, what distinguishes \"Measured Service\" from traditional IT billing?",
      "options": [
        "Measured service applies strictly to physical hardware purchases.",
        "Resource usage is monitored, controlled, and metered transparently, enabling transparent pay-per-use consumption models for both provider and consumer[cite: 113, 114].",
        "Measured service requires fixed annual subscription fees.",
        "It eliminates cloud cost tracking entirely."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Measured service provides precise metering of resource consumption for usage-based billing[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831407982-330-qa2e",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why did enterprise data centers in the 1980s-1990s suffer from extremely low average server utilization (10-15%)?",
      "options": [
        "Because hypervisors were not invented yet.",
        "Because organizations had to procure and maintain physical servers sized strictly for peak seasonal capacity demands, leaving hardware idle during off-peak times[cite: 109].",
        "Because client workstations handled all database storage.",
        "Because operating systems lacked TCP/IP networking."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Static physical server provisioning for peak loads forced hardware to sit idle during normal operations[cite: 109]."
    },
    {
      "id": "q-imp-1794831407982-331-b1zq",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What technological breakthrough in the 2000s served as the primary technical catalyst enabling commercial cloud computing?",
      "options": [
        "The invention of HTML web browsers.",
        "Mature hypervisor virtualization enabling multi-tenant isolation and hardware abstraction on commodity servers[cite: 112].",
        "The creation of the SOAP protocol.",
        "The deprecation of Linux operating systems."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtualization allowed multiple isolated virtual servers to run on shared physical hardware, powering utility cloud computing[cite: 112]."
    },
    {
      "id": "q-imp-1794831407982-332-sdc3",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How do Network Access Control Lists (NACLs) differ fundamentally from Security Groups regarding statelessness?",
      "options": [
        "NACLs track active connection states automatically.",
        "NACLs are stateless firewalls requiring explicit inbound and outbound rules for return traffic, whereas Security Groups are stateful and auto-permit return packets[cite: 100].",
        "NACLs apply exclusively to individual EC2 instances.",
        "Security Groups require sequential numerical rule evaluation."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NACLs evaluate stateless rules sequentially and require explicit rules for return network traffic[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-333-lx5w",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the operational purpose of Amazon EBS volume snapshots?",
      "options": [
        "To host serverless Lambda functions.",
        "To create point-in-time, incremental backups of block storage volumes stored securely in Amazon S3 for disaster recovery[cite: 100].",
        "To translate domain names into IP addresses.",
        "To monitor CPU utilization metrics."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EBS snapshots capture incremental block storage data states for persistent backup and volume restoration[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-334-sztb",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why is gRPC significantly faster than REST for internal microservice communication?",
      "options": [
        "Because REST uses binary Protocol Buffers.",
        "Because gRPC leverages multiplexed HTTP/2 streams and compact binary serialization (Protobuf), avoiding heavy text-based JSON parsing overhead[cite: 125, 126].",
        "Because gRPC operates without network transport layers.",
        "Because SOAP XML protocols replace HTTP."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Binary serialization over multiplexed HTTP/2 gives gRPC substantial performance and latency advantages over text-based REST[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831407982-335-7wmk",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the primary security implication of a misconfigured S3 bucket ACL granting public write access?",
      "options": [
        "S3 converts all stored objects into block storage volumes.",
        "Unauthorized external attackers can upload malicious files, overwrite existing objects, or incur massive financial damage via storage abuse.",
        "The Lambda function stops executing Python scripts.",
        "CloudWatch logs stop recording execution metrics."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public write exposure allows malicious external actors to manipulate bucket contents arbitrarily."
    },
    {
      "id": "q-imp-1794831407982-336-sbz0",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How does git handle file tracking changes when comparing working trees to commits?",
      "options": [
        "Git tracks file deltas exclusively like Subversion.",
        "Git tracks cryptographic snapshots (blobs and trees) of the entire project state rather than line-by-line file deltas[cite: 47].",
        "Git stores all history inside temporary RAM buffers.",
        "Git relies on operating system filesystem modification dates."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Git's architecture captures immutable content snapshots (snapshots vs deltas) for every commit[cite: 47]."
    },
    {
      "id": "q-imp-1794831407982-337-idsd",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the exact function of the `.git` directory in a local repository root?",
      "options": [
        "It contains temporary compiled Python bytecode.",
        "It houses Git's internal database storing immutable commit objects, trees, blobs, and branch references[cite: 47].",
        "It stores GitHub personal access tokens.",
        "It acts as the staging area index buffer."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The hidden `.git` folder contains the entire repository history, metadata, and database objects[cite: 47]."
    },
    {
      "id": "q-imp-1794831407982-338-4616",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an Auto-Scaling Group implement a Cooldown Period after executing a scaling action?",
      "options": [
        "To allow physical server cooling fans to slow down.",
        "To prevent rapid scale-out/scale-in oscillation (\"flapping\") by pausing further scaling evaluations while newly provisioned instances initialize and stabilize[cite: 93].",
        "To reset CloudWatch billing alarms.",
        "To drain S3 object storage queues."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cooldown periods prevent erratic scaling thrashing by allowing newly launched instances time to stabilize metrics[cite: 93]."
    },
    {
      "id": "q-imp-1794831407982-339-6xut",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What distinguishes Predictive Scaling from Dynamic Scaling in cloud architectures?",
      "options": [
        "Dynamic scaling uses machine learning models to forecast future traffic, while predictive scaling reacts to current CPU alarms.",
        "Predictive scaling uses machine learning to analyze historical traffic patterns and launch instances proactively before demand surges, whereas dynamic scaling reacts to real-time metric thresholds[cite: 93].",
        "Predictive scaling operates exclusively on physical mainframes.",
        "Dynamic scaling requires manual scheduling."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Predictive scaling anticipates traffic spikes proactively via ML models, complementing reactive dynamic scaling[cite: 93]."
    },
    {
      "id": "q-imp-1794831407982-340-qve3",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In AWS IAM policy structures, what is the evaluation outcome if a request matches both an explicit `Deny` and an explicit `Allow`?",
      "options": [
        "`Allow` overrides `Deny`.",
        "`Deny` takes absolute precedence; explicit deny statements override any allowed permissions[cite: 7].",
        "The request triggers an infinite recursive loop.",
        "AWS prompts the user for MFA verification."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IAM policy evaluation enforces a strict default-deny model where an explicit deny always overrides allows[cite: 7]."
    },
    {
      "id": "q-imp-1794831407982-341-6n61",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the function of an AWS VPC NAT Instance compared to a managed NAT Gateway?",
      "options": [
        "NAT instances run serverless Lambda functions.",
        "A NAT instance is a user-managed EC2 virtual server performing network address translation, whereas a NAT Gateway is a fully managed, highly available AWS service[cite: 90, 99].",
        "NAT instances replace Internet Gateways entirely.",
        "NAT gateways require manual Linux OS security patching."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NAT gateways provide managed high-availability NAT, whereas NAT instances require manual EC2 server management[cite: 90, 99]."
    },
    {
      "id": "q-imp-1794831407982-342-id6z",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why must Python Flask REST API applications bind explicitly to host `0.0.0.0` when containerized in Docker rather than `127.0.0.1`?",
      "options": [
        "To encrypt HTTP requests using TLS 1.3.",
        "Binding to `127.0.0.1` restricts traffic to the container's internal loopback interface, whereas `0.0.0.0` binds to all network interfaces, allowing traffic from host port mappings (`-p`)[cite: 22].",
        "Because Docker does not support localhost loopbacks.",
        "To bypass Windows Firewall restrictions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `0.0.0.0` ensures the Flask server listens externally on container network interfaces bridged to the host[cite: 22]."
    },
    {
      "id": "q-imp-1794831407982-343-qp1u",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What specific security vulnerability does `.dockerignore` prevent during container image builds?",
      "options": [
        "SQL injection attacks against Flask routes.",
        "Preventing accidental inclusion of local sensitive environment files (`.env`), SSH keys, or Git metadata inside built container image layers[cite: 36].",
        "Unauthorized S3 bucket write access.",
        "Operating system kernel panics."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Excluding sensitive local files via `.dockerignore` prevents embedding credentials inside immutable image layers[cite: 36]."
    },
    {
      "id": "q-imp-1794831407982-344-l1ga",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "How does git handle deleted tracked files when preparing a commit?",
      "options": [
        "Git ignores deleted files until the repository is reinitialized.",
        "Deletions must be staged (via `git add` or `git rm`) to record the removal in the next commit snapshot[cite: 47, 48].",
        "Git restores deleted files automatically from remote tracking branches.",
        "Deleted files trigger immediate merge conflict pauses."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** File removals are tracked changes that must be staged to update the repository snapshot[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831407982-345-bb0j",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the primary purpose of an AWS S3 Lifecycle Policy?",
      "options": [
        "To execute serverless Python scripts upon file upload.",
        "To automate transitioning objects between storage classes (e.g., Standard to Glacier) or expiring old data to optimize storage costs.",
        "To balance HTTP traffic across Availability Zones.",
        "To encrypt data streams in transit."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lifecycle policies automate cost-efficient storage tier migrations and object expiration rules over time."
    },
    {
      "id": "q-imp-1794831407982-346-36j3",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer support Path-Based Routing (e.g., routing `/api/*` to one target group and `/static/*` to another)?",
      "options": [
        "To bypass VPC security groups.",
        "To enable microservice architectures where different URL paths route requests to distinct backend target groups behind a single load balancer entry point[cite: 92].",
        "To convert REST APIs into SOAP XML protocols.",
        "To eliminate the need for DNS routing."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Layer 7 path-based routing directs client requests to specialized microservices based on URL URI paths[cite: 92]."
    },
    {
      "id": "q-imp-1794831407982-347-n4xo",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the architectural role of a Bastion Host (Jump Box) in a secure cloud VPC?",
      "options": [
        "To store enterprise relational databases.",
        "A hardened, publicly accessible EC2 instance placed in a public subnet used solely to route secure, audited SSH administrative access into private subnet instances.",
        "To act as an Application Load Balancer.",
        "To host serverless Lambda functions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bastion hosts secure administrative entry points into private subnets without exposing backend servers directly[cite: 74, 99]."
    },
    {
      "id": "q-imp-1794831407982-348-8l1f",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "In Docker container networking, what is a bridge network?",
      "options": [
        "A physical network cable connecting two Docker hosts.",
        "A private software-defined bridge created by Docker on the host, allowing containers connected to it to communicate with each other while isolated from external networks unless published[cite: 38].",
        "A public IP address assigned to S3 buckets.",
        "A type of NFS file share."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bridge networks provide isolated internal networking for containers running on the same host Docker daemon[cite: 38]."
    },
    {
      "id": "q-imp-1794831407982-349-ad6r",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What operational challenge does \"Vendor Lock-In\" present to cloud engineering teams?",
      "options": [
        "Inability to use Python programming languages.",
        "High financial and technical switching costs when attempting to migrate applications away from proprietary cloud provider APIs and managed services[cite: 125].",
        "Mandatory hardware depreciation schedules.",
        "Elimination of automated CI/CD pipelines."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Vendor lock-in restricts architectural flexibility by binding systems tightly to proprietary cloud ecosystem features[cite: 125]."
    },
    {
      "id": "q-imp-1794831407982-350-0hqv",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which command displays the current working tree status in Git, showing staged, unstaged, and untracked files?",
      "options": [
        "`git log`",
        "`git status`[cite: 24, 47]",
        "`git diff`",
        "`git commit`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git status` reports the exact state of your working directory and staging index[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831407982-351-p65a",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary purpose of a Python virtual environment (`.venv`) in software development projects?",
      "options": [
        "To compile Python scripts into binary machine code.",
        "To isolate project-specific dependencies and packages from the global system Python installation, avoiding version collisions[cite: 21].",
        "To encrypt source code files on disk.",
        "To automate GitHub pull request reviews."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtual environments encapsulate package dependencies per project to maintain clean, isolated execution runtimes[cite: 21]."
    },
    {
      "id": "q-imp-1794831407982-352-4cbc",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does the `FROM` instruction specify in a Dockerfile?",
      "options": [
        "The author of the container image.",
        "The parent base image (e.g., Python or Alpine) upon which all subsequent layers are built[cite: 37, 63].",
        "The network port exposed by the container.",
        "The database connection string."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `FROM` establishes the foundational operating system or runtime layer for building custom Docker images[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407982-353-xvtj",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer perform TLS termination at the load balancer level rather than passing encrypted HTTPS traffic directly to backend EC2 instances?",
      "options": [
        "Because EC2 instances lack network cards.",
        "To offload heavy cryptographic decryption overhead from backend application servers, simplifying certificate management and centralizing secure entry points.",
        "Because S3 buckets cannot process encrypted data.",
        "To violate VPC security group rules."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** TLS termination offloads CPU-intensive SSL/TLS decryption processing from backend compute instances."
    },
    {
      "id": "q-imp-1794831407982-354-2b5w",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of an Amazon S3 bucket?",
      "options": [
        "To run Linux virtual machines.",
        "To store and organize files as objects within a globally unique namespace[cite: 100].",
        "To process SQL database queries.",
        "To route public DNS traffic."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 buckets serve as the primary cloud container storage units for unstructured objects[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-355-1qt4",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the difference between `git add` and `git commit`?",
      "options": [
        "`git add` saves history permanently; `git commit` stages files.",
        "`git add` moves changes from the working directory into the staging area, whereas `git commit` permanently locks staged changes into repository history as a new snapshot[cite: 47, 48].",
        "Both commands perform identical operations.",
        "`git commit` uploads changes to GitHub automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Staging via `git add` prepares snapshots, while committing via `git commit` records them permanently in repository history[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831407982-356-qmfg",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command lists all locally available Docker container images on your machine?",
      "options": [
        "`docker ps`",
        "`docker images`[cite: 38, 41]",
        "`docker inspect`",
        "`docker run`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker images` outputs a catalog of locally stored container images, tags, and sizes[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-357-kftx",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what does the `debug=False` setting in `app.run()` control regarding production security?",
      "options": [
        "It disables database connections.",
        "Disabling debug mode prevents the interactive browser debugger from exposing sensitive traceback execution code and environment variables if an exception occurs in production.",
        "It forces Flask to run on port 80 only.",
        "It enables S3 event logging."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Leaving debug mode enabled in production is a severe security risk; `debug=False` secures runtime execution errors."
    },
    {
      "id": "q-imp-1794831407982-358-trly",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary role of an AWS Internet Gateway?",
      "options": [
        "To store database backups.",
        "To connect a VPC's public subnets to the external public Internet for bi-directional communication[cite: 73, 74].",
        "To execute serverless Lambda functions.",
        "To balance load across instances."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Internet Gateway bridges internal VPC traffic with the external public internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831407982-359-fptq",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What specific operational failure occurs if an S3 Event Notification trigger is created without specifying an `incoming/` prefix filter in the file-organizing lab?",
      "options": [
        "S3 deletes all files instantly.",
        "The Lambda function triggers itself infinitely upon writing destination files, causing a recursive invocation storm[cite: 3, 13].",
        "Python Flask REST APIs fail to compile.",
        "The IAM role loses `s3:GetObject` permissions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Without prefix filtering, destination copies trigger new object events that re-invoke the Lambda function endlessly[cite: 3, 13]."
    },
    {
      "id": "q-imp-1794831407982-360-aqps",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which command clones a remote repository from GitHub to your local computer?",
      "options": [
        "`git init`",
        "`git clone <URL>`[cite: 31, 51]",
        "`git pull origin`",
        "`git remote add`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git clone` downloads a complete working repository clone from a remote URL[cite: 31, 51]."
    },
    {
      "id": "q-imp-1794831407982-361-4hxs",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the function of the `EXPOSE` instruction in a Dockerfile?",
      "options": [
        "It automatically opens firewall ports on the host machine.",
        "It serves as documentation indicating which network port the application listens on inside the container[cite: 37, 38].",
        "It starts the application server automatically.",
        "It encrypts container environment variables."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `EXPOSE` documents expected container network ports for operators, though publishing requires `-p` at runtime[cite: 37, 38]."
    },
    {
      "id": "q-imp-1794831407982-362-gnug",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does PaaS stand for in cloud computing service delivery models?",
      "options": [
        "Public Application Security Service",
        "Platform as a Service[cite: 119, 120]",
        "Private Automated Storage System",
        "Primary Access Software"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** PaaS delivers managed runtime environments where developers deploy code without administering OS layers[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407982-363-rg04",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer require a Target Group to define both a specific Protocol (HTTP) and Port (e.g., 8000)?",
      "options": [
        "To encrypt S3 object storage buckets.",
        "To inform the load balancer precisely how to forward decrypted client requests to backend compute instances listening on that specific application port[cite: 80].",
        "To configure EC2 Key Pair authentication.",
        "To establish IAM role policies."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Target groups specify protocol and port configurations so the ALB routes traffic correctly to backend servers[cite: 80]."
    },
    {
      "id": "q-imp-1794831407982-364-olmd",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command stops a running Docker container gracefully?",
      "options": [
        "`docker kill`",
        "`docker stop <container>`[cite: 39, 64]",
        "`docker rm <container>`[cite: 39, 64]",
        "`docker pause <container>`[cite: 39, 64]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker stop` sends a SIGTERM signal enabling graceful application shutdown before termination[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831407982-365-t2xq",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the primary difference between `git merge` and `git rebase` conceptually?",
      "options": [
        "`git merge` deletes commits, while `git rebase` creates branches.",
        "`git merge` preserves branch history by creating a merge commit, whereas `git rebase` rewrites commit history by moving or replaying commits onto a new base branch tip.",
        "Both commands perform identical history rewriting.",
        "`git rebase` requires a GitHub connection."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Merging preserves branch topology with merge commits, while rebasing linearizes history by rewriting commits."
    },
    {
      "id": "q-imp-1794831407982-366-89vi",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is an Availability Zone (AZ) in AWS?",
      "options": [
        "A global region containing entire countries.",
        "One or more discrete data centers with redundant power, cooling, and networking within a Region[cite: 115, 117].",
        "An edge CDN caching server.",
        "A virtual private subnet."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Availability Zones represent isolated data center locations engineered for high availability within regions[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831407982-367-kntd",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What specific security risk is introduced if an application container runs with root privileges (`USER root`) inside Docker?",
      "options": [
        "The container cannot connect to SQLite databases.",
        "If an attacker achieves remote code execution vulnerability inside the container, they gain root access to the container filesystem and potentially exploit kernel vulnerabilities to compromise the host.",
        "Docker daemon fails to build image layers.",
        "Python Flask routes return HTTP 404 errors."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Running containers as root broadens the attack surface significantly if container isolation is compromised."
    },
    {
      "id": "q-imp-1794831407982-368-kqxx",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does SaaS stand for in cloud computing?",
      "options": [
        "Secure Automated Server Software",
        "Software as a Service[cite: 119, 120]",
        "Scalable Application Infrastructure System",
        "Simple Administrative Storage Solution"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SaaS delivers turnkey, fully managed software applications over the web[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407982-369-5h6l",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Git, what does `git log --oneline` do?",
      "options": [
        "It deletes all commit history.",
        "It displays a compact, summarized commit history showing each commit on a single line with its short hash and message[cite: 24, 48].",
        "It shows detailed diffs for every file.",
        "It lists remote repository URLs."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--oneline` formats commit history into a concise, easy-to-read single-line summary per commit[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831407982-370-7i1m",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of the `docker rm` command?",
      "options": [
        "To remove a local container image.",
        "To delete one or more stopped Docker containers from disk[cite: 39, 64].",
        "To stop a running container.",
        "To push images to Docker Hub."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker rm` cleans up and deletes stopped container instances[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831407982-371-n05c",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why must database migration scripts (like Flask-Migrate) be executed carefully in production deployments with Auto-Scaling groups?",
      "options": [
        "Because SQLite databases do not support tables.",
        "If multiple auto-scaling application instances start simultaneously and execute database schema migrations concurrently, race conditions can corrupt database tables or lock schema structures.",
        "Because S3 buckets reject migration files.",
        "Because Gunicorn blocks migration execution."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Concurrent schema migrations across scaling instances can cause race conditions and database corruption without coordination."
    },
    {
      "id": "q-imp-1794831407982-372-lna1",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS IAM Role?",
      "options": [
        "To encrypt S3 object storage at rest.",
        "To provide temporary, secure permissions that can be assumed by AWS services (like Lambda) or users without embedding static access keys[cite: 7, 116].",
        "To manage DNS domain registration.",
        "To balance incoming HTTP traffic."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IAM roles grant secure, least-privilege temporary permissions to services and users[cite: 7, 116]."
    },
    {
      "id": "q-imp-1794831407982-373-rbaf",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the function of `git branch -d <branch>`?",
      "options": [
        "It pushes the branch to GitHub.",
        "It safely deletes a local branch that has already been merged into the current branch[cite: 26, 49].",
        "It creates a new feature branch.",
        "It renames the active branch."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `-d` deletes local branches safely, preventing accidental deletion of unmerged work[cite: 26, 49]."
    },
    {
      "id": "q-imp-1794831407982-374-0gdl",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command builds a Docker image and tags it with `v1.0` using the current directory context?",
      "options": [
        "`docker run -t v1.0 .`",
        "`docker build -t app-name:v1.0 .`[cite: 38, 41]",
        "`docker push app-name:v1.0`",
        "`docker pull v1.0`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker build -t <tag> .` builds and tags container images from the local context directory[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-375-mf56",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the primary technical trade-off of selecting multi-region active-active database architectures in cloud systems?",
      "options": [
        "Inability to use SQL queries.",
        "Increased network latency for cross-region replication and complex eventual consistency conflict-resolution challenges compared to single-region setups.",
        "Zero data durability across regions.",
        "Mandatory use of SOAP XML protocols."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Active-active multi-region databases require managing distributed consistency and cross-region replication latency trade-offs."
    },
    {
      "id": "q-imp-1794831407982-376-3ari",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does IaaS stand for in cloud computing service models?",
      "options": [
        "Internet Application and Service",
        "Infrastructure as a Service[cite: 119, 120]",
        "Integrated API Software",
        "Isolated Account Security"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IaaS provides foundational virtualized computing hardware, storage, and networking[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831407982-377-dqz6",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the role of the `WORKDIR` instruction in a Dockerfile?",
      "options": [
        "To download source code from GitHub repositories.",
        "To set the working directory for any subsequent `RUN`, `COPY`, or `CMD` instructions inside the container image filesystem[cite: 37, 63].",
        "To define container runtime environment variables.",
        "To expose public network ports."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `WORKDIR` establishes the active path context for building container filesystem layers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407982-378-633x",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "Which command displays detailed configuration metadata for a running Docker container?",
      "options": [
        "`docker logs`",
        "`docker inspect <container>`[cite: 38, 41]",
        "`docker ps -a`",
        "`docker images`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker inspect` outputs comprehensive low-level JSON configuration data for containers or images[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-379-fwzh",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an AWS VPC NAT Gateway require an Elastic IP (EIP) address when created in a public subnet?",
      "options": [
        "To host serverless Lambda functions.",
        "To maintain a static, unchanging public IP address source when translating outbound private subnet traffic to the external internet, ensuring predictable firewall rules for external services.",
        "To encrypt S3 bucket objects.",
        "To replace the VPC Internet Gateway."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Elastic IPs provide persistent public IP addresses for NAT gateways communicating across external networks."
    },
    {
      "id": "q-imp-1794831407982-380-q7m6",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the primary function of an AWS S3 bucket?",
      "options": [
        "To run Linux virtual servers.",
        "To store and retrieve arbitrary data as objects within a globally unique namespace[cite: 100].",
        "To manage relational database transactions.",
        "To route public DNS traffic."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 buckets provide primary storage container namespaces for object data[cite: 100]."
    },
    {
      "id": "q-imp-1794831407982-381-y4f7",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Python Flask, how do you handle incoming JSON payloads in a POST request?",
      "options": [
        "`request.args.get()`",
        "`request.get_json()` or `request.json`",
        "`request.form.get()`",
        "`jsonify()`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `request.get_json()` parses incoming JSON request bodies into Python dictionaries automatically."
    },
    {
      "id": "q-imp-1794831407982-382-j7ue",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command lists all running Docker containers?",
      "options": [
        "`docker images`",
        "`docker ps`[cite: 38, 41]",
        "`docker ps -a`[cite: 38, 41]",
        "`docker stop`[cite: 38, 41]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker ps` displays active running container instances[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-383-cwn5",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the security implication of exposing an EC2 instance metadata service (IMDSv1) without token session requirements?",
      "options": [
        "It encrypts all storage volumes automatically.",
        "If an application suffers from a Server-Side Request Forgery (SSRF) vulnerability, attackers can query the metadata endpoint to steal temporary IAM role credentials and compromise AWS resources.",
        "It blocks all inbound SSH connections.",
        "It triggers infinite Lambda recursive loops."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IMDSv1 is vulnerable to SSRF credential theft, making IMDSv2 token enforcement critical for cloud security."
    },
    {
      "id": "q-imp-1794831407982-384-zt05",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does SLA stand for in cloud provider service agreements?",
      "options": [
        "Secured Local Architecture",
        "Service Level Agreement[cite: 89]",
        "Scalable Logging Application",
        "Serverless Lambda API"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SLAs define formal vendor commitments regarding uptime availability and performance standards[cite: 89]."
    },
    {
      "id": "q-imp-1794831407982-385-0g7w",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the purpose of the `-u` flag when executing `git push -u origin main`?",
      "options": [
        "To push commits using SSH keys.",
        "To establish upstream tracking between the local branch and remote branch for simplified future pushes and pulls[cite: 28, 29].",
        "To delete the remote branch.",
        "To force overwrite remote history."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The upstream `-u` flag links local and remote branches so subsequent commands can omit remote/branch names[cite: 28, 29]."
    },
    {
      "id": "q-imp-1794831407982-386-0y0a",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command deletes a stopped container image from local storage?",
      "options": [
        "`docker rm`",
        "`docker rmi <image>`",
        "`docker stop`",
        "`docker prune`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker rmi` removes local container images from storage."
    },
    {
      "id": "q-imp-1794831407982-387-tp2m",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why do enterprise cloud architectures separate public subnets from private subnets using routing tables and NACLs?",
      "options": [
        "To increase S3 storage capacity.",
        "To enforce network-level security boundaries, ensuring public-facing web components are segregated from isolated internal application logic and databases.",
        "To eliminate the need for Application Load Balancers.",
        "To speed up Docker container builds."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Subnet segregation implements security in depth, isolating sensitive backend components from direct public internet exposure."
    },
    {
      "id": "q-imp-1794831407982-388-0mg6",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is Amazon EC2?",
      "options": [
        "Managed object storage.",
        "Elastic Compute Cloud providing secure, resizable virtual server instances in the cloud[cite: 96, 97].",
        "A serverless event engine.",
        "A relational database service."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EC2 delivers flexible virtual server compute capacity on demand[cite: 96, 97]."
    },
    {
      "id": "q-imp-1794831407982-389-ed0d",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Git, what does `git diff --cached` display?",
      "options": [
        "Unstaged working tree changes.",
        "Changes currently staged in the index ready for the next commit[cite: 24, 48].",
        "Remote branch history.",
        "Deleted untracked files."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--cached` (or `--staged`) compares staged changes against the last commit snapshot[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831407982-390-ff3q",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the function of the `ENV` instruction in a Dockerfile?",
      "options": [
        "To copy files into the container.",
        "To define persistent environment variables within the container environment[cite: 37, 63].",
        "To open container firewall ports.",
        "To install pip packages."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `ENV` sets environment variables accessible during build and runtime inside containers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831407982-391-t41p",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What is the primary risk of configuring an S3 bucket with public read access (`AllUsers` / `Public`) for hosting general corporate documents?",
      "options": [
        "S3 converts the bucket into block storage.",
        "Anyone on the public internet can read, scrape, or download confidential documents, resulting in severe data leaks and compliance violations[cite: 4].",
        "Lambda functions stop executing.",
        "CloudWatch logs delete execution histories."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public S3 bucket access exposes private data to the entire internet, violating security requirements[cite: 4]."
    },
    {
      "id": "q-imp-1794831407982-392-kcfn",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does CapEx stand for in financial planning?",
      "options": [
        "Capital Expenditure[cite: 114]",
        "Capacity Planning Execution",
        "Centralized Application Engine",
        "Cloud Processing Exchange"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** CapEx represents major upfront capital investments in physical infrastructure[cite: 114]."
    },
    {
      "id": "q-imp-1794831407982-393-c96y",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "What is the operational purpose of `git fetch --prune`?",
      "options": [
        "To delete local commit history permanently.",
        "To remove stale local remote-tracking branch references that have already been deleted on the remote repository[cite: 30].",
        "To force-push local changes.",
        "To resolve merge conflicts."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--prune` cleans up outdated local tracking references for deleted remote branches[cite: 30]."
    },
    {
      "id": "q-imp-1794831407982-394-r13g",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What is the default port used by Python Flask web applications locally?",
      "options": [
        "Port 80",
        "Port 443",
        "Port 5000[cite: 22]",
        "Port 8080"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Flask runs on port 5000 by default for local development applications[cite: 22]."
    },
    {
      "id": "q-imp-1794831407982-395-drpw",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "Why does an Auto-Scaling Group require a Launch Template or Launch Configuration?",
      "options": [
        "To manage SQLite database migrations.",
        "To define the blueprint configuration (AMI, instance type, security groups, key pair, and user data) used when spinning up new EC2 instances automatically.",
        "To configure S3 event notifications.",
        "To execute GitHub Actions CI pipelines."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Launch templates specify exact instance configuration parameters required by Auto-Scaling groups during scale-out events."
    },
    {
      "id": "q-imp-1794831407982-396-hw36",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What does OpEx stand for in cloud financial models?",
      "options": [
        "Operational Expenditure[cite: 114]",
        "Optimized Processing Execution",
        "Outbound Public Exchange",
        "Open Protocol Encryption"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** OpEx represents variable monthly operational expenses based on active usage[cite: 114]."
    },
    {
      "id": "q-imp-1794831407982-397-mo9g",
      "topicId": "top-1794831214262-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what does `jsonify({'status': 'running'})` return regarding HTTP response headers?",
      "options": [
        "A plain text MIME type.",
        "An HTTP response object with an `application/json` content-type header and serialized JSON payload.",
        "An XML data stream.",
        "A binary bytecode file."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `jsonify()` serializes dictionaries into JSON format and sets the proper `application/json` response header."
    },
    {
      "id": "q-imp-1794831407982-398-a81w",
      "topicId": "top-1794831214262-1",
      "difficulty": "easy",
      "question": "What command builds a Docker container in the background?",
      "options": [
        "`docker run -d`[cite: 38, 41]",
        "`docker build -d`",
        "`docker run -d <image>`[cite: 38, 41]",
        "`docker start -d`[cite: 38, 41]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Detached mode (`-d`) runs container instances in the background[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831407982-399-apt1",
      "topicId": "top-1794831214262-1",
      "difficulty": "hard",
      "question": "What specific failure mode occurs if a CloudFormation or Terraform Infrastructure-as-Code deployment attempts to create a resource with a name that must be globally unique (like an S3 bucket) but is already taken across AWS?",
      "options": [
        "AWS automatically generates a random suffix.",
        "The deployment stack creation fails with an entity-already-exists or bucket-name-taken error, halting infrastructure provisioning.",
        "The bucket is created in a different region.",
        "The IAM role is deleted automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Globally unique resource namespaces cause stack creation failures if name collisions occur across AWS accounts[cite: 4, 100]."
    },
    {
      "id": "q-imp-1794831446318-0-b5ew",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the AWS S3 and Lambda file-organizing lab, what happens to files that do not have a file extension?",
      "options": [
        "They are deleted immediately without copying",
        "They are placed in the `Documents/` folder",
        "They are placed in the `Others/` folder",
        "They remain in the `incoming/` prefix"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The lab specifies that files with unrecognized or missing extensions must be handled and placed in the `Others/` destination folder[cite: 1, 9]."
    },
    {
      "id": "q-imp-1794831446318-1-99wy",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is configuring an `incoming/` prefix filter critical for the S3 event notification in the file-organizing lab?",
      "options": [
        "S3 buckets cannot trigger Lambda functions from the bucket root",
        "It prevents Lambda's own destination copy operations from repeatedly invoking the function",
        "It automatically encrypts uploaded files before processing",
        "It reduces the storage cost of S3 objects"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Because copying a file to a destination prefix creates an S3 object event, filtering only on `incoming/` prevents infinite or repeated Lambda invocations[cite: 3, 13]."
    },
    {
      "id": "q-imp-1794831446318-2-832f",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does Amazon S3 implement a file \"move\" operation in the Python Lambda function?",
      "options": [
        "By calling the native `s3.move_object()` API method",
        "By renaming the object key metadata in place",
        "By copying the object to the destination key and then deleting the original object",
        "By downloading the file to `/tmp` and re-uploading it"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "S3 does not provide a single atomic move operation, so the function copies the source object first and deletes the original only after copying succeeds[cite: 8]."
    },
    {
      "id": "q-imp-1794831446318-3-x743",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which Python function is used in the S3 file organizer Lambda code to handle spaces and special characters in S3 event object keys?",
      "options": [
        "`os.path.splitext()`",
        "`urllib.parse.unquote_plus()`",
        "`json.dumps()`",
        "`source_key.rsplit()`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 event notifications URL-encode object keys, so `urllib.parse.unquote_plus()` is used to decode characters like `+` or percent-encoded spaces before copying and deleting[cite: 10, 12]."
    },
    {
      "id": "q-imp-1794831446318-4-cxnj",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the difference between a Lambda execution role and a Lambda resource-based permission?",
      "options": [
        "The execution role allows S3 to invoke Lambda, while resource-based permissions allow Lambda to write logs",
        "The execution role allows Python code to access S3 and write logs, while resource-based permissions allow S3 to invoke Lambda",
        "Both permissions perform the exact same function but apply to different AWS regions",
        "Resource-based permissions are only required when using Python 3.14"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The execution role grants the function access to AWS services like S3 and CloudWatch, whereas resource-based permissions authorize S3 to trigger the function[cite: 7]."
    },
    {
      "id": "q-imp-1794831446318-5-ywxc",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the S3 file organizer lab, how does the Lambda function preserve filename capitalization while performing case-insensitive classification?",
      "options": [
        "It renames all files to lowercase before uploading them to destination folders",
        "It converts only the extracted extension to lowercase for comparison while keeping the original `filename` variable for `destination_key`",
        "It configures S3 bucket properties to ignore case sensitivity",
        "It stores the original filename in object tags and restores it after moving"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "`os.path.splitext(filename)` extracts the extension, which is converted to lowercase for matching, while the original `filename` preserves its capitalization in `destination_key`[cite: 7, 9, 10, 11]."
    },
    {
      "id": "q-imp-1794831446318-6-m87c",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which three S3 IAM actions are granted to the `S3FileOrganizer` Lambda execution role?",
      "options": [
        "`s3:ListBucket`, `s3:GetObject`, `s3:PutObject`",
        "`s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`",
        "`s3:*`, `s3:CreateBucket`, `s3:DeleteBucket`",
        "`s3:CopyObject`, `s3:MoveObject`, `s3:ReadObject`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lambda requires `s3:GetObject` to read the source, `s3:PutObject` to create the destination copy, and `s3:DeleteObject` to remove the original[cite: 6, 7]."
    },
    {
      "id": "q-imp-1794831446318-7-5f4b",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the Git, Flask, and Docker lab, why is the Flask application configured to run on host `0.0.0.0` instead of `127.0.0.1`?",
      "options": [
        "To enable HTTPS encryption automatically",
        "To allow the application to listen on container network interfaces when running inside Docker",
        "To bypass Windows Firewall restrictions on port 5000",
        "To enable Flask's interactive debug mode"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Binding to `0.0.0.0` allows the Flask server to accept incoming traffic across container network interfaces when deployed inside Docker[cite: 22]."
    },
    {
      "id": "q-imp-1794831446318-8-wclu",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the difference between `git diff` and `git diff --cached`?",
      "options": [
        "`git diff` compares local and remote branches; `git diff --cached` compares two commits",
        "`git diff` shows unstaged changes; `git diff --cached` shows staged changes",
        "`git diff` shows deleted files; `git diff --cached` shows untracked files",
        "`git diff` works only offline; `git diff --cached` requires a GitHub connection"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "`git diff` displays modifications in the working tree that have not yet been staged, whereas `git diff --cached` shows changes already staged for the next commit[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831446318-9-9xkc",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which Git command discards uncommitted edits to a tracked file (`app.py`) in the working tree and restores it to the last committed version?",
      "options": [
        "`git restore --staged app.py`",
        "`git restore app.py`",
        "`git reset --soft HEAD`",
        "`git branch -d app.py`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git restore app.py` discards unstaged working-tree edits and reverts the file to its last committed state[cite: 25]."
    },
    {
      "id": "q-imp-1794831446318-10-okie",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why does `git pull --ff-only origin main` stop instead of creating a merge commit when histories have diverged?",
      "options": [
        "Because `--ff-only` deletes local commits that conflict with origin",
        "Because `--ff-only` instructs Git to update the branch only if it can advance via a fast-forward",
        "Because fast-forward pulls are only permitted on feature branches",
        "Because `--ff-only` requires administrator privileges on GitHub"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `--ff-only` flag ensures Git updates the local branch only when a linear fast-forward is possible, stopping so you can inspect diverged histories manually[cite: 30]."
    },
    {
      "id": "q-imp-1794831446318-11-o1j3",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In a Dockerfile, what is the purpose of the `EXPOSE 5000` instruction?",
      "options": [
        "It automatically publishes port 5000 to the host machine's public IP",
        "It configures Windows Firewall to allow inbound traffic on port 5000",
        "It documents the network port used by the containerized application without publishing it",
        "It starts the Flask server on port 5000 during the `docker build` phase"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "`EXPOSE 5000` serves as documentation indicating which port the application listens on inside the container; publishing requires `-p` during `docker run`[cite: 37, 38]."
    },
    {
      "id": "q-imp-1794831446318-12-h8bu",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In a Dockerfile, why is `COPY requirements.txt .` and `RUN pip install` placed before `COPY app.py .`?",
      "options": [
        "Because Python cannot install packages if `.py` files are already in the directory",
        "To optimize Docker layer caching so dependencies are not reinstalled every time application code changes",
        "Because `COPY app.py .` automatically deletes `requirements.txt`",
        "To reduce the size of the `.dockerignore` file"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Placing dependency installation before copying application source code leverages Docker layer caching, avoiding slow dependency reinstalls when only source code changes[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831446318-13-toys",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What happens to a Docker image when you stop and remove its running container using `docker stop` and `docker rm`?",
      "options": [
        "The image is automatically deleted to free up disk space",
        "The image tag is reverted to `latest`",
        "The image remains intact locally and is not deleted",
        "The image is pushed automatically to Docker Hub"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Stopping or removing a container only affects that container instance; the underlying read-only Docker image remains stored locally[cite: 39]."
    },
    {
      "id": "q-imp-1794831446318-14-p0jl",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does a Centralized VCS (like SVN) differ from a Distributed VCS (like Git) regarding offline work?",
      "options": [
        "Centralized VCS supports full offline commits, while Distributed VCS requires constant internet access",
        "Centralized VCS cannot commit, branch, or view diffs offline, whereas Distributed VCS has full offline capability",
        "Both systems require a network roundtrip to view commit logs",
        "Distributed VCS stores only working copies on developer machines without history"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "In a Distributed VCS like Git, every clone holds the entire repository history locally, enabling offline commits, branching, and log inspection[cite: 46]."
    },
    {
      "id": "q-imp-1794831446318-15-xzl4",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Git's internal architecture, what are the three local states a file moves through?",
      "options": [
        "Working Directory, Staging Area (Index), and Local Repository (`.git`)",
        "Untracked Zone, Remote Origin, and Pull Request",
        "Local Cache, Branch Pointer, and Cloud Registry",
        "Master Branch, Blob Storage, and Commit Tree"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "** Files are edited in the Working Directory, prepared in the Staging Area (Index), and permanently saved as snapshots in the Local Repository (`.git`)[cite: 47]."
    },
    {
      "id": "q-imp-1794831446318-16-1bkz",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "When does a Git 3-Way Merge occur instead of a Fast-Forward Merge?",
      "options": [
        "When no new commits have been made on the target branch since the feature branch was created",
        "When branch histories have diverged with new commits on both branches, requiring a new merge commit",
        "Whenever a branch is deleted using `git branch -d`",
        "Only when merging changes from a remote repository using `git fetch`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A 3-way merge is required when both branches have diverged with independent commits since their common ancestor, creating a new merge commit[cite: 49]."
    },
    {
      "id": "q-imp-1794831446318-17-xrre",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the key difference between Continuous Delivery and Continuous Deployment?",
      "options": [
        "Continuous Delivery runs unit tests, while Continuous Deployment skips testing",
        "Continuous Delivery requires a manual approval gate before deploying to production, whereas Continuous Deployment deploys to production automatically",
        "Continuous Delivery uses Docker containers, while Continuous Deployment only uses virtual machines",
        "Continuous Delivery happens once a month, while Continuous Deployment happens once a year"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Continuous Delivery automates deployment to staging and requires a manual approval click for production, while Continuous Deployment automates production releases completely[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831446318-18-c50p",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the CALMS framework for DevOps adoption, what does the letter \"L\" stand for?",
      "options": [
        "Logging",
        "Latency",
        "Lean",
        "Linux"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In the CALMS framework (Culture, Automation, Lean, Measurement, Sharing), Lean refers to minimizing work-in-progress, using small batch sizes, and reducing waste[cite: 55]."
    },
    {
      "id": "q-imp-1794831446318-19-b678",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which two underlying Linux kernel features enable Docker containers to achieve process isolation and resource limits?",
      "options": [
        "Hypervisors and Guest Kernels",
        "Namespaces and Control Groups (cgroups)",
        "Virtual NICs and Swap Partitions",
        "BIOS Virtualization and SAN Storage"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Linux Namespaces isolate what a process can see, while Control Groups (cgroups) limit CPU, RAM, and I/O resources[cite: 61]."
    },
    {
      "id": "q-imp-1794831446318-20-so13",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "When a Docker container starts, what does Docker add on top of the read-only stacked image layers?",
      "options": [
        "A secondary guest operating system kernel",
        "A thin, writable Container Layer for runtime modifications, temp files, and logs",
        "A hardware hypervisor translation layer",
        "An immutable backup snapshot"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Running a container adds a thin writable layer on top of the read-only image layers for runtime file modifications[cite: 61, 62]."
    },
    {
      "id": "q-imp-1794831446318-21-dx1f",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In a Dockerfile, how does `ENTRYPOINT` differ from `CMD`?",
      "options": [
        "`ENTRYPOINT` runs during `docker build`, while `CMD` runs during `docker push`",
        "`ENTRYPOINT` defines a fixed executable that cannot be easily overridden at runtime, whereas `CMD` provides default arguments or commands that can be overridden",
        "`ENTRYPOINT` sets environment variables, while `CMD` exposes network ports",
        "`ENTRYPOINT` is only valid on Windows containers, while `CMD` is for Linux"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `CMD` specifies a default command that can be overridden when launching a container, whereas `ENTRYPOINT` sets a fixed executable[cite: 63]."
    },
    {
      "id": "q-imp-1794831446318-22-y4gs",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the AWS Application Load Balancer (ALB) lab, why must you create at least two public subnets in different Availability Zones?",
      "options": [
        "Because an ALB cannot route traffic to EC2 instances inside a single subnet",
        "To ensure high availability so the load balancer can route traffic to a healthy zone if one physical data center zone experiences an outage",
        "Because AWS restricts each subnet to a maximum of one EC2 instance",
        "To separate inbound HTTP traffic from outbound HTTPS traffic"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS Application Load Balancers require at least two subnets across different Availability Zones to maintain high availability during a zone outage[cite: 73]."
    },
    {
      "id": "q-imp-1794831446318-23-x976",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, how is the EC2 Security Group (`flask-ec2-sg`) configured to prevent users from bypassing the load balancer?",
      "options": [
        "By blocking all outbound traffic from the EC2 instances",
        "By allowing inbound traffic on port 8000 strictly from the ALB Security Group (`flask-alb-sg`) rather than `0.0.0.0/0`",
        "By disabling auto-assign public IPv4 addresses on both subnets",
        "By configuring a Network ACL that blocks HTTP requests"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Restricting port 8000 inbound rules on `flask-ec2-sg` to accept traffic only from `flask-alb-sg` prevents direct access to the application port[cite: 74, 75]."
    },
    {
      "id": "q-imp-1794831446318-24-0iaq",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the AWS ALB lab, what is the role of the Target Group (`flask-api-tg`)?",
      "options": [
        "It translates private subnet IP addresses to public Internet addresses",
        "It acts as a registration inventory for backend servers, defining the routing port (8000) and health check endpoint (`/api/products`)",
        "It stores SSH private keys (`.pem`) for authenticating to Ubuntu instances",
        "It assigns static public DNS names to individual EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Target Group registers target instances on port 8000 and continuously probes health endpoints to manage traffic routing[cite: 80]."
    },
    {
      "id": "q-imp-1794831446318-25-aq7r",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, what happens if you try to delete resources out of order, such as deleting the VPC before detaching the Internet Gateway?",
      "options": [
        "AWS automatically deletes all dependent resources in the background",
        "Deletion will fail or be blocked because resources must be torn down in the reverse order of creation",
        "The EC2 instances are migrated to the default VPC",
        "The Internet Gateway is converted into a NAT Gateway"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud resource dependencies require resources to be deleted in the reverse order of creation[cite: 84]."
    },
    {
      "id": "q-imp-1794831446318-26-26u6",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In cloud architecture, what is the primary difference between Horizontal Scaling and Vertical Scaling?",
      "options": [
        "Horizontal scaling adds more CPU/RAM to a single server, while vertical scaling adds more server instances behind a load balancer",
        "Horizontal scaling adds more server instances in parallel behind a load balancer, while vertical scaling upgrades hardware resources on an existing single server",
        "Horizontal scaling always requires server downtime, while vertical scaling has zero downtime",
        "Vertical scaling has no upper hardware limit, while horizontal scaling is capped at 128 cores"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Horizontal scaling adds parallel nodes behind a load balancer, whereas vertical scaling upgrades a single server's hardware[cite: 88]."
    },
    {
      "id": "q-imp-1794831446318-27-jkwv",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "If a single VM has an availability SLA of 99.9%, what is the total system availability when deploying two independent VMs in parallel across separate Availability Zones?",
      "options": [
        "99.9%",
        "99.95%",
        "99.99%",
        "99.9999%"
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Simultaneous failure probability is $(1 - 0.999) \\times (1 - 0.999) = 0.000001$, yielding $1 - 0.000001 = 99.9999\\%$ availability[cite: 89]."
    },
    {
      "id": "q-imp-1794831446318-28-swd2",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In disaster recovery planning, what does Recovery Point Objective (RPO) measure?",
      "options": [
        "The maximum acceptable duration between a service outage and full restoration",
        "The maximum acceptable age of data that can be lost during a disaster (data loss window)",
        "The time required to provision a new virtual machine from a golden image",
        "The percentage of uptime guaranteed by a cloud service provider"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** RPO defines the maximum acceptable data loss window measured from the last backup point to when a disaster occurs[cite: 89]."
    },
    {
      "id": "q-imp-1794831446318-29-df08",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In a classic Three-Tier Cloud Architecture, how do backend servers in the Private Subnet (App Tier) download security patches from the internet without being directly reachable from the public internet?",
      "options": [
        "Through an Internet Gateway attached directly to the private subnet",
        "Through an outbound-only NAT Gateway located in the Public Subnet",
        "By temporarily assigning public IP addresses during maintenance windows",
        "Through an Application Load Balancer forwarding outbound requests"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Private subnet instances route outbound-only internet traffic for updates through a NAT Gateway in the public subnet[cite: 90]."
    },
    {
      "id": "q-imp-1794831446318-30-uuok",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does a Layer 4 Load Balancer differ from a Layer 7 Load Balancer?",
      "options": [
        "Layer 4 routes based on HTTP headers and URL paths, while Layer 7 routes based on IP address and TCP/UDP port",
        "Layer 4 routes at the transport layer (TCP/UDP) based on IP and port, while Layer 7 routes at the application layer (HTTP/HTTPS) based on URL paths, headers, and cookies",
        "Layer 4 supports health checks, while Layer 7 cannot detect unhealthy nodes",
        "Layer 4 is used exclusively for serverless functions, while Layer 7 is only for physical servers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Network Load Balancers (Layer 4) route transport-layer traffic by IP/port, while Application Load Balancers (Layer 7) inspect HTTP/HTTPS content[cite: 92]."
    },
    {
      "id": "q-imp-1794831446318-31-dpfx",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the purpose of a Cooldown Period in an Auto-Scaling Group?",
      "options": [
        "To allow physical servers to cool down after high CPU utilization",
        "To prevent rapid oscillations (\"flapping\") by pausing scaling actions while newly launched instances stabilize",
        "To delay health checks until a database finishes replicating",
        "To reduce cloud billing rates during off-peak hours"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A cooldown period pauses further scaling actions while new instances initialize, preventing rapid scale-out/scale-in oscillations[cite: 93]."
    },
    {
      "id": "q-imp-1794831446318-32-4e8z",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Under the Cloud Shared Responsibility Model for an IaaS service like Amazon EC2, which task is the customer's responsibility?",
      "options": [
        "Securing physical data center facilities with guards and biometrics",
        "Patching and maintaining the host virtualization hypervisor",
        "Applying guest operating system security patches and configuring network security groups",
        "Maintaining global backbone network cables and power generators"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "Customers are responsible for security \"IN\" the cloud, including OS patches, data encryption, and firewall rules[cite: 93, 94]."
    },
    {
      "id": "q-imp-1794831446318-33-orzk",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which AWS EC2 purchasing option provides discounts of up to 90% on spare compute capacity but can be reclaimed by AWS with a 2-minute warning?",
      "options": [
        "Reserved Instances",
        "On-Demand Instances",
        "Spot Instances",
        "Dedicated Hosts"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Spot Instances bid on unused AWS capacity for up to 90% savings, ideal for stateless batch jobs[cite: 97]."
    },
    {
      "id": "q-imp-1794831446318-34-9qjx",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How do AWS Security Groups differ from Network Access Control Lists (NACLs)?",
      "options": [
        "Security Groups operate at the subnet edge and are stateless, while NACLs operate at the instance level and are stateful",
        "Security Groups operate at the instance level and are stateful, while NACLs operate at the subnet edge and are stateless",
        "Security Groups support explicit deny rules, while NACLs only support allow rules",
        "Security Groups apply only to S3 buckets, while NACLs apply only to EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security Groups are stateful firewalls at the instance level, whereas NACLs are stateless rules evaluated sequentially at the subnet boundary[cite: 100]."
    },
    {
      "id": "q-imp-1794831446318-35-l6o6",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why is Amazon S3 unsuitable for installing and running a live operating system directly?",
      "options": [
        "Because S3 has a maximum object size limit of 64 TiB",
        "Because S3 is object storage that overwrites whole immutable objects via HTTP APIs rather than supporting in-place block modifications like EBS",
        "Because S3 offers only single-AZ durability",
        "Because S3 does not support encryption at rest"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "S3 is immutable object storage accessed via HTTP APIs, whereas operating systems require block storage supporting in-place block updates[cite: 100]."
    },
    {
      "id": "q-imp-1794831446318-36-vygs",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the maximum execution duration timeout for a single AWS Lambda function invocation?",
      "options": [
        "60 seconds",
        "5 minutes",
        "15 minutes",
        "1 hour"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS Lambda enforces a maximum execution timeout of 15 minutes per function invocation[cite: 102]."
    },
    {
      "id": "q-imp-1794831446318-37-9sk0",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Microsoft Azure's resource hierarchy, what is the purpose of a Resource Group?",
      "options": [
        "To manage compliance and policies across multiple subscriptions",
        "To act as a logical container grouping related resources that share the same lifecycle",
        "To serve as the fundamental billing boundary for an enterprise",
        "To provide a globally distributed NoSQL database engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Resource Groups are logical containers holding related resources that share a deployment lifecycle[cite: 103]."
    },
    {
      "id": "q-imp-1794831446318-38-evl5",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Azure Functions, what is the difference between a Trigger and a Binding?",
      "options": [
        "A Trigger defines what causes a function to execute, while a Binding provides declarative connections to input/output data sources without custom SDK boilerplate",
        "A Trigger schedules backups, while a Binding encrypts environment variables",
        "A Trigger scales the function outward, while a Binding limits memory usage",
        "A Trigger is used for HTTP requests, while a Binding is only used for Azure SQL Database"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "Triggers initiate function execution, whereas Bindings declaratively connect input and output data sources[cite: 104]."
    },
    {
      "id": "q-imp-1794831446318-39-vkke",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which pair of AWS and Azure services records every API call and user interaction for governance and security auditing?",
      "options": [
        "Amazon CloudWatch and Azure Monitor Metrics",
        "AWS CloudTrail and Azure Activity Log",
        "AWS X-Ray and Application Insights",
        "AWS Systems Manager and Azure Automation"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS CloudTrail and Azure Activity Log provide governance audit trails by logging API calls[cite: 105]."
    },
    {
      "id": "q-imp-1794831446318-40-ln21",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What major efficiency challenge plagued the Client-Server architecture era of the 1980s–1990s?",
      "options": [
        "Complete inability to connect client workstations to central databases",
        "Organizations had to purchase physical servers sized for peak seasonal capacity, resulting in 10–15% average utilization",
        "Lack of any local corporate data centers",
        "Mandatory pay-per-millisecond billing models"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Provisioning physical servers for peak seasonal demand left hardware idle most of the time, averaging 10–15% utilization[cite: 109]."
    },
    {
      "id": "q-imp-1794831446318-41-55dx",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which NIST essential cloud characteristic describes the provider dynamically assigning and reassigning physical and virtual resources across multiple consumers in a multi-tenant model?",
      "options": [
        "Broad Network Access",
        "Rapid Elasticity",
        "Resource Pooling",
        "Measured Service"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "Resource Pooling enables multi-tenant providers to dynamically allocate shared physical and virtual resources[cite: 113]."
    },
    {
      "id": "q-imp-1794831446318-42-zleu",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "How does cloud computing transform IT financial expenditure compared to traditional on-premises infrastructure?",
      "options": [
        "It shifts spending from variable Operational Expenditure (OpEx) to upfront Capital Expenditure (CapEx)",
        "It shifts spending from heavy upfront Capital Expenditure (CapEx) to variable pay-as-you-go Operational Expenditure (OpEx)",
        "It eliminates all operational costs once servers are provisioned",
        "It requires 5-year hardware depreciation schedules for virtual machines"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud computing replaces large upfront hardware investments with flexible monthly operational expenses[cite: 114, 117]."
    },
    {
      "id": "q-imp-1794831446318-43-mu2c",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In cloud global infrastructure terminology, what is an Availability Zone (AZ)?",
      "options": [
        "A single server rack inside a local corporate data center",
        "One or more discrete data centers with redundant power, networking, and cooling within a geographic Region",
        "An edge cache location deployed in metropolitan cities for CDN delivery",
        "An entire continent containing multiple cloud regions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Availability Zone consists of one or more physically separated data centers with independent infrastructure within a Region[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831446318-44-kir2",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which Google Cloud Platform (GCP) service is the direct counterpart to Amazon S3 and Azure Blob Storage for object storage?",
      "options": [
        "Persistent Disk",
        "Cloud Storage",
        "Cloud Bigtable",
        "Compute Engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Google Cloud Storage provides scalable object storage for unstructured data[cite: 116]."
    },
    {
      "id": "q-imp-1794831446318-45-4dk4",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the Cloud Service Delivery Models (IaaS, PaaS, SaaS), which layers does the customer manage when using Platform as a Service (PaaS)?",
      "options": [
        "Applications and Data only",
        "Operating System, Runtime, Middleware, Applications, and Data",
        "Virtualization, Servers, Storage, and Networking",
        "None; the cloud provider manages every layer including applications and data"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "** Under PaaS, the provider manages OS, runtime, middleware, and infrastructure, leaving the customer to manage Applications and Data[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446318-46-y729",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does a Type 1 (Bare-Metal) Hypervisor differ from a Type 2 (Hosted) Hypervisor?",
      "options": [
        "Type 1 runs on top of an existing host OS, whereas Type 2 runs directly on physical hardware",
        "Type 1 runs directly on bare physical server hardware for near-native speed, whereas Type 2 runs on top of a host OS",
        "Type 1 is used primarily on developer laptops, whereas Type 2 powers enterprise public clouds",
        "Type 1 relies on container namespaces, whereas Type 2 uses hardware virtualization"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Type 1 hypervisors run directly on bare-metal hardware with minimal overhead, while Type 2 hypervisors run atop a host OS[cite: 122]."
    },
    {
      "id": "q-imp-1794831446318-47-3gxn",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "During Live VM Migration (such as VMware vMotion), how is zero perceptible disconnection achieved for end users?",
      "options": [
        "By powering down the VM and shipping physical hard drives to the new host",
        "By mirroring memory pages across network links while the VM runs and transferring the final dirty page delta in milliseconds",
        "By converting the VM into a static Docker image before moving it",
        "By pausing all network traffic for 15 minutes during disk replication"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "Live migration mirrors active memory over the network while the VM runs, transferring the final dirty memory delta in milliseconds[cite: 123]."
    },
    {
      "id": "q-imp-1794831446318-48-ynet",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which cloud deployment strategy describes running normal baseline workloads on an on-premises private cloud and dynamically scaling into a public cloud during peak traffic spikes?",
      "options": [
        "Community Cloud",
        "Cloud Bursting in a Hybrid Cloud",
        "Multi-Cloud Vendor Arbitrage",
        "Bare-Metal Virtualization"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Hybrid cloud architectures enable \"cloud bursting,\" where baseline workloads stay on-premises and demand spikes overflow into the public cloud[cite: 124]."
    },
    {
      "id": "q-imp-1794831446318-49-7jrz",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is gRPC typically chosen over REST or SOAP for high-performance internal microservice communication?",
      "options": [
        "It uses human-readable XML envelopes over SMTP",
        "It uses multiplexed HTTP/2 streams and ultra-lightweight binary Protocol Buffers (Protobuf)",
        "It requires no schema definition and works exclusively over HTTP/1.0",
        "It runs directly inside web browsers without any proxy or translation layer"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** gRPC leverages HTTP/2 multiplexed streams and binary Protocol Buffers, making it significantly faster than text-based REST APIs[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831446318-50-nv3q",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which computing era, spanning the 1960s to 1970s, was characterized by centralized, monolithic mainframes and \"dumb terminals\" connected to a massive central processor with scheduled timesharing?",
      "options": [
        "Mainframe Computing Era[cite: 107]",
        "Client-Server Architecture[cite: 107]",
        "Cluster and Grid Computing[cite: 107]",
        "Utility Computing[cite: 107]"
      ],
      "answerIndex": 0,
      "answerUnverified": false,
      "explanation": "** The mainframe era (1960s-1970s) featured centralized monolithic systems like the IBM System/360 with dumb terminals[cite: 107]."
    },
    {
      "id": "q-imp-1794831446318-51-m12h",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "How does cloud computing transform IT financial expenditure compared to traditional on-premises data centers?",
      "options": [
        "It requires heavy upfront capital expenditure (CapEx) for physical server purchases[cite: 114].",
        "It replaces large upfront capital expenditures (CapEx) with flexible pay-as-you-go operational expenditures (OpEx)[cite: 114, 117].",
        "It eliminates all operating costs entirely once infrastructure is deployed[cite: 114].",
        "It mandates 5-year hardware depreciation schedules for virtual machines[cite: 114]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud computing shifts financial models from heavy upfront CapEx to variable, usage-based monthly OpEx[cite: 114, 117]."
    },
    {
      "id": "q-imp-1794831446318-52-dp0r",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which NIST essential characteristic of cloud computing refers to capabilities that can be elastically provisioned and released to scale outward or inward automatically according to demand?",
      "options": [
        "Broad Network Access[cite: 113]",
        "Resource Pooling[cite: 113]",
        "Rapid Elasticity[cite: 113, 114]",
        "Measured Service[cite: 113]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Rapid elasticity enables computing capabilities to scale dynamically to match fluctuating demand without manual intervention[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831446318-53-gcli",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "According to the cloud infrastructure market share overview in the course materials, what is the approximate market share percentage of Amazon Web Services (AWS)?",
      "options": [
        "25%[cite: 115]",
        "33%[cite: 115]",
        "31%[cite: 115]",
        "11%[cite: 115]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS holds approximately 31% of the cloud infrastructure market share[cite: 115]."
    },
    {
      "id": "q-imp-1794831446318-54-hj23",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In cloud global infrastructure, what is an Availability Zone (AZ)?",
      "options": [
        "An edge cache location deployed in metropolitan cities for CDN delivery[cite: 115, 117]",
        "One or more discrete data centers with redundant power, networking, and cooling within a geographic Region[cite: 115, 117]",
        "An entire continent containing multiple independent cloud providers[cite: 115]",
        "A single server rack inside a corporate on-premise data center[cite: 115]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Availability Zone consists of one or more physically separated data centers with independent infrastructure within a Region[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831446318-55-g08i",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the Cloud Service Delivery Models, who manages the operating system, runtime, middleware, applications, and data under the SaaS (Software as a Service) model?",
      "options": [
        "The customer[cite: 119]",
        "A third-party security auditor[cite: 119]",
        "The cloud provider[cite: 119]",
        "Shared equally between customer and provider[cite: 119]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** In SaaS, the cloud provider manages all underlying layers including applications, data, runtime, OS, and infrastructure[cite: 119]."
    },
    {
      "id": "q-imp-1794831446318-56-4si3",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which of the following is a classic example of a Type 1 (Bare-Metal) Hypervisor?",
      "options": [
        "Oracle VirtualBox[cite: 122]",
        "VMware Workstation[cite: 122]",
        "Parallels Desktop[cite: 122]",
        "VMware ESXi[cite: 122]"
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** VMware ESXi, Linux KVM, and Microsoft Hyper-V are Type 1 bare-metal hypervisors running directly on physical hardware[cite: 122]."
    },
    {
      "id": "q-imp-1794831446318-57-2kz5",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How does a Live VM Migration (such as VMware vMotion) ensure zero perceptible disconnection for end users?",
      "options": [
        "By shutting down the virtual machine and shipping physical hard drives to the new host[cite: 123]",
        "By mirroring memory pages across network links while the VM runs and transferring the final dirty memory delta in milliseconds[cite: 123]",
        "By pausing all network traffic for 10 minutes while disk snapshots copy[cite: 123]",
        "By converting the VM into a static Docker container before migration[cite: 123]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Live migration mirrors active memory over the network while the VM runs, transferring the final delta in milliseconds without downtime[cite: 123]."
    },
    {
      "id": "q-imp-1794831446318-58-me5g",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What cloud deployment strategy involves running normal baseline workloads on an on-premises private cloud and dynamically overflowing into a public cloud during unexpected traffic spikes?",
      "options": [
        "Community Cloud[cite: 124]",
        "Multi-Cloud Arbitrage[cite: 124]",
        "Cloud Bursting in a Hybrid Cloud[cite: 124]",
        "Bare-Metal Virtualization[cite: 124]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Hybrid cloud architectures enable \"cloud bursting\" to absorb peak capacity spikes in the public cloud[cite: 124]."
    },
    {
      "id": "q-imp-1794831446318-59-0t6o",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which web service communication standard uses HTTP/2 multiplexed streams and ultra-lightweight binary Protocol Buffers (Protobuf) for high-performance internal microservices?",
      "options": [
        "SOAP[cite: 125]",
        "REST[cite: 125]",
        "gRPC[cite: 125, 126]",
        "XML-RPC[cite: 125]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** gRPC relies exclusively on HTTP/2 and binary Protobuf serialization, making it up to 7-10x faster than REST[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831446318-60-q410",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In cloud scalability principles, why is Horizontal Scaling preferred over Vertical Scaling for modern web applications?",
      "options": [
        "Vertical scaling has a limitless hardware ceiling[cite: 88].",
        "Horizontal scaling provides practically limitless elastic capacity across commodity instances with zero downtime[cite: 88].",
        "Vertical scaling never requires restarting the server[cite: 88].",
        "Horizontal scaling uses monstrous physical servers that are cheaper[cite: 88]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Horizontal scaling avoids hardware ceilings and expensive monster instances, offering linear, cost-effective elasticity behind load balancers[cite: 88]."
    },
    {
      "id": "q-imp-1794831446318-61-vlws",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "If a cloud system has a target Availability SLA of 99.99% (Four 9s), what is the maximum permitted unscheduled downtime across an entire year?",
      "options": [
        "3.65 days[cite: 89]",
        "8.77 hours[cite: 89]",
        "52.60 minutes[cite: 89]",
        "5.26 minutes[cite: 89]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** An SLA of 99.99% permits a maximum of 52.60 minutes of downtime per year[cite: 89]."
    },
    {
      "id": "q-imp-1794831446318-62-vbzs",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In disaster recovery planning, what does Recovery Time Objective (RTO) define?",
      "options": [
        "The maximum acceptable age of data that can be lost during an outage[cite: 89]",
        "The maximum acceptable duration between a service outage and full system restoration[cite: 89]",
        "The duration required to perform a full weekly database backup[cite: 89]",
        "The time it takes for an auto-scaling group to launch a new virtual machine[cite: 89]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** RTO specifies the maximum allowable time window to restore system functionality after a disaster[cite: 89]."
    },
    {
      "id": "q-imp-1794831446318-63-opiq",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In a Three-Tier Cloud Architecture, which tier houses relational databases and caching clusters and is strictly isolated from external routing?",
      "options": [
        "Presentation / Web Tier[cite: 90]",
        "Application / Business Logic Tier[cite: 90]",
        "Data Tier[cite: 90]",
        "Public DMZ Tier[cite: 90]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The Data Tier is isolated in private subnets, accessible strictly by the application tier[cite: 90]."
    },
    {
      "id": "q-imp-1794831446318-64-zdsq",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary characteristic that distinguishes a Layer 7 Application Load Balancer from a Layer 4 Network Load Balancer?",
      "options": [
        "Layer 7 operates at the transport layer using TCP/UDP ports only[cite: 92].",
        "Layer 7 inspects application-layer content like HTTP headers, cookies, and URL paths to route traffic[cite: 92].",
        "Layer 7 cannot perform health checks on backend servers[cite: 92].",
        "Layer 7 is restricted to single-AZ deployments[cite: 92]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Layer 7 load balancers route traffic based on application-layer data (HTTP/HTTPS paths and headers)[cite: 92]."
    },
    {
      "id": "q-imp-1794831446318-65-yon7",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What triggers dynamic scaling in an Auto-Scaling Group?",
      "options": [
        "Pre-scheduled calendar events only[cite: 93]",
        "Real-time operational metrics such as CPU utilization exceeding a threshold or queue depth[cite: 93]",
        "Manual administrative intervention every time traffic changes[cite: 93]",
        "Random interval timers set by the cloud provider[cite: 93]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Dynamic scaling responds automatically to real-time performance metrics like CPU load or SQS queue depth[cite: 93]."
    },
    {
      "id": "q-imp-1794831446318-66-xfiy",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Where does an In-Memory Caching cluster like Redis typically sit in a cloud architecture to accelerate response times?",
      "options": [
        "Directly inside the client's web browser[cite: 93]",
        "In front of the relational database to cache frequent query results and session states[cite: 93]",
        "Inside the Internet Gateway router[cite: 93]",
        "On the local administrator's workstation[cite: 93]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Redis and Memcached sit between the application tier and the database to serve frequent queries in under 2 milliseconds[cite: 93]."
    },
    {
      "id": "q-imp-1794831446318-67-19kt",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Under the Cloud Shared Responsibility Model, which component is strictly the customer's responsibility when running an EC2 instance?",
      "options": [
        "Physical data center security guards and biometric scanners[cite: 94]",
        "Underlying host virtualization hypervisors[cite: 94]",
        "Guest operating system security patches, IAM credentials, and firewall rules[cite: 94]",
        "Global fiber-optic network backbone cables[cite: 94]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The customer is responsible for security \"IN\" the cloud, including OS patches, data encryption, IAM, and Security Groups[cite: 94]."
    },
    {
      "id": "q-imp-1794831446318-68-axmn",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which EC2 purchasing option provides physical servers dedicated entirely to a single customer for regulatory compliance or strict software licensing requirements?",
      "options": [
        "Spot Instances[cite: 97]",
        "On-Demand Instances[cite: 97]",
        "Reserved Instances[cite: 97]",
        "Dedicated Hosts[cite: 97]"
      ],
      "answerIndex": 3,
      "answerUnverified": false,
      "explanation": "** Dedicated Hosts provide physical hardware dedicated to a single account for specialized compliance or licensing needs[cite: 97]."
    },
    {
      "id": "q-imp-1794831446318-69-au8a",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the default remote access protocol and port used to manage a Windows EC2 instance?",
      "options": [
        "Secure Shell (SSH) over Port 22[cite: 97]",
        "Remote Desktop Protocol (RDP) over Port 3389[cite: 97]",
        "Hypertext Transfer Protocol (HTTP) over Port 80[cite: 97]",
        "Secure File Transfer Protocol (SFTP) over Port 21[cite: 97]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Windows EC2 instances use RDP over port 3389, whereas Linux instances use SSH over port 22[cite: 97]."
    },
    {
      "id": "q-imp-1794831446318-70-hf4l",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How do Network Access Control Lists (NACLs) differ from Security Groups in an AWS VPC?",
      "options": [
        "NACLs are stateful and operate at the instance level[cite: 100].",
        "NACLs are stateless and operate at the subnet boundary using numbered rules[cite: 100].",
        "NACLs automatically allow return traffic without explicit rules[cite: 100].",
        "NACLs cannot support explicit deny rules[cite: 100]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NACLs act as stateless firewall boundaries evaluated sequentially at the subnet level, unlike stateful Security Groups[cite: 100]."
    },
    {
      "id": "q-imp-1794831446318-71-z580",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the maximum single volume size supported by an Amazon EBS (Elastic Block Store) volume?",
      "options": [
        "5 TB[cite: 100]",
        "100 GB[cite: 100]",
        "Up to 64 TiB[cite: 100]",
        "10 PB[cite: 100]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Amazon EBS block storage supports individual volumes up to 64 TiB[cite: 100]."
    },
    {
      "id": "q-imp-1794831446318-72-11wo",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which S3 storage class is intended for long-term compliance archival storage where retrieval times range from minutes to 12 hours?",
      "options": [
        "S3 Standard[cite: 101]",
        "S3 Standard-IA[cite: 101]",
        "S3 Glacier Flexible Retrieval & Deep Archive[cite: 101]",
        "S3 Intelligent-Tiering[cite: 101]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** S3 Glacier Flexible Retrieval and Deep Archive provide ultra-low-cost archival storage with retrieval times from minutes to hours[cite: 101]."
    },
    {
      "id": "q-imp-1794831446318-73-lo9q",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the maximum execution duration timeout for a single AWS Lambda function invocation?",
      "options": [
        "60 seconds[cite: 102]",
        "5 minutes[cite: 102]",
        "15 minutes[cite: 102]",
        "2 hours[cite: 102]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS Lambda enforces a maximum execution timeout of 15 minutes per function invocation[cite: 102]."
    },
    {
      "id": "q-imp-1794831446318-74-gn3a",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Microsoft Azure's resource hierarchy, what serves as the fundamental billing and access boundary?",
      "options": [
        "Management Groups[cite: 103]",
        "Resource Groups[cite: 103]",
        "Subscriptions[cite: 103]",
        "Azure Resource Manager (ARM)[cite: 103]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Subscriptions act as the core administrative and billing boundary in Azure[cite: 103]."
    },
    {
      "id": "q-imp-1794831446318-75-fimu",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a key feature of Azure Cosmos DB?",
      "options": [
        "It is a legacy single-node relational database requiring manual sharding[cite: 103].",
        "It is a globally distributed, multi-model NoSQL database service offering single-digit millisecond latencies[cite: 103].",
        "It only supports SMB file share mountings for Windows[cite: 103].",
        "It requires local hypervisor virtualization to run[cite: 103]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Cosmos DB provides globally distributed, low-latency multi-model NoSQL data storage[cite: 103]."
    },
    {
      "id": "q-imp-1794831446318-76-mg89",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What storage mechanism does Azure Files provide?",
      "options": [
        "Block storage disks attached exclusively to virtual machines as local drives[cite: 104]",
        "Fully managed SMB and NFS cloud file shares mountable directly across Windows, Linux, and macOS[cite: 104]",
        "Immutable object storage with 11 nines of durability accessed only via REST APIs[cite: 104]",
        "In-memory Redis caching clusters[cite: 104]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Files offers fully managed SMB and NFS cloud file shares mountable by standard OS clients[cite: 104]."
    },
    {
      "id": "q-imp-1794831446318-77-shzm",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which AWS service records every API call and user action across your infrastructure for compliance and security auditing?",
      "options": [
        "Amazon CloudWatch[cite: 105]",
        "AWS CloudTrail[cite: 105]",
        "AWS X-Ray[cite: 105]",
        "Amazon Route 53[cite: 105]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS CloudTrail logs every API action, user, IP, and timestamp for auditing and governance[cite: 105]."
    },
    {
      "id": "q-imp-1794831446318-78-wkcp",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a primary cause of \"bill shock\" in cloud computing environments?",
      "options": [
        "Fixed monthly pricing models with zero variable fees[cite: 105]",
        "Unmonitored auto-scaling, orphaned test virtual machines, and unattached storage disks[cite: 105]",
        "Mandatory upfront hardware purchases[cite: 105]",
        "Free data egress across all regions[cite: 105]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Unmonitored resource sprawl and forgotten development environments are primary contributors to unexpected cloud bill shock[cite: 105]."
    },
    {
      "id": "q-imp-1794831446318-79-430u",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the AWS S3 and Lambda file-organizing lab, which file extensions are categorized under `Images/`?",
      "options": [
        "`.txt`, `.text`[cite: 1]",
        "`.pdf`, `.doc`, `.docx`[cite: 1]",
        "`.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp`, `.svg`, `.tif`, `.tiff`, `.ico`[cite: 1]",
        "`.zip`, `.json`, `.xml`, `.py`, `.mp4`[cite: 1]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** The lab specifies a wide array of image extensions including `.jpg`, `.png`, `.gif`, `.svg`, etc., under `Images/`[cite: 1]."
    },
    {
      "id": "q-imp-1794831446318-80-7bvk",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the S3 file-organizing lab architecture, what is the role of Amazon CloudWatch Logs?",
      "options": [
        "To store the original uploaded documents permanently[cite: 3]",
        "To record the Lambda function's execution output, prints, and any runtime errors[cite: 3]",
        "To manage S3 bucket versioning policies[cite: 3]",
        "To route incoming HTTP traffic from the user to S3[cite: 3]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CloudWatch Logs captures execution print statements and error logs generated during Lambda function runs[cite: 3]."
    },
    {
      "id": "q-imp-1794831446318-81-4rgg",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the S3 and Lambda lab prerequisites, why is no local Python installation or third-party package required for Lambda?",
      "options": [
        "Because Lambda runs exclusively in JavaScript[cite: 4]",
        "Because the Lambda runtime environment already supplies `boto3`, the AWS SDK for Python[cite: 4]",
        "Because AWS Lambda does not support Python functions[cite: 4]",
        "Because Lambda requires local EC2 instances to compile code[cite: 4]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The AWS Lambda Python runtime comes pre-equipped with `boto3`, eliminating the need for third-party packaging for standard tasks[cite: 4]."
    },
    {
      "id": "q-imp-1794831446318-82-eq2b",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What object ownership setting is configured when creating the S3 bucket in the file-organizing lab?",
      "options": [
        "ACLs enabled[cite: 4]",
        "ACLs disabled / Bucket owner enforced[cite: 4]",
        "Public read access enabled[cite: 4]",
        "Versioning enforced[cite: 4]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The lab instructs configuring \"ACLs disabled / Bucket owner enforced\" under Object Ownership[cite: 4]."
    },
    {
      "id": "q-imp-1794831446318-83-svs9",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the S3 file-organizing lab IAM inline policy, what does the resource ARN ending with `/*` signify?",
      "options": [
        "The policy applies to every S3 bucket in the entire AWS account[cite: 6, 7].",
        "The policy applies specifically to objects within the specified lab bucket, not every bucket in the account[cite: 6, 7].",
        "The policy grants administrative root access to EC2[cite: 6, 7].",
        "The policy disables all encryption on the bucket[cite: 6, 7]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Appending `/*` restricts the IAM policy permissions to objects inside that specific bucket rather than all buckets[cite: 6, 7]."
    },
    {
      "id": "q-imp-1794831446318-84-0kh3",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "When setting up the Flask lab on Windows, what command activates the local Python virtual environment in Command Prompt (CMD)?",
      "options": [
        "`source venv/bin/activate`[cite: 21]",
        "`.venv\\Scripts\\activate.bat`[cite: 21]",
        "`python -m activate`[cite: 21]",
        "`pip install venv`[cite: 21]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** On Windows CMD, virtual environments are activated using `.venv\\Scripts\\activate.bat`[cite: 21]."
    },
    {
      "id": "q-imp-1794831446318-85-fvl9",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which file is created in the Git and Flask lab to prevent local virtual environments, Python cache files, and editor settings from being tracked by Git?",
      "options": [
        "`Dockerfile`[cite: 23]",
        "`requirements.txt`[cite: 23]",
        "`.gitignore`[cite: 23]",
        "`app.py`[cite: 23]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** A `.gitignore` file excludes `.venv/`, `__pycache__/`, and `.vscode/` from being tracked[cite: 23]."
    },
    {
      "id": "q-imp-1794831446318-86-vevd",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which Git command unstages a file while keeping its edits intact in the working tree?",
      "options": [
        "`git restore app.py`[cite: 25]",
        "`git restore --staged app.py`[cite: 25]",
        "`git reset --hard HEAD`[cite: 25]",
        "`git commit -a`[cite: 25]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git restore --staged app.py` removes the file from the staging area while preserving its working tree modifications[cite: 25]."
    },
    {
      "id": "q-imp-1794831446318-87-jrqs",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the purpose of the `-u` flag when running `git push -u origin main`?",
      "options": [
        "It forces an overwrite of the remote repository history[cite: 28, 29].",
        "It sets upstream tracking for the main branch so subsequent pushes and pulls can omit remote and branch names[cite: 28, 29].",
        "It deletes the remote branch after pushing[cite: 28, 29].",
        "It encrypts the commit history using SSH keys[cite: 28, 29]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-u` (upstream) flag links the local branch to the remote tracking branch for simplified future pushes and pulls[cite: 28, 29]."
    },
    {
      "id": "q-imp-1794831446318-88-9yto",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What does `git fetch --prune origin` accomplish?",
      "options": [
        "It deletes all local commit history permanently[cite: 30].",
        "It removes stale local remote-tracking references for branches that have already been deleted on GitHub[cite: 30].",
        "It forces a merge conflict resolution[cite: 30].",
        "It pushes local changes to origin immediately[cite: 30]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--prune` cleans up local references to remote branches that no longer exist on GitHub[cite: 30]."
    },
    {
      "id": "q-imp-1794831446318-89-6a49",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "When a Git merge conflict occurs due to simultaneous edits on the same line, how does Git indicate the conflict inside the file?",
      "options": [
        "By deleting the file automatically[cite: 27, 50]",
        "By inserting conflict markers like `<<<<<<< HEAD`, `=======`, and `>>>>>>>`[cite: 27, 50]",
        "By throwing a fatal syntax error and aborting Python execution[cite: 27, 50]",
        "By appending `.conflict` to the filename[cite: 27, 50]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Git annotates conflicting files with conflict markers separating the current branch changes from the incoming branch changes[cite: 27, 50]."
    },
    {
      "id": "q-imp-1794831446318-90-wxoh",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the Dockerfile created for the Flask lab, what does the instruction `ENV PYTHONDONTWRITEBYTECODE=1` do?",
      "options": [
        "It compiles all Python files into binary executables[cite: 37].",
        "It prevents Python from writing `.pyc` bytecode files to disk inside the container[cite: 37].",
        "It disables Python error logging[cite: 37].",
        "It upgrades pip automatically[cite: 37]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `PYTHONDONTWRITEBYTECODE=1` stops Python from generating unnecessary `.pyc` files in container layers[cite: 37]."
    },
    {
      "id": "q-imp-1794831446318-91-z0n2",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which Docker command is used to view detailed configuration and metadata for a running container like `flask-api`?",
      "options": [
        "`docker logs flask-api`[cite: 38, 41]",
        "`docker ps -a`[cite: 38, 41]",
        "`docker inspect flask-api`[cite: 38, 41]",
        "`docker exec flask-api`[cite: 38, 41]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `docker inspect` outputs detailed low-level configuration data for containers or images[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446318-92-t61b",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "According to the Student Assessment Checklist in the Git/Docker lab, what is the normal day-to-day workflow cycle?",
      "options": [
        "Write code directly in production and reboot the server[cite: 43].",
        "Update local main, create feature branch, edit/test API, commit, push, open PR, merge, and test container[cite: 43].",
        "Push code to Docker Hub without version control[cite: 43].",
        "Run manual SSH scripts daily without version tracking[cite: 43]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The standard engineering cycle involves branching, testing, committing, pushing, opening PRs, merging, and containerizing[cite: 43]."
    },
    {
      "id": "q-imp-1794831446318-93-wf0e",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, what is the purpose of selecting the IPv4 CIDR block `10.0.0.0/16` for the custom VPC?",
      "options": [
        "It provides exactly 256 public IP addresses[cite: 72].",
        "It provides 65,536 private IP addresses ranging from `10.0.0.0` to `10.0.255.255`[cite: 72].",
        "It restricts network traffic exclusively to IPv6 addresses[cite: 72].",
        "It connects the VPC directly to the public internet without an Internet Gateway[cite: 72]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A `/16` CIDR block provides a total of 65,536 private IP addresses for the VPC[cite: 72]."
    },
    {
      "id": "q-imp-1794831446318-94-kijr",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the AWS ALB lab, why must you enable \"Auto-assign public IPv4 address\" on the public subnets?",
      "options": [
        "So the subnets can route traffic to internal databases[cite: 73]",
        "So that EC2 instances launched inside those public subnets receive a public IPv4 address for SSH administration[cite: 73]",
        "To disable Security Groups entirely[cite: 73]",
        "To allow the Application Load Balancer to bypass subnets[cite: 73]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Enabling auto-assign public IPv4 ensures launched instances get public IPs for administrative access[cite: 73]."
    },
    {
      "id": "q-imp-1794831446318-95-r7i4",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of an Internet Gateway (IGW) attached to a VPC?",
      "options": [
        "It acts as a relational database storage engine[cite: 73, 74].",
        "It provides bi-directional network address translation (NAT) between private subnet IP addresses and public internet addresses[cite: 73, 74].",
        "It executes Lambda functions serverless-style[cite: 73, 74].",
        "It replaces the need for Route Tables[cite: 73, 74]."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Internet Gateway routes traffic between the VPC subnets and the public internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831446318-96-xvml",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab route table configuration, what destination route is added to direct external traffic out through the Internet Gateway?",
      "options": [
        "`10.0.0.0/16`[cite: 74]",
        "`0.0.0.0/0` targeted to the Internet Gateway[cite: 74]",
        "`127.0.0.1/32`[cite: 74]",
        "`192.168.1.1/24`[cite: 74]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A route for `0.0.0.0/0` pointing to the Internet Gateway directs all external internet traffic correctly[cite: 74]."
    },
    {
      "id": "q-imp-1794831446318-97-j6xr",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What private key file format is recommended when creating an EC2 Key Pair for Windows users leveraging built-in OpenSSH or Git Bash?",
      "options": [
        "`.ppk`[cite: 76]",
        "`.pem`[cite: 76]",
        "`.exe`[cite: 76]",
        "`.docx`[cite: 76]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `.pem` format works directly with Windows PowerShell OpenSSH, Git Bash, and EC2 Instance Connect[cite: 76]."
    },
    {
      "id": "q-imp-1794831446318-98-amue",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the AWS ALB lab, how is the Flask REST API launched inside the Ubuntu EC2 instance in the background using Gunicorn?",
      "options": [
        "`python app.py`[cite: 79]",
        "`nohup gunicorn -w 2 -b 0.0.0.0:8000 app:app > app.log 2>&1 &`[cite: 79]",
        "`docker run flask-api`[cite: 79]",
        "`flask run --host=localhost`[cite: 79]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Gunicorn is launched with `nohup` bound to `0.0.0.0:8000` to keep running in the background and log output[cite: 79]."
    },
    {
      "id": "q-imp-1794831446318-99-eo5g",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "During AWS ALB target group verification, what success response code is configured for health checks to confirm target instances are healthy?",
      "options": [
        "HTTP 404[cite: 80, 82]",
        "HTTP 500[cite: 80, 82]",
        "HTTP 200[cite: 80, 82]",
        "HTTP 301[cite: 80, 82]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Success codes are set to `200` so that the ALB considers target instances healthy when they return an HTTP 200 OK[cite: 80, 82]."
    },
    {
      "id": "q-imp-1794831446318-100-p73k",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary function of a Content Delivery Network (CDN) like Amazon CloudFront in cloud architecture?",
      "options": [
        "To manage relational database failovers across regions",
        "To cache static and dynamic assets geographically close to users to minimize latency[cite: 87]",
        "To execute serverless event-driven Python functions",
        "To provision Docker containers on EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CDNs cache web content at edge locations worldwide to reduce network latency and server load[cite: 87]."
    },
    {
      "id": "q-imp-1794831446318-101-gu7a",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Under the Cloud Shared Responsibility Model, who is responsible for configuring Network Security Groups and firewall rules?",
      "options": [
        "The cloud provider exclusively",
        "The customer[cite: 93, 94]",
        "The hardware hypervisor manufacturer",
        "Third-party CDN providers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Network security groups and firewall rules fall entirely under customer responsibility as part of security \"IN\" the cloud[cite: 93, 94]."
    },
    {
      "id": "q-imp-1794831446318-102-whzm",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which cloud computing model offers raw compute, storage disks, and virtual networks while leaving operating system and application management to the customer?",
      "options": [
        "SaaS (Software as a Service)[cite: 119, 120]",
        "PaaS (Platform as a Service)[cite: 119, 120]",
        "IaaS (Infrastructure as a Service)[cite: 119, 120]",
        "FaaS (Function as a Service)[cite: 119, 120]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** IaaS provides virtualized hardware infrastructure, requiring the customer to manage OS patches and runtimes[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446318-103-plpa",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the main operational advantage of using an open-source database engine like PostgreSQL on the cloud rather than proprietary vendor-locked databases?",
      "options": [
        "It guarantees zero network latency.",
        "It reduces vendor lock-in and migration barriers[cite: 125].",
        "It eliminates the need for any backups.",
        "It runs entirely without a virtual network."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Standard open-source engines minimize vendor lock-in, making it easier to migrate or run across multi-cloud environments[cite: 125]."
    },
    {
      "id": "q-imp-1794831446318-104-tyc1",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the context of database management systems, what is a Read Replica used for?",
      "options": [
        "To process write transactions exclusively",
        "To scale read query performance by maintaining an asynchronous copy of the primary database[cite: 90]",
        "To store static images and logs",
        "To replace application load balancers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Read replicas handle read-heavy traffic by asynchronously replicating data from the primary database instance[cite: 90]."
    },
    {
      "id": "q-imp-1794831446318-105-so2f",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Why should developers never commit sensitive secrets, such as API keys or database passwords, to a public or private Git repository?",
      "options": [
        "Because Git automatically deletes files larger than 1 MB.",
        "Because exposed credentials can be scraped and exploited by attackers, compromising security[cite: 53].",
        "Because Flask applications will fail to compile.",
        "Because Dockerfiles cannot build images containing secrets."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Committing secrets to version control risks exposure, even in private repositories, prompting the use of environment variables or secret managers[cite: 53]."
    },
    {
      "id": "q-imp-1794831446318-106-jz11",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the purpose of `.dockerignore` when building Docker images?",
      "options": [
        "To ignore Python syntax errors",
        "To prevent unnecessary local files (like `.git/`, `.venv/`, and cache files) from being sent to the Docker build context[cite: 36]",
        "To specify which database ports to open",
        "To automatically push images to Docker Hub"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `.dockerignore` excludes unwanted local files from the build context, optimizing build times and image security[cite: 36]."
    },
    {
      "id": "q-imp-1794831446318-107-46ps",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Git, what does the command `git log --oneline --graph --all` display?",
      "options": [
        "A flat list of all modified files in the working directory",
        "A compact, graphical representation of commit histories across all branches[cite: 26, 48]",
        "The exact diff of staged changes",
        "The remote repository URL history"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** This command visualizes the branch and commit topology compactly using text-based graphs[cite: 26, 48]."
    },
    {
      "id": "q-imp-1794831446318-108-gmn9",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of an Application Load Balancer's default action in a listener configuration?",
      "options": [
        "It encrypts all traffic using SSH keys.",
        "It specifies where incoming requests on a given port should be forwarded (e.g., to a Target Group)[cite: 81]",
        "It terminates the VPC network.",
        "It scales the Auto-Scaling group automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Listener rules define how the load balancer handles incoming requests, routing them to target groups via actions like forwarding[cite: 81]."
    },
    {
      "id": "q-imp-1794831446318-109-aduq",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which AWS compute option provides a fully managed web application platform (PaaS) where developers deploy code without managing underlying servers or scaling?",
      "options": [
        "Amazon EC2[cite: 102]",
        "Amazon ECS[cite: 102]",
        "AWS Elastic Beanstalk[cite: 102]",
        "AWS Lambda[cite: 102]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Elastic Beanstalk is a PaaS offering that handles deployment details, capacity provisioning, and load balancing automatically[cite: 102]."
    },
    {
      "id": "q-imp-1794831446318-110-35iy",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary purpose of a Database Migration script in an application deployment lifecycle?",
      "options": [
        "To move files from S3 to local storage",
        "To programmatically update database schemas, tables, and records safely across environments[cite: 79]",
        "To scale Docker containers horizontally",
        "To convert Python code into binary executables"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Database migration tools (like Flask-Migrate or Alembic) manage and apply schema changes reliably across deployments[cite: 79]."
    },
    {
      "id": "q-imp-1794831446318-111-k2g0",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Python Flask development, what is the purpose of the `jsonify()` function?",
      "options": [
        "To compress Python scripts into zip files",
        "To serialize Python dictionaries or lists into formatted JSON HTTP responses with appropriate headers[cite: 22]",
        "To connect directly to SQLite databases",
        "To parse incoming command-line arguments"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `jsonify()` constructs a response object with an application/json mimetype containing the serialized JSON data[cite: 22]."
    },
    {
      "id": "q-imp-1794831446318-112-fbt1",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Why is SQLite typically used in introductory web development labs rather than enterprise databases like PostgreSQL or Oracle?",
      "options": [
        "Because SQLite supports distributed multi-region sharding.",
        "Because it is a lightweight, file-based database requiring zero complex server configuration or external service setup[cite: 79].",
        "Because SQLite provides 11 nines of data durability.",
        "Because SQLite cannot run inside Docker containers."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SQLite stores data in a single local file, making it exceptionally easy to set up for local development and introductory labs[cite: 79]."
    },
    {
      "id": "q-imp-1794831446318-113-jiqr",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What does a non-fast-forward Git push rejection protect against?",
      "options": [
        "Syntax errors in Python source code",
        "Overwriting someone else's committed work on the remote repository without integrating it first[cite: 33, 42]",
        "Exceeding S3 storage quotas",
        "Invalid AWS IAM credentials"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Rejecting non-fast-forward pushes prevents developers from silently overwriting remote commits that are missing from their local history[cite: 33, 42]."
    },
    {
      "id": "q-imp-1794831446318-114-3mtd",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Docker, what command displays all containers, including both active running containers and stopped containers?",
      "options": [
        "`docker ps`[cite: 41]",
        "`docker ps -a`[cite: 41]",
        "`docker images`[cite: 41]",
        "`docker container list`[cite: 41]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-a` flag instructs `docker ps` to list all container instances regardless of their current running state[cite: 41]."
    },
    {
      "id": "q-imp-1794831446318-115-lmvi",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which tool or service is typically used for distributed tracing across microservice call chains to detect performance bottlenecks?",
      "options": [
        "AWS CloudTrail[cite: 105]",
        "Amazon S3[cite: 105]",
        "AWS X-Ray / Application Insights[cite: 105]",
        "AWS IAM[cite: 105]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Application performance monitoring tools like AWS X-Ray and Azure Application Insights track requests across microservices[cite: 105]."
    },
    {
      "id": "q-imp-1794831446318-116-3kiy",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the fundamental difference between a public subnet and a private subnet inside an AWS VPC?",
      "options": [
        "Public subnets have more CPU power than private subnets.",
        "Public subnets have a route table pointing to an Internet Gateway, whereas private subnets do not have direct inbound internet routes[cite: 74, 99].",
        "Public subnets cannot run Linux EC2 instances.",
        "Private subnets are managed exclusively by Azure."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public subnets communicate directly with the public internet via an Internet Gateway, while private subnets are isolated[cite: 74, 99]."
    },
    {
      "id": "q-imp-1794831446318-117-dorm",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of an AWS NAT Gateway?",
      "options": [
        "To host public web applications",
        "To enable instances in a private subnet to initiate outbound internet traffic (such as package updates) while preventing unrequested inbound traffic[cite: 90, 99]",
        "To translate domain names into IP addresses",
        "To balance load across Availability Zones"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A NAT Gateway provides secure, outbound-only internet connectivity for private subnet resources[cite: 90, 99]."
    },
    {
      "id": "q-imp-1794831446318-118-90ky",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Git collaboration workflows, what does a Pull Request (PR) represent?",
      "options": [
        "A command executed in the terminal to download remote branches",
        "A web-based GitHub review mechanism to propose, review, and discuss code changes before merging them into a target branch[cite: 35, 50]",
        "An automated script that deletes conflicting files",
        "A local merge conflict resolution tool"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Pull requests provide a platform for code review and discussion before merging feature branches into production[cite: 35, 50]."
    },
    {
      "id": "q-imp-1794831446318-119-4xim",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which command downloads remote repository history and ref references without automatically merging or modifying your current local branch?",
      "options": [
        "`git pull`[cite: 30, 51]",
        "`git fetch`[cite: 30, 51]",
        "`git clone`[cite: 30, 51]",
        "`git push`[cite: 30, 51]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git fetch` downloads remote updates safely without altering your working tree or current branch state[cite: 30, 51]."
    },
    {
      "id": "q-imp-1794831446318-120-4e7b",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What happens during a Docker build process when a Dockerfile instruction (such as `COPY requirements.txt .`) has not changed since the last build?",
      "options": [
        "Docker throws a build error.",
        "Docker reuses the cached layer instantly, speeding up the build time.",
        "Docker deletes the previous image automatically.",
        "Docker downloads the layer from Docker Hub."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker utilizes layer caching, skipping steps whose instructions and context files remain identical to previous builds[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831446318-121-xwoh",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Why is it a security risk to store database passwords or cloud deployment tokens inside source code files?",
      "options": [
        "Because Python interpreters cannot read plain text passwords.",
        "Because anyone with access to the source code or repository history can extract and abuse those credentials[cite: 16, 23].",
        "Because Git automatically encrypts all source files.",
        "Because Docker containers refuse to run code containing passwords."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Hardcoding secrets in source code risks accidental exposure through version control history or unauthorized repository access[cite: 16, 23]."
    },
    {
      "id": "q-imp-1794831446319-122-udkb",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary benefit of containerization over traditional hardware virtualization (Virtual Machines)?",
      "options": [
        "Containers require a full independent guest operating system for each instance.",
        "Containers share the host OS kernel, resulting in instantaneous startup times, minimal resource overhead, and high density[cite: 60].",
        "Containers can only run on Windows operating systems.",
        "Containers eliminate the need for any network configuration."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** By sharing the host kernel rather than running a full guest OS, containers achieve lightweight and rapid execution[cite: 60]."
    },
    {
      "id": "q-imp-1794831446319-123-0jfv",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the DevOps lifecycle, what stage immediately follows coding and precedes deployment?",
      "options": [
        "Requirements backlog grooming",
        "Build and Automated Testing (CI)[cite: 57, 59]",
        "Customer feedback surveys",
        "Physical server procurement"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** After writing code, the next phases involve building artifacts, compiling packages, and executing automated tests[cite: 57, 59]."
    },
    {
      "id": "q-imp-1794831446319-124-j9r7",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does MTTR stand for in the context of DevOps measurement metrics?",
      "options": [
        "Maximum Transfer Time Rate",
        "Memory Tier Traffic Response",
        "Mean Time to Recovery (or Mean Time to Repair)[cite: 55]",
        "Multi-Tenant Transfer Routine"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** MTTR measures how quickly an organization can recover from system failures or production outages[cite: 55]."
    },
    {
      "id": "q-imp-1794831446319-125-f9w3",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which cloud service provider pioneered commercial cloud computing in 2006 with the launch of S3 and EC2?",
      "options": [
        "Microsoft Azure[cite: 112]",
        "Google Cloud Platform[cite: 112]",
        "Amazon Web Services (AWS)[cite: 112]",
        "DigitalOcean[cite: 112]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Amazon Web Services pioneered modern public cloud computing by launching S3 and EC2 in 2006[cite: 112]."
    },
    {
      "id": "q-imp-1794831446319-126-kviw",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS IAM (Identity and Access Management) Role?",
      "options": [
        "To encrypt S3 buckets at rest",
        "To provide temporary, secure permissions and access policies that can be assumed by AWS services (like Lambda) or users[cite: 7, 116]",
        "To manage DNS routing records",
        "To balance HTTP traffic across EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IAM roles grant temporary, least-privilege permissions to AWS resources and applications without embedding static keys[cite: 7, 116]."
    },
    {
      "id": "q-imp-1794831446319-127-wmt8",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the context of S3 storage, what does \"11 nines of durability\" (`99.999999999%`) mean?",
      "options": [
        "The system will never experience network latency above 11 milliseconds.",
        "The probability of losing stored data is exceptionally infinitesimal, equating to an average expectation of losing 1 object out of 100 billion over millions of years[cite: 100].",
        "Files can be up to 11 terabytes in size.",
        "Buckets must be replicated across 11 distinct global regions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Eleven nines of durability signifies extreme reliability and data persistence against permanent loss[cite: 100]."
    },
    {
      "id": "q-imp-1794831446319-128-fi07",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is a \"Cold Start\" in serverless computing architectures like AWS Lambda?",
      "options": [
        "The time it takes to boot a physical server data center after a power outage",
        "The brief initialization latency experienced when a cloud provider provisions a new micro-VM container for a function after an idle period[cite: 102]",
        "The time required to restore a database from a cold backup",
        "The cooling downtime required by CPU cores under heavy load"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A cold start occurs when serverless functions initialize execution environments upon invocation following a period of inactivity[cite: 102]."
    },
    {
      "id": "q-imp-1794831446319-129-4o0t",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which Azure service corresponds functionally to Amazon S3 for storing massive amounts of unstructured object data?",
      "options": [
        "Azure Files[cite: 104]",
        "Azure Blob Storage[cite: 104]",
        "Azure SQL Database[cite: 104]",
        "Azure Queue Storage[cite: 104]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Blob Storage is Azure's massively scalable object storage solution for unstructured data[cite: 104]."
    },
    {
      "id": "q-imp-1794831446319-130-9vgh",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of a Kusto Query Language (KQL) in Azure?",
      "options": [
        "To provision virtual machines using Infrastructure as Code",
        "To query and analyze large volumes of log and telemetry data inside Azure Log Analytics[cite: 105]",
        "To configure load balancer target groups",
        "To manage Kubernetes container orchestration clusters"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** KQL is a powerful expressive query language used to search and analyze telemetry data in Azure Monitor[cite: 105]."
    },
    {
      "id": "q-imp-1794831446319-131-yqzn",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which cloud computing deployment model is shared among several organizations with common security, policy, or regulatory missions?",
      "options": [
        "Public Cloud[cite: 124]",
        "Private Cloud[cite: 124]",
        "Community Cloud[cite: 124]",
        "Hybrid Cloud[cite: 124]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** A community cloud model serves specialized organizations sharing mutual concerns, compliance, or research objectives[cite: 124]."
    },
    {
      "id": "q-imp-1794831446319-132-zwxb",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary risk of adopting proprietary vendor-specific cloud APIs and serverless workflows?",
      "options": [
        "Enhanced hardware performance",
        "Severe vendor lock-in, making future migration to alternative clouds or on-premise infrastructure complex and expensive[cite: 125]",
        "Elimination of all security vulnerabilities",
        "Instant reduction in monthly cloud bills"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Proprietary services bind architectures tightly to a single provider, raising barriers and costs for future migration[cite: 125]."
    },
    {
      "id": "q-imp-1794831446319-133-d4p6",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In web service communication, what is the data format exclusively mandated by SOAP (Simple Object Access Protocol)?",
      "options": [
        "JSON[cite: 125]",
        "Protocol Buffers (Protobuf)[cite: 125]",
        "Strict XML[cite: 125]",
        "Plain text CSV[cite: 125]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** SOAP relies strictly on rigid XML envelopes and schemas for message transmission[cite: 125]."
    },
    {
      "id": "q-imp-1794831446319-134-rno4",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary benefit of Serverless architectures (like AWS Lambda) regarding billing economics?",
      "options": [
        "Fixed monthly subscription fees regardless of usage",
        "Pure pay-per-execution pricing with zero cost when idle (scales to zero)[cite: 91, 102]",
        "Higher costs offset by permanent VM allocation",
        "Mandatory upfront reservation fees for 3 years"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Serverless computing charges strictly for compute duration and memory consumed, dropping to zero cost when inactive[cite: 91, 102]."
    },
    {
      "id": "q-imp-1794831446319-135-hu3o",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Amazon EC2 terminology, what does AMI stand for?",
      "options": [
        "Automated Managed Instance",
        "Amazon Machine Image[cite: 97]",
        "Application Migration Interface",
        "Advanced Memory Index"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An AMI is a templated virtual appliance containing the OS and software configurations needed to launch an EC2 instance[cite: 97]."
    },
    {
      "id": "q-imp-1794831446319-136-b50i",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which virtualization component intercepts guest OS hardware instructions and allocates physical CPU, memory, and I/O?",
      "options": [
        "An Internet Gateway",
        "A Hypervisor (Virtual Machine Monitor)[cite: 122]",
        "A Container Registry",
        "A Route Table"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The hypervisor acts as the abstraction layer managing physical hardware allocation across concurrent virtual machines[cite: 122]."
    },
    {
      "id": "q-imp-1794831446319-137-xrve",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the main security purpose of keeping cloud S3 buckets private and blocking public access?",
      "options": [
        "To increase the upload speed of large video files",
        "To prevent unauthorized external users from reading or stealing sensitive corporate data[cite: 4]",
        "To comply with Kubernetes networking rules",
        "To reduce object storage billing rates"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Keeping buckets private prevents data breaches and unauthorized public access to confidential documents[cite: 4]."
    },
    {
      "id": "q-imp-1794831446319-138-q427",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In Python, what does `os.path.splitext(\"report.PDF\")` return?",
      "options": [
        "`(\"report.PDF\", \"\")`",
        "`(\"report\", \".PDF\")`[cite: 11]",
        "`(\".PDF\", \"report\")`",
        "`(\"report\", \"PDF\")`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `os.path.splitext()` splits a filename path into a tuple containing the root name and the extension[cite: 11]."
    },
    {
      "id": "q-imp-1794831446319-139-ooib",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is `git push --force` discouraged as a routine solution to a rejected push in team environments?",
      "options": [
        "Because it deletes the local repository entirely.",
        "Because it forcefully overwrites remote history, potentially destroying commits and work contributed by teammates[cite: 34].",
        "Because it converts Git into a centralized VCS.",
        "Because it requires administrator access on local Windows machines."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Force-pushing discards remote commits blindly, leading to lost work and broken collaboration histories[cite: 34]."
    },
    {
      "id": "q-imp-1794831446319-140-athn",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of the `FROM` instruction in a Dockerfile?",
      "options": [
        "It copies source code from the host machine into the container.",
        "It specifies the parent base image (such as Python or Node.js) upon which subsequent instructions build[cite: 37, 63].",
        "It opens network ports on the host.",
        "It executes unit tests during build time."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `FROM` establishes the foundational base image for building custom container layers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446319-141-4a7u",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In AWS VPC networking, what does CIDR stand for?",
      "options": [
        "Centralized Internet Data Route",
        "Classless Inter-Domain Routing[cite: 72]",
        "Cloud Infrastructure Directory Record",
        "Container Instance Definition Rule"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CIDR notation defines IP address ranges and subnet masks in network engineering[cite: 72]."
    },
    {
      "id": "q-imp-1794831446319-142-pi01",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which AWS database service provides fully managed MySQL and PostgreSQL relational engines with automated backups and scaling?",
      "options": [
        "Amazon DynamoDB[cite: 116]",
        "Amazon RDS (Relational Database Service)[cite: 116]",
        "Amazon S3[cite: 116]",
        "Amazon CloudFront[cite: 116]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Amazon RDS simplifies relational database administration, patching, backups, and scaling in the cloud[cite: 116]."
    },
    {
      "id": "q-imp-1794831446319-143-x3s2",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary function of Azure Resource Manager (ARM)?",
      "options": [
        "To manage Linux container namespaces",
        "To serve as the unified deployment and management layer processing all Azure API requests[cite: 103]",
        "To host static web pages on GitHub",
        "To execute automated unit tests in CI/CD pipelines"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ARM handles all resource creation, updates, and deletions across Azure subscriptions programmatically[cite: 103]."
    },
    {
      "id": "q-imp-1794831446319-144-ouk2",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In cloud governance, what is a Management Group in Azure used for?",
      "options": [
        "Managing single virtual machine disk partitions",
        "Applying governance, compliance policies, and access controls across multiple subscriptions[cite: 103]",
        "Storing user authentication passwords",
        "Balancing incoming HTTP traffic"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Management groups provide hierarchical scoping for governance and policy enforcement across multiple subscriptions[cite: 103]."
    },
    {
      "id": "q-imp-1794831446319-145-20gm",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What feature distinguishes a Type 2 Hypervisor from a Type 1 Hypervisor regarding operating systems?",
      "options": [
        "Type 2 runs directly on bare metal without any OS.",
        "Type 2 runs on top of an existing host operating system, whereas Type 1 runs directly on bare-metal hardware[cite: 122].",
        "Type 2 supports containerization while Type 1 cannot.",
        "Type 2 is used exclusively in enterprise cloud data centers."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Hosted hypervisors (Type 2) require an underlying host OS, introducing virtualization scheduling latency[cite: 122]."
    },
    {
      "id": "q-imp-1794831446319-146-6msy",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why are URL-encoded object keys common in S3 event notifications?",
      "options": [
        "To encrypt file contents using SSL certificates",
        "To ensure spaces and special characters in filenames are safely transmitted via HTTP URLs (e.g., representing spaces as `+` or `%20`)[cite: 12]",
        "To convert PDF files into plain text",
        "To compress file sizes prior to uploading"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 event notifications encode special characters and spaces in object keys, requiring URL-decoding in application logic[cite: 12]."
    },
    {
      "id": "q-imp-1794831446319-147-va2r",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In the Git version control system, what is a \"branch\"?",
      "options": [
        "A physical backup copy of the entire project stored on GitHub",
        "A lightweight, movable pointer to a specific commit snapshot[cite: 26, 48]",
        "An automated script that compiles Python code",
        "A locked storage directory in the `.git` folder"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Branches in Git are inexpensive pointers to specific commits, enabling isolated feature development[cite: 26, 48]."
    },
    {
      "id": "q-imp-1794831446319-148-2dnn",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the purpose of the `WORKDIR` instruction in a Dockerfile?",
      "options": [
        "It downloads application code from GitHub.",
        "It sets the working directory inside the container for any subsequent `RUN`, `COPY`, or `CMD` instructions[cite: 37, 63].",
        "It defines container environment variables.",
        "It compiles C++ libraries."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `WORKDIR` establishes the active directory context inside the container image filesystem[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446319-149-q8ps",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary role of an AWS Internet Gateway in a custom VPC architecture?",
      "options": [
        "To provide internal database replication",
        "To connect the VPC's public subnets directly to the external public Internet[cite: 73, 74]",
        "To secure instances using stateful firewalls",
        "To manage IAM user roles and permissions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Internet Gateway enables communication between VPC instances and the internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831446319-150-bcok",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which command initializes a brand-new local Git repository in the current working directory?",
      "options": [
        "`git clone`",
        "`git remote add`",
        "`git init`",
        "`git status`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `git init` creates the local repository metadata inside a hidden `.git` folder[cite: 23, 47]."
    },
    {
      "id": "q-imp-1794831446319-151-zhjr",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary purpose of the `s3:PutObject` permission in an AWS Lambda execution role?",
      "options": [
        "To delete the original source file after copying",
        "To create and write the destination copied object to S3[cite: 7]",
        "To read the source object during copy operations[cite: 7]",
        "To create a new S3 bucket[cite: 7]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `s3:PutObject` grants the permission required to create destination objects in S3[cite: 7]."
    },
    {
      "id": "q-imp-1794831446319-152-cdqs",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which component in Docker architecture communicates directly with the Docker client via a REST API to manage images and containers?",
      "options": [
        "Docker Registry",
        "Docker Daemon[cite: 61]",
        "Hypervisor Type 1",
        "Internet Gateway"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Docker daemon runs on the host machine and listens for Docker API requests from clients[cite: 61]."
    },
    {
      "id": "q-imp-1794831446319-153-3xqk",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What distinguishes Continuous Integration (CI) from Continuous Delivery (CD)?",
      "options": [
        "CI involves deploying directly to production without tests, while CD runs unit tests.",
        "CI focuses on frequent automated builds and test executions upon code commits, whereas CD extends this by automating staging deployments and release pipelines[cite: 59, 60].",
        "CI uses Docker containers, while CD uses virtual machines.",
        "CI requires manual approvals for every commit."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CI validates code integrity through automated builds and testing upon every merge, while CD packages and delivers it toward release[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831446319-154-qdvy",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which AWS storage service provides object storage with high scalability and 11 nines of durability?",
      "options": [
        "Amazon EBS",
        "Amazon EC2",
        "Amazon S3[cite: 100]",
        "Amazon RDS"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Amazon S3 is an object storage service designed for 99.999999999% durability[cite: 100]."
    },
    {
      "id": "q-imp-1794831446319-155-i9dk",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is `git switch -c feature/name` preferred in modern Git workflows over older checkout syntax?",
      "options": [
        "It automatically pushes the branch to GitHub.",
        "It provides a dedicated, unambiguous command (`switch`) specifically for switching branches and creating new ones[cite: 25, 29].",
        "It deletes the main branch automatically.",
        "It resolves merge conflicts without user interaction."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git switch` was introduced to separate branch switching operations cleanly from file-restoration tasks previously conflated in `git checkout`[cite: 25, 29]."
    },
    {
      "id": "q-imp-1794831446319-156-vrdg",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of the `CMD` instruction in a Dockerfile?",
      "options": [
        "It installs operating system patches during image build time.",
        "It specifies the default executable and arguments run when a container starts from the image[cite: 37, 63].",
        "It exposes container network ports to the host machine.",
        "It copies requirements files into the container."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `CMD` defines the default command executed when a container is launched[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446319-157-sxp2",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what HTTP status code is returned by default when a route executes successfully without explicit error codes?",
      "options": [
        "404 Not Found",
        "500 Internal Server Error",
        "200 OK",
        "201 Created"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Flask routes return an HTTP 200 OK status code by default upon successful execution[cite: 22]."
    },
    {
      "id": "q-imp-1794831446319-158-iauc",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary role of a Load Balancer in cloud infrastructure?",
      "options": [
        "To encrypt all incoming database connections using AES-256",
        "To evenly distribute incoming client network traffic across a pool of healthy backend servers[cite: 71, 92]",
        "To store static web files and images",
        "To manage Kubernetes cluster nodes"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Load balancers distribute requests across multiple backend instances to ensure high availability and prevent overload[cite: 71, 92]."
    },
    {
      "id": "q-imp-1794831446319-159-gaoj",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Under the AWS Shared Responsibility Model, who is responsible for managing the hardware and virtualization host hypervisors?",
      "options": [
        "The Customer",
        "The Cloud Provider (AWS)[cite: 94]",
        "Third-Party Security Auditors",
        "Database Administrators"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security \"OF\" the cloud—including physical data centers, hardware, and hypervisors—is managed entirely by AWS[cite: 94]."
    },
    {
      "id": "q-imp-1794831446319-160-vega",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which command lists all local Git branches in your repository?",
      "options": [
        "`git status`",
        "`git log`",
        "`git branch`[cite: 26, 49]",
        "`git remote -v`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `git branch` lists all local branches, marking the active branch with an asterisk[cite: 26, 49]."
    },
    {
      "id": "q-imp-1794831446319-161-gbn3",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the purpose of the `COPY` instruction in a Dockerfile?",
      "options": [
        "To download packages from an external URL repository",
        "To copy new files or directories from the host build context into the container filesystem[cite: 37, 63]",
        "To backup container logs to Amazon S3",
        "To create symbolic links between containers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `COPY` transfers files and folders from your local project directory into the container image during the build process[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446319-162-eimd",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does SLA stand for in cloud computing contracts?",
      "options": [
        "Secured Local Area",
        "Service Level Agreement[cite: 89]",
        "Scalable Logging Architecture",
        "Serverless Lambda Application"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An SLA defines the guaranteed uptime and availability commitments provided by a cloud vendor[cite: 89]."
    },
    {
      "id": "q-imp-1794831446319-163-5wva",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is horizontal auto-scaling dependent on stateless application design?",
      "options": [
        "Because stateful applications cannot use Docker containers.",
        "Because if requests are distributed across multiple instances by a load balancer, any instance must be able to handle any request without relying on local session state stored in RAM[cite: 88, 93].",
        "Because stateless servers require more CPU power.",
        "Because databases cannot connect to stateless instances."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Stateless architectures ensure that scaling instances up or down does not cause user data loss, as sessions are stored externally (e.g., in Redis or databases)[cite: 88, 93]."
    },
    {
      "id": "q-imp-1794831446319-164-x9kc",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which cloud service model is Microsoft 365 or Google Workspace classified under?",
      "options": [
        "IaaS",
        "PaaS",
        "SaaS[cite: 119, 120]",
        "FaaS"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Ready-to-consume productivity applications delivered over the web are classified as Software as a Service (SaaS)[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446319-165-3fhi",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary benefit of setting up a Python virtual environment (`venv`) for a project?",
      "options": [
        "It encrypts source code files.",
        "It isolates project dependencies and packages from the global Python installation, preventing version conflicts[cite: 21].",
        "It compiles Python scripts into native machine code.",
        "It automates GitHub deployments."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtual environments keep project-specific libraries isolated, ensuring dependencies do not clash across different applications[cite: 21]."
    },
    {
      "id": "q-imp-1794831446319-166-krq5",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does an Availability Zone (AZ) consist of in AWS infrastructure?",
      "options": [
        "A single physical computer server",
        "One or more discrete data centers with redundant power, cooling, and networking[cite: 115, 117]",
        "An entire global continent",
        "A DNS routing endpoint"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An AZ comprises one or more fully isolated data centers equipped with redundant infrastructure within a Region[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831446319-167-olr2",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which command displays the remote repository URLs linked to your local Git repository?",
      "options": [
        "`git status`",
        "`git branch -r`",
        "`git remote -v`[cite: 28, 40, 50]",
        "`git log`"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** `git remote -v` lists the configured remote repository names and their corresponding fetch/push URLs[cite: 28, 40, 50]."
    },
    {
      "id": "q-imp-1794831446319-168-909c",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS Security Group?",
      "options": [
        "To manage database table schemas",
        "To act as a virtual firewall controlling inbound and outbound traffic at the EC2 instance level[cite: 74, 99]",
        "To assign public IP addresses automatically",
        "To store encrypted passwords"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security Groups function as stateful virtual firewalls attached directly to instances to control network traffic[cite: 74, 99]."
    },
    {
      "id": "q-imp-1794831446319-169-rvz9",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does Docker ensure that containerized applications run identically across different host machines?",
      "options": [
        "By virtualizing full hardware motherboards",
        "By packaging the application code, runtime libraries, and environment dependencies together into an immutable image container layer[cite: 61]",
        "By translating Python code into Java bytecode",
        "By requiring Windows Server on all hosts"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker packages all application dependencies into an isolated image, guaranteeing environment parity across development and production[cite: 61]."
    },
    {
      "id": "q-imp-1794831446319-170-xoho",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command is used to start a stopped Docker container?",
      "options": [
        "`docker run`",
        "`docker start`",
        "`docker build`",
        "`docker up`"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** `docker start` resumes an existing stopped container instance."
    },
    {
      "id": "q-imp-1794831446319-171-zsph",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Python Flask, how are URL path parameters captured in route definitions (e.g., `/api/products/<int:product_id>`)?",
      "options": [
        "Using query strings like `?id=5`",
        "Using angle brackets with optional converters like `<int:product_id>`[cite: 22]",
        "Using environment variables",
        "Using global request headers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Flask routes support dynamic path converters such as `<int:product_id>` to pass variables directly into view functions[cite: 22]."
    },
    {
      "id": "q-imp-1794831446319-172-3mkq",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of the `RUN` instruction in a Dockerfile?",
      "options": [
        "It runs when a container starts.",
        "It executes build-time commands (such as installing package dependencies) and creates a new cached image layer[cite: 37, 63].",
        "It connects the container to an external database.",
        "It maps host ports to container ports."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `RUN` executes commands during the image build phase, committing results into stacked image layers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446319-173-4kme",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is it important to execute `git fetch` before reviewing remote branch updates?",
      "options": [
        "Because `git fetch` automatically merges all remote changes into your working tree.",
        "Because `git fetch` securely downloads remote commits and updates tracking references without modifying your working files or current branch[cite: 30, 31].",
        "Because Git forbids checking branch history while offline.",
        "Because it compiles project dependencies."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git fetch` updates local remote-tracking branches safely so you can inspect incoming work before deciding to merge or pull[cite: 30, 31]."
    },
    {
      "id": "q-imp-1794831446319-174-gv7k",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary benefit of serverless computing over provisioning EC2 virtual machines?",
      "options": [
        "Full root shell access to the underlying OS",
        "Zero server management, automatic scaling, and pay-per-execution billing with zero idle cost[cite: 102]",
        "Guaranteed 100% CPU allocation 24/7",
        "Elimination of all security policies"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Serverless platforms eliminate OS patching and capacity planning while scaling automatically and charging strictly for execution time[cite: 102]."
    },
    {
      "id": "q-imp-1794831446319-175-m6s4",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the role of an Application Load Balancer Health Check?",
      "options": [
        "To scan container code for security vulnerabilities",
        "To continuously probe backend target endpoints to verify availability and automatically route traffic away from unhealthy instances[cite: 80, 92]",
        "To calculate monthly cloud billing costs",
        "To backup database files to S3"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Health checks monitor backend availability continuously, ensuring traffic is sent solely to healthy instances[cite: 80, 92]."
    },
    {
      "id": "q-imp-1794831446319-176-ch12",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does IaaS stand for in cloud computing service models?",
      "options": [
        "Internet Application and Service",
        "Infrastructure as a Service[cite: 119, 120]",
        "Integrated API Software",
        "Isolated Account Security"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IaaS delivers fundamental computing infrastructure like virtual servers, storage, and networking[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446319-177-vgw2",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Git, what happens when you run `git add` on modified files?",
      "options": [
        "The changes are permanently committed to the repository history.",
        "The changes are moved from the working directory into the staging area (index) in preparation for the next commit[cite: 47, 48].",
        "The changes are pushed to GitHub immediately.",
        "The files are deleted from disk."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git add` stages modifications, capturing a snapshot of changes ready to be locked into a commit[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831446319-178-viyr",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which AWS storage class is optimized for frequently accessed data with low latency requirements?",
      "options": [
        "S3 Glacier",
        "S3 Standard-IA",
        "S3 Standard[cite: 101]",
        "S3 Deep Archive"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** S3 Standard is designed for high-frequency data access with low latency[cite: 101]."
    },
    {
      "id": "q-imp-1794831446319-179-doe2",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the purpose of an AWS VPC Route Table?",
      "options": [
        "To manage IAM user passwords",
        "To contain a set of rules (routes) that determine where network traffic directed from subnets is routed[cite: 74]",
        "To compile Python Lambda code",
        "To balance load across EC2 instances"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Route tables define network traffic pathways for subnets, determining whether traffic goes to an Internet Gateway or NAT Gateway[cite: 74]."
    },
    {
      "id": "q-imp-1794831446319-180-12gk",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command stops a running Docker container gracefully?",
      "options": [
        "`docker kill`",
        "`docker stop`[cite: 39, 64]",
        "`docker rm`[cite: 39, 64]",
        "`docker pause`[cite: 39, 64]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker stop` sends a SIGTERM signal to allow the containerized application to shut down gracefully[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831446319-181-mmz4",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what decorator defines a route URL endpoint?",
      "options": [
        "`@app.route()`[cite: 22]",
        "`@app.endpoint()`",
        "`@flask.define()`",
        "`@api.get()`"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** The `@app.route()` decorator binds a URL path to a Python view function in Flask[cite: 22]."
    },
    {
      "id": "q-imp-1794831446319-182-0566",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a major advantage of using Git for version control?",
      "options": [
        "It requires a centralized server to perform any commits.",
        "It tracks project history, enables branching, and allows seamless collaboration across distributed teams[cite: 46].",
        "It automatically deletes unused code files.",
        "It prevents all syntax errors in source code."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Git's distributed architecture tracks historical snapshots and empowers robust multi-developer collaboration[cite: 46]."
    },
    {
      "id": "q-imp-1794831446319-183-ffdp",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why do cloud architects deploy multi-tier applications across private subnets rather than putting every server in public subnets?",
      "options": [
        "To increase internet speed",
        "To enforce security in depth by isolating backend databases and application logic from direct public internet exposure[cite: 90, 99]",
        "To reduce cloud hosting costs to zero",
        "To eliminate the need for load balancers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Isolating backend tiers in private subnets prevents unauthorized direct access from external threats[cite: 90, 99]."
    },
    {
      "id": "q-imp-1794831446319-184-bv0x",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of the `docker images` command?",
      "options": [
        "It lists all running and stopped containers.",
        "It lists all local Docker images stored on your machine[cite: 41, 64].",
        "It deletes unused container layers.",
        "It builds an image from a Dockerfile."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker images` displays locally available container images, tags, and sizes[cite: 41, 64]."
    },
    {
      "id": "q-imp-1794831446319-185-yt19",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary function of an AWS Key Pair in EC2 instance management?",
      "options": [
        "To encrypt S3 bucket objects at rest",
        "To securely authenticate users over SSH when logging into Linux instances without passwords[cite: 76, 97]",
        "To manage IAM user roles",
        "To balance network traffic across subnets"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EC2 Key Pairs use public-key cryptography to authenticate SSH connections securely[cite: 76, 97]."
    },
    {
      "id": "q-imp-1794831446319-186-j2so",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does PaaS stand for in cloud computing?",
      "options": [
        "Public Application and Storage Service",
        "Platform as a Service[cite: 119, 120]",
        "Private Automated Security System",
        "Primary Access Software"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** PaaS delivers managed execution platforms and runtimes for developers to build applications[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446319-187-u970",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does a Fast-Forward merge differ from a 3-Way merge in Git?",
      "options": [
        "A Fast-Forward merge creates a new merge commit, while a 3-Way merge moves pointers.",
        "A Fast-Forward merge simply moves the target branch pointer forward to the tip of the incoming branch without divergence, whereas a 3-Way merge combines diverged histories into a new merge commit[cite: 49].",
        "A Fast-Forward merge requires conflict resolution.",
        "A Fast-Forward merge can only be executed on GitHub."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** When histories have not diverged, Git performs a fast-forward by advancing the pointer; diverged histories require a 3-way merge commit[cite: 49]."
    },
    {
      "id": "q-imp-1794831446319-188-ttp5",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS S3 bucket?",
      "options": [
        "To execute serverless Python functions",
        "To store and retrieve any amount of data as objects in a globally unique namespace[cite: 100]",
        "To act as a relational SQL database",
        "To route DNS traffic"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 buckets serve as foundational storage containers for holding objects and files[cite: 100]."
    },
    {
      "id": "q-imp-1794831446319-189-v6zc",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the purpose of the `ENV` instruction in a Dockerfile?",
      "options": [
        "To delete temporary build files",
        "To set environment variables inside the container environment[cite: 37, 63]",
        "To open firewall ports",
        "To clone GitHub repositories"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `ENV` defines persistent environment variables accessible during both build and runtime inside containers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446319-190-tbv7",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the main characteristic of a Monolithic Architecture?",
      "options": [
        "Applications are broken down into independent microservice containers.",
        "All application components (UI, business logic, data access) are bundled into a single unified codebase and deployment package[cite: 91].",
        "Code runs strictly on serverless event triggers.",
        "Every module runs on a separate cloud region."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Monoliths combine all software modules into one single executable or package[cite: 91]."
    },
    {
      "id": "q-imp-1794831446319-191-nrgb",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why do microservices architectures reduce the risk of catastrophic system failures compared to monoliths?",
      "options": [
        "Microservices never experience bugs.",
        "Services are decoupled and deployed independently, so a failure in one service (e.g., billing) does not necessarily crash the entire application[cite: 91].",
        "Microservices require zero network communication.",
        "Microservices run without operating systems."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Decoupled microservices isolate domains, preventing a bug in one module from taking down the entire system[cite: 91]."
    },
    {
      "id": "q-imp-1794831446319-192-6b5d",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command removes a stopped Docker container?",
      "options": [
        "`docker stop`",
        "`docker rm`[cite: 39, 64]",
        "`docker rmi`",
        "`docker clear`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker rm` deletes a stopped container instance from disk[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831446319-193-8d4g",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Git, what does `git commit -m \"message\"` do?",
      "options": [
        "It stages modified files in the working directory.",
        "It records a permanent cryptographic snapshot of the staged changes into the local repository history with an explanatory message[cite: 47, 48].",
        "It pushes commits to GitHub.",
        "It downloads remote branch updates."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `commit` creates an immutable snapshot of staged changes in Git history[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831446319-194-imgv",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS Virtual Private Cloud (VPC)?",
      "options": [
        "To host static web pages on S3",
        "To provide a logically isolated private virtual network dedicated to your AWS account[cite: 72, 98]",
        "To manage relational database transactions",
        "To execute Lambda functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A VPC provides custom network isolation, subnets, and routing control over your cloud resources[cite: 72, 98]."
    },
    {
      "id": "q-imp-1794831446319-195-jyqr",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the function of `git status`?",
      "options": [
        "It pushes local commits to GitHub.",
        "It displays the state of the working directory and staging area, showing tracked, untracked, and modified files[cite: 24, 47].",
        "It merges feature branches into main.",
        "It deletes untracked files permanently."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git status` reports which files are modified, staged, or untracked in your local workspace[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831446319-196-9lzg",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does SaaS stand for in cloud service delivery models?",
      "options": [
        "Secure Automated Server Software",
        "Software as a Service[cite: 119, 120]",
        "Scalable Application Infrastructure System",
        "Simple Administrative Storage Solution"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SaaS delivers fully managed application software over the internet on a subscription basis[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446319-197-tfye",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the purpose of Docker layer caching during image builds?",
      "options": [
        "To encrypt container images before pushing to registries",
        "To accelerate build times by reusing previously built image layers when instructions and files have not changed[cite: 62, 68]",
        "To limit CPU and RAM consumption inside containers",
        "To synchronize databases across availability zones"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Caching unchanged instruction layers speeds up subsequent `docker build` executions significantly[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831446319-198-v161",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which AWS service provides fully managed NoSQL key-value and document databases with single-digit millisecond latency?",
      "options": [
        "Amazon RDS",
        "Amazon DynamoDB[cite: 116]",
        "Amazon S3",
        "Amazon CloudFront"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Amazon DynamoDB is a fully managed NoSQL database service offering high performance at any scale[cite: 116]."
    },
    {
      "id": "q-imp-1794831446319-199-64ca",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is automated CI/CD pipeline testing considered superior to manual testing on production servers?",
      "options": [
        "It requires manual login via SSH for every test run.",
        "It catches integration bugs and regressions immediately (\"fail fast\") in isolated environments before code ever reaches production[cite: 59, 60].",
        "It eliminates the need for version control systems.",
        "It guarantees 100% hardware uptime."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Automated pipelines execute tests instantly upon every commit, catching errors early and ensuring safe, reliable deployments[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831446319-200-lwxf",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does the acronym NIST stand for in the context of cloud computing definitions?",
      "options": [
        "National Institute of Storage Technology",
        "National Institute of Standards and Technology[cite: 113]",
        "Network Information Security Team",
        "New Infrastructure Software Transition"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NIST stands for the National Institute of Standards and Technology, which defines essential cloud characteristics[cite: 113]."
    },
    {
      "id": "q-imp-1794831446319-201-mbn2",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which utility computing paradigm pioneered the concept of packaging CPU, storage, and bandwidth like public utilities?",
      "options": [
        "Client-Server Architecture",
        "Utility Computing[cite: 111]",
        "Mainframe Timesharing",
        "Peer-to-Peer Grid Computing"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Utility computing packages computing resources like electricity, water, and gas, charging users based on consumption[cite: 111]."
    },
    {
      "id": "q-imp-1794831446319-202-o2uc",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What was a key limitation of scientific grid computing in the late 1990s and 2000s?",
      "options": [
        "It could not run Python scripts.",
        "It was primarily designed for heavy batch jobs and scientific simulations rather than elastic commercial web applications[cite: 110].",
        "It required wireless broadband connections.",
        "It lacked high-speed LAN/WAN connectivity."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Grids were tailored for specialized batch and simulation processing like SETI@home rather than on-demand enterprise workloads[cite: 110]."
    },
    {
      "id": "q-imp-1794831446319-203-ysqw",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In NIST SP 800-145, how many essential characteristics define cloud computing?",
      "options": [
        "Three",
        "Four",
        "Five[cite: 113, 114]",
        "Seven"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** NIST outlines five essential characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831446319-204-v3ib",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which front-end component allows administrators to manage cloud resources via command-line terminals?",
      "options": [
        "Web Browsers",
        "Cloud CLI tools and SDKs[cite: 113]",
        "Local Database Servers",
        "Hypervisor Virtualization Layers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud CLIs (like `aws-cli` or `az`) and SDKs form part of the front-end client interface layer[cite: 113]."
    },
    {
      "id": "q-imp-1794831446319-205-em0i",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary function of Software-Defined Networking (SDN) within cloud data centers?",
      "options": [
        "To manufacture physical router cables",
        "To provision and manage virtual network topologies, subnets, and firewalls programmatically[cite: 113]",
        "To replace hypervisors entirely",
        "To compile application source code"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Software-defined networking abstracts physical hardware to manage VPCs and subnets dynamically[cite: 113]."
    },
    {
      "id": "q-imp-1794831446319-206-z61p",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which cloud vendor launched commercial cloud computing by introducing Amazon S3 and EC2 in 2006?",
      "options": [
        "Microsoft Azure",
        "Google Cloud Platform",
        "Amazon Web Services (AWS)[cite: 112]",
        "Alibaba Cloud"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS pioneered modern commercial cloud computing by releasing S3 and EC2 in 2006[cite: 112]."
    },
    {
      "id": "q-imp-1794831446319-207-ndz7",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In cloud infrastructure market comparisons, what is a primary historical strength of Microsoft Azure?",
      "options": [
        "Pioneering object storage in 2006",
        "Deep enterprise integration with Active Directory, Windows Server, and Office 365 licensing[cite: 115]",
        "Originating Kubernetes container orchestration",
        "Exclusive focus on open-source AI research"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure's core strength lies in seamless hybrid cloud and enterprise integration with the Microsoft ecosystem[cite: 115]."
    },
    {
      "id": "q-imp-1794831446319-208-pxmf",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a primary differentiator of Google Cloud Platform (GCP) in the hyperscale market?",
      "options": [
        "Exclusive ownership of Windows Server licenses",
        "Leadership in data analytics (BigQuery), AI/ML, and container orchestration as the originator of Kubernetes[cite: 115]",
        "Requiring physical mainframe terminals for setup",
        "Restricting services to single-AZ deployments"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** GCP is recognized for its strengths in big data analytics, machine learning, and container technologies[cite: 115]."
    },
    {
      "id": "q-imp-1794831446319-209-n27h",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What term describes a physical geographic location containing multiple isolated, redundant data centers connected by ultra-low-latency fiber?",
      "options": [
        "Availability Zone",
        "Cloud Region[cite: 115, 117]",
        "Edge Point of Presence",
        "Subnet Gateway"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A cloud Region represents a geographic area housing multiple physically separated data center zones[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831446319-210-gdfn",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the purpose of Edge Locations or Points of Presence (PoPs) in global cloud architecture?",
      "options": [
        "To host primary relational database clusters",
        "To cache content globally close to end users to reduce delivery latency[cite: 117]",
        "To execute long-running batch data analytics jobs",
        "To replace regional Virtual Private Clouds"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Edge locations cache static and dynamic assets worldwide to serve users with minimal network latency[cite: 117]."
    },
    {
      "id": "q-imp-1794831446319-211-sy1b",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which domain in core cloud product catalogs covers user authentication, cryptographic key management, and perimeter defense?",
      "options": [
        "Compute",
        "Storage",
        "Security & Identity[cite: 116]",
        "Management & Governance"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Security and identity domains encompass services like IAM, KMS, and WAF[cite: 116]."
    },
    {
      "id": "q-imp-1794831446319-212-yza0",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the Azure counterpart to AWS IAM for user identity management and role permissions?",
      "options": [
        "Azure SQL Database",
        "Microsoft Entra ID (formerly Azure Active Directory)[cite: 116]",
        "Azure Blob Storage",
        "Azure Functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Microsoft Entra ID handles user authentication, access control, and identity management in Azure[cite: 116]."
    },
    {
      "id": "q-imp-1794831446319-213-7iov",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the Google Cloud equivalent to Amazon Route 53 for domain name registration and DNS routing?",
      "options": [
        "Cloud SQL",
        "Cloud DNS[cite: 116]",
        "Cloud Storage",
        "Compute Engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud DNS is Google's scalable Domain Name System service matching AWS Route 53[cite: 116]."
    },
    {
      "id": "q-imp-1794831446319-214-65cx",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Under the Cloud SPI Model, what does the \"P\" stand for?",
      "options": [
        "Private",
        "Platform[cite: 118, 119]",
        "Physical",
        "Per-second"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The Cloud SPI Model stands for Software, Platform, and Infrastructure as a Service[cite: 118, 119]."
    },
    {
      "id": "q-imp-1794831446319-215-2bpw",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In the Cloud Stack Pyramid, which service model targets software developers needing managed runtimes without OS administration?",
      "options": [
        "IaaS",
        "PaaS (Platform as a Service)[cite: 119]",
        "SaaS",
        "Bare Metal"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** PaaS delivers ready-to-code execution environments tailored for developers[cite: 119]."
    },
    {
      "id": "q-imp-1794831446319-216-hhvs",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which software delivery model eliminates client installation entirely by delivering applications exclusively through web browsers?",
      "options": [
        "IaaS",
        "PaaS",
        "SaaS (Software as a Service)[cite: 120]",
        "Client-Server Architecture"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** SaaS delivers fully managed applications accessible instantly via web browsers without local installations[cite: 120]."
    },
    {
      "id": "q-imp-1794831446319-217-olt0",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is a primary disadvantage of adopting the SaaS model for enterprise organizations?",
      "options": [
        "Inability to use web browsers",
        "Limited customizability and potential data privacy/compliance hurdles[cite: 121]",
        "Mandatory manual software patching on client PCs",
        "High upfront capital expenditure requirements"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SaaS limits deep code-level customization and introduces data governance dependencies on third-party vendors[cite: 121]."
    },
    {
      "id": "q-imp-1794831446319-218-4xtt",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which of the following is a prominent example of an enterprise SaaS productivity suite?",
      "options": [
        "Amazon EC2",
        "Linux KVM",
        "Microsoft 365 / Google Workspace[cite: 121]",
        "SQLite Database"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Microsoft 365 and Google Workspace are classic SaaS collaboration and productivity suites[cite: 121]."
    },
    {
      "id": "q-imp-1794831446319-219-3pr2",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary characteristic of storage virtualization?",
      "options": [
        "Attaching physical hard drives directly to local motherboards",
        "Pooling physical storage from multiple network storage devices (like SAN or NAS) to be managed as unified virtual storage volumes[cite: 122]",
        "Encrypting object keys in S3 buckets",
        "Converting block storage into serverless functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Storage virtualization abstracts physical storage arrays into flexible, pooled virtual storage pools[cite: 122]."
    },
    {
      "id": "q-imp-1794831446319-220-le1p",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is Desktop Virtualization (VDI)?",
      "options": [
        "Running mobile apps on smartwatches",
        "Hosting user desktop operating systems inside virtual machines on centralized servers, accessible remotely[cite: 122]",
        "Emulating Windows executables on Linux via WINE",
        "Caching static web pages at CDN edge nodes"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtual Desktop Infrastructure (VDI) runs centralized desktop environments accessible from remote thin clients[cite: 122]."
    },
    {
      "id": "q-imp-1794831446319-221-7lij",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How do Type 1 and Type 2 hypervisors differ in terms of performance overhead?",
      "options": [
        "Type 1 has higher overhead because it runs inside a guest operating system.",
        "Type 1 offers near-native performance by interacting directly with bare-metal hardware, whereas Type 2 incurs overhead from host OS scheduling[cite: 122].",
        "Both hypervisors have identical performance profiles.",
        "Type 2 runs faster than bare-metal hardware."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bare-metal Type 1 hypervisors eliminate host OS overhead, delivering superior performance for cloud workloads[cite: 122]."
    },
    {
      "id": "q-imp-1794831446319-222-tnux",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a \"Golden Image\" (or Template) in virtual machine provisioning?",
      "options": [
        "A corrupted disk backup",
        "A standardized, security-hardened virtual machine image used as a baseline for rapidly provisioning new instances[cite: 123]",
        "A physical server rack",
        "An unencrypted SSH key pair"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Golden images provide consistent, pre-configured baseline templates for spinning up virtual machines[cite: 123]."
    },
    {
      "id": "q-imp-1794831446319-223-f20w",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What occurs during a Cold (Offline) Virtual Machine Migration?",
      "options": [
        "The VM continues running while memory pages transfer.",
        "The VM is powered down, its disk and memory states are transferred to a new host, and it is powered back on, causing downtime[cite: 123].",
        "The virtual machine is converted into a Docker container automatically.",
        "Network routing tables are reconfigured without stopping the OS."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cold migration requires powering off the VM, resulting in service downtime during transfer[cite: 123]."
    },
    {
      "id": "q-imp-1794831446319-224-opcp",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which cloud deployment model refers to multi-tenant infrastructure owned and operated by a third-party vendor accessible over the public internet?",
      "options": [
        "Private Cloud",
        "Public Cloud[cite: 124]",
        "Community Cloud",
        "On-Premise Data Center"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public clouds deliver shared, multi-tenant computing resources over the public internet on a pay-as-you-go basis[cite: 124]."
    },
    {
      "id": "q-imp-1794831446319-225-2ax4",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary driver for an enterprise to adopt a Private Cloud infrastructure?",
      "options": [
        "Eliminating all operational expenses",
        "Meeting strict regulatory compliance, data sovereignty, and security mandates[cite: 124]",
        "Achieving zero network latency worldwide",
        "Bypassing the need for virtualization software"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Private clouds provide dedicated single-tenant isolation required by regulated industries like banking and defense[cite: 124]."
    },
    {
      "id": "q-imp-1794831446319-226-qmfp",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What defines a Multi-Cloud operational strategy?",
      "options": [
        "Using only a single cloud provider for all workloads",
        "Leveraging services from two or more independent public cloud vendors (e.g., AWS + Azure + GCP)[cite: 124]",
        "Combining on-premises servers with a private cloud",
        "Running virtual machines without a hypervisor"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Multi-cloud involves utilizing multiple public cloud providers to prevent lock-in and leverage best-of-breed services[cite: 124]."
    },
    {
      "id": "q-imp-1794831446319-227-9li7",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is a Community Cloud?",
      "options": [
        "A public cloud open to individual consumers only",
        "A shared cloud infrastructure managed and used by several organizations with common compliance or regulatory missions[cite: 124]",
        "A virtual machine cluster hosted on developer laptops",
        "A global CDN network"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Community clouds pool infrastructure across organizations with shared security or industry requirements[cite: 124]."
    },
    {
      "id": "q-imp-1794831446319-228-wscg",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is cloud \"sprawl\"?",
      "options": [
        "The physical expansion of data center real estate",
        "The uncontrolled accumulation of unmonitored cloud resources, orphaned VMs, and unused disks driving up costs[cite: 125]",
        "The speed at which virtual machines migrate across hosts",
        "The automatic scaling of serverless functions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud sprawl occurs when unmanaged resources accumulate, leading to unexpected financial waste[cite: 125]."
    },
    {
      "id": "q-imp-1794831446319-229-oidm",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does FinOps help mitigate cloud cost challenges?",
      "options": [
        "By shutting down all internet gateways permanently",
        "By bringing financial accountability to cloud spending through cross-functional collaboration, budgeting, and cost optimization[cite: 125]",
        "By forcing developers to use physical mainframes",
        "By eliminating multi-region deployments"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** FinOps combines finance and engineering to monitor, allocate, and optimize cloud spending[cite: 125]."
    },
    {
      "id": "q-imp-1794831446319-230-9hzu",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which web service protocol relies strictly on XML envelopes and can operate over SMTP, TCP, or HTTP?",
      "options": [
        "REST",
        "SOAP (Simple Object Access Protocol)[cite: 125, 126]",
        "gRPC",
        "JSON-RPC"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SOAP is a heavy protocol utilizing strict XML messaging formats across various transport protocols[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831446319-231-whei",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What data serialization format does gRPC use instead of text-based JSON or XML?",
      "options": [
        "CSV",
        "Protocol Buffers (Protobuf) binary format[cite: 125, 126]",
        "YAML",
        "HTML"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** gRPC serializes messages into compact binary Protocol Buffers for high-speed transmission[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831446319-232-nz3b",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary role of a Hypervisor?",
      "options": [
        "To route DNS queries across regions",
        "To abstract physical hardware and manage concurrent virtual machines[cite: 122]",
        "To compile Python Flask code",
        "To execute CI/CD build pipelines"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The hypervisor allocates CPU, memory, and I/O resources to guest virtual machines[cite: 122]."
    },
    {
      "id": "q-imp-1794831446319-233-az0y",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why are Type 1 hypervisors preferred over Type 2 hypervisors in enterprise cloud data centers?",
      "options": [
        "They require a Windows host operating system.",
        "They run directly on bare metal with minimal overhead, superior performance, and hardened security[cite: 122].",
        "They are easier to install on laptop computers.",
        "They eliminate the need for virtual networks."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bare-metal hypervisors provide maximum performance and isolation required for multi-tenant cloud infrastructure[cite: 122]."
    },
    {
      "id": "q-imp-1794831446319-234-pgcm",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does the term \"Stateless Compute\" mean in cloud architecture?",
      "options": [
        "Compute instances that cannot connect to the internet.",
        "Instances that store no local session data, allowing them to be created or destroyed instantly without state loss[cite: 88].",
        "Servers running without operating systems.",
        "Databases that do not persist records."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Stateless compute instances treat every request independently, enabling seamless horizontal auto-scaling[cite: 88]."
    },
    {
      "id": "q-imp-1794831446319-235-bsyn",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In three-tier cloud architectures, why is direct public SSH access to backend application servers strictly prohibited?",
      "options": [
        "To comply with Python syntax rules",
        "To enforce security in depth and protect internal application logic from direct external attacks[cite: 90]",
        "Because SSH protocols are incompatible with Linux",
        "To reduce the performance of load balancers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Restricting access protects sensitive backend tiers, requiring administrative access through secure bastion hosts or VPNs[cite: 90]."
    },
    {
      "id": "q-imp-1794831446319-236-0jdl",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is an AWS VPC Subnet?",
      "options": [
        "A physical server rack",
        "A segment of a VPC's IP address range used to isolate and group cloud resources[cite: 73, 98]",
        "An object storage bucket",
        "A caching proxy server"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Subnets divide a VPC's IP address space into smaller segments for public or private resource placement[cite: 73, 98]."
    },
    {
      "id": "q-imp-1794831446319-237-fpbe",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the function of a State Table in a Stateful Firewall like an AWS Security Group?",
      "options": [
        "To store database transaction logs",
        "To track active network connection states, automatically allowing return response traffic without needing explicit outbound rules[cite: 100]",
        "To record HTTP request headers",
        "To manage IAM role permissions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Stateful firewalls remember established connections, automatically permitting return packets for allowed inbound flows[cite: 100]."
    },
    {
      "id": "q-imp-1794831446319-238-cec2",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the maximum size of a single object uploaded to Amazon S3?",
      "options": [
        "64 TiB",
        "5 TB[cite: 100]",
        "10 GB",
        "Unlimited"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Amazon S3 supports single object sizes ranging from zero bytes up to 5 terabytes[cite: 100]."
    },
    {
      "id": "q-imp-1794831446319-239-h9nr",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary operational difference between S3 Standard and S3 Standard-Infrequent Access (Standard-IA)?",
      "options": [
        "Standard-IA offers 5 nines of durability while Standard offers 11 nines.",
        "Standard-IA provides lower storage costs for data accessed less frequently, but incurs a per-GB retrieval fee[cite: 101].",
        "Standard-IA requires virtual machine attachments.",
        "Standard-IA has sub-millisecond block storage speeds."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Standard-IA reduces storage costs for infrequently accessed data while charging retrieval fees for access[cite: 101]."
    },
    {
      "id": "q-imp-1794831446319-240-s7hl",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What metric is used to bill customers for AWS Lambda function executions?",
      "options": [
        "Hourly flat rate per server",
        "Execution duration (in milliseconds) and memory allocated[cite: 102]",
        "Number of S3 buckets owned",
        "Volume of inbound network traffic only"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lambda billing is based strictly on the number of requests, execution duration in milliseconds, and configured memory[cite: 102]."
    },
    {
      "id": "q-imp-1794831446319-241-1f41",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why might a serverless Lambda function experience a \"Cold Start\" delay?",
      "options": [
        "Because the local database is out of disk space.",
        "Because the cloud provider must provision a new micro-VM execution environment when a request arrives after a period of inactivity[cite: 102].",
        "Because Git pushes were rejected.",
        "Because network security groups blocked the port."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cold starts happen when Lambda spins up a fresh container instance to handle an invocation following idle periods[cite: 102]."
    },
    {
      "id": "q-imp-1794831446319-242-y1px",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is an Azure Subscription?",
      "options": [
        "A recurring magazine delivery",
        "A foundational administrative and billing boundary for managing Azure services and resources[cite: 103]",
        "A local Python virtual environment",
        "A Docker image tag"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Subscriptions form the core billing and management boundary in Microsoft Azure[cite: 103]."
    },
    {
      "id": "q-imp-1794831446319-243-ty0j",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the purpose of Azure Resource Manager (ARM) templates?",
      "options": [
        "To write Python Flask REST APIs",
        "To define infrastructure declaratively as code using JSON/Bicep for automated deployments[cite: 103]",
        "To manage local Git repositories",
        "To configure container namespaces"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ARM templates enable declarative Infrastructure as Code deployments across Azure resource groups[cite: 103]."
    },
    {
      "id": "q-imp-1794831446319-244-nj9k",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which Azure storage tier is optimized for data accessed rarely, requiring a minimum storage duration of 90 days?",
      "options": [
        "Hot Tier",
        "Cool Tier",
        "Cold Tier[cite: 104]",
        "Premium Tier"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Azure's Cold storage tier is designed for infrequently accessed data retained for extended periods[cite: 104]."
    },
    {
      "id": "q-imp-1794831446319-245-7hbx",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How does Azure Log Analytics query telemetry and log data?",
      "options": [
        "Using SQL queries exclusively",
        "Using Kusto Query Language (KQL)[cite: 105]",
        "Using bash shell scripts",
        "Using Dockerfiles"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Kusto Query Language (KQL) is the expressive query language used across Azure Monitor logs[cite: 105]."
    },
    {
      "id": "q-imp-1794831446319-246-kb5e",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does the acronym CapEx stand for in IT financial management?",
      "options": [
        "Capital Expenditure[cite: 114]",
        "Capacity Planning Execution",
        "Centralized Application Engine",
        "Cloud Processing Exchange"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** CapEx refers to major upfront capital investments in physical hardware and infrastructure[cite: 114]."
    },
    {
      "id": "q-imp-1794831446319-247-7l8z",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary financial advantage of shifting from CapEx to OpEx in cloud computing?",
      "options": [
        "Eliminating all tax obligations",
        "Converting large fixed upfront costs into flexible, predictable variable operating expenses aligned with actual usage[cite: 114]",
        "Guaranteeing 100% fixed monthly bills regardless of scale",
        "Bypassing cloud provider invoices"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The OpEx model avoids large initial investments, matching cloud spending directly to business utility[cite: 114]."
    },
    {
      "id": "q-imp-1794831446319-248-m2xb",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which NIST characteristic ensures that users can access cloud capabilities over network mechanisms using phones, tablets, or laptops?",
      "options": [
        "On-demand self-service",
        "Broad Network Access[cite: 113, 114]",
        "Resource Pooling",
        "Measured Service"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Broad network access guarantees that cloud services are accessible across heterogeneous client platforms over networks[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831446319-249-a43b",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why are enterprise data centers transitioning from monolithic architectures to microservices?",
      "options": [
        "To increase the complexity of local network wiring",
        "To decouple business domains, enabling independent scaling, faster deployments, and isolated failure fault lines[cite: 91]",
        "To eliminate the need for version control systems",
        "To ensure all code runs in a single process"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Microservices break monoliths into autonomous services, improving deployment velocity and fault isolation[cite: 91]."
    },
    {
      "id": "q-imp-1794831446319-250-1whm",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command initializes Git repository metadata in a project folder?",
      "options": [
        "`git clone`",
        "`git init`[cite: 23, 47]",
        "`git commit`",
        "`git add`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git init` creates the hidden `.git` tracking folder for a new local repository[cite: 23, 47]."
    },
    {
      "id": "q-imp-1794831446319-251-n18q",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the function of `git branch -M main`?",
      "options": [
        "To merge remote branches",
        "To rename the current branch to `main`[cite: 23, 47]",
        "To delete the main branch",
        "To view commit logs"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The `-M` flag forces the current branch name to be updated to `main`[cite: 23, 47]."
    },
    {
      "id": "q-imp-1794831446319-252-91zt",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which command displays the tracked and untracked status of files in your working tree?",
      "options": [
        "`git diff`",
        "`git status`[cite: 24, 47]",
        "`git log`",
        "`git fetch`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git status` provides a summary of modified, staged, and untracked files[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831446319-253-er4c",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What does staging a file in Git accomplish?",
      "options": [
        "It pushes the file to GitHub immediately.",
        "It adds changes to the staging area (index) to prepare them for the next commit snapshot[cite: 24, 47].",
        "It deletes local editing history.",
        "It converts the file into binary format."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Staging selects specific changes to be bundled into the upcoming cryptographic commit snapshot[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831446319-254-8n6o",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a commit in Git?",
      "options": [
        "A temporary text backup",
        "An immutable cryptographic snapshot of staged changes identified by a hash[cite: 47, 48]",
        "An active connection to GitHub",
        "A branch pointer alias"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Commits record permanent, immutable snapshots of project history in Git[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831446319-255-yomg",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the difference between `git diff` and `git diff --staged`?",
      "options": [
        "`git diff` shows staged changes; `git diff --staged` shows remote changes.",
        "`git diff` displays unstaged changes in the working tree, whereas `git diff --staged` shows changes prepared in the staging area[cite: 24, 48].",
        "Both commands show identical output.",
        "`git diff --staged` deletes uncommitted code."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git diff` compares working tree to staging, while `--staged` compares staging to the last commit[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831446319-256-7eth",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "How do you discard unstaged edits to a tracked file and revert to the last commit?",
      "options": [
        "`git reset --hard`",
        "`git restore <file>`[cite: 25]",
        "`git branch -d`",
        "`git rm <file>`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git restore` discards uncommitted working tree modifications for specified files[cite: 25]."
    },
    {
      "id": "q-imp-1794831446319-257-3ztx",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is a Git branch pointer?",
      "options": [
        "A physical file duplicate on disk",
        "A lightweight, movable reference to a specific commit[cite: 26, 48]",
        "An upstream remote URL alias",
        "A staging buffer index"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Branches are simply cheap, movable pointers pointing to commit hashes[cite: 26, 48]."
    },
    {
      "id": "q-imp-1794831446319-258-zm9k",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command creates and switches to a new feature branch simultaneously?",
      "options": [
        "`git branch feature/name`",
        "`git switch -c feature/name`[cite: 26, 49]",
        "`git checkout main`",
        "`git push origin`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git switch -c` creates a new branch and checks it out in one atomic step[cite: 26, 49]."
    },
    {
      "id": "q-imp-1794831446319-259-fb9w",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "When merging branches, what does Git do when no diverged commits exist on the target branch?",
      "options": [
        "It aborts with a merge conflict error.",
        "It performs a Fast-Forward merge by simply advancing the target branch pointer[cite: 30, 49].",
        "It creates a 3-way merge commit with two parents.",
        "It deletes both branches."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Fast-forward merges require no new commit object; the branch pointer just slides forward to the latest commit[cite: 30, 49]."
    },
    {
      "id": "q-imp-1794831446319-260-eack",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What are Git conflict markers used for?",
      "options": [
        "To encrypt commit hashes",
        "To annotate conflicting lines within a file during a merge conflict so developers can manually resolve them[cite: 27, 50]",
        "To establish SSH authentication with GitHub",
        "To optimize Docker layer builds"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) highlight differing changes needing manual resolution[cite: 27, 50]."
    },
    {
      "id": "q-imp-1794831446319-261-2bgy",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the conventional alias name for a primary remote repository linked in Git?",
      "options": [
        "`upstream`",
        "`origin`[cite: 28, 50]",
        "`master`",
        "`remote-repo`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `origin` is the standard shorthand alias assigned to a repository's primary remote server[cite: 28, 50]."
    },
    {
      "id": "q-imp-1794831446319-262-e3zu",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command links an existing local Git repository to a remote GitHub URL?",
      "options": [
        "`git init origin`",
        "`git remote add origin <URL>`[cite: 28, 50]",
        "`git link remote`",
        "`git push connect`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git remote add origin` configures the remote repository connection reference[cite: 28, 50]."
    },
    {
      "id": "q-imp-1794831446319-263-tl9e",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is a remote-tracking branch in Git?",
      "options": [
        "A physical server running inside AWS",
        "An uneditable local reference representing the last known state of a remote branch on GitHub[cite: 30]",
        "A branch that automatically deletes local files",
        "An active SSH tunnel to a container"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Remote-tracking branches (like `origin/main`) cache the remote repository's branch state locally[cite: 30]."
    },
    {
      "id": "q-imp-1794831446319-264-mx2f",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does `git pull` execute under the hood?",
      "options": [
        "`git push` followed by `git commit`",
        "`git fetch` followed by merging the remote branch into the current local branch[cite: 30, 51]",
        "`git init` followed by `git clone`",
        "`git add` followed by `git restore`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git pull` combines fetching remote updates and integrating them locally in one step[cite: 30, 51]."
    },
    {
      "id": "q-imp-1794831446319-265-74ua",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is `git pull --ff-only` recommended to maintain a clean history?",
      "options": [
        "It forces merge conflict resolution on every pull.",
        "It prevents unwanted automatic merge commits by ensuring pulls only succeed via fast-forward updates[cite: 30].",
        "It deletes local commits automatically.",
        "It requires administrator privileges."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--ff-only` stops pulls from creating stray merge commits when histories diverge, allowing manual inspection[cite: 30]."
    },
    {
      "id": "q-imp-1794831446319-266-f3dp",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command clones an existing GitHub repository into a new local directory?",
      "options": [
        "`git init`",
        "`git clone <URL>`[cite: 31, 51]",
        "`git remote add`",
        "`git fetch origin`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git clone` downloads a full copy of a remote repository and configures its remote origin[cite: 31, 51]."
    },
    {
      "id": "q-imp-1794831446319-267-u3gr",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What security protocol does GitHub enforce for HTTPS Git operations instead of account passwords?",
      "options": [
        "Plain text transmission",
        "Personal Access Tokens (PATs) or secure browser-based authentication flows[cite: 29]",
        "Secure FTP credentials",
        "Static database keys"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** GitHub deprecates direct password authentication over HTTPS, requiring token or browser authentication[cite: 29]."
    },
    {
      "id": "q-imp-1794831446319-268-1xp3",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a Pull Request (PR)?",
      "options": [
        "A Git command to pull remote changes",
        "A GitHub web-based collaboration workflow for code review and merging proposed changes[cite: 35, 50]",
        "An automated script that compiles Docker images",
        "A local merge conflict resolution tool"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Pull requests provide a platform for team code review before merging feature branches[cite: 35, 50]."
    },
    {
      "id": "q-imp-1794831446319-269-jbnx",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary function of a Dockerfile?",
      "options": [
        "To manage IAM users in AWS",
        "A plain-text configuration file containing sequential instructions used by Docker to build an immutable image[cite: 37, 63]",
        "To execute Python unit tests in CI pipelines",
        "To configure VPC subnets and route tables"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Dockerfiles define the recipe of layers, dependencies, and code packaged into a container image[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446319-270-ndzj",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which Docker command builds an image from a Dockerfile in the current directory?",
      "options": [
        "`docker run .`",
        "`docker build -t tag_name .`[cite: 38, 41]",
        "`docker create image`",
        "`docker push .`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker build` reads the Dockerfile in the build context (`.`) to assemble an image[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446319-271-5dtv",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What does the `-d` flag signify when running `docker run -d`?",
      "options": [
        "Delete the container after execution.",
        "Run the container in detached mode (in the background)[cite: 38, 41]",
        "Debug container Python errors.",
        "Disable network port mapping."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Detached mode (`-d`) runs containers in the background, freeing up the terminal prompt[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446319-272-mblo",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does the `-p 5000:5000` flag accomplish in a `docker run` command?",
      "options": [
        "It publishes container logs to CloudWatch.",
        "It maps port 5000 on the host machine to port 5000 inside the container[cite: 38, 41]",
        "It sets the container's private IP address.",
        "It limits RAM consumption to 5000 MB."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Port mapping (`-p host:container`) allows external traffic on the host to reach services running inside the container[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446319-273-8fdd",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Which command opens an interactive shell terminal inside a running container like `flask-api`?",
      "options": [
        "`docker logs flask-api`",
        "`docker exec -it flask-api sh`[cite: 39, 41]",
        "`docker ssh flask-api`",
        "`docker open flask-api`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker exec -it` spawns an interactive shell session (like `sh`) within an active container instance[cite: 39, 41]."
    },
    {
      "id": "q-imp-1794831446319-274-p66v",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command displays logs output by a running or stopped container?",
      "options": [
        "`docker ps`",
        "`docker logs <container_name>`[cite: 39, 41]",
        "`docker inspect`",
        "`docker images`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker logs` prints standard output and error streams generated by the container application[cite: 39, 41]."
    },
    {
      "id": "q-imp-1794831446319-275-47z0",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why do containerized applications require rebuilding Docker images after editing source code?",
      "options": [
        "Because Docker deletes source files automatically.",
        "Because application code is baked into the immutable image layers during build time; running containers use their existing image layers until recreated[cite: 39, 61]",
        "Because Python scripts cannot be modified.",
        "Because host port mappings expire."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker images are read-only templates, so code changes require a new build and container restart to take effect[cite: 39, 61]."
    },
    {
      "id": "q-imp-1794831446319-276-h247",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the purpose of a `.dockerignore` file?",
      "options": [
        "To ignore Python syntax errors",
        "To exclude unnecessary local files and directories from the Docker build context[cite: 36]",
        "To block inbound firewall traffic",
        "To disable container logging"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `.dockerignore` prevents local clutter like `.git` or virtual environments from inflating build transfer sizes[cite: 36]."
    },
    {
      "id": "q-imp-1794831446319-277-n0f0",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What role does GitHub Actions play in modern DevOps workflows?",
      "options": [
        "It hosts relational databases on physical servers.",
        "It provides automated CI/CD pipeline execution runners that trigger tests, builds, and cloud deployments upon code events[cite: 52, 53]",
        "It replaces Git version control.",
        "It manages local Windows PowerShell commands."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** GitHub Actions automates workflows like CI testing and CD deployments directly from repository events[cite: 52, 53]."
    },
    {
      "id": "q-imp-1794831446319-278-l3t6",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary cultural goal of DevOps?",
      "options": [
        "Isolating developers from operations engineers completely.",
        "Breaking down silos between development and operations to foster shared responsibility, collaboration, and rapid quality delivery[cite: 54, 55]",
        "Eliminating all automated testing.",
        "Restricting software releases to once a year."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** DevOps bridges the gap between dev and ops teams to streamline software delivery velocity and stability[cite: 54, 55]."
    },
    {
      "id": "q-imp-1794831446319-279-af1s",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What does the \"C\" in the CALMS DevOps framework represent?",
      "options": [
        "Containerization",
        "Culture[cite: 55]",
        "Continuous Integration",
        "Cloud Storage"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CALMS stands for Culture, Automation, Lean, Measurement, and Sharing[cite: 55]."
    },
    {
      "id": "q-imp-1794831446319-280-t4ol",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does the \"A\" in CALMS stand for?",
      "options": [
        "Availability",
        "Automation[cite: 55]",
        "Architecture",
        "Application"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Automation refers to eliminating manual toil in build, test, and release pipelines[cite: 55]."
    },
    {
      "id": "q-imp-1794831446320-281-ffo3",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What does the \"M\" in CALMS represent?",
      "options": [
        "Migration",
        "Measurement[cite: 55]",
        "Monolith",
        "Microservices"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Measurement tracks performance metrics like deployment frequency, lead time, and MTTR[cite: 55]."
    },
    {
      "id": "q-imp-1794831446320-282-z85s",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does the \"S\" in CALMS stand for?",
      "options": [
        "Security",
        "Sharing[cite: 55]",
        "Storage",
        "Scalability"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Sharing promotes open visibility of tooling, logs, and lessons learned across organizations[cite: 55]."
    },
    {
      "id": "q-imp-1794831446320-283-tx5k",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How do Agile and DevOps complement each other in software delivery?",
      "options": [
        "Agile replaces DevOps entirely.",
        "Agile accelerates business concept-to-code velocity, while DevOps accelerates code into customer hands and production operations[cite: 58]",
        "Agile focuses on operations while DevOps focuses on user UI design.",
        "They have conflicting goals."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Agile and DevOps form a continuous continuum from initial requirement planning through production operations[cite: 58]."
    },
    {
      "id": "q-imp-1794831446320-284-284b",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary benefit of Continuous Integration (CI)?",
      "options": [
        "Deploying code to production without human review.",
        "Detecting integration bugs and code regressions immediately by running automated builds and tests upon every commit[cite: 59, 60]",
        "Eliminating version control systems.",
        "Reducing cloud storage costs."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** CI catches integration conflicts early through automated testing (\"fail fast\")[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831446320-285-wq52",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What differentiates Continuous Delivery from Continuous Deployment?",
      "options": [
        "Continuous Delivery skips automated testing.",
        "Continuous Delivery deploys validated code to staging automatically while requiring a manual approval gate for production; Continuous Deployment automates production releases entirely[cite: 59, 60]",
        "Continuous Deployment is only used for physical servers.",
        "Continuous Delivery takes months per release."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Continuous Deployment removes the manual production approval gate, deploying 100% automatically[cite: 59, 60]."
    },
    {
      "id": "q-imp-1794831446320-286-plug",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary virtualization abstraction layer in a Virtual Machine compared to a Docker Container?",
      "options": [
        "VMs abstract container layers, while containers abstract physical motherboards.",
        "VMs abstract physical hardware via a Hypervisor, whereas containers abstract the host operating system kernel via Docker Engine[cite: 60].",
        "VMs share the host kernel, while containers use Type 1 hypervisors.",
        "There is no architectural difference."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** VMs virtualize hardware and guest OS instances, while containers virtualize OS-level kernel processes[cite: 60]."
    },
    {
      "id": "q-imp-1794831446320-287-03yw",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How do Linux Control Groups (cgroups) contribute to Docker containerization?",
      "options": [
        "By isolating filesystem mounts and process IDs",
        "By limiting and monitoring resource consumption (CPU, RAM, I/O bandwidth) allocated to container processes[cite: 61]",
        "By routing HTTP traffic across Availability Zones",
        "By generating Docker image layers"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** cgroups enforce hard boundaries on physical resource usage per container[cite: 61]."
    },
    {
      "id": "q-imp-1794831446320-288-xul6",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the role of Linux Namespaces in container isolation?",
      "options": [
        "Limiting maximum RAM usage",
        "Isolating system views so a container process only sees its own assigned PIDs, network interfaces, and mounts[cite: 61]",
        "Compiling Python bytecode files",
        "Managing AWS IAM permissions"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Namespaces provide process-level isolation for system resources like network stacks and mount points[cite: 61]."
    },
    {
      "id": "q-imp-1794831446320-289-7g7y",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What happens when a Docker container modifies a file stored in its read-only image layers?",
      "options": [
        "The build fails with an error.",
        "Docker copies the file up into the writable container layer and modifies the copy (Copy-on-Write)[cite: 61, 62]",
        "The underlying image layer is permanently overwritten.",
        "The container shuts down automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Docker uses a Copy-on-Write mechanism, applying runtime changes strictly to the top writable container layer[cite: 61, 62]."
    },
    {
      "id": "q-imp-1794831446320-290-sw5c",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "In a Dockerfile, what does the `WORKDIR` instruction do?",
      "options": [
        "It downloads external GitHub repositories.",
        "It sets the working directory for subsequent instructions inside the container filesystem[cite: 37, 63]",
        "It defines environment variables.",
        "It opens public network ports."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `WORKDIR` establishes the active path context for commands like `COPY`, `RUN`, and `CMD`[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446320-291-7c9q",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "Why is ordering instructions carefully in a Dockerfile critical for build optimization?",
      "options": [
        "To comply with Python syntax standards",
        "To maximize Docker layer caching efficiency by placing frequently changed source code after stable dependency installation steps[cite: 62, 68]",
        "To reduce the length of image names",
        "To bypass VPC security groups"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Strategic instruction ordering prevents unnecessary cache invalidations during builds[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831446320-292-9o9g",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary role of an AWS Application Load Balancer (ALB)?",
      "options": [
        "To store database backups",
        "To route incoming HTTP/S traffic across target instances across multiple Availability Zones at Layer 7[cite: 71, 92]",
        "To manage SSH key pairs",
        "To provision custom VPC subnets"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ALBs provide intelligent application-layer load balancing across redundant backend servers[cite: 71, 92]."
    },
    {
      "id": "q-imp-1794831446320-293-zx9c",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the purpose of an ALB Target Group health check path (e.g., `/api/products`)?",
      "options": [
        "To serve static images to end users",
        "To periodically probe backend instances to ensure application health, routing traffic away from failing servers[cite: 80, 92]",
        "To compile Python REST code",
        "To encrypt S3 object storage"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Health checks continuously monitor backend endpoint availability to ensure robust traffic routing[cite: 80, 92]."
    },
    {
      "id": "q-imp-1794831446320-294-p9gy",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is a Virtual Private Cloud (VPC)?",
      "options": [
        "A public website hosted on S3",
        "An isolated private virtual network dedicated to your AWS account, mirroring an on-premise network in software[cite: 72, 98]",
        "A physical data center in Mumbai",
        "A serverless container engine"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** A VPC provides isolated virtual networking, subnets, and gateways for secure cloud architectures[cite: 72, 98]."
    },
    {
      "id": "q-imp-1794831446320-295-57jz",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "How do AWS Security Groups and Network ACLs differ in scope and evaluation?",
      "options": [
        "Security Groups apply to subnets and are stateless; NACLs apply to instances and are stateful.",
        "Security Groups act as stateful firewalls at the individual EC2 instance level, whereas NACLs act as stateless firewalls evaluated sequentially at the subnet boundary[cite: 100].",
        "There is no functional difference between them.",
        "NACLs are managed exclusively by Azure."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Security Groups operate statefully per instance, while NACLs operate statelessly per subnet[cite: 100]."
    },
    {
      "id": "q-imp-1794831446320-296-k3tj",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is an Amazon Elastic Block Store (EBS) volume?",
      "options": [
        "A globally distributed NoSQL database",
        "A high-performance, persistent block storage disk attached to EC2 instances as a local filesystem volume[cite: 100]",
        "An S3 object storage bucket",
        "A serverless compute runtime"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EBS provides raw block storage volumes attached to virtual machines for operating systems and databases[cite: 100]."
    },
    {
      "id": "q-imp-1794831446320-297-tf69",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary architectural difference between Block Storage (EBS) and Object Storage (S3)?",
      "options": [
        "Block storage uses HTTP REST APIs while object storage attaches via local SCSI cables.",
        "Block storage provides raw disk blocks supporting in-place modifications for databases/OSs, whereas object storage stores complete immutable objects accessible via HTTP REST APIs[cite: 100].",
        "Object storage has a maximum size of 64 TiB.",
        "There is no difference in data units."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Block storage handles transactional filesystem blocks, while object storage manages immutable files with metadata via REST APIs[cite: 100]."
    },
    {
      "id": "q-imp-1794831446320-298-83iy",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is AWS Lambda?",
      "options": [
        "A relational database engine",
        "A serverless event-driven compute service that executes code without managing servers[cite: 102]",
        "A virtual machine container registry",
        "A network load balancer"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** AWS Lambda runs backend code in response to events with automatic scaling and pay-per-millisecond billing[cite: 102]."
    },
    {
      "id": "q-imp-1794831446320-299-andj",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the maximum execution timeout limit for a single AWS Lambda function invocation?",
      "options": [
        "60 seconds",
        "5 minutes",
        "15 minutes[cite: 102]",
        "24 hours"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** AWS Lambda enforces a 15-minute execution timeout limit per individual function invocation[cite: 102]."
    },
    {
      "id": "q-imp-1794831446320-300-28ai",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an S3 event notification configured with a bucket root prefix create an infinite recursive invocation loop when a Lambda function processes uploaded files?",
      "options": [
        "Because S3 objects are encrypted multiple times during copy operations.",
        "Because copying a file to a destination prefix and deleting the original both generate new `ObjectCreated` events that match a bucket-wide root trigger, continuously re-triggering the function.",
        "Because Python Lambda functions cannot execute asynchronous loops.",
        "Because the Lambda execution role lacks `s3:PutObject` permissions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** If the trigger listens to the entire bucket, the function's own destination copies generate new object creation events that re-invoke the Lambda function infinitely[cite: 3, 13]."
    },
    {
      "id": "q-imp-1794831446320-301-41up",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What specific operational risk occurs if a Lambda file-organizing function executes `s3.delete_object()` before `s3.copy_object()` completes successfully?",
      "options": [
        "The S3 bucket automatically enters versioning recovery mode.",
        "Data loss can occur if the copy operation fails after the source object has already been deleted.",
        "The Lambda execution role automatically revokes its IAM inline policy.",
        "S3 triggers an infinite recursive loop."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The function must copy first; if deletion precedes copying and the copy fails, it results in permanent data loss[cite: 8]."
    },
    {
      "id": "q-imp-1794831446320-302-z05v",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How does S3 handle file path and space encoding in event notifications, and why must Python Lambda code use `urllib.parse.unquote_plus()`?",
      "options": [
        "S3 converts all filenames to lowercase hexadecimal strings.",
        "S3 event notifications URL-encode object keys, representing spaces as `+` or percent-encoded characters, which must be decoded before processing file keys[cite: 10, 12].",
        "S3 automatically strips all special characters from incoming filenames.",
        "URL-encoding is only required when uploading files via PowerShell."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 event notifications URL-encode object keys where spaces appear as `+`, requiring explicit decoding via `unquote_plus()`[cite: 10, 12]."
    },
    {
      "id": "q-imp-1794831446320-303-7s1k",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does the IAM inline policy resource ARN for the S3 file organizer end with `/*` instead of referencing the bucket root?",
      "options": [
        "To grant global administrator access across all S3 buckets in the AWS account.",
        "To restrict permissions specifically to objects within the specified bucket rather than every bucket in the account[cite: 6, 7].",
        "To allow the Lambda function to delete the S3 bucket itself.",
        "To enable public read access on uploaded documents."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Appending `/*` ensures the policy applies strictly to objects inside the target bucket according to the principle of least privilege[cite: 6, 7]."
    },
    {
      "id": "q-imp-1794831446320-304-8nhy",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What architectural limitation prevents S3 from providing a single, atomic file \"move\" operation across prefixes?",
      "options": [
        "S3 is a relational database management system.",
        "S3 does not have traditional filesystem folders; objects are stored with independent keys, requiring an explicit copy followed by a delete[cite: 2, 8].",
        "S3 restricts object creation to the root directory only.",
        "Python SDK boto3 does not support object copying."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Because S3 stores objects with flat key prefixes rather than hierarchical directories, moves require copying to a new key and deleting the original[cite: 2, 8]."
    },
    {
      "id": "q-imp-1794831446320-305-u3oc",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does Windows Command Prompt (CMD) require explicit virtual environment activation (`.venv\\Scripts\\activate.bat`) whereas Linux shells use `source`?",
      "options": [
        "Because CMD does not support Python 3.",
        "Because virtual environment activation scripts are platform-specific batch scripts (`.bat`) tailored for Windows CMD syntax rather than POSIX shell scripts[cite: 21].",
        "Because Windows restricts Python script execution permissions entirely.",
        "Because PowerShell and CMD share identical execution parsers."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Windows command prompt executes `.bat` script wrappers to modify shell path variables for the virtual environment[cite: 21]."
    },
    {
      "id": "q-imp-1794831446320-306-t7g0",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the underlying reason behind a Git non-fast-forward push rejection when two developers push to the same remote branch?",
      "options": [
        "The local repository lacks an internet connection.",
        "The remote branch contains commits that the local history lacks, protecting remote history from being overwritten by an unrelated update[cite: 33, 42].",
        "The local user lacks `git add` permissions.",
        "The commit message exceeds SHA-1 character limits."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Non-fast-forward rejections prevent local pushes from overwriting unseen remote commits made by other contributors[cite: 33, 42]."
    },
    {
      "id": "q-imp-1794831446320-307-46ll",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why is running `git push --force` strongly discouraged as a routine fix for a rejected push in a team environment?",
      "options": [
        "It permanently deletes the local `.git` directory.",
        "It forcefully overwrites remote history, potentially erasing commits and work published by other team members[cite: 34].",
        "It converts the Git repository into a centralized Subversion server.",
        "It automatically downgrades the installed Git version."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Force-pushing discards remote work blindly, breaking collaboration history for other contributors[cite: 34]."
    },
    {
      "id": "q-imp-1794831446320-308-4rzy",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How does `git fetch` fundamentally differ from `git pull` regarding local working tree safety?",
      "options": [
        "`git fetch` automatically merges remote commits into the working tree, whereas `git pull` requires manual confirmation.",
        "`git fetch` downloads remote history and updates remote-tracking references without modifying your current branch or working tree, whereas `git pull` fetches and immediately integrates changes[cite: 30, 31, 51].",
        "`git fetch` requires a GitHub personal access token, while `git pull` does not.",
        "There is no functional difference between them."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git fetch` is entirely safe because it only updates local tracking references without altering working files[cite: 30, 31, 51]."
    },
    {
      "id": "q-imp-1794831446320-309-6rdc",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What happens during a Git 3-Way Merge when both branches have modified the exact same line in a file?",
      "options": [
        "Git automatically selects the most recent commit timestamp.",
        "Git pauses the merge, marks the file with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), and requires manual resolution and staging[cite: 27, 50].",
        "Git deletes the conflicting file from both branches.",
        "Git aborts the repository initialization."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Conflicting edits on identical lines trigger Git conflict pauses requiring manual intervention and resolution[cite: 27, 50]."
    },
    {
      "id": "q-imp-1794831446320-310-ruc7",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In a Dockerfile, why does placing `COPY requirements.txt .` and `RUN pip install` before copying source code optimize build times?",
      "options": [
        "It ensures Python dependencies are installed outside the container.",
        "It leverages Docker layer caching so that dependency installation layers are reused when only application source code changes[cite: 62, 68].",
        "It reduces the size of the `.git` directory.",
        "It prevents container root privilege escalation."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Caching layer re-use avoids slow, redundant pip installs when source code updates occur independently of dependencies[cite: 62, 68]."
    },
    {
      "id": "q-imp-1794831446320-311-eq45",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What mechanism allows Docker containers to achieve near-native execution performance compared to traditional Virtual Machines?",
      "options": [
        "Hardware virtualization hypervisors emulating physical BIOS chips.",
        "OS-level virtualization sharing the host operating system kernel directly, avoiding the overhead of booting a full guest OS[cite: 60].",
        "Dedicated physical RAM allocation per container.",
        "Translating container binaries into Java bytecode."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Containers bypass guest OS overhead by sharing the host kernel directly through OS virtualization[cite: 60]."
    },
    {
      "id": "q-imp-1794831446320-312-7hew",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How do Linux Control Groups (`cgroups`) restrict resource consumption in Docker containers?",
      "options": [
        "By encrypting filesystem storage blocks.",
        "By imposing hard resource limits on CPU cores, RAM allocation, and I/O bandwidth assigned to isolated process groups[cite: 61].",
        "By routing container network traffic through NAT gateways.",
        "By managing S3 bucket object ownership."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** cgroups regulate physical resource utilization limits for containerized processes[cite: 61]."
    },
    {
      "id": "q-imp-1794831446320-313-jvxh",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the function of Linux Namespaces in Docker container architecture?",
      "options": [
        "Limiting maximum CPU clock speeds.",
        "Isolating system view perspectives so a containerized process sees exclusively its own process IDs, network interfaces, and filesystem mounts[cite: 61].",
        "Compiling Dockerfile instructions into image layers.",
        "Managing SSH public key authentication."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Namespaces provide isolated system resource visibility for container processes[cite: 61]."
    },
    {
      "id": "q-imp-1794831446320-314-rutd",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In Docker storage mechanics, how does the Copy-on-Write (CoW) pattern operate when a running container modifies a file in a read-only image layer?",
      "options": [
        "The container crashes due to filesystem write protection.",
        "Docker copies the target file from the read-only image layer up into the thin writable container layer and applies modifications to that copy[cite: 61, 62].",
        "The base image layer is permanently overwritten on disk.",
        "The file is uploaded automatically to Amazon S3."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Copy-on-Write ensures base image layers remain pristine while modifications occur inside the writable runtime layer[cite: 61, 62]."
    },
    {
      "id": "q-imp-1794831446320-315-edt7",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why must the ALB Security Group (`flask-alb-sg`) allow inbound traffic on port 80 from anywhere (`0.0.0.0/0`), whereas the EC2 Security Group (`flask-ec2-sg`) restricts port 8000 strictly to the ALB security group?",
      "options": [
        "To comply with AWS IAM role expiration rules.",
        "To allow public clients to reach the load balancer while preventing external users from bypassing the ALB and accessing backend EC2 instances directly[cite: 74, 75].",
        "Because Lambda functions require public port 80 access.",
        "To enable S3 bucket event notifications."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Restricting EC2 inbound rules to accept traffic only from the ALB security group enforces secure architecture best practices[cite: 74, 75]."
    },
    {
      "id": "q-imp-1794831446320-316-srsv",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In the AWS ALB lab, what happens if an EC2 instance target fails the target group's health check path (`/api/products`) consecutively beyond the unhealthy threshold?",
      "options": [
        "The EC2 instance is terminated automatically by IAM.",
        "The load balancer automatically deregisters or stops routing client traffic to that unhealthy instance until it passes subsequent health checks[cite: 80, 92].",
        "The VPC route table deletes the Internet Gateway.",
        "Gunicorn restarts the Flask application."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** ALB health checks remove unhealthy targets from the routing pool dynamically to maintain system reliability[cite: 80, 92]."
    },
    {
      "id": "q-imp-1794831446320-317-2ayl",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer require target instances to be deployed across at least two Availability Zones?",
      "options": [
        "To reduce hourly EC2 instance pricing.",
        "To guarantee high availability and fault tolerance so that traffic routing continues uninterrupted if an entire data center zone experiences an outage[cite: 73].",
        "To satisfy S3 object versioning requirements.",
        "To enable SQL database replication."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Multi-AZ ALB deployment ensures high availability across independent physical data center zones[cite: 73]."
    },
    {
      "id": "q-imp-1794831446320-318-l6jw",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the exact routing role of an Internet Gateway (IGW) in an AWS custom VPC?",
      "options": [
        "It manages relational database transactions.",
        "It provides bi-directional network address translation (NAT) between private IP addresses within VPC subnets and public internet IP addresses[cite: 73, 74].",
        "It compiles Python Flask REST APIs.",
        "It enforces IAM least-privilege policies."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An IGW acts as the VPC router bridging internal subnets with the external public internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831446320-319-e4km",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does Windows OpenSSH reject `.pem` private key permissions if they are too permissive, requiring explicit restriction commands (`icacls`)?",
      "options": [
        "Because Windows does not support RSA keys.",
        "To prevent unauthorized local user accounts from reading private cryptographic keys, protecting SSH authentication integrity[cite: 78].",
        "Because Git Bash overwrites `.pem` files upon opening.",
        "Because AWS EC2 encrypts keys automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** OpenSSH mandates strict file permission restrictions on private keys to prevent unauthorized local access[cite: 78]."
    },
    {
      "id": "q-imp-1794831446320-320-y2q1",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How does mathematical availability calculate across multi-AZ redundant systems compared to single-instance deployments?",
      "options": [
        "Availability is averaged across all connected instances.",
        "Simultaneous failure probability multiplies (e.g., $0.001 \\times 0.001$), drastically increasing total system availability uptime percentages (e.g., six nines)[cite: 89].",
        "Availability decreases due to network transit latency.",
        "Multi-AZ deployment has zero impact on SLA calculations."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Parallel redundancy multiplies independent failure probabilities, exponentially increasing overall system uptime availability[cite: 89]."
    },
    {
      "id": "q-imp-1794831446320-321-t20j",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the distinction between Fault Tolerance (FT) and High Availability (HA) in cloud architecture?",
      "options": [
        "FT minimizes recovery time to minutes, while HA requires manual intervention.",
        "HA focuses on minimizing downtime with rapid recovery, whereas FT achieves zero downtime through redundant hot standbys that absorb failures instantly without interruption[cite: 89].",
        "FT applies only to storage volumes, while HA applies to S3 buckets.",
        "There is no architectural distinction between them."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** High availability minimizes recovery duration, while fault tolerance ensures continuous operation without service interruption during component failure[cite: 89]."
    },
    {
      "id": "q-imp-1794831446320-322-r8zp",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In cloud capacity planning, what specific risk does \"Cloud Sprawl\" introduce to enterprise organizations?",
      "options": [
        "Immediate hardware obsolescence across physical data centers.",
        "Uncontrolled accumulation of orphaned virtual machines, idle databases, and unattached storage disks resulting in unexpected financial \"bill shock\"[cite: 125].",
        "Permanent loss of S3 object durability.",
        "Automatic revocation of AWS IAM administrative roles."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cloud sprawl leads to severe financial waste from unmonitored and forgotten idle cloud assets[cite: 125]."
    },
    {
      "id": "q-imp-1794831446320-323-enkt",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does adopting proprietary vendor-specific APIs (such as specialized serverless streams) complicate multi-cloud migration strategies?",
      "options": [
        "Proprietary APIs run exclusively on physical mainframes.",
        "It creates severe vendor lock-in, making migration to alternative cloud providers or on-premise infrastructure economically and architecturally prohibitive[cite: 125].",
        "Proprietary APIs violate NIST essential characteristics.",
        "It forces the use of SOAP XML protocols."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Proprietary vendor services tightly couple application logic to a single cloud provider, raising migration barriers[cite: 125]."
    },
    {
      "id": "q-imp-1794831446320-324-srp6",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What underlying architectural mechanism enables serverless architectures (like AWS Lambda) to \"scale to zero\"?",
      "options": [
        "Permanent background virtual machine allocation.",
        "Decoupling compute execution from persistent server allocation, allowing the provider to provision and terminate micro-VM environments dynamically based strictly on incoming event invocations[cite: 91, 102].",
        "Automatic database sharding across S3 buckets.",
        "Eliminating the need for IAM security roles."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Serverless design abstracts server provisioning, allowing infrastructure scaling down to absolute zero resource consumption when idle[cite: 91, 102]."
    },
    {
      "id": "q-imp-1794831446320-325-t51c",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In Microsoft Azure resource management, what is the hierarchical relationship between Management Groups, Subscriptions, and Resource Groups?",
      "options": [
        "Resource Groups contain Management Groups, which contain Subscriptions.",
        "Management Groups govern multiple Subscriptions, Subscriptions act as billing/access boundaries, and Subscriptions contain Resource Groups holding specific resources[cite: 103].",
        "Subscriptions operate independently without Resource Groups.",
        "Resource Groups govern global cloud regions directly."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure governance flows hierarchically from Management Groups down through Subscriptions and Resource Groups[cite: 103]."
    },
    {
      "id": "q-imp-1794831446320-326-6fxz",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why is Azure Cosmos DB classified as a globally distributed NoSQL database rather than a traditional relational database?",
      "options": [
        "It requires SQL Server licenses.",
        "It offers multi-model data structures, horizontal partitioning, and multi-region replication delivering single-digit millisecond latencies without rigid relational schema enforcement[cite: 103].",
        "It stores data exclusively in immutable S3 buckets.",
        "It supports block storage disk attachments only."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cosmos DB provides distributed NoSQL capabilities designed for planet-scale low-latency workloads[cite: 103]."
    },
    {
      "id": "q-imp-1794831446320-327-epyb",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How does Azure Files differ from Azure Blob Storage regarding workload mounting?",
      "options": [
        "Azure Files is object storage accessed via REST APIs only.",
        "Azure Files provides fully managed SMB and NFS cloud file shares mountable directly by standard operating system clients, whereas Blob Storage is unstructured object storage[cite: 104].",
        "Azure Files attaches only to relational SQL databases.",
        "Azure Blob Storage supports Linux kernel booting."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Azure Files acts as a cloud file share supporting standard file protocols (SMB/NFS), unlike object-based Blob Storage[cite: 104]."
    },
    {
      "id": "q-imp-1794831446320-328-zqb1",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What specific function does Azure Log Analytics perform when paired with Kusto Query Language (KQL)?",
      "options": [
        "It compiles container Dockerfiles.",
        "It enables high-speed expressive querying and telemetry analysis across massive collections of centralized logs and metrics[cite: 105].",
        "It provisions custom virtual networks.",
        "It manages SSH key pair permissions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Log Analytics uses KQL to execute rapid analytical queries against aggregated cloud telemetry[cite: 105]."
    },
    {
      "id": "q-imp-1794831446320-329-7m2u",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Under the NIST definition of cloud computing, what distinguishes \"Measured Service\" from traditional IT billing?",
      "options": [
        "Measured service applies strictly to physical hardware purchases.",
        "Resource usage is monitored, controlled, and metered transparently, enabling transparent pay-per-use consumption models for both provider and consumer[cite: 113, 114].",
        "Measured service requires fixed annual subscription fees.",
        "It eliminates cloud cost tracking entirely."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Measured service provides precise metering of resource consumption for usage-based billing[cite: 113, 114]."
    },
    {
      "id": "q-imp-1794831446320-330-9thb",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why did enterprise data centers in the 1980s-1990s suffer from extremely low average server utilization (10-15%)?",
      "options": [
        "Because hypervisors were not invented yet.",
        "Because organizations had to procure and maintain physical servers sized strictly for peak seasonal capacity demands, leaving hardware idle during off-peak times[cite: 109].",
        "Because client workstations handled all database storage.",
        "Because operating systems lacked TCP/IP networking."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Static physical server provisioning for peak loads forced hardware to sit idle during normal operations[cite: 109]."
    },
    {
      "id": "q-imp-1794831446320-331-31cp",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What technological breakthrough in the 2000s served as the primary technical catalyst enabling commercial cloud computing?",
      "options": [
        "The invention of HTML web browsers.",
        "Mature hypervisor virtualization enabling multi-tenant isolation and hardware abstraction on commodity servers[cite: 112].",
        "The creation of the SOAP protocol.",
        "The deprecation of Linux operating systems."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtualization allowed multiple isolated virtual servers to run on shared physical hardware, powering utility cloud computing[cite: 112]."
    },
    {
      "id": "q-imp-1794831446320-332-xhr4",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How do Network Access Control Lists (NACLs) differ fundamentally from Security Groups regarding statelessness?",
      "options": [
        "NACLs track active connection states automatically.",
        "NACLs are stateless firewalls requiring explicit inbound and outbound rules for return traffic, whereas Security Groups are stateful and auto-permit return packets[cite: 100].",
        "NACLs apply exclusively to individual EC2 instances.",
        "Security Groups require sequential numerical rule evaluation."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NACLs evaluate stateless rules sequentially and require explicit rules for return network traffic[cite: 100]."
    },
    {
      "id": "q-imp-1794831446320-333-iwns",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the operational purpose of Amazon EBS volume snapshots?",
      "options": [
        "To host serverless Lambda functions.",
        "To create point-in-time, incremental backups of block storage volumes stored securely in Amazon S3 for disaster recovery[cite: 100].",
        "To translate domain names into IP addresses.",
        "To monitor CPU utilization metrics."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EBS snapshots capture incremental block storage data states for persistent backup and volume restoration[cite: 100]."
    },
    {
      "id": "q-imp-1794831446320-334-x09f",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why is gRPC significantly faster than REST for internal microservice communication?",
      "options": [
        "Because REST uses binary Protocol Buffers.",
        "Because gRPC leverages multiplexed HTTP/2 streams and compact binary serialization (Protobuf), avoiding heavy text-based JSON parsing overhead[cite: 125, 126].",
        "Because gRPC operates without network transport layers.",
        "Because SOAP XML protocols replace HTTP."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Binary serialization over multiplexed HTTP/2 gives gRPC substantial performance and latency advantages over text-based REST[cite: 125, 126]."
    },
    {
      "id": "q-imp-1794831446320-335-1a9g",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the primary security implication of a misconfigured S3 bucket ACL granting public write access?",
      "options": [
        "S3 converts all stored objects into block storage volumes.",
        "Unauthorized external attackers can upload malicious files, overwrite existing objects, or incur massive financial damage via storage abuse.",
        "The Lambda function stops executing Python scripts.",
        "CloudWatch logs stop recording execution metrics."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public write exposure allows malicious external actors to manipulate bucket contents arbitrarily."
    },
    {
      "id": "q-imp-1794831446320-336-1wnm",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How does git handle file tracking changes when comparing working trees to commits?",
      "options": [
        "Git tracks file deltas exclusively like Subversion.",
        "Git tracks cryptographic snapshots (blobs and trees) of the entire project state rather than line-by-line file deltas[cite: 47].",
        "Git stores all history inside temporary RAM buffers.",
        "Git relies on operating system filesystem modification dates."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Git's architecture captures immutable content snapshots (snapshots vs deltas) for every commit[cite: 47]."
    },
    {
      "id": "q-imp-1794831446320-337-8g78",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the exact function of the `.git` directory in a local repository root?",
      "options": [
        "It contains temporary compiled Python bytecode.",
        "It houses Git's internal database storing immutable commit objects, trees, blobs, and branch references[cite: 47].",
        "It stores GitHub personal access tokens.",
        "It acts as the staging area index buffer."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The hidden `.git` folder contains the entire repository history, metadata, and database objects[cite: 47]."
    },
    {
      "id": "q-imp-1794831446320-338-84r4",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an Auto-Scaling Group implement a Cooldown Period after executing a scaling action?",
      "options": [
        "To allow physical server cooling fans to slow down.",
        "To prevent rapid scale-out/scale-in oscillation (\"flapping\") by pausing further scaling evaluations while newly provisioned instances initialize and stabilize[cite: 93].",
        "To reset CloudWatch billing alarms.",
        "To drain S3 object storage queues."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Cooldown periods prevent erratic scaling thrashing by allowing newly launched instances time to stabilize metrics[cite: 93]."
    },
    {
      "id": "q-imp-1794831446320-339-k9yi",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What distinguishes Predictive Scaling from Dynamic Scaling in cloud architectures?",
      "options": [
        "Dynamic scaling uses machine learning models to forecast future traffic, while predictive scaling reacts to current CPU alarms.",
        "Predictive scaling uses machine learning to analyze historical traffic patterns and launch instances proactively before demand surges, whereas dynamic scaling reacts to real-time metric thresholds[cite: 93].",
        "Predictive scaling operates exclusively on physical mainframes.",
        "Dynamic scaling requires manual scheduling."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Predictive scaling anticipates traffic spikes proactively via ML models, complementing reactive dynamic scaling[cite: 93]."
    },
    {
      "id": "q-imp-1794831446320-340-6yau",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In AWS IAM policy structures, what is the evaluation outcome if a request matches both an explicit `Deny` and an explicit `Allow`?",
      "options": [
        "`Allow` overrides `Deny`.",
        "`Deny` takes absolute precedence; explicit deny statements override any allowed permissions[cite: 7].",
        "The request triggers an infinite recursive loop.",
        "AWS prompts the user for MFA verification."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IAM policy evaluation enforces a strict default-deny model where an explicit deny always overrides allows[cite: 7]."
    },
    {
      "id": "q-imp-1794831446320-341-hdmg",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the function of an AWS VPC NAT Instance compared to a managed NAT Gateway?",
      "options": [
        "NAT instances run serverless Lambda functions.",
        "A NAT instance is a user-managed EC2 virtual server performing network address translation, whereas a NAT Gateway is a fully managed, highly available AWS service[cite: 90, 99].",
        "NAT instances replace Internet Gateways entirely.",
        "NAT gateways require manual Linux OS security patching."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** NAT gateways provide managed high-availability NAT, whereas NAT instances require manual EC2 server management[cite: 90, 99]."
    },
    {
      "id": "q-imp-1794831446320-342-f9dk",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why must Python Flask REST API applications bind explicitly to host `0.0.0.0` when containerized in Docker rather than `127.0.0.1`?",
      "options": [
        "To encrypt HTTP requests using TLS 1.3.",
        "Binding to `127.0.0.1` restricts traffic to the container's internal loopback interface, whereas `0.0.0.0` binds to all network interfaces, allowing traffic from host port mappings (`-p`)[cite: 22].",
        "Because Docker does not support localhost loopbacks.",
        "To bypass Windows Firewall restrictions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `0.0.0.0` ensures the Flask server listens externally on container network interfaces bridged to the host[cite: 22]."
    },
    {
      "id": "q-imp-1794831446320-343-w1yi",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What specific security vulnerability does `.dockerignore` prevent during container image builds?",
      "options": [
        "SQL injection attacks against Flask routes.",
        "Preventing accidental inclusion of local sensitive environment files (`.env`), SSH keys, or Git metadata inside built container image layers[cite: 36].",
        "Unauthorized S3 bucket write access.",
        "Operating system kernel panics."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Excluding sensitive local files via `.dockerignore` prevents embedding credentials inside immutable image layers[cite: 36]."
    },
    {
      "id": "q-imp-1794831446320-344-4t2a",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "How does git handle deleted tracked files when preparing a commit?",
      "options": [
        "Git ignores deleted files until the repository is reinitialized.",
        "Deletions must be staged (via `git add` or `git rm`) to record the removal in the next commit snapshot[cite: 47, 48].",
        "Git restores deleted files automatically from remote tracking branches.",
        "Deleted files trigger immediate merge conflict pauses."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** File removals are tracked changes that must be staged to update the repository snapshot[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831446320-345-l67x",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the primary purpose of an AWS S3 Lifecycle Policy?",
      "options": [
        "To execute serverless Python scripts upon file upload.",
        "To automate transitioning objects between storage classes (e.g., Standard to Glacier) or expiring old data to optimize storage costs.",
        "To balance HTTP traffic across Availability Zones.",
        "To encrypt data streams in transit."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Lifecycle policies automate cost-efficient storage tier migrations and object expiration rules over time."
    },
    {
      "id": "q-imp-1794831446320-346-707t",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer support Path-Based Routing (e.g., routing `/api/*` to one target group and `/static/*` to another)?",
      "options": [
        "To bypass VPC security groups.",
        "To enable microservice architectures where different URL paths route requests to distinct backend target groups behind a single load balancer entry point[cite: 92].",
        "To convert REST APIs into SOAP XML protocols.",
        "To eliminate the need for DNS routing."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Layer 7 path-based routing directs client requests to specialized microservices based on URL URI paths[cite: 92]."
    },
    {
      "id": "q-imp-1794831446320-347-y7gp",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the architectural role of a Bastion Host (Jump Box) in a secure cloud VPC?",
      "options": [
        "To store enterprise relational databases.",
        "A hardened, publicly accessible EC2 instance placed in a public subnet used solely to route secure, audited SSH administrative access into private subnet instances.",
        "To act as an Application Load Balancer.",
        "To host serverless Lambda functions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bastion hosts secure administrative entry points into private subnets without exposing backend servers directly[cite: 74, 99]."
    },
    {
      "id": "q-imp-1794831446320-348-7bjb",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "In Docker container networking, what is a bridge network?",
      "options": [
        "A physical network cable connecting two Docker hosts.",
        "A private software-defined bridge created by Docker on the host, allowing containers connected to it to communicate with each other while isolated from external networks unless published[cite: 38].",
        "A public IP address assigned to S3 buckets.",
        "A type of NFS file share."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Bridge networks provide isolated internal networking for containers running on the same host Docker daemon[cite: 38]."
    },
    {
      "id": "q-imp-1794831446320-349-x4w6",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What operational challenge does \"Vendor Lock-In\" present to cloud engineering teams?",
      "options": [
        "Inability to use Python programming languages.",
        "High financial and technical switching costs when attempting to migrate applications away from proprietary cloud provider APIs and managed services[cite: 125].",
        "Mandatory hardware depreciation schedules.",
        "Elimination of automated CI/CD pipelines."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Vendor lock-in restricts architectural flexibility by binding systems tightly to proprietary cloud ecosystem features[cite: 125]."
    },
    {
      "id": "q-imp-1794831446320-350-qlvj",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which command displays the current working tree status in Git, showing staged, unstaged, and untracked files?",
      "options": [
        "`git log`",
        "`git status`[cite: 24, 47]",
        "`git diff`",
        "`git commit`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git status` reports the exact state of your working directory and staging index[cite: 24, 47]."
    },
    {
      "id": "q-imp-1794831446320-351-npvr",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary purpose of a Python virtual environment (`.venv`) in software development projects?",
      "options": [
        "To compile Python scripts into binary machine code.",
        "To isolate project-specific dependencies and packages from the global system Python installation, avoiding version collisions[cite: 21].",
        "To encrypt source code files on disk.",
        "To automate GitHub pull request reviews."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Virtual environments encapsulate package dependencies per project to maintain clean, isolated execution runtimes[cite: 21]."
    },
    {
      "id": "q-imp-1794831446320-352-mbfs",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does the `FROM` instruction specify in a Dockerfile?",
      "options": [
        "The author of the container image.",
        "The parent base image (e.g., Python or Alpine) upon which all subsequent layers are built[cite: 37, 63].",
        "The network port exposed by the container.",
        "The database connection string."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `FROM` establishes the foundational operating system or runtime layer for building custom Docker images[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446320-353-xr4q",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer perform TLS termination at the load balancer level rather than passing encrypted HTTPS traffic directly to backend EC2 instances?",
      "options": [
        "Because EC2 instances lack network cards.",
        "To offload heavy cryptographic decryption overhead from backend application servers, simplifying certificate management and centralizing secure entry points.",
        "Because S3 buckets cannot process encrypted data.",
        "To violate VPC security group rules."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** TLS termination offloads CPU-intensive SSL/TLS decryption processing from backend compute instances."
    },
    {
      "id": "q-imp-1794831446320-354-jd6h",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of an Amazon S3 bucket?",
      "options": [
        "To run Linux virtual machines.",
        "To store and organize files as objects within a globally unique namespace[cite: 100].",
        "To process SQL database queries.",
        "To route public DNS traffic."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 buckets serve as the primary cloud container storage units for unstructured objects[cite: 100]."
    },
    {
      "id": "q-imp-1794831446320-355-yb4w",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the difference between `git add` and `git commit`?",
      "options": [
        "`git add` saves history permanently; `git commit` stages files.",
        "`git add` moves changes from the working directory into the staging area, whereas `git commit` permanently locks staged changes into repository history as a new snapshot[cite: 47, 48].",
        "Both commands perform identical operations.",
        "`git commit` uploads changes to GitHub automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Staging via `git add` prepares snapshots, while committing via `git commit` records them permanently in repository history[cite: 47, 48]."
    },
    {
      "id": "q-imp-1794831446320-356-a43b",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command lists all locally available Docker container images on your machine?",
      "options": [
        "`docker ps`",
        "`docker images`[cite: 38, 41]",
        "`docker inspect`",
        "`docker run`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker images` outputs a catalog of locally stored container images, tags, and sizes[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446320-357-0wge",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what does the `debug=False` setting in `app.run()` control regarding production security?",
      "options": [
        "It disables database connections.",
        "Disabling debug mode prevents the interactive browser debugger from exposing sensitive traceback execution code and environment variables if an exception occurs in production.",
        "It forces Flask to run on port 80 only.",
        "It enables S3 event logging."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Leaving debug mode enabled in production is a severe security risk; `debug=False` secures runtime execution errors."
    },
    {
      "id": "q-imp-1794831446320-358-07qm",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary role of an AWS Internet Gateway?",
      "options": [
        "To store database backups.",
        "To connect a VPC's public subnets to the external public Internet for bi-directional communication[cite: 73, 74].",
        "To execute serverless Lambda functions.",
        "To balance load across instances."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** An Internet Gateway bridges internal VPC traffic with the external public internet[cite: 73, 74]."
    },
    {
      "id": "q-imp-1794831446320-359-v3oh",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What specific operational failure occurs if an S3 Event Notification trigger is created without specifying an `incoming/` prefix filter in the file-organizing lab?",
      "options": [
        "S3 deletes all files instantly.",
        "The Lambda function triggers itself infinitely upon writing destination files, causing a recursive invocation storm[cite: 3, 13].",
        "Python Flask REST APIs fail to compile.",
        "The IAM role loses `s3:GetObject` permissions."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Without prefix filtering, destination copies trigger new object events that re-invoke the Lambda function endlessly[cite: 3, 13]."
    },
    {
      "id": "q-imp-1794831446320-360-b76j",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which command clones a remote repository from GitHub to your local computer?",
      "options": [
        "`git init`",
        "`git clone <URL>`[cite: 31, 51]",
        "`git pull origin`",
        "`git remote add`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `git clone` downloads a complete working repository clone from a remote URL[cite: 31, 51]."
    },
    {
      "id": "q-imp-1794831446320-361-r4mr",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the function of the `EXPOSE` instruction in a Dockerfile?",
      "options": [
        "It automatically opens firewall ports on the host machine.",
        "It serves as documentation indicating which network port the application listens on inside the container[cite: 37, 38].",
        "It starts the application server automatically.",
        "It encrypts container environment variables."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `EXPOSE` documents expected container network ports for operators, though publishing requires `-p` at runtime[cite: 37, 38]."
    },
    {
      "id": "q-imp-1794831446320-362-jema",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does PaaS stand for in cloud computing service delivery models?",
      "options": [
        "Public Application Security Service",
        "Platform as a Service[cite: 119, 120]",
        "Private Automated Storage System",
        "Primary Access Software"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** PaaS delivers managed runtime environments where developers deploy code without administering OS layers[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446320-363-pvfy",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an AWS Application Load Balancer require a Target Group to define both a specific Protocol (HTTP) and Port (e.g., 8000)?",
      "options": [
        "To encrypt S3 object storage buckets.",
        "To inform the load balancer precisely how to forward decrypted client requests to backend compute instances listening on that specific application port[cite: 80].",
        "To configure EC2 Key Pair authentication.",
        "To establish IAM role policies."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Target groups specify protocol and port configurations so the ALB routes traffic correctly to backend servers[cite: 80]."
    },
    {
      "id": "q-imp-1794831446320-364-9a4h",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command stops a running Docker container gracefully?",
      "options": [
        "`docker kill`",
        "`docker stop <container>`[cite: 39, 64]",
        "`docker rm <container>`[cite: 39, 64]",
        "`docker pause <container>`[cite: 39, 64]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker stop` sends a SIGTERM signal enabling graceful application shutdown before termination[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831446320-365-0n2b",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the primary difference between `git merge` and `git rebase` conceptually?",
      "options": [
        "`git merge` deletes commits, while `git rebase` creates branches.",
        "`git merge` preserves branch history by creating a merge commit, whereas `git rebase` rewrites commit history by moving or replaying commits onto a new base branch tip.",
        "Both commands perform identical history rewriting.",
        "`git rebase` requires a GitHub connection."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Merging preserves branch topology with merge commits, while rebasing linearizes history by rewriting commits."
    },
    {
      "id": "q-imp-1794831446320-366-p8th",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is an Availability Zone (AZ) in AWS?",
      "options": [
        "A global region containing entire countries.",
        "One or more discrete data centers with redundant power, cooling, and networking within a Region[cite: 115, 117].",
        "An edge CDN caching server.",
        "A virtual private subnet."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Availability Zones represent isolated data center locations engineered for high availability within regions[cite: 115, 117]."
    },
    {
      "id": "q-imp-1794831446320-367-qvdm",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What specific security risk is introduced if an application container runs with root privileges (`USER root`) inside Docker?",
      "options": [
        "The container cannot connect to SQLite databases.",
        "If an attacker achieves remote code execution vulnerability inside the container, they gain root access to the container filesystem and potentially exploit kernel vulnerabilities to compromise the host.",
        "Docker daemon fails to build image layers.",
        "Python Flask routes return HTTP 404 errors."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Running containers as root broadens the attack surface significantly if container isolation is compromised."
    },
    {
      "id": "q-imp-1794831446320-368-ylay",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does SaaS stand for in cloud computing?",
      "options": [
        "Secure Automated Server Software",
        "Software as a Service[cite: 119, 120]",
        "Scalable Application Infrastructure System",
        "Simple Administrative Storage Solution"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SaaS delivers turnkey, fully managed software applications over the web[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446320-369-pn9u",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Git, what does `git log --oneline` do?",
      "options": [
        "It deletes all commit history.",
        "It displays a compact, summarized commit history showing each commit on a single line with its short hash and message[cite: 24, 48].",
        "It shows detailed diffs for every file.",
        "It lists remote repository URLs."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--oneline` formats commit history into a concise, easy-to-read single-line summary per commit[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831446320-370-p549",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of the `docker rm` command?",
      "options": [
        "To remove a local container image.",
        "To delete one or more stopped Docker containers from disk[cite: 39, 64].",
        "To stop a running container.",
        "To push images to Docker Hub."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker rm` cleans up and deletes stopped container instances[cite: 39, 64]."
    },
    {
      "id": "q-imp-1794831446320-371-selk",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why must database migration scripts (like Flask-Migrate) be executed carefully in production deployments with Auto-Scaling groups?",
      "options": [
        "Because SQLite databases do not support tables.",
        "If multiple auto-scaling application instances start simultaneously and execute database schema migrations concurrently, race conditions can corrupt database tables or lock schema structures.",
        "Because S3 buckets reject migration files.",
        "Because Gunicorn blocks migration execution."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Concurrent schema migrations across scaling instances can cause race conditions and database corruption without coordination."
    },
    {
      "id": "q-imp-1794831446320-372-aumw",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary purpose of an AWS IAM Role?",
      "options": [
        "To encrypt S3 object storage at rest.",
        "To provide temporary, secure permissions that can be assumed by AWS services (like Lambda) or users without embedding static access keys[cite: 7, 116].",
        "To manage DNS domain registration.",
        "To balance incoming HTTP traffic."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IAM roles grant secure, least-privilege temporary permissions to services and users[cite: 7, 116]."
    },
    {
      "id": "q-imp-1794831446320-373-lxxf",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the function of `git branch -d <branch>`?",
      "options": [
        "It pushes the branch to GitHub.",
        "It safely deletes a local branch that has already been merged into the current branch[cite: 26, 49].",
        "It creates a new feature branch.",
        "It renames the active branch."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `-d` deletes local branches safely, preventing accidental deletion of unmerged work[cite: 26, 49]."
    },
    {
      "id": "q-imp-1794831446320-374-7f59",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command builds a Docker image and tags it with `v1.0` using the current directory context?",
      "options": [
        "`docker run -t v1.0 .`",
        "`docker build -t app-name:v1.0 .`[cite: 38, 41]",
        "`docker push app-name:v1.0`",
        "`docker pull v1.0`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker build -t <tag> .` builds and tags container images from the local context directory[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446320-375-rrdo",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the primary technical trade-off of selecting multi-region active-active database architectures in cloud systems?",
      "options": [
        "Inability to use SQL queries.",
        "Increased network latency for cross-region replication and complex eventual consistency conflict-resolution challenges compared to single-region setups.",
        "Zero data durability across regions.",
        "Mandatory use of SOAP XML protocols."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Active-active multi-region databases require managing distributed consistency and cross-region replication latency trade-offs."
    },
    {
      "id": "q-imp-1794831446320-376-jvzn",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does IaaS stand for in cloud computing service models?",
      "options": [
        "Internet Application and Service",
        "Infrastructure as a Service[cite: 119, 120]",
        "Integrated API Software",
        "Isolated Account Security"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IaaS provides foundational virtualized computing hardware, storage, and networking[cite: 119, 120]."
    },
    {
      "id": "q-imp-1794831446320-377-tuam",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the role of the `WORKDIR` instruction in a Dockerfile?",
      "options": [
        "To download source code from GitHub repositories.",
        "To set the working directory for any subsequent `RUN`, `COPY`, or `CMD` instructions inside the container image filesystem[cite: 37, 63].",
        "To define container runtime environment variables.",
        "To expose public network ports."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `WORKDIR` establishes the active path context for building container filesystem layers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446320-378-f3ra",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "Which command displays detailed configuration metadata for a running Docker container?",
      "options": [
        "`docker logs`",
        "`docker inspect <container>`[cite: 38, 41]",
        "`docker ps -a`",
        "`docker images`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker inspect` outputs comprehensive low-level JSON configuration data for containers or images[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446320-379-1kpr",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an AWS VPC NAT Gateway require an Elastic IP (EIP) address when created in a public subnet?",
      "options": [
        "To host serverless Lambda functions.",
        "To maintain a static, unchanging public IP address source when translating outbound private subnet traffic to the external internet, ensuring predictable firewall rules for external services.",
        "To encrypt S3 bucket objects.",
        "To replace the VPC Internet Gateway."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Elastic IPs provide persistent public IP addresses for NAT gateways communicating across external networks."
    },
    {
      "id": "q-imp-1794831446320-380-e5ub",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the primary function of an AWS S3 bucket?",
      "options": [
        "To run Linux virtual servers.",
        "To store and retrieve arbitrary data as objects within a globally unique namespace[cite: 100].",
        "To manage relational database transactions.",
        "To route public DNS traffic."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** S3 buckets provide primary storage container namespaces for object data[cite: 100]."
    },
    {
      "id": "q-imp-1794831446320-381-jkif",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Python Flask, how do you handle incoming JSON payloads in a POST request?",
      "options": [
        "`request.args.get()`",
        "`request.get_json()` or `request.json`",
        "`request.form.get()`",
        "`jsonify()`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `request.get_json()` parses incoming JSON request bodies into Python dictionaries automatically."
    },
    {
      "id": "q-imp-1794831446320-382-z7jm",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command lists all running Docker containers?",
      "options": [
        "`docker images`",
        "`docker ps`[cite: 38, 41]",
        "`docker ps -a`[cite: 38, 41]",
        "`docker stop`[cite: 38, 41]"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker ps` displays active running container instances[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446320-383-aanc",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the security implication of exposing an EC2 instance metadata service (IMDSv1) without token session requirements?",
      "options": [
        "It encrypts all storage volumes automatically.",
        "If an application suffers from a Server-Side Request Forgery (SSRF) vulnerability, attackers can query the metadata endpoint to steal temporary IAM role credentials and compromise AWS resources.",
        "It blocks all inbound SSH connections.",
        "It triggers infinite Lambda recursive loops."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** IMDSv1 is vulnerable to SSRF credential theft, making IMDSv2 token enforcement critical for cloud security."
    },
    {
      "id": "q-imp-1794831446320-384-1lfn",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does SLA stand for in cloud provider service agreements?",
      "options": [
        "Secured Local Architecture",
        "Service Level Agreement[cite: 89]",
        "Scalable Logging Application",
        "Serverless Lambda API"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** SLAs define formal vendor commitments regarding uptime availability and performance standards[cite: 89]."
    },
    {
      "id": "q-imp-1794831446320-385-ittl",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the purpose of the `-u` flag when executing `git push -u origin main`?",
      "options": [
        "To push commits using SSH keys.",
        "To establish upstream tracking between the local branch and remote branch for simplified future pushes and pulls[cite: 28, 29].",
        "To delete the remote branch.",
        "To force overwrite remote history."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** The upstream `-u` flag links local and remote branches so subsequent commands can omit remote/branch names[cite: 28, 29]."
    },
    {
      "id": "q-imp-1794831446320-386-akxo",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command deletes a stopped container image from local storage?",
      "options": [
        "`docker rm`",
        "`docker rmi <image>`",
        "`docker stop`",
        "`docker prune`"
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `docker rmi` removes local container images from storage."
    },
    {
      "id": "q-imp-1794831446320-387-zgs8",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why do enterprise cloud architectures separate public subnets from private subnets using routing tables and NACLs?",
      "options": [
        "To increase S3 storage capacity.",
        "To enforce network-level security boundaries, ensuring public-facing web components are segregated from isolated internal application logic and databases.",
        "To eliminate the need for Application Load Balancers.",
        "To speed up Docker container builds."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Subnet segregation implements security in depth, isolating sensitive backend components from direct public internet exposure."
    },
    {
      "id": "q-imp-1794831446320-388-c3mu",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is Amazon EC2?",
      "options": [
        "Managed object storage.",
        "Elastic Compute Cloud providing secure, resizable virtual server instances in the cloud[cite: 96, 97].",
        "A serverless event engine.",
        "A relational database service."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** EC2 delivers flexible virtual server compute capacity on demand[cite: 96, 97]."
    },
    {
      "id": "q-imp-1794831446320-389-zx29",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Git, what does `git diff --cached` display?",
      "options": [
        "Unstaged working tree changes.",
        "Changes currently staged in the index ready for the next commit[cite: 24, 48].",
        "Remote branch history.",
        "Deleted untracked files."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--cached` (or `--staged`) compares staged changes against the last commit snapshot[cite: 24, 48]."
    },
    {
      "id": "q-imp-1794831446320-390-1fkq",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the function of the `ENV` instruction in a Dockerfile?",
      "options": [
        "To copy files into the container.",
        "To define persistent environment variables within the container environment[cite: 37, 63].",
        "To open container firewall ports.",
        "To install pip packages."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `ENV` sets environment variables accessible during build and runtime inside containers[cite: 37, 63]."
    },
    {
      "id": "q-imp-1794831446320-391-3832",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What is the primary risk of configuring an S3 bucket with public read access (`AllUsers` / `Public`) for hosting general corporate documents?",
      "options": [
        "S3 converts the bucket into block storage.",
        "Anyone on the public internet can read, scrape, or download confidential documents, resulting in severe data leaks and compliance violations[cite: 4].",
        "Lambda functions stop executing.",
        "CloudWatch logs delete execution histories."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Public S3 bucket access exposes private data to the entire internet, violating security requirements[cite: 4]."
    },
    {
      "id": "q-imp-1794831446320-392-coul",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does CapEx stand for in financial planning?",
      "options": [
        "Capital Expenditure[cite: 114]",
        "Capacity Planning Execution",
        "Centralized Application Engine",
        "Cloud Processing Exchange"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** CapEx represents major upfront capital investments in physical infrastructure[cite: 114]."
    },
    {
      "id": "q-imp-1794831446320-393-scp4",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "What is the operational purpose of `git fetch --prune`?",
      "options": [
        "To delete local commit history permanently.",
        "To remove stale local remote-tracking branch references that have already been deleted on the remote repository[cite: 30].",
        "To force-push local changes.",
        "To resolve merge conflicts."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `--prune` cleans up outdated local tracking references for deleted remote branches[cite: 30]."
    },
    {
      "id": "q-imp-1794831446320-394-fvzc",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What is the default port used by Python Flask web applications locally?",
      "options": [
        "Port 80",
        "Port 443",
        "Port 5000[cite: 22]",
        "Port 8080"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Flask runs on port 5000 by default for local development applications[cite: 22]."
    },
    {
      "id": "q-imp-1794831446320-395-nqto",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "Why does an Auto-Scaling Group require a Launch Template or Launch Configuration?",
      "options": [
        "To manage SQLite database migrations.",
        "To define the blueprint configuration (AMI, instance type, security groups, key pair, and user data) used when spinning up new EC2 instances automatically.",
        "To configure S3 event notifications.",
        "To execute GitHub Actions CI pipelines."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Launch templates specify exact instance configuration parameters required by Auto-Scaling groups during scale-out events."
    },
    {
      "id": "q-imp-1794831446320-396-noyd",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What does OpEx stand for in cloud financial models?",
      "options": [
        "Operational Expenditure[cite: 114]",
        "Optimized Processing Execution",
        "Outbound Public Exchange",
        "Open Protocol Encryption"
      ],
      "answerIndex": 0,
      "answerUnverified": true,
      "explanation": "** OpEx represents variable monthly operational expenses based on active usage[cite: 114]."
    },
    {
      "id": "q-imp-1794831446320-397-j2gf",
      "topicId": "top-1794831438813-1",
      "difficulty": "moderate",
      "question": "In Python Flask, what does `jsonify({'status': 'running'})` return regarding HTTP response headers?",
      "options": [
        "A plain text MIME type.",
        "An HTTP response object with an `application/json` content-type header and serialized JSON payload.",
        "An XML data stream.",
        "A binary bytecode file."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** `jsonify()` serializes dictionaries into JSON format and sets the proper `application/json` response header."
    },
    {
      "id": "q-imp-1794831446320-398-vkvw",
      "topicId": "top-1794831438813-1",
      "difficulty": "easy",
      "question": "What command builds a Docker container in the background?",
      "options": [
        "`docker run -d`[cite: 38, 41]",
        "`docker build -d`",
        "`docker run -d <image>`[cite: 38, 41]",
        "`docker start -d`[cite: 38, 41]"
      ],
      "answerIndex": 2,
      "answerUnverified": false,
      "explanation": "** Detached mode (`-d`) runs container instances in the background[cite: 38, 41]."
    },
    {
      "id": "q-imp-1794831446320-399-jaem",
      "topicId": "top-1794831438813-1",
      "difficulty": "hard",
      "question": "What specific failure mode occurs if a CloudFormation or Terraform Infrastructure-as-Code deployment attempts to create a resource with a name that must be globally unique (like an S3 bucket) but is already taken across AWS?",
      "options": [
        "AWS automatically generates a random suffix.",
        "The deployment stack creation fails with an entity-already-exists or bucket-name-taken error, halting infrastructure provisioning.",
        "The bucket is created in a different region.",
        "The IAM role is deleted automatically."
      ],
      "answerIndex": 1,
      "answerUnverified": false,
      "explanation": "** Globally unique resource namespaces cause stack creation failures if name collisions occur across AWS accounts[cite: 4, 100]."
    }
  ]
};

const SAMPLE_MARKDOWN_TEMPLATE = `## Linux Commands & File Permissions

### Q1. [Moderate] What does the following Linux command pipeline output?
${FENCE}bash
echo -e "apple\\nbanana\\ncherry\\napple" | sort | uniq -c | sort -nr | head -n 1
${FENCE}
- [ ] 1 banana
- [x] 2 apple
- [ ] 1 cherry
- [ ] 2 banana
**Explanation:** \`sort\` groups identical lines together, \`uniq -c\` counts occurrences (\`2 apple\`), and \`sort -nr | head -n 1\` selects the highest frequency line.

---

## Apache Spark, PySpark & Kafka

### Q2. [Easy] In PySpark, what happens when you call \`df.filter(df.age > 25).select("name")\`?
A) Spark immediately reads the file and prints the names
B) Spark builds a logical execution plan (DAG) lazily without executing until an Action is called
C) Spark throws an AnalysisException because select must come before filter
D) Spark caches the DataFrame in memory automatically
**Answer:** B
**Explanation:** Transformations in Apache Spark (\`filter\`, \`select\`) are lazily evaluated. Computation only triggers when an Action (such as \`show()\`, \`collect()\`, \`count()\`) is invoked.

---

## Section 1: Java Fundamentals & Environment

### Q3. [Moderate] What is the output of the following code?
${FENCE}java
class Main {
    public static void main(String[] args) {
        int x = 5;
        int y = x++ + ++x;
        System.out.println(y);
    }
}
${FENCE}
- [ ] 10
- [x] 11
- [ ] 12
- [ ] 13
**Explanation:** \`x++\` evaluates to \`5\` (then \`x\` becomes \`6\`), and \`++x\` increments \`x\` to \`7\` before adding, yielding \`11\`.`;

// ============================================================================
// ROBUST MARKDOWN MCQ PARSER (WITH AUTO SUB-TOPIC DETECTION)
// ============================================================================

function normalizeDifficulty(rawDiff, fallback = 'moderate') {
  if (!rawDiff) return fallback;
  const val = String(rawDiff).trim().toLowerCase();
  if (val === 'easy' || val === 'beginner' || val === 'low') return 'easy';
  if (val === 'hard' || val === 'difficult' || val === 'advanced' || val === 'high') return 'hard';
  if (val === 'moderate' || val === 'medium' || val === 'intermediate' || val === 'med') return 'moderate';
  return fallback;
}

function parseMarkdownQuestions(markdownText, targetTopicId, defaultDifficulty = 'moderate') {
  if (!markdownText || !markdownText.trim()) return [];

  const preNormalizedLines = markdownText
    .replace(/\r\n/g, '\n')
    .replace(/([^\n`])(```[a-zA-Z0-9_-]*)/g, '$1\n$2')
    .trim()
    .split('\n');

  const normalizedLines = [];
  let fenceOpen = false;
  for (let i = 0; i < preNormalizedLines.length; i++) {
    const ln = preNormalizedLines[i];
    const tr = ln.trim();
    if (tr.startsWith('```')) {
      fenceOpen = !fenceOpen;
      normalizedLines.push(ln);
      continue;
    }
    if (
      fenceOpen &&
      (/^(?:[-*+]\s*\[[ xX✓✔]\]\s+|(?:\([A-Fa-f]\)|[A-Fa-f][\.\)\-])\s+)/.test(tr) ||
        /^(?:>\s*)?(?:\*\*|\*)?(?:Correct\s+Answer|Answer|Ans|Explanation|Solution)(?:\*\*|\*)?\s*[\:\-]/i.test(tr))
    ) {
      normalizedLines.push('```');
      fenceOpen = false;
    }
    normalizedLines.push(ln);
  }
  if (fenceOpen) {
    normalizedLines.push('```');
  }

  const lines = normalizedLines;
  const rawBlocks = [];
  let currentBlock = [];
  let inCodeFence = false;
  let activeSectionTopic = null;

  const isQuestionHeader = (line) => {
    const trimmed = line.trim();
    if (/^#{1,4}\s*(?:Q\d*[\.\:\)\-]?\s+|Question\s*\d*[\.\:\)\-]?\s+|\d+[\.\)\-]\s+)/i.test(trimmed)) {
      return true;
    }
    if (/^(?:\*\*?)?(?:Q\d+|Question\s+\d+)[\.\:\)\-](?:\*\*?)?\s+/i.test(trimmed)) {
      return true;
    }
    if (/^#{3,4}\s+.+/.test(trimmed) && !/^#{3,4}\s*(?:answer|explanation|solution|options|topic|sub-?topic)/i.test(trimmed)) {
      return true;
    }
    return false;
  };

  const extractStandaloneTopicHeading = (line) => {
    const trimmed = line.trim();
    if (isQuestionHeader(trimmed)) return null;

    const explicitHashTopic = trimmed.match(/^#{1,3}\s*(?:Sub-?Topic|Topic|Section)\s*[\:\-]\s*(.+)$/i);
    if (explicitHashTopic) {
      return explicitHashTopic[1].replace(/[#*]+$/g, '').trim();
    }

    const h1h2Match = trimmed.match(/^#{1,2}\s+(.+)$/);
    if (h1h2Match) {
      const candidate = h1h2Match[1].replace(/[#*]+$/g, '').trim();
      if (!/^(?:answer|explanation|solution|options|questions?|mcqs?)$/i.test(candidate)) {
        return candidate;
      }
    }

    const boldTopicLine = trimmed.match(/^(?:>\s*)?(?:\*\*|\*)?(?:Sub-?Topic|Topic)(?:\*\*|\*)?\s*[\:\-]\s*(.+)$/i);
    if (boldTopicLine) {
      return boldTopicLine[1].replace(/^(?:\*\*|\*)|(?:\*\*|\*)$/g, '').trim();
    }

    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      currentBlock.push(line);
      continue;
    }

    if (!inCodeFence) {
      const detectedHeadingTopic = extractStandaloneTopicHeading(line);
      if (detectedHeadingTopic) {
        if (currentBlock.join('\n').trim()) {
          rawBlocks.push({
            text: currentBlock.join('\n').trim(),
            sectionTopic: activeSectionTopic
          });
          currentBlock = [];
        }
        activeSectionTopic = detectedHeadingTopic;
        continue;
      }

      if (/^(?:---|\*\*\*|___)\s*$/.test(trimmed)) {
        if (currentBlock.join('\n').trim()) {
          rawBlocks.push({
            text: currentBlock.join('\n').trim(),
            sectionTopic: activeSectionTopic
          });
          currentBlock = [];
        }
        continue;
      }

      if (isQuestionHeader(line) && currentBlock.join('\n').trim()) {
        const existingContent = currentBlock.join('\n');
        const hasOptionLikeLine = /(?:^\s*(?:[-*]\s*\[[ xX]\]|[A-Fa-f][\.\)\-]\s+|\d+[\.\)]\s+))/m.test(existingContent);
        if (hasOptionLikeLine) {
          rawBlocks.push({
            text: existingContent.trim(),
            sectionTopic: activeSectionTopic
          });
          currentBlock = [line];
          continue;
        }
      }
    }

    currentBlock.push(line);
  }

  if (currentBlock.join('\n').trim()) {
    rawBlocks.push({
      text: currentBlock.join('\n').trim(),
      sectionTopic: activeSectionTopic
    });
  }

  const parsedQuestions = [];

  rawBlocks.forEach((blockObj, idx) => {
    const block = blockObj.text;
    const blockLines = block.split('\n');
    let questionLines = [];
    let options = [];
    let detectedAnswerIndex = -1;
    let explanationLines = [];
    let rawAnswerToken = null;
    let detectedDifficulty = defaultDifficulty;
    let detectedTopicTitle = blockObj.sectionTopic || null;

    let state = 'QUESTION';
    let insideFence = false;

    for (let i = 0; i < blockLines.length; i++) {
      const rawLine = blockLines[i];
      const trimmed = rawLine.trim();

      if (trimmed.startsWith('```')) {
        insideFence = !insideFence;
        if (state === 'QUESTION') questionLines.push(rawLine);
        else if (state === 'EXPLANATION') explanationLines.push(rawLine);
        else if (state === 'OPTIONS' && options.length > 0) {
          options[options.length - 1] += '\n' + rawLine;
        }
        continue;
      }

      if (insideFence) {
        if (state === 'QUESTION') questionLines.push(rawLine);
        else if (state === 'EXPLANATION') explanationLines.push(rawLine);
        else if (state === 'OPTIONS' && options.length > 0) {
          options[options.length - 1] += '\n' + rawLine;
        }
        continue;
      }

      const topicLineMatch = trimmed.match(
        /^(?:>\s*)?(?:\*\*|\*)?(?:Sub-?Topic|Topic)(?:\*\*|\*)?\s*[\:\-]\s*(.+)$/i
      );
      if (topicLineMatch) {
        detectedTopicTitle = topicLineMatch[1].replace(/^(?:\*\*|\*)|(?:\*\*|\*)$/g, '').trim();
        continue;
      }

      const diffLineMatch = trimmed.match(
        /^(?:>\s*)?(?:\*\*|\*)?(?:Difficulty|Level)(?:\*\*|\*)?\s*[\:\-]\s*(?:\*\*|\*)?(Easy|Moderate|Medium|Hard|Beginner|Advanced)(?:\*\*|\*)?\s*$/i
      );
      if (diffLineMatch) {
        detectedDifficulty = normalizeDifficulty(diffLineMatch[1], defaultDifficulty);
        continue;
      }

      const answerMatch = trimmed.match(
        /^(?:>\s*)?(?:\*\*|\*)?(?:Correct\s+Answer|Answer|Ans|Correct)(?:\*\*|\*)?\s*[\:\-]\s*(.+)$/i
      );
      if (answerMatch) {
        rawAnswerToken = answerMatch[1].replace(/^(?:\*\*|\*)|(?:\*\*|\*)$/g, '').trim();
        continue;
      }

      const explMatch = trimmed.match(
        /^(?:>\s*)?(?:\*\*|\*)?(?:Explanation|Solution|Reason|Note)(?:\*\*|\*)?\s*[\:\-]\s*(.*)$/i
      );
      if (explMatch) {
        state = 'EXPLANATION';
        if (explMatch[1].trim()) {
          explanationLines.push(explMatch[1].trim());
        }
        continue;
      }

      if (state === 'EXPLANATION') {
        explanationLines.push(rawLine);
        continue;
      }

      const checkboxMatch = trimmed.match(/^[-*+]\s*\[([ xX✓✔])\]\s*(.+)$/);
      if (checkboxMatch) {
        state = 'OPTIONS';
        const isChecked = checkboxMatch[1].trim().length > 0;
        let optText = checkboxMatch[2].trim();
        optText = optText.replace(/^[A-Fa-f][\.\)\-]\s+/, '');
        if (isChecked) {
          detectedAnswerIndex = options.length;
        }
        options.push(optText);
        continue;
      }

      const letterOptMatch = trimmed.match(/^(?:[-*+]\s*)?(?:\(([A-Fa-f])\)|([A-Fa-f])[\.\)\-])\s+(.+)$/);
      if (letterOptMatch) {
        state = 'OPTIONS';
        let optText = letterOptMatch[3].trim();
        if (/(?:\(\s*correct\s*\)|\[\s*correct\s*\]|✓|✔|\*\*\s*correct\s*\*\*)$/i.test(optText)) {
          detectedAnswerIndex = options.length;
          optText = optText
            .replace(/(?:\(\s*correct\s*\)|\[\s*correct\s*\]|✓|✔|\*\*\s*correct\s*\*\*)$/i, '')
            .trim();
        }
        options.push(optText);
        continue;
      }

      if (questionLines.length > 0) {
        const numOptMatch = trimmed.match(/^(?:[-*+]\s*)?([1-6])[\.\)]\s+(.+)$/);
        if (numOptMatch && (state === 'OPTIONS' || Number(numOptMatch[1]) === 1)) {
          state = 'OPTIONS';
          let optText = numOptMatch[2].trim();
          if (/(?:\(\s*correct\s*\)|\[\s*correct\s*\]|✓|✔)$/i.test(optText)) {
            detectedAnswerIndex = options.length;
            optText = optText.replace(/(?:\(\s*correct\s*\)|\[\s*correct\s*\]|✓|✔)$/i, '').trim();
          }
          options.push(optText);
          continue;
        }
      }

      if (state === 'QUESTION') {
        if (questionLines.length === 0) {
          let cleanedFirst = rawLine
            .replace(/^\s*#{1,4}\s*/, '')
            .replace(/^(?:\*\*?)?(?:Q\d*|Question\s*\d*)[\.\:\)\-](?:\*\*?)?\s*/i, '')
            .replace(/^\d+[\.\)\-]\s+/, '');

          const inlineDiffStart = cleanedFirst.match(
            /^[\[\(]\s*(Easy|Moderate|Medium|Hard)\s*[\]\)]\s*[\:\-]?\s*/i
          );
          if (inlineDiffStart) {
            detectedDifficulty = normalizeDifficulty(inlineDiffStart[1], defaultDifficulty);
            cleanedFirst = cleanedFirst.slice(inlineDiffStart[0].length);
          }

          const inlineDiffEnd = cleanedFirst.match(
            /\s*[\[\(]\s*(Easy|Moderate|Medium|Hard)\s*[\]\)]\s*$/i
          );
          if (inlineDiffEnd) {
            detectedDifficulty = normalizeDifficulty(inlineDiffEnd[1], defaultDifficulty);
            cleanedFirst = cleanedFirst.slice(0, cleanedFirst.length - inlineDiffEnd[0].length);
          }

          questionLines.push(cleanedFirst);
        } else {
          questionLines.push(rawLine);
        }
      } else if (state === 'OPTIONS' && options.length > 0 && trimmed) {
        options[options.length - 1] += '\n' + trimmed;
      }
    }

    if (detectedAnswerIndex === -1 && rawAnswerToken && options.length > 0) {
      const cleanedToken = rawAnswerToken.replace(/^[\(\[]|[\)\]]$/g, '').trim();

      const singleLetter = cleanedToken.match(/^([A-Fa-f])(?:[\.\)\-\s]|$)/);
      if (singleLetter) {
        const idxByLetter = singleLetter[1].toUpperCase().charCodeAt(0) - 65;
        if (idxByLetter >= 0 && idxByLetter < options.length) {
          detectedAnswerIndex = idxByLetter;
        }
      }

      if (detectedAnswerIndex === -1 && /^[1-6]$/.test(cleanedToken)) {
        const idxByNum = parseInt(cleanedToken, 10) - 1;
        if (idxByNum >= 0 && idxByNum < options.length) {
          detectedAnswerIndex = idxByNum;
        }
      }

      if (detectedAnswerIndex === -1) {
        const exactMatchIdx = options.findIndex(
          (opt) => opt.toLowerCase().trim() === cleanedToken.toLowerCase().trim()
        );
        if (exactMatchIdx !== -1) {
          detectedAnswerIndex = exactMatchIdx;
        } else {
          const partialIdx = options.findIndex((opt) =>
            cleanedToken.toLowerCase().includes(opt.toLowerCase().trim())
          );
          if (partialIdx !== -1) detectedAnswerIndex = partialIdx;
        }
      }
    }

    const finalQuestionText = questionLines.join('\n').trim();
    if (finalQuestionText && options.length >= 2) {
      parsedQuestions.push({
        id: `q-imp-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        topicId: targetTopicId,
        detectedTopicTitle: detectedTopicTitle || null,
        difficulty: detectedDifficulty || defaultDifficulty,
        question: finalQuestionText,
        options,
        answerIndex: detectedAnswerIndex >= 0 ? detectedAnswerIndex : 0,
        answerUnverified: detectedAnswerIndex === -1,
        explanation:
          explanationLines.join('\n').trim() ||
          'Review the concepts and command syntax for this topic in your module notes.'
      });
    }
  });

  return parsedQuestions;
}

// ============================================================================
// RICH CONTENT RENDERER (CODE BLOCKS + INLINE CODE + BOLD)
// ============================================================================

function RichTextRenderer({ content, darkMode }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!content) return null;

  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          let lang = 'code';
          let codeBody = lines.join('\n');
          if (lines.length > 1 && /^[a-zA-Z0-9_-]+$/.test(lines[0].trim())) {
            lang = lines[0].trim();
            codeBody = lines.slice(1).join('\n');
          }
          return (
            <div
              key={index}
              className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d11] text-zinc-100 my-3.5 shadow-xl shadow-black/25"
            >
              <div className="px-4 py-2 bg-white/[0.04] border-b border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 mr-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </span>
                  <span className="uppercase tracking-widest text-[10px] font-semibold text-zinc-300">
                    {lang}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await copyTextToClipboard(codeBody);
                    setCopiedIdx(index);
                    setTimeout(() => setCopiedIdx(null), 1600);
                  }}
                  className="apple-press px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 flex items-center gap-1 text-[10px] cursor-pointer"
                >
                  {copiedIdx === index ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-indigo-100">
                <code>{codeBody}</code>
              </pre>
            </div>
          );
        }

        const paragraphs = part.split('\n').filter((p) => p !== '');
        return (
          <div key={index} className="space-y-1.5">
            {paragraphs.map((line, lineIdx) => (
              <p key={lineIdx} className="whitespace-pre-wrap">
                {renderInlineFormatting(line, darkMode)}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text, darkMode) {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, i) => {
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return (
        <code
          key={i}
          className={`px-1.5 py-0.5 mx-0.5 rounded text-[0.88em] font-mono ${
            darkMode
              ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
          }`}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={i} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    return token;
  });
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

const STORAGE_KEY_DATA = 'cdac_dbda_qbank_v2';
const STORAGE_KEY_PROGRESS = 'cdac_dbda_progress_v2';
const STORAGE_KEY_ADMIN = 'cdac_dbda_admin_unlocked';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
    } catch (_e) {
      return false;
    }
  });
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');

  const [courseData, setCourseData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.modules) && Array.isArray(parsed.questions)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load saved question bank:', e);
    }
    return INITIAL_DATA;
  });

  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(courseData));
    } catch (e) {
      console.error('Could not persist course data:', e);
    }
  }, [courseData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Could not persist progress:', e);
    }
  }, [progress]);

  const [selectedTopicId, setSelectedTopicId] = useState(
    courseData.modules[0]?.topics[0]?.id || 'top-linux-cmds'
  );
  const [expandedModules, setExpandedModules] = useState(() => {
    const map = {};
    courseData.modules.forEach((m) => {
      map[m.id] = true;
    });
    return map;
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const generateShuffledOptionOrders = (questionList) => {
    const orderMap = {};
    (questionList || []).forEach((q) => {
      if (!q || !Array.isArray(q.options)) return;
      const indices = q.options.map((_, idx) => idx);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      orderMap[q.id] = indices;
    });
    return orderMap;
  };

  const [mode, setMode] = useState('practice');
  const [filterType, setFilterType] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [questionLimit, setQuestionLimit] = useState('all');
  const [sessionQuestionIds, setSessionQuestionIds] = useState(null);
  const [optionOrders, setOptionOrders] = useState(() =>
    generateShuffledOptionOrders(courseData.questions)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAllTopics, setSearchAllTopics] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [zenMode, setZenMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    try {
      return Number(localStorage.getItem('cdac_dbda_best_streak') || 0);
    } catch (_e) {
      return 0;
    }
  });
  const [eliminatedOptions, setEliminatedOptions] = useState({});
  const [userNotes, setUserNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('cdac_dbda_notes_v1');
      return saved ? JSON.parse(saved) : {};
    } catch (_e) {
      return {};
    }
  });
  const [noteDrawerOpen, setNoteDrawerOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [customExamModalOpen, setCustomExamModalOpen] = useState(false);
  const [customExamSelectedMods, setCustomExamSelectedMods] = useState([]);
  const [customExamCount, setCustomExamCount] = useState('25');
  const [customExamDifficulty, setCustomExamDifficulty] = useState('all');
  const [customExamPoolIds, setCustomExamPoolIds] = useState(null);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('cdac_dbda_notes_v1', JSON.stringify(userNotes));
    } catch (_e) {}
  }, [userNotes]);

  useEffect(() => {
    try {
      localStorage.setItem('cdac_dbda_best_streak', String(bestStreak));
    } catch (_e) {}
  }, [bestStreak]);

  const triggerConfetti = () => {
    const colors = ['#34d399', '#60a5fa', '#a78bfa', '#fbbf24', '#f472b6', '#38bdf8'];
    const pieces = Array.from({ length: 36 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      left: `${Math.random() * 96 + 2}%`,
      color: colors[i % colors.length],
      delay: `${Math.random() * 0.25}s`,
      duration: `${1.1 + Math.random() * 0.8}s`,
      rotate: `${Math.floor(Math.random() * 360)}deg`
    }));
    setConfettiPieces(pieces);
    setTimeout(() => setConfettiPieces([]), 2200);
  };

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFlagged, setQuizFlagged] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSecondsLeft, setQuizSecondsLeft] = useState(0);
  const [quizTimed, setQuizTimed] = useState(true);
  const [customExamTimerMinutes, setCustomExamTimerMinutes] = useState('auto');
  const [topicQuizTimerMinutes, setTopicQuizTimerMinutes] = useState('auto');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importTargetModuleId, setImportTargetModuleId] = useState(courseData.modules[0]?.id || '');
  const [importTargetTopicId, setImportTargetTopicId] = useState(selectedTopicId);
  const [importDefaultDifficulty, setImportDefaultDifficulty] = useState('moderate');
  const [markdownInput, setMarkdownInput] = useState('');
  const [replaceExistingTopicQs, setReplaceExistingTopicQs] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const fileInputRef = useRef(null);

  const [structureModalOpen, setStructureModalOpen] = useState(false);
  const [structureType, setStructureType] = useState('topic');
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleCode, setNewModuleCode] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [targetModuleForTopic, setTargetModuleForTopic] = useState(courseData.modules[0]?.id || '');

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3400);
  };

  const modules = courseData.modules || [];
  const questions = courseData.questions || [];

  const activeContext = useMemo(() => {
    for (const mod of modules) {
      const topic = mod.topics.find((t) => t.id === selectedTopicId);
      if (topic && (isAdmin || !topic.locked)) {
        return { module: mod, topic };
      }
    }
    for (const mod of modules) {
      const firstAccessible = mod.topics.find((t) => isAdmin || !t.locked);
      if (firstAccessible) {
        return { module: mod, topic: firstAccessible };
      }
    }
    if (modules.length > 0 && modules[0].topics.length > 0) {
      return { module: modules[0], topic: modules[0].topics[0] };
    }
    return { module: null, topic: null };
  }, [modules, selectedTopicId, isAdmin]);

  useEffect(() => {
    if (!isAdmin && activeContext.topic && activeContext.topic.id !== selectedTopicId) {
      setSelectedTopicId(activeContext.topic.id);
      setSessionQuestionIds(null);
      setCurrentIndex(0);
    }
  }, [isAdmin, activeContext.topic, selectedTopicId]);

  const lockedTopicIds = useMemo(() => {
    const set = new Set();
    if (!isAdmin) {
      modules.forEach((m) => {
        m.topics.forEach((t) => {
          if (t.locked) set.add(t.id);
        });
      });
    }
    return set;
  }, [modules, isAdmin]);

  const createRandomizedSessionIds = (poolList, limitValue) => {
    const copy = [...poolList];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    if (limitValue && limitValue !== 'all') {
      const count = parseInt(limitValue, 10);
      if (!isNaN(count) && count > 0) {
        return copy.slice(0, count).map((q) => q.id);
      }
    }
    return copy.map((q) => q.id);
  };

  useEffect(() => {
    setOptionOrders((prev) => {
      let hasNew = false;
      const next = { ...prev };
      courseData.questions.forEach((q) => {
        if (!next[q.id] || next[q.id].length !== q.options.length) {
          const indices = q.options.map((_, idx) => idx);
          for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
          }
          next[q.id] = indices;
          hasNew = true;
        }
      });
      return hasNew ? next : prev;
    });
  }, [courseData.questions]);

  const filteredPool = useMemo(() => {
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    if (customExamPoolIds && Array.isArray(customExamPoolIds)) {
      return customExamPoolIds
        .map((id) => questionMap.get(id))
        .filter((q) => q && !lockedTopicIds.has(q.topicId));
    }

    if (activeContext.topic && lockedTopicIds.has(activeContext.topic.id)) {
      return [];
    }

    let list = questions.filter((q) => !lockedTopicIds.has(q.topicId));

    if (!searchAllTopics || !searchQuery.trim()) {
      list = list.filter((q) => q.topicId === activeContext.topic?.id);
    }

    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      list = list.filter(
        (q) =>
          q.question.toLowerCase().includes(qLower) ||
          q.options.some((opt) => opt.toLowerCase().includes(qLower)) ||
          (q.explanation && q.explanation.toLowerCase().includes(qLower))
      );
    }

    if (difficultyFilter !== 'all') {
      list = list.filter((q) => (normalizeDifficulty(q.difficulty) || 'moderate') === difficultyFilter);
    }

    if (filterType === 'bookmarked') {
      list = list.filter((q) => progress[q.id]?.bookmarked);
    } else if (filterType === 'incorrect') {
      list = list.filter((q) => progress[q.id] && progress[q.id].selectedIndex !== undefined && !progress[q.id].isCorrect);
    } else if (filterType === 'unattempted') {
      list = list.filter((q) => !progress[q.id] || progress[q.id].selectedIndex === undefined);
    }

    return list;
  }, [questions, customExamPoolIds, lockedTopicIds, activeContext.topic?.id, searchQuery, searchAllTopics, difficultyFilter, filterType, progress]);

  const displayedQuestions = useMemo(() => {
    const applyOptionOrder = (q) => {
      const order = optionOrders[q.id];
      if (!order || order.length !== q.options.length) {
        return q;
      }
      const mappedOptions = order.map((origIdx) => q.options[origIdx]);
      const mappedAnswerIndex = order.indexOf(q.answerIndex);
      return {
        ...q,
        options: mappedOptions,
        answerIndex: mappedAnswerIndex >= 0 ? mappedAnswerIndex : q.answerIndex,
        _optionOrder: order
      };
    };

    if (customExamPoolIds && Array.isArray(customExamPoolIds)) {
      return filteredPool.map(applyOptionOrder);
    }

    if (sessionQuestionIds && Array.isArray(sessionQuestionIds)) {
      const allowedPoolMap = new Map(filteredPool.map((q) => [q.id, q]));
      return sessionQuestionIds
        .map((id) => allowedPoolMap.get(id))
        .filter(Boolean)
        .map(applyOptionOrder);
    }

    if (questionLimit !== 'all') {
      const maxCount = parseInt(questionLimit, 10);
      if (!isNaN(maxCount) && maxCount > 0) {
        return filteredPool.slice(0, maxCount).map(applyOptionOrder);
      }
    }

    return filteredPool.map(applyOptionOrder);
  }, [filteredPool, customExamPoolIds, sessionQuestionIds, questionLimit, optionOrders]);

  const currentQuestion = displayedQuestions[currentIndex] || displayedQuestions[0] || null;

  useEffect(() => {
    if (currentIndex >= displayedQuestions.length && displayedQuestions.length > 0) {
      setCurrentIndex(displayedQuestions.length - 1);
    }
  }, [displayedQuestions.length, currentIndex]);

  const stats = useMemo(() => {
    const total = questions.length;
    let attempted = 0;
    let correct = 0;
    let bookmarked = 0;

    questions.forEach((q) => {
      const p = progress[q.id];
      if (p) {
        if (p.selectedIndex !== undefined) {
          attempted++;
          if (p.isCorrect) correct++;
        }
        if (p.bookmarked) bookmarked++;
      }
    });

    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { total, attempted, correct, bookmarked, accuracy };
  }, [questions, progress]);

  useEffect(() => {
    if (mode !== 'quiz' || !quizTimed || quizSubmitted || quizSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setQuizSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, quizTimed, quizSubmitted, quizSecondsLeft]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (
        importModalOpen ||
        structureModalOpen ||
        adminModalOpen ||
        commandPaletteOpen ||
        analyticsModalOpen ||
        customExamModalOpen
      )
        return;
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < displayedQuestions.length - 1) {
          setCurrentIndex((i) => i + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex((i) => i - 1);
        }
      } else if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setZenMode((z) => !z);
      } else if (currentQuestion) {
        const keyUpper = e.key.toUpperCase();
        let optIdx = -1;
        if (['1', '2', '3', '4', '5', '6'].includes(keyUpper)) {
          optIdx = parseInt(keyUpper, 10) - 1;
        } else if (['A', 'B', 'C', 'D', 'E', 'F'].includes(keyUpper)) {
          optIdx = keyUpper.charCodeAt(0) - 65;
        }
        if (optIdx >= 0 && optIdx < currentQuestion.options.length) {
          e.preventDefault();
          handleSelectOption(currentQuestion, optIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    importModalOpen,
    structureModalOpen,
    adminModalOpen,
    commandPaletteOpen,
    analyticsModalOpen,
    customExamModalOpen,
    currentIndex,
    displayedQuestions.length,
    currentQuestion,
    mode,
    quizSubmitted
  ]);

  const handleSelectOption = (question, optionIndex) => {
    if ((eliminatedOptions[question.id] || []).includes(optionIndex)) {
      return;
    }

    const canonicalOptionIndex = question._optionOrder
      ? question._optionOrder[optionIndex]
      : optionIndex;
    const canonicalAnswerIndex = question._optionOrder
      ? question._optionOrder[question.answerIndex]
      : question.answerIndex;

    if (mode === 'quiz') {
      if (quizSubmitted) return;
      setQuizAnswers((prev) => ({
        ...prev,
        [question.id]: canonicalOptionIndex
      }));
    } else {
      const isCorrect = canonicalOptionIndex === canonicalAnswerIndex;
      const alreadyAnswered = progress[question.id]?.selectedIndex !== undefined;

      if (!alreadyAnswered) {
        if (isCorrect) {
          const nextStreak = streak + 1;
          setStreak(nextStreak);
          if (nextStreak > bestStreak) setBestStreak(nextStreak);
          if (nextStreak > 0 && nextStreak % 5 === 0) {
            triggerConfetti();
            showToast(`🔥 ${nextStreak} Question Streak! Keep crushing it!`);
          }
        } else {
          setStreak(0);
        }
      }

      setProgress((prev) => ({
        ...prev,
        [question.id]: {
          ...(prev[question.id] || {}),
          selectedIndex: canonicalOptionIndex,
          isCorrect
        }
      }));
    }
  };

  const toggleEliminateOption = (questionId, optionIndex, e) => {
    e.stopPropagation();
    setEliminatedOptions((prev) => {
      const current = prev[questionId] || [];
      const exists = current.includes(optionIndex);
      return {
        ...prev,
        [questionId]: exists ? current.filter((i) => i !== optionIndex) : [...current, optionIndex]
      };
    });
  };

  const handleStartCustomExam = (startInTimedMode = true) => {
    const activeModIds =
      customExamSelectedMods.length > 0 ? customExamSelectedMods : modules.map((m) => m.id);
    const validTopicIds = new Set();
    modules.forEach((m) => {
      if (activeModIds.includes(m.id)) {
        m.topics.forEach((t) => {
          if (isAdmin || !t.locked) {
            validTopicIds.add(t.id);
          }
        });
      }
    });

    let pool = questions.filter((q) => validTopicIds.has(q.topicId));
    if (customExamDifficulty !== 'all') {
      pool = pool.filter(
        (q) => (normalizeDifficulty(q.difficulty) || 'moderate') === customExamDifficulty
      );
    }

    if (pool.length === 0) {
      showToast('No questions match your custom exam criteria.', 'error');
      return;
    }

    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const maxQ =
      customExamCount === 'all' ? shuffled.length : Math.min(parseInt(customExamCount, 10) || 25, shuffled.length);
    const chosenSlice = shuffled.slice(0, maxQ);
    const chosenIds = chosenSlice.map((q) => q.id);

    setOptionOrders((prev) => ({
      ...prev,
      ...generateShuffledOptionOrders(chosenSlice)
    }));
    setCustomExamPoolIds(chosenIds);
    setSessionQuestionIds(chosenIds);
    setCustomExamModalOpen(false);
    setCurrentIndex(0);

    if (startInTimedMode) {
      setQuizAnswers({});
      setQuizFlagged({});
      setQuizSubmitted(false);
      if (customExamTimerMinutes === 'untimed') {
        setQuizTimed(false);
        setQuizSecondsLeft(0);
      } else if (customExamTimerMinutes === 'auto') {
        setQuizTimed(true);
        setQuizSecondsLeft(chosenIds.length * 60);
      } else {
        const mins = Math.max(1, parseInt(customExamTimerMinutes, 10) || chosenIds.length);
        setQuizTimed(true);
        setQuizSecondsLeft(mins * 60);
      }
      setMode('quiz');
      showToast(
        `Started Custom Exam with ${chosenIds.length} randomized questions (${
          customExamTimerMinutes === 'untimed'
            ? 'Untimed'
            : customExamTimerMinutes === 'auto'
            ? `${chosenIds.length} min`
            : `${customExamTimerMinutes} min`
        })!`
      );
    } else {
      setMode('practice');
      showToast(`Loaded Custom Practice Set with ${chosenIds.length} questions!`);
    }
  };

  const toggleBookmark = (questionId) => {
    setProgress((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        bookmarked: !prev[questionId]?.bookmarked
      }
    }));
  };

  const toggleQuizFlag = (questionId) => {
    setQuizFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const startQuizMode = () => {
    if (filteredPool.length === 0) {
      showToast('No questions available in this view to start a quiz.', 'error');
      return;
    }
    const lockedIds = createRandomizedSessionIds(filteredPool, questionLimit);
    setOptionOrders((prev) => ({
      ...prev,
      ...generateShuffledOptionOrders(filteredPool)
    }));
    setSessionQuestionIds(lockedIds);
    setQuizAnswers({});
    setQuizFlagged({});
    setQuizSubmitted(false);
    setCurrentIndex(0);

    if (topicQuizTimerMinutes === 'untimed') {
      setQuizTimed(false);
      setQuizSecondsLeft(0);
    } else if (topicQuizTimerMinutes === 'auto') {
      setQuizTimed(true);
      setQuizSecondsLeft(lockedIds.length * 60);
    } else {
      const mins = Math.max(1, parseInt(topicQuizTimerMinutes, 10) || lockedIds.length);
      setQuizTimed(true);
      setQuizSecondsLeft(mins * 60);
    }

    setMode('quiz');
    showToast(
      `Test Mode started with ${lockedIds.length} randomized questions (${
        topicQuizTimerMinutes === 'untimed'
          ? 'Untimed'
          : topicQuizTimerMinutes === 'auto'
          ? `${lockedIds.length} min`
          : `${topicQuizTimerMinutes} min`
      })!`
    );
  };

  const handleExportTopicMarkdown = () => {
    if (!activeContext.topic) return;
    const topicQs = questions.filter((q) => q.topicId === activeContext.topic.id);
    if (topicQs.length === 0) {
      showToast('No questions in this topic to export.', 'error');
      return;
    }

    const mdBlocks = topicQs.map((q, idx) => {
      const opts = q.options
        .map((opt, oIdx) => `${String.fromCharCode(65 + oIdx)}) ${opt}`)
        .join('\n');
      const ansLetter = String.fromCharCode(65 + q.answerIndex);
      const diffLabel = DIFFICULTY_META[normalizeDifficulty(q.difficulty)]?.label || 'Moderate';
      return `### Q${idx + 1}. [${diffLabel}] ${q.question}\n${opts}\n**Answer:** ${ansLetter}\n**Explanation:** ${q.explanation}`;
    });

    const fullMd = `# ${activeContext.module?.title} - ${activeContext.topic.title}\n\n` + mdBlocks.join('\n\n---\n\n');
    const blob = new Blob([fullMd], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeContext.topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported topic questions as Markdown (.md)!');
  };

  const handleExportAllJSON = () => {
    const blob = new Blob([JSON.stringify(courseData, null, 2)], {
      type: 'application/json;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cdac-pg-dbda-question-bank-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded full Question Bank backup (.json)');
  };

  const handleImportJSONBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result);
        if (parsed && Array.isArray(parsed.modules) && Array.isArray(parsed.questions)) {
          setCourseData(parsed);
          if (parsed.modules[0]?.topics[0]?.id) {
            setSelectedTopicId(parsed.modules[0].topics[0].id);
          }
          setSessionQuestionIds(null);
          showToast(`Restored ${parsed.questions.length} questions from backup!`);
        } else {
          showToast('Invalid JSON backup structure.', 'error');
        }
      } catch (_err) {
        showToast('Failed to parse JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleAdminUnlockSubmit = (e) => {
    e.preventDefault();
    if (adminPinInput.trim() === DEFAULT_ADMIN_PIN || adminPinInput.trim() === 'dbda2025') {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(STORAGE_KEY_ADMIN, 'true');
      } catch (_err) {}
      setAdminModalOpen(false);
      setAdminPinInput('');
      showToast('Admin Mode unlocked! You can now import, lock, or edit topics.');
    } else {
      showToast('Incorrect Admin Passcode.', 'error');
    }
  };

  const handleAdminLock = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_ADMIN);
    } catch (_err) {}
    showToast('Switched to Public Student View (Read-Only).');
  };

  const handleCopySeedCodeForVercel = async () => {
    const codeSnippet = `const INITIAL_DATA = ${JSON.stringify(courseData, null, 2)};`;
    const ok = await copyTextToClipboard(codeSnippet);
    if (ok) {
      showToast('Copied full INITIAL_DATA code! Paste it into App.jsx before deploying to Vercel.');
    } else {
      showToast('Could not access clipboard. Use "Export JSON" in the sidebar instead.', 'error');
    }
  };

  const handleToggleLockTopic = (moduleId, topicId) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              topics: m.topics.map((t) =>
                t.id === topicId ? { ...t, locked: !t.locked } : t
              )
            }
          : m
      )
    }));
    showToast('Updated topic lock status.');
  };

  const handleDeleteModule = (moduleId) => {
    const targetMod = modules.find((m) => m.id === moduleId);
    if (!targetMod) return;
    const topicIdsToRemove = new Set(targetMod.topics.map((t) => t.id));
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.id !== moduleId),
      questions: prev.questions.filter((q) => !topicIdsToRemove.has(q.topicId))
    }));
    setConfirmDelete(null);
    showToast(`Deleted module "${targetMod.title}".`);
  };

  const handleDeleteTopic = (moduleId, topicId) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.id === moduleId
          ? { ...m, topics: m.topics.filter((t) => t.id !== topicId) }
          : m
      ),
      questions: prev.questions.filter((q) => q.topicId !== topicId)
    }));
    setConfirmDelete(null);
    showToast('Deleted sub-topic and its questions.');
  };

  const handleDeleteCurrentQuestion = (questionId) => {
    setCourseData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId)
    }));
    showToast('Question deleted.');
  };

  const handleChangeQuestionDifficulty = (questionId, newDiff) => {
    setCourseData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, difficulty: normalizeDifficulty(newDiff) } : q
      )
    }));
    showToast(`Updated difficulty to ${DIFFICULTY_META[normalizeDifficulty(newDiff)]?.label || newDiff}.`);
  };

  const handleResetTopicProgress = () => {
    const idsToReset = displayedQuestions.map((q) => q.id);
    setProgress((prev) => {
      const next = { ...prev };
      idsToReset.forEach((id) => {
        if (next[id]) {
          const { selectedIndex, isCorrect, ...rest } = next[id];
          next[id] = rest;
        }
      });
      return next;
    });
    setEliminatedOptions((prev) => {
      const next = { ...prev };
      idsToReset.forEach((id) => {
        delete next[id];
      });
      return next;
    });
    setOptionOrders((prev) => ({
      ...prev,
      ...generateShuffledOptionOrders(displayedQuestions)
    }));
    setCurrentIndex(0);
    showToast('Reset progress & shuffled answer options!');
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    let score = 0;
    const updatedProgress = { ...progress };

    displayedQuestions.forEach((q) => {
      const chosenCanonical = quizAnswers[q.id];
      const canonicalAnswer = q._optionOrder
        ? q._optionOrder[q.answerIndex]
        : q.answerIndex;
      if (chosenCanonical !== undefined) {
        const isCorrect = chosenCanonical === canonicalAnswer;
        if (isCorrect) score++;
        updatedProgress[q.id] = {
          ...(updatedProgress[q.id] || {}),
          selectedIndex: chosenCanonical,
          isCorrect
        };
      }
    });

    setProgress(updatedProgress);
    const pct =
      displayedQuestions.length > 0
        ? Math.round((score / displayedQuestions.length) * 100)
        : 0;
    if (pct >= 70) {
      triggerConfetti();
    }
    showToast(`Test submitted! Score: ${score}/${displayedQuestions.length} (${pct}%)`);
  };

  const livePreviewQuestions = useMemo(() => {
    return parseMarkdownQuestions(markdownInput, importTargetTopicId, importDefaultDifficulty);
  }, [markdownInput, importTargetTopicId, importDefaultDifficulty]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setMarkdownInput(String(ev.target?.result || ''));
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCopyTemplate = async () => {
    const ok = await copyTextToClipboard(SAMPLE_MARKDOWN_TEMPLATE);
    if (ok) {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 1800);
      showToast('Copied Markdown template to clipboard!');
    } else {
      setMarkdownInput(SAMPLE_MARKDOWN_TEMPLATE);
      showToast('Loaded Markdown template into editor.');
    }
  };

  const handleCommitImport = () => {
    if (livePreviewQuestions.length === 0) return;

    setCourseData((prev) => {
      const updatedModules = prev.modules.map((m) => ({
        ...m,
        topics: [...m.topics]
      }));
      const targetModule = updatedModules.find((m) => m.id === importTargetModuleId) || updatedModules[0];
      const topicIdsToReplace = new Set();
      let firstAffectedTopicId = importTargetTopicId;

      const resolvedQuestions = livePreviewQuestions.map((q, idx) => {
        let assignedTopicId = importTargetTopicId;

        if (q.detectedTopicTitle && targetModule) {
          const existingTopic = targetModule.topics.find(
            (t) => t.title.toLowerCase().trim() === q.detectedTopicTitle.toLowerCase().trim()
          );
          if (existingTopic) {
            assignedTopicId = existingTopic.id;
          } else {
            const newTopicId = `top-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 5)}`;
            targetModule.topics.push({
              id: newTopicId,
              title: q.detectedTopicTitle
            });
            assignedTopicId = newTopicId;
          }
        }

        if (idx === 0) firstAffectedTopicId = assignedTopicId;
        topicIdsToReplace.add(assignedTopicId);

        const { detectedTopicTitle, ...cleanQuestion } = q;
        return {
          ...cleanQuestion,
          topicId: assignedTopicId
        };
      });

      const baseQuestions = replaceExistingTopicQs
        ? prev.questions.filter((q) => !topicIdsToReplace.has(q.topicId))
        : prev.questions;

      if (firstAffectedTopicId) {
        setSelectedTopicId(firstAffectedTopicId);
      }

      return {
        ...prev,
        modules: updatedModules,
        questions: [...baseQuestions, ...resolvedQuestions]
      };
    });

    setImportModalOpen(false);
    setMarkdownInput('');
    setSessionQuestionIds(null);
    setCurrentIndex(0);
    showToast(`Imported ${livePreviewQuestions.length} questions successfully!`);
  };

  const handleAddStructure = (e) => {
    e.preventDefault();
    if (structureType === 'module') {
      if (!newModuleTitle.trim()) return;
      const newModId = `mod-${Date.now()}`;
      const defaultTopicId = `top-${Date.now()}-1`;
      const shortCode =
        newModuleCode.trim().toUpperCase() ||
        newModuleTitle
          .trim()
          .split(/\s+/)
          .map((w) => w[0])
          .join('')
          .slice(0, 4)
          .toUpperCase() ||
        'MOD';

      setCourseData((prev) => ({
        ...prev,
        modules: [
          ...prev.modules,
          {
            id: newModId,
            title: newModuleTitle.trim(),
            shortCode,
            icon: 'Layers',
            topics: [{ id: defaultTopicId, title: 'General Practice' }]
          }
        ]
      }));
      setExpandedModules((prev) => ({ ...prev, [newModId]: true }));
      setSelectedTopicId(defaultTopicId);
      setNewModuleTitle('');
      setNewModuleCode('');
      setStructureModalOpen(false);
      showToast(`Created module "${newModuleTitle.trim()}".`);
    } else {
      if (!newTopicTitle.trim() || !targetModuleForTopic) return;
      const newTopicId = `top-${Date.now()}`;
      setCourseData((prev) => ({
        ...prev,
        modules: prev.modules.map((m) =>
          m.id === targetModuleForTopic
            ? {
                ...m,
                topics: [...m.topics, { id: newTopicId, title: newTopicTitle.trim() }]
              }
            : m
        )
      }));
      setExpandedModules((prev) => ({ ...prev, [targetModuleForTopic]: true }));
      setSelectedTopicId(newTopicId);
      setNewTopicTitle('');
      setStructureModalOpen(false);
      showToast(`Added sub-topic "${newTopicTitle.trim()}".`);
    }
  };

  const renderModuleIcon = (iconName) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'Code2':
        return <Code2 className="w-4 h-4 text-sky-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4 text-pink-400" />;
      default:
        return <Layers className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-500 ${
        darkMode ? 'bg-[#070709] text-zinc-100' : 'theme-light bg-[#f5f5f7] text-[#1d1d1f]'
      }`}
    >
      <style>{`
        :root {
          --apple-spring: cubic-bezier(0.22, 1, 0.36, 1);
          --apple-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
          --apple-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes appleFadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.992);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes appleModalPop {
          0% {
            opacity: 0;
            transform: scale(0.94) translateY(12px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes appleOptionReveal {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes appleAmbientFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(25px, -18px, 0) scale(1.06);
          }
        }

        .apple-question-enter {
          animation: appleFadeSlideUp 0.48s var(--apple-spring) both;
        }

        .apple-modal-enter {
          animation: appleModalPop 0.42s var(--apple-spring) both;
        }

        .apple-option-stagger-0 { animation: appleOptionReveal 0.36s var(--apple-spring) 0.03s both; }
        .apple-option-stagger-1 { animation: appleOptionReveal 0.36s var(--apple-spring) 0.07s both; }
        .apple-option-stagger-2 { animation: appleOptionReveal 0.36s var(--apple-spring) 0.11s both; }
        .apple-option-stagger-3 { animation: appleOptionReveal 0.36s var(--apple-spring) 0.15s both; }
        .apple-option-stagger-4 { animation: appleOptionReveal 0.36s var(--apple-spring) 0.19s both; }
        .apple-option-stagger-5 { animation: appleOptionReveal 0.36s var(--apple-spring) 0.23s both; }

        .apple-press {
          transition: transform 0.28s var(--apple-spring),
                      background-color 0.25s var(--apple-smooth),
                      border-color 0.25s var(--apple-smooth),
                      box-shadow 0.28s var(--apple-spring),
                      opacity 0.2s ease;
        }
        .apple-press:hover {
          transform: translateY(-1px);
        }
        .apple-press:active {
          transform: scale(0.965) translateY(0);
        }

        .apple-card-hover {
          transition: transform 0.42s var(--apple-spring),
                      box-shadow 0.42s var(--apple-spring),
                      border-color 0.3s var(--apple-smooth),
                      background-color 0.3s var(--apple-smooth);
        }

        .theme-light [class*="border-white/"] { border-color: rgba(0,0,0,0.10) !important; }
        .theme-light [class*="bg-white/["] { background-color: rgba(0,0,0,0.035) !important; }
        .theme-light [class*=" border-zinc-800"], .theme-light [class*=" border-zinc-700"] { border-color: #e4e4e7 !important; }
        .theme-light [class*=" bg-zinc-900"], .theme-light [class*=" bg-zinc-800"], .theme-light [class*=" bg-zinc-950"] { background-color: #f4f4f5 !important; }
        .theme-light [class*=" text-zinc-200"], .theme-light [class*=" text-zinc-300"] { color: #3f3f46 !important; }
        .theme-light [class*=" text-zinc-400"] { color: #71717a !important; }
        .theme-light [class*=" hover:bg-zinc-800"]:hover { background-color: #e4e4e7 !important; }
        .theme-light [class*=" hover:text-zinc-200"]:hover { color: #18181b !important; }
        .theme-light .apple-keep-dark, .theme-light .apple-keep-dark * { color-scheme: dark; }

        .apple-ambient-orb {
          animation: appleAmbientFloat 14s ease-in-out infinite;
        }

        @keyframes confettiFall {
          0% {
            opacity: 1;
            transform: translate3d(0, -20px, 0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate3d(15px, 85vh, 0) rotate(520deg) scale(0.6);
          }
        }
      `}</style>

      {confettiPieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map((p) => (
            <span
              key={p.id}
              style={{
                left: p.left,
                backgroundColor: p.color,
                animationDelay: p.delay,
                animationDuration: p.duration,
                transform: `rotate(${p.rotate})`
              }}
              className="absolute top-0 w-2.5 h-3.5 rounded-sm animate-[confettiFall_1.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
            />
          ))}
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`apple-ambient-orb absolute -top-36 left-1/4 w-[520px] h-[520px] rounded-full blur-[130px] transition-opacity duration-700 ${
            darkMode ? 'bg-indigo-600/12 opacity-100' : 'bg-indigo-400/15 opacity-75'
          }`}
        />
        <div
          className={`apple-ambient-orb absolute top-1/3 -right-24 w-[440px] h-[440px] rounded-full blur-[140px] transition-opacity duration-700 ${
            darkMode ? 'bg-violet-600/10 opacity-100' : 'bg-sky-400/15 opacity-70'
          }`}
          style={{ animationDelay: '-6s' }}
        />
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-2xl bg-zinc-900/90 border-white/15 text-white text-sm apple-modal-enter">
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-medium tracking-tight">{toast.message}</span>
        </div>
      )}

      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-2xl saturate-150 transition-colors duration-500 ${
          darkMode
            ? 'bg-[#0b0b0f]/75 border-white/[0.08]'
            : 'bg-white/75 border-black/[0.07]'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className={`lg:hidden p-2 rounded-lg border ${
                darkMode
                  ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Syllabus Menu"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-base sm:text-lg tracking-tight">
                    PG-DBDA Question Bank
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                    C-DAC
                  </span>
                </div>
                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'} hidden sm:block`}>
                  Big Data Analytics • Dynamic Practice & Custom Exam Engine
                </p>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className={`apple-press px-3 py-1.5 rounded-full border flex items-center gap-2 cursor-pointer ${
                darkMode
                  ? 'bg-white/[0.04] border-white/[0.09] text-zinc-300 hover:bg-white/[0.08]'
                  : 'bg-black/[0.03] border-black/[0.08] text-zinc-700 hover:bg-black/[0.06]'
              }`}
              title="Open Quick Command Palette (Cmd/Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span>Quick Jump...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                ⌘K
              </kbd>
            </button>

            <div
              className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${
                streak > 0
                  ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                  : darkMode
                  ? 'bg-white/[0.04] border-white/[0.08] text-zinc-400'
                  : 'bg-black/[0.03] border-black/[0.06] text-zinc-600'
              }`}
              title={`Best Streak: ${bestStreak}`}
            >
              <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-orange-400 animate-pulse' : ''}`} />
              <span className="font-mono font-semibold">{streak}</span>
              <span className="text-[11px] opacity-80">Streak</span>
            </div>

            <button
              onClick={() => setAnalyticsModalOpen(true)}
              className={`apple-press px-3.5 py-1.5 rounded-full border flex items-center gap-2 cursor-pointer ${
                darkMode
                  ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]'
                  : 'bg-black/[0.03] border-black/[0.06] hover:bg-black/[0.06]'
              }`}
              title="View Detailed Syllabus Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>Accuracy:</span>
              <span className="font-mono font-semibold text-emerald-400">{stats.accuracy}%</span>
              <span className="text-[10px] opacity-60">({stats.attempted}/{stats.total})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCustomExamModalOpen(true)}
              className={`apple-press flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold cursor-pointer ${
                customExamPoolIds
                  ? 'bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-600/25'
                  : darkMode
                  ? 'border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300'
                  : 'border-violet-300 bg-violet-50 hover:bg-violet-100 text-violet-700'
              }`}
              title="Build a custom randomized test across multiple modules"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {customExamPoolIds ? `Custom Exam (${customExamPoolIds.length})` : 'Custom Exam'}
              </span>
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => setImportModalOpen(true)}
                  className="apple-press flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium shadow-lg shadow-indigo-600/25 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import Markdown</span>
                </button>

                <button
                  onClick={() => {
                    setStructureType('topic');
                    setTargetModuleForTopic(activeContext.module?.id || modules[0]?.id || '');
                    setStructureModalOpen(true);
                  }}
                  className={`apple-press hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium cursor-pointer ${
                    darkMode
                      ? 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200'
                      : 'border-black/10 bg-white/80 hover:bg-white text-zinc-700 shadow-sm'
                  }`}
                  title="Add New Module or Topic"
                >
                  <FolderPlus className="w-4 h-4 text-indigo-400" />
                  <span>Add Topic / Module</span>
                </button>

                <button
                  onClick={handleCopySeedCodeForVercel}
                  className={`apple-press hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium cursor-pointer ${
                    darkMode
                      ? 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300'
                      : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                  }`}
                  title="Copy full Question Bank JSON to paste into INITIAL_DATA before deploying to Vercel"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Vercel Export</span>
                </button>
              </>
            )}

            {isAdmin ? (
              <button
                onClick={handleAdminLock}
                className="apple-press flex items-center gap-1.5 px-3 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-xs font-medium cursor-pointer"
                title="Click to lock Admin Mode (Switch to Public Student View)"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Unlocked</span>
              </button>
            ) : (
              <button
                onClick={() => setAdminModalOpen(true)}
                className={`apple-press flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-medium cursor-pointer ${
                  darkMode
                    ? 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.07]'
                    : 'border-black/10 bg-black/[0.03] text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.06]'
                }`}
                title="Admin Login (Add/Delete Modules & Questions)"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}

            <button
              onClick={() => setZenMode(!zenMode)}
              className={`apple-press hidden lg:flex p-2.5 rounded-full border cursor-pointer ${
                zenMode
                  ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-300'
                  : darkMode
                  ? 'border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08]'
                  : 'border-black/10 bg-black/[0.03] text-zinc-600 hover:bg-black/[0.06]'
              }`}
              title={zenMode ? 'Exit Zen Focus Mode (F)' : 'Enter Zen Focus Mode (F)'}
            >
              {zenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`apple-press p-2.5 rounded-full border cursor-pointer ${
                darkMode
                  ? 'border-white/10 bg-white/[0.03] text-amber-400 hover:bg-white/[0.08]'
                  : 'border-black/10 bg-black/[0.03] text-zinc-600 hover:bg-black/[0.06]'
              }`}
              title="Toggle Dark / Light Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1600px] w-full mx-auto flex relative z-10">
        <aside
          className={`${
            mobileSidebarOpen ? 'fixed inset-y-0 left-0 z-40 w-80 pt-16' : 'hidden'
          } ${
            zenMode ? 'lg:hidden' : 'lg:block lg:w-80 xl:w-88'
          } shrink-0 border-r overflow-y-auto backdrop-blur-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-[#0b0b0f]/80 border-white/[0.07]'
              : 'bg-white/75 border-black/[0.07]'
          }`}
        >
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  placeholder="Search questions, keywords..."
                  className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs border outline-none transition ${
                    darkMode
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-indigo-500'
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {searchQuery.trim() && (
                <label className="flex items-center gap-2 text-[11px] text-zinc-400 cursor-pointer select-none px-1">
                  <input
                    type="checkbox"
                    checked={searchAllTopics}
                    onChange={(e) => {
                      setSearchAllTopics(e.target.checked);
                      setCurrentIndex(0);
                    }}
                    className="rounded border-zinc-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Search across all PG-DBDA modules</span>
                </label>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Course Syllabus ({modules.length} Modules)
                </span>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setStructureType('module');
                      setStructureModalOpen(true);
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Module</span>
                  </button>
                )}
              </div>

              {modules.map((mod) => {
                const isExpanded = !!expandedModules[mod.id];
                const modTopicIds = new Set(mod.topics.map((t) => t.id));
                const modQuestions = questions.filter((q) => modTopicIds.has(q.topicId));
                const modAttempted = modQuestions.filter(
                  (q) => progress[q.id]?.selectedIndex !== undefined
                ).length;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border overflow-hidden apple-card-hover ${
                      darkMode
                        ? 'border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12]'
                        : 'border-black/[0.06] bg-white/80 hover:border-black/[0.12] shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-full px-3 py-2.5 flex items-center justify-between gap-1 text-left transition ${
                        darkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <button
                        onClick={() =>
                          setExpandedModules((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))
                        }
                        className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
                      >
                        {renderModuleIcon(mod.icon)}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">
                              {mod.shortCode}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-500">
                              {modAttempted}/{modQuestions.length}
                            </span>
                          </div>
                          <p className="text-xs font-medium truncate mt-0.5">{mod.title}</p>
                        </div>
                      </button>

                      <div className="flex items-center gap-1 shrink-0">
                        {isAdmin &&
                          (confirmDelete?.type === 'module' && confirmDelete?.id === mod.id ? (
                            <div className="flex items-center gap-1 bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.5 rounded-md">
                              <button
                                onClick={() => handleDeleteModule(mod.id)}
                                className="text-[10px] font-semibold text-rose-400 hover:text-rose-300 px-1 cursor-pointer"
                                title="Confirm Delete Module"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="text-[10px] text-zinc-400 hover:text-zinc-200 px-1 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmDelete({ type: 'module', id: mod.id, title: mod.title });
                              }}
                              className="p-1 rounded hover:bg-rose-500/15 text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                              title={`Delete module "${mod.title}"`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ))}

                        <button
                          onClick={() =>
                            setExpandedModules((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))
                          }
                          className="p-1 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
                          )}
                        </button>
                      </div>
                    </div>

                    {modQuestions.length > 0 && (
                      <div className={`h-0.5 w-full ${darkMode ? 'bg-white/[0.04]' : 'bg-black/[0.04]'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out"
                          style={{
                            width: `${Math.min(100, Math.round((modAttempted / modQuestions.length) * 100))}%`
                          }}
                        />
                      </div>
                    )}

                    {isExpanded && (
                      <div
                        className={`px-2 pb-2 pt-1 space-y-1 border-t ${
                          darkMode ? 'border-zinc-800/60' : 'border-slate-100'
                        }`}
                      >
                        {mod.topics.map((topic) => {
                          const isSelected = topic.id === activeContext.topic?.id;
                          const isTopicLocked = !!topic.locked;
                          const isBlockedForStudent = isTopicLocked && !isAdmin;
                          const topicQs = questions.filter((q) => q.topicId === topic.id);
                          const topicDone = topicQs.filter(
                            (q) => progress[q.id]?.selectedIndex !== undefined
                          ).length;

                          return (
                            <div
                              key={topic.id}
                              className={`group w-full px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between gap-1.5 transition-all duration-300 ${
                                isSelected
                                  ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/25'
                                  : isBlockedForStudent
                                  ? darkMode
                                    ? 'text-zinc-500 bg-white/[0.015] opacity-75'
                                    : 'text-zinc-400 bg-black/[0.02] opacity-75'
                                  : darkMode
                                  ? 'text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200'
                                  : 'text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900'
                              }`}
                            >
                              <button
                                onClick={() => {
                                  if (isBlockedForStudent) {
                                    showToast(
                                      `"${topic.title}" is currently locked by the instructor.`,
                                      'error'
                                    );
                                    return;
                                  }
                                  setSelectedTopicId(topic.id);
                                  setCustomExamPoolIds(null);
                                  setSessionQuestionIds(null);
                                  setOptionOrders((prev) => ({
                                    ...prev,
                                    ...generateShuffledOptionOrders(
                                      questions.filter((q) => q.topicId === topic.id)
                                    )
                                  }));
                                  setCurrentIndex(0);
                                  setMobileSidebarOpen(false);
                                  if (mode === 'quiz') {
                                    setMode('practice');
                                    setQuizSubmitted(false);
                                  }
                                }}
                                className={`flex-1 truncate text-left py-0.5 flex items-center gap-1.5 ${
                                  isBlockedForStudent ? 'cursor-not-allowed' : 'cursor-pointer'
                                }`}
                                title={
                                  isBlockedForStudent
                                    ? 'Locked by Admin — Not accessible yet'
                                    : topic.title
                                }
                              >
                                {isTopicLocked && (
                                  <Lock
                                    className={`w-3 h-3 shrink-0 ${
                                      isSelected ? 'text-amber-300' : 'text-amber-400'
                                    }`}
                                  />
                                )}
                                <span className="truncate">{topic.title}</span>
                              </button>

                              <div className="flex items-center gap-1 shrink-0">
                                {isBlockedForStudent ? (
                                  <span
                                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                                      darkMode
                                        ? 'bg-amber-500/10 text-amber-400/90 border-amber-500/25'
                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                    }`}
                                  >
                                    Locked
                                  </span>
                                ) : (
                                  <span
                                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                      isSelected
                                        ? 'bg-indigo-700 text-indigo-100'
                                        : darkMode
                                        ? 'bg-zinc-800 text-zinc-400'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    {topicDone}/{topicQs.length}
                                  </span>
                                )}

                                {isAdmin && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleLockTopic(mod.id, topic.id);
                                    }}
                                    className={`p-1 rounded transition cursor-pointer ${
                                      isTopicLocked
                                        ? isSelected
                                          ? 'bg-amber-400/20 text-amber-200 hover:bg-amber-400/30'
                                          : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25'
                                        : isSelected
                                        ? 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                                        : 'text-zinc-500 hover:bg-amber-500/15 hover:text-amber-400'
                                    }`}
                                    title={
                                      isTopicLocked
                                        ? `Unlock "${topic.title}" for students`
                                        : `Lock "${topic.title}" so students cannot access it`
                                    }
                                  >
                                    {isTopicLocked ? (
                                      <Lock className="w-3 h-3" />
                                    ) : (
                                      <Unlock className="w-3 h-3" />
                                    )}
                                  </button>
                                )}

                                {isAdmin &&
                                  (confirmDelete?.type === 'topic' && confirmDelete?.id === topic.id ? (
                                    <div className="flex items-center gap-0.5 bg-rose-950/90 border border-rose-500/40 px-1 py-0.5 rounded">
                                      <button
                                        onClick={() => handleDeleteTopic(mod.id, topic.id)}
                                        className="text-[10px] font-semibold text-rose-300 hover:text-white px-1 cursor-pointer"
                                      >
                                        Del
                                      </button>
                                      <button
                                        onClick={() => setConfirmDelete(null)}
                                        className="text-[10px] text-zinc-400 hover:text-white px-0.5 cursor-pointer"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmDelete({
                                          type: 'topic',
                                          id: topic.id,
                                          title: topic.title
                                        });
                                      }}
                                      className={`p-1 rounded transition cursor-pointer ${
                                        isSelected
                                          ? 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                                          : 'text-zinc-500 hover:bg-rose-500/15 hover:text-rose-400'
                                      }`}
                                      title={`Delete topic "${topic.title}"`}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  ))}
                              </div>
                            </div>
                          );
                        })}

                        {isAdmin && (
                          <button
                            onClick={() => {
                              setStructureType('topic');
                              setTargetModuleForTopic(mod.id);
                              setStructureModalOpen(true);
                            }}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                              darkMode
                                ? 'text-zinc-500 hover:text-indigo-400 hover:bg-zinc-800/40'
                                : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-50'
                            }`}
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add sub-topic...</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {isAdmin && (
              <div
                className={`p-3 rounded-xl border space-y-2 ${
                  darkMode
                    ? 'border-zinc-800/80 bg-zinc-900/30'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Admin Question Bank Backup
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleExportAllJSON}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      darkMode
                        ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                        : 'border-slate-300 hover:bg-white text-slate-700'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Export JSON</span>
                  </button>
                  <label
                    className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-center gap-1.5 cursor-pointer transition ${
                      darkMode
                        ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                        : 'border-slate-300 hover:bg-white text-slate-700'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Restore JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSONBackup}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
          <div
            className={`p-5 sm:p-6 rounded-3xl border backdrop-blur-2xl flex flex-col gap-5 apple-card-hover ${
              darkMode
                ? 'bg-white/[0.03] border-white/[0.08] shadow-2xl shadow-black/20'
                : 'bg-white/80 border-black/[0.06] shadow-xl shadow-black/[0.03]'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium mb-1">
                  <span>
                    {customExamPoolIds
                      ? 'Multi-Module Custom Session'
                      : activeContext.module?.title || 'Module'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className={darkMode ? 'text-zinc-300' : 'text-slate-700'}>
                    {customExamPoolIds
                      ? `${customExamPoolIds.length} Handpicked Questions`
                      : activeContext.topic?.title || 'Topic'}
                  </span>
                  {customExamPoolIds && (
                    <button
                      onClick={() => {
                        setCustomExamPoolIds(null);
                        setSessionQuestionIds(null);
                        setMode('practice');
                        setQuizSubmitted(false);
                      }}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 cursor-pointer"
                    >
                      Exit Custom Exam
                    </button>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {searchQuery && searchAllTopics
                    ? `Global Search: "${searchQuery}"`
                    : customExamPoolIds
                    ? 'Custom PG-DBDA Mock Exam'
                    : activeContext.topic?.title}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div
                  className={`p-1 rounded-full border flex items-center ${
                    darkMode
                      ? 'bg-black/40 border-white/[0.08]'
                      : 'bg-black/[0.04] border-black/[0.06]'
                  }`}
                >
                  <button
                    onClick={() => {
                      setMode('practice');
                      setQuizSubmitted(false);
                    }}
                    className={`apple-press px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                      mode === 'practice'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : darkMode
                        ? 'text-zinc-400 hover:text-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Practice Mode</span>
                  </button>
                  <button
                    onClick={startQuizMode}
                    className={`apple-press px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                      mode === 'quiz'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : darkMode
                        ? 'text-zinc-400 hover:text-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Test / Quiz Mode</span>
                  </button>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setImportTargetModuleId(activeContext.module?.id || '');
                      setImportTargetTopicId(activeContext.topic?.id || '');
                      setImportModalOpen(true);
                    }}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                      darkMode
                        ? 'border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300'
                        : 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add MD Here</span>
                  </button>
                )}

                <button
                  onClick={handleExportTopicMarkdown}
                  className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
                    darkMode
                      ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                      : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                  }`}
                  title="Download this topic's questions as Markdown (.md)"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className={`pt-3 border-t flex flex-col gap-3 ${
                darkMode ? 'border-zinc-800/80' : 'border-slate-100'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'All Questions' },
                    { id: 'unattempted', label: 'Unattempted' },
                    { id: 'incorrect', label: 'Incorrect' },
                    { id: 'bookmarked', label: 'Bookmarked' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setFilterType(tab.id);
                        setCurrentIndex(0);
                      }}
                      className={`apple-press px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer ${
                        filterType === tab.id
                          ? darkMode
                            ? 'bg-white text-zinc-900 shadow-sm'
                            : 'bg-zinc-900 text-white shadow-sm'
                          : darkMode
                          ? 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]'
                          : 'bg-black/[0.04] text-zinc-600 hover:bg-black/[0.08]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {mode === 'quiz' ? (
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg border font-mono text-xs font-semibold ${
                        quizTimed && quizSecondsLeft < 60 && !quizSubmitted
                          ? 'bg-rose-500/15 border-rose-500/30 text-rose-400 animate-pulse'
                          : darkMode
                          ? 'bg-zinc-800 border-zinc-700 text-emerald-400'
                          : 'bg-slate-100 border-slate-200 text-emerald-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{quizTimed ? formatTimer(quizSecondsLeft) : 'Untimed'}</span>
                    </div>
                    {!quizSubmitted && (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 flex-wrap text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Test Timer:</span>
                      <select
                        value={topicQuizTimerMinutes}
                        onChange={(e) => setTopicQuizTimerMinutes(e.target.value)}
                        title="Choose duration before starting Test / Quiz Mode"
                        className={`px-2 py-1 rounded-lg border text-xs font-mono outline-none cursor-pointer ${
                          darkMode
                            ? 'bg-zinc-900 border-zinc-700 text-zinc-200'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <option value="auto">Auto (1m/Q)</option>
                        <option value="10">10 min</option>
                        <option value="15">15 min</option>
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60">60 min</option>
                        <option value="untimed">Untimed</option>
                      </select>
                    </div>
                    <span>
                      Showing <strong className="text-indigo-400">{displayedQuestions.length}</strong> of{' '}
                      <strong>{filteredPool.length}</strong> matching questions
                    </span>
                    {displayedQuestions.length > 0 && (
                      <button
                        onClick={handleResetTopicProgress}
                        className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition cursor-pointer"
                        title="Reset attempted answers for this view"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Progress</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mr-1">
                    Difficulty:
                  </span>
                  {[
                    { id: 'all', label: 'All Levels' },
                    { id: 'easy', label: 'Easy', dot: 'bg-emerald-500' },
                    { id: 'moderate', label: 'Moderate', dot: 'bg-amber-500' },
                    { id: 'hard', label: 'Hard', dot: 'bg-rose-500' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDifficultyFilter(d.id);
                        setCurrentIndex(0);
                      }}
                      className={`apple-press px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border cursor-pointer ${
                        difficultyFilter === d.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                          : darkMode
                          ? 'border-white/[0.07] bg-white/[0.03] text-zinc-400 hover:bg-white/[0.07]'
                          : 'border-black/[0.07] bg-black/[0.02] text-zinc-600 hover:bg-black/[0.06]'
                      }`}
                    >
                      {d.dot && <span className={`w-2 h-2 rounded-full ${d.dot}`} />}
                      <span>{d.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Practice Set:
                  </span>
                  <div className="flex items-center gap-1">
                    {[
                      { value: '10', label: '10 Qs' },
                      { value: '20', label: '20 Qs' },
                      { value: '30', label: '30 Qs' },
                      { value: '50', label: '50 Qs' },
                      { value: 'all', label: `All (${filteredPool.length})` }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setQuestionLimit(opt.value);
                          setCurrentIndex(0);
                          if (opt.value === 'all') {
                            setSessionQuestionIds(null);
                          } else {
                            const baseTopicPool = questions.filter(
                              (q) =>
                                (!activeContext.topic?.id || q.topicId === activeContext.topic.id) &&
                                (difficultyFilter === 'all' ||
                                  (normalizeDifficulty(q.difficulty) || 'moderate') === difficultyFilter)
                            );
                            const sourcePool = baseTopicPool.length > 0 ? baseTopicPool : filteredPool;
                            setOptionOrders((prev) => ({
                              ...prev,
                              ...generateShuffledOptionOrders(sourcePool)
                            }));
                            setSessionQuestionIds(createRandomizedSessionIds(sourcePool, opt.value));
                          }
                        }}
                        className={`apple-press px-3 py-1 rounded-full text-xs font-mono font-semibold cursor-pointer ${
                          questionLimit === opt.value
                            ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/25'
                            : darkMode
                            ? 'bg-white/[0.05] text-zinc-300 hover:bg-white/[0.09]'
                            : 'bg-black/[0.04] text-zinc-700 hover:bg-black/[0.08]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const lockedIds = createRandomizedSessionIds(filteredPool, questionLimit);
                      setOptionOrders((prev) => ({
                        ...prev,
                        ...generateShuffledOptionOrders(filteredPool)
                      }));
                      setSessionQuestionIds(lockedIds);
                      setCurrentIndex(0);
                      showToast(
                        questionLimit === 'all'
                          ? `Shuffled all ${lockedIds.length} questions & options for this session!`
                          : `Picked a fresh random set of ${lockedIds.length} questions with shuffled options!`
                      );
                    }}
                    title="Randomize question & option order once for this session"
                    className={`apple-press px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                      darkMode
                        ? 'border-violet-500/35 bg-violet-500/15 hover:bg-violet-500/25 text-violet-300'
                        : 'border-violet-300 bg-violet-50 hover:bg-violet-100 text-violet-700'
                    }`}
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Shuffle Set</span>
                  </button>

                  {sessionQuestionIds && (
                    <button
                      onClick={() => {
                        setSessionQuestionIds(null);
                        setQuestionLimit('all');
                        setCurrentIndex(0);
                        showToast('Restored default sequential question order.');
                      }}
                      title="Restore original sequential order"
                      className={`apple-press px-2.5 py-1 rounded-full border text-[11px] font-medium cursor-pointer ${
                        darkMode
                          ? 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400'
                          : 'border-black/10 bg-black/[0.03] hover:bg-black/[0.07] text-zinc-600'
                      }`}
                    >
                      Sequential Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {mode === 'quiz' && quizSubmitted && (
            <div
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                darkMode
                  ? 'bg-gradient-to-r from-indigo-950/60 via-zinc-900 to-emerald-950/50 border-indigo-500/30'
                  : 'bg-gradient-to-r from-indigo-50 via-white to-emerald-50 border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Test Completed & Evaluated!</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Review your answers and detailed explanations below. All responses have been saved to your mastery tracker.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={startQuizMode}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer"
                >
                  Retake Test
                </button>
                <button
                  onClick={() => {
                    setMode('practice');
                    setQuizSubmitted(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-medium transition cursor-pointer ${
                    darkMode
                      ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-200'
                      : 'border-slate-300 hover:bg-white text-slate-700'
                  }`}
                >
                  Back to Practice
                </button>
              </div>
            </div>
          )}

          {displayedQuestions.length === 0 ? (
            <div
              className={`p-12 rounded-2xl border text-center space-y-4 ${
                darkMode
                  ? 'bg-zinc-900/40 border-zinc-800/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <h3 className="text-base font-semibold">No Questions Match This View</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {filterType !== 'all' || difficultyFilter !== 'all'
                    ? 'Try switching the status or difficulty filter back to "All" to see all questions in this topic.'
                    : 'Upload or paste your generated Markdown MCQs to start practicing this topic.'}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                {(filterType !== 'all' || difficultyFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setFilterType('all');
                      setDifficultyFilter('all');
                    }}
                    className="px-4 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-xs font-medium transition cursor-pointer"
                  >
                    Show All Topic Questions
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => setImportModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import Markdown Questions</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {currentQuestion && (
                <div
                  key={currentQuestion.id}
                  className={`xl:col-span-8 rounded-3xl border p-6 sm:p-8 flex flex-col gap-6 backdrop-blur-2xl apple-question-enter ${
                    darkMode
                      ? 'bg-white/[0.03] border-white/[0.08] shadow-2xl shadow-black/30'
                      : 'bg-white/85 border-black/[0.06] shadow-xl shadow-black/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b pb-4 border-zinc-800/60">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-bold">
                        Q{currentIndex + 1} of {displayedQuestions.length}
                      </span>

                      {(() => {
                        const qDiff = normalizeDifficulty(currentQuestion.difficulty);
                        const meta = DIFFICULTY_META[qDiff] || DIFFICULTY_META.moderate;
                        return isAdmin ? (
                          <select
                            value={qDiff}
                            onChange={(e) =>
                              handleChangeQuestionDifficulty(currentQuestion.id, e.target.value)
                            }
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold outline-none cursor-pointer ${
                              darkMode ? meta.badgeDark : meta.badgeLight
                            }`}
                            title="Admin: Change Question Difficulty"
                          >
                            <option value="easy" className="bg-zinc-900 text-emerald-400">
                              Easy
                            </option>
                            <option value="moderate" className="bg-zinc-900 text-amber-400">
                              Moderate
                            </option>
                            <option value="hard" className="bg-zinc-900 text-rose-400">
                              Hard
                            </option>
                          </select>
                        ) : (
                          <span
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 ${
                              darkMode ? meta.badgeDark : meta.badgeLight
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                            {meta.label}
                          </span>
                        );
                      })()}

                      {mode === 'practice' &&
                        progress[currentQuestion.id]?.selectedIndex !== undefined && (
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                              progress[currentQuestion.id].isCorrect
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {progress[currentQuestion.id].isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Solved Correctly
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Needs Review
                              </>
                            )}
                          </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {mode === 'quiz' && (
                        <button
                          onClick={() => toggleQuizFlag(currentQuestion.id)}
                          className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition cursor-pointer ${
                            quizFlagged[currentQuestion.id]
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                              : darkMode
                              ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                          title="Flag for review before submitting test"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">
                            {quizFlagged[currentQuestion.id] ? 'Flagged' : 'Mark Review'}
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleBookmark(currentQuestion.id)}
                        className={`p-2 rounded-lg border transition cursor-pointer ${
                          progress[currentQuestion.id]?.bookmarked
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                            : darkMode
                            ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                        title="Bookmark Question"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setNoteDrawerOpen((prev) => !prev)}
                        className={`p-2 rounded-lg border transition cursor-pointer ${
                          userNotes[currentQuestion.id]?.trim()
                            ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-400'
                            : darkMode
                            ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                        title="Add/View Personal Study Note for this Question"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteCurrentQuestion(currentQuestion.id)}
                          className={`p-2 rounded-lg border transition cursor-pointer ${
                            darkMode
                              ? 'border-zinc-800 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800'
                              : 'border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-100'
                          }`}
                          title="Delete this question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-base sm:text-lg font-medium leading-relaxed">
                    <RichTextRenderer content={currentQuestion.question} darkMode={darkMode} />
                  </div>

                  {(noteDrawerOpen || userNotes[currentQuestion.id]?.trim()) && (
                    <div
                      className={`p-3.5 rounded-2xl border apple-question-enter ${
                        darkMode
                          ? 'bg-indigo-950/20 border-indigo-500/25'
                          : 'bg-indigo-50/60 border-indigo-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                          <Edit3 className="w-3 h-3" /> Personal Revision Note (Saved Locally)
                        </span>
                        {noteDrawerOpen && (
                          <button
                            onClick={() => setNoteDrawerOpen(false)}
                            className="text-[11px] text-zinc-400 hover:text-zinc-200 cursor-pointer"
                          >
                            Done
                          </button>
                        )}
                      </div>
                      {noteDrawerOpen ? (
                        <textarea
                          rows={2}
                          value={userNotes[currentQuestion.id] || ''}
                          onChange={(e) =>
                            setUserNotes((prev) => ({
                              ...prev,
                              [currentQuestion.id]: e.target.value
                            }))
                          }
                          placeholder="Write your mnemonic, formula, or key takeaway for this question..."
                          className={`w-full p-2.5 rounded-xl text-xs border outline-none ${
                            darkMode
                              ? 'bg-zinc-900/90 border-zinc-700 text-zinc-100 focus:border-indigo-500'
                              : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-500'
                          }`}
                        />
                      ) : (
                        <p
                          onClick={() => setNoteDrawerOpen(true)}
                          className="text-xs text-zinc-300 whitespace-pre-wrap cursor-pointer hover:opacity-80"
                        >
                          {userNotes[currentQuestion.id]}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, optIdx) => {
                      const optionLetter = String.fromCharCode(65 + optIdx);
                      const canonicalOptIdx = currentQuestion._optionOrder
                        ? currentQuestion._optionOrder[optIdx]
                        : optIdx;
                      const userPracticeChoice = progress[currentQuestion.id]?.selectedIndex;
                      const userQuizChoice = quizAnswers[currentQuestion.id];

                      const selectedCanonicalIdx =
                        mode === 'quiz' ? userQuizChoice : userPracticeChoice;
                      const isSelected = selectedCanonicalIdx === canonicalOptIdx;
                      const isCorrectOption = optIdx === currentQuestion.answerIndex;

                      const revealFeedback =
                        (mode === 'practice' && userPracticeChoice !== undefined) ||
                        (mode === 'quiz' && quizSubmitted);

                      let cardStyle = darkMode
                        ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/60'
                        : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100/70';

                      let badgeStyle = darkMode
                        ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                        : 'bg-white text-slate-700 border-slate-200';

                      if (revealFeedback) {
                        if (isCorrectOption) {
                          cardStyle = darkMode
                            ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100'
                            : 'border-emerald-500 bg-emerald-50 text-emerald-950';
                          badgeStyle = 'bg-emerald-500 text-white border-emerald-500';
                        } else if (isSelected && !isCorrectOption) {
                          cardStyle = darkMode
                            ? 'border-rose-500/60 bg-rose-500/10 text-rose-100'
                            : 'border-rose-500 bg-rose-50 text-rose-950';
                          badgeStyle = 'bg-rose-500 text-white border-rose-500';
                        }
                      } else if (isSelected) {
                        cardStyle = darkMode
                          ? 'border-indigo-500 bg-indigo-500/15 text-indigo-100'
                          : 'border-indigo-600 bg-indigo-50 text-indigo-950';
                        badgeStyle = 'bg-indigo-600 text-white border-indigo-600';
                      }

                      const isEliminated = (
                        eliminatedOptions[currentQuestion.id] || []
                      ).includes(optIdx);

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQuestion, optIdx)}
                          className={`apple-press apple-option-stagger-${Math.min(
                            optIdx,
                            5
                          )} group w-full text-left p-4 rounded-2xl border flex items-start gap-3.5 cursor-pointer ${cardStyle} ${
                            isEliminated && !revealFeedback ? 'opacity-40' : ''
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-xl border text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 ${badgeStyle}`}
                          >
                            {optionLetter}
                          </span>
                          <div
                            className={`flex-1 text-sm sm:text-base pt-0.5 ${
                              isEliminated && !revealFeedback ? 'line-through' : ''
                            }`}
                          >
                            <RichTextRenderer content={opt} darkMode={darkMode} />
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 mt-1">
                            {!revealFeedback && (
                              <button
                                type="button"
                                onClick={(e) =>
                                  toggleEliminateOption(currentQuestion.id, optIdx, e)
                                }
                                title={
                                  isEliminated
                                    ? 'Restore option'
                                    : 'Cross out / Eliminate distractor option'
                                }
                                className={`p-1 rounded-lg transition cursor-pointer ${
                                  isEliminated
                                    ? 'text-rose-400 bg-rose-500/15'
                                    : 'opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                                }`}
                              >
                                <EyeOff className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {revealFeedback && isCorrectOption && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            )}
                            {revealFeedback && isSelected && !isCorrectOption && (
                              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {((mode === 'practice' &&
                    progress[currentQuestion.id]?.selectedIndex !== undefined) ||
                    (mode === 'quiz' && quizSubmitted)) && (
                    <div
                      className={`p-5 rounded-2xl border space-y-2 apple-question-enter ${
                        darkMode
                          ? 'bg-indigo-950/25 border-indigo-500/30 text-zinc-200'
                          : 'bg-indigo-50/70 border-indigo-200 text-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                        <Sparkles className="w-4 h-4" />
                        <span>
                          Correct Answer: Option {String.fromCharCode(65 + currentQuestion.answerIndex)}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <RichTextRenderer
                          content={currentQuestion.explanation}
                          darkMode={darkMode}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-4">
                    <button
                      onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                      disabled={currentIndex === 0}
                      className={`apple-press px-5 py-2.5 rounded-full border text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${
                        darkMode
                          ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-200'
                          : 'border-black/10 bg-black/[0.03] hover:bg-black/[0.07] text-zinc-700'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <span className="text-[11px] text-zinc-500 hidden sm:inline">
                      Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">A-D</kbd> to answer,{' '}
                      <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">←</kbd>{' '}
                      <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">→</kbd> to navigate
                    </span>

                    <button
                      onClick={() =>
                        setCurrentIndex((i) => Math.min(displayedQuestions.length - 1, i + 1))
                      }
                      disabled={currentIndex >= displayedQuestions.length - 1}
                      className="apple-press px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div
                className={`xl:col-span-4 rounded-3xl border p-5 sm:p-6 space-y-4 sticky top-24 backdrop-blur-2xl apple-card-hover ${
                  darkMode
                    ? 'bg-white/[0.03] border-white/[0.08] shadow-2xl shadow-black/20'
                    : 'bg-white/80 border-black/[0.06] shadow-xl shadow-black/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Question Palette
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    {currentIndex + 1} / {displayedQuestions.length}
                  </span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 xl:grid-cols-5 gap-2 max-h-[340px] overflow-y-auto pr-1">
                  {displayedQuestions.map((q, idx) => {
                    const isCurrent = idx === currentIndex;
                    const p = progress[q.id];
                    const qAns = quizAnswers[q.id];
                    const canonicalAns = q._optionOrder ? q._optionOrder[q.answerIndex] : q.answerIndex;
                    const isFlagged = quizFlagged[q.id];

                    let btnClass = darkMode
                      ? 'bg-zinc-800/80 text-zinc-400 border-zinc-700/70 hover:bg-zinc-800'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';

                    if (mode === 'quiz') {
                      if (quizSubmitted) {
                        if (qAns === canonicalAns) {
                          btnClass =
                            'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
                        } else if (qAns !== undefined) {
                          btnClass = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
                        }
                      } else if (isFlagged) {
                        btnClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                      } else if (qAns !== undefined) {
                        btnClass = 'bg-indigo-600 text-white border-indigo-500';
                      }
                    } else if (p?.selectedIndex !== undefined) {
                      btnClass = p.isCorrect
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-semibold'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/40 font-semibold';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`apple-press relative h-9 rounded-xl border text-xs font-mono flex items-center justify-center cursor-pointer ${btnClass} ${
                          isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-950 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                        {p?.bookmarked && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div
                  className={`pt-3 border-t grid grid-cols-2 gap-2 text-[11px] text-zinc-400 ${
                    darkMode ? 'border-zinc-800' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50 inline-block" />
                    <span>Correct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500/50 inline-block" />
                    <span>Incorrect</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-zinc-800 border border-zinc-700 inline-block" />
                    <span>Unattempted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ml-0.5" />
                    <span>Bookmarked</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-8 apple-modal-enter ${
              darkMode ? 'bg-[#111116]/95 border-white/10' : 'bg-white/95 border-black/10'
            }`}
          >
            <div
              className={`px-6 py-4 border-b flex items-center justify-between ${
                darkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">
                    Import Markdown Questions to Syllabus
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Upload a <code>.md</code> file or paste AI-generated Markdown MCQs directly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setImportModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    1. Select Module
                  </label>
                  <select
                    value={importTargetModuleId}
                    onChange={(e) => {
                      const modId = e.target.value;
                      setImportTargetModuleId(modId);
                      const mod = modules.find((m) => m.id === modId);
                      if (mod && mod.topics[0]) {
                        setImportTargetTopicId(mod.topics[0].id);
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                        : 'bg-slate-50 border-slate-300 text-slate-800'
                    }`}
                  >
                    {modules.map((m) => (
                      <option key={m.id} value={m.id}>
                        [{m.shortCode}] {m.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    2. Select Target Topic
                  </label>
                  <select
                    value={importTargetTopicId}
                    onChange={(e) => setImportTargetTopicId(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                        : 'bg-slate-50 border-slate-300 text-slate-800'
                    }`}
                  >
                    {(
                      modules.find((m) => m.id === importTargetModuleId)?.topics || []
                    ).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    3. Default Difficulty
                  </label>
                  <select
                    value={importDefaultDifficulty}
                    onChange={(e) => setImportDefaultDifficulty(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                        : 'bg-slate-50 border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    4. Upload .md File (Optional)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.markdown,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full px-3 py-2 rounded-xl border border-dashed text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition cursor-pointer ${
                      darkMode
                        ? 'border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300'
                        : 'border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Choose .md / .txt File</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Markdown Content
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMarkdownInput(SAMPLE_MARKDOWN_TEMPLATE)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                      >
                        Load Sample Format
                      </button>
                      <span className="text-zinc-600">•</span>
                      <button
                        type="button"
                        onClick={handleCopyTemplate}
                        className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedTemplate ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy Template
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                    rows={14}
                    placeholder={`Paste your Markdown questions here...\n\nExample:\n## Section 1: Java Fundamentals\n\n### Q14. [Moderate] What is the output of the following code?\n\`\`\`java\nclass Main {\n    public static void main(String[] args) {\n        int x = 5;\n        System.out.println(x++ + ++x);\n    }\n}\n\`\`\`\n- [ ] 10\n- [ ] 11\n- [x] 12\n- [ ] 13\n**Explanation:** x++ gives 5 (x becomes 6), then ++x makes x=7, so 5+7=12.`}
                    className={`w-full p-3.5 rounded-xl border font-mono text-xs leading-relaxed outline-none resize-y ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-indigo-500'
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                    }`}
                  />
                </div>

                <div className="space-y-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Live Parsed Preview
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-mono font-semibold ${
                        livePreviewQuestions.length > 0
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {livePreviewQuestions.length} Questions Ready
                    </span>
                  </div>

                  <div
                    className={`flex-1 rounded-xl border p-3.5 overflow-y-auto max-h-[340px] space-y-3 ${
                      darkMode
                        ? 'bg-zinc-900/50 border-zinc-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    {livePreviewQuestions.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-2">
                        <HelpCircle className="w-8 h-8 stroke-1" />
                        <p className="text-xs max-w-xs">
                          Paste Markdown on the left or click <strong>"Load Sample Format"</strong> to see how questions, code blocks, options, and answers are automatically extracted.
                        </p>
                      </div>
                    ) : (
                      livePreviewQuestions.map((q, i) => {
                        const qDiff = normalizeDifficulty(q.difficulty);
                        const dMeta = DIFFICULTY_META[qDiff] || DIFFICULTY_META.moderate;
                        return (
                          <div
                            key={q.id}
                            className={`p-3 rounded-xl border text-xs space-y-2 ${
                              darkMode
                                ? 'bg-zinc-950/70 border-zinc-800'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono font-bold text-indigo-400">
                                  Q{i + 1}
                                </span>
                                <span
                                  className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${
                                    darkMode ? dMeta.badgeDark : dMeta.badgeLight
                                  }`}
                                >
                                  {dMeta.label}
                                </span>
                                {q.detectedTopicTitle && (
                                  <span className="px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30 text-[10px] font-medium">
                                    Sub-Topic: {q.detectedTopicTitle}
                                  </span>
                                )}
                              </div>
                              {q.answerUnverified ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                                  Defaulted to A (Add **Answer:** B)
                                </span>
                              ) : (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                                  Answer: {String.fromCharCode(65 + q.answerIndex)}
                                </span>
                              )}
                            </div>
                            <p className="font-medium line-clamp-2">{q.question}</p>
                            <div className="grid grid-cols-2 gap-1 pt-1">
                              {q.options.map((o, oIdx) => (
                                <div
                                  key={oIdx}
                                  className={`truncate px-2 py-1 rounded ${
                                    oIdx === q.answerIndex
                                      ? 'bg-emerald-500/15 text-emerald-300 font-medium'
                                      : 'text-zinc-400'
                                  }`}
                                >
                                  {String.fromCharCode(65 + oIdx)}. {o}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  darkMode
                    ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div>
                  <strong>Auto Sub-Topics & Syntax:</strong> Add <code>## Sub-Topic Name</code> headings (or <code>**Topic:** Name</code>) in your Markdown to automatically create &amp; route questions into sub-topics under the selected module! Use <code>### Q1. [Hard]</code> for questions and <code>**Answer:** B</code> for answers.
                </div>
                <label className="flex items-center gap-2 shrink-0 cursor-pointer select-none font-medium text-amber-400">
                  <input
                    type="checkbox"
                    checked={replaceExistingTopicQs}
                    onChange={(e) => setReplaceExistingTopicQs(e.target.checked)}
                    className="rounded border-zinc-700 text-indigo-600"
                  />
                  <span>Replace existing questions in topic</span>
                </label>
              </div>
            </div>

            <div
              className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
                darkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <button
                onClick={() => setImportModalOpen(false)}
                className={`px-4 py-2 rounded-xl border text-xs font-medium cursor-pointer ${
                  darkMode
                    ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'
                    : 'border-slate-300 hover:bg-white text-slate-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleCommitImport}
                disabled={livePreviewQuestions.length === 0}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Import {livePreviewQuestions.length} Question
                  {livePreviewQuestions.length === 1 ? '' : 's'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {structureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xl flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden apple-modal-enter ${
              darkMode ? 'bg-[#111116]/95 border-white/10' : 'bg-white/95 border-black/10'
            }`}
          >
            <div
              className={`px-6 py-4 border-b flex items-center justify-between ${
                darkMode ? 'border-zinc-800' : 'border-slate-200'
              }`}
            >
              <h3 className="font-bold text-base">Customize Course Syllabus</h3>
              <button
                onClick={() => setStructureModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div onKeyDown={(e) => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); handleAddStructure(e); } }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setStructureType('topic')}
                  className={`py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    structureType === 'topic'
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  New Sub-Topic
                </button>
                <button
                  type="button"
                  onClick={() => setStructureType('module')}
                  className={`py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    structureType === 'module'
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  New Course Module
                </button>
              </div>

              {structureType === 'topic' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Parent Module
                    </label>
                    <select
                      value={targetModuleForTopic}
                      onChange={(e) => setTargetModuleForTopic(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none ${
                        darkMode
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                          : 'bg-slate-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      {modules.map((m) => (
                        <option key={m.id} value={m.id}>
                          [{m.shortCode}] {m.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Topic Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newTopicTitle}
                      onChange={(e) => setNewTopicTitle(e.target.value)}
                      placeholder="e.g., Spark Structured Streaming & Watermarks"
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none ${
                        darkMode
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Module Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newModuleTitle}
                      onChange={(e) => setNewModuleTitle(e.target.value)}
                      placeholder="e.g., Data Visualization & Tableau"
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none ${
                        darkMode
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Short Code (3-5 chars)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={newModuleCode}
                      onChange={(e) => setNewModuleCode(e.target.value)}
                      placeholder="e.g., DVIZ"
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm font-mono uppercase outline-none ${
                        darkMode
                          ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStructureModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-700 text-xs font-medium text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddStructure}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Create {structureType === 'module' ? 'Module' : 'Topic'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xl flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl border shadow-2xl overflow-hidden apple-modal-enter ${
              darkMode ? 'bg-[#111116]/95 border-white/10' : 'bg-white/95 border-black/10'
            }`}
          >
            <div
              className={`px-6 py-4 border-b flex items-center justify-between ${
                darkMode ? 'border-zinc-800' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-base">Admin Mode Unlock</h3>
              </div>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div onKeyDown={(e) => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); handleAdminUnlockSubmit(e); } }} className="p-6 space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                Public visitors on Vercel are in <strong>Read-Only Practice Mode</strong> so they cannot delete or modify your syllabus. Enter your Admin Passcode to unlock editing & Markdown import.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="Enter passcode (default: dbda2025)"
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none ${
                    darkMode
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-100 focus:border-indigo-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500'
                  }`}
                />
              </div>

              <div className="pt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-700 text-xs font-medium text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdminUnlockSubmit}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Unlock Admin Controls
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {commandPaletteOpen && (
        <div
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-start justify-center pt-20 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden apple-modal-enter ${
              darkMode ? 'bg-[#121218]/95 border-white/15' : 'bg-white/95 border-black/10'
            }`}
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-indigo-400" />
              <input
                type="text"
                autoFocus
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                placeholder="Type a module, topic, or command (e.g., 'Spark', 'Custom Exam', 'Zen')..."
                className="w-full bg-transparent text-sm outline-none"
              />
              <kbd className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-zinc-400">
                ESC
              </kbd>
            </div>

            <div className="max-h-96 overflow-y-auto p-3 space-y-4">
              <div>
                <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Quick Actions
                </p>
                <div className="space-y-1">
                  {[
                    {
                      label: 'Start Multi-Module Custom Exam',
                      sub: 'Mix & match modules and difficulty',
                      action: () => {
                        setCommandPaletteOpen(false);
                        setCustomExamModalOpen(true);
                      }
                    },
                    {
                      label: 'Open Syllabus Mastery Analytics',
                      sub: 'Check module-wise accuracy & difficulty breakdown',
                      action: () => {
                        setCommandPaletteOpen(false);
                        setAnalyticsModalOpen(true);
                      }
                    },
                    {
                      label: zenMode ? 'Exit Zen Focus Mode' : 'Enter Zen Focus Mode',
                      sub: 'Shortcut: Press F anytime',
                      action: () => {
                        setZenMode((z) => !z);
                        setCommandPaletteOpen(false);
                      }
                    }
                  ]
                    .filter(
                      (a) =>
                        !commandSearch.trim() ||
                        a.label.toLowerCase().includes(commandSearch.toLowerCase())
                    )
                    .map((item, i) => (
                      <button
                        key={i}
                        onClick={item.action}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between cursor-pointer ${
                          darkMode ? 'hover:bg-white/[0.07]' : 'hover:bg-black/[0.05]'
                        }`}
                      >
                        <span className="font-medium text-indigo-400">{item.label}</span>
                        <span className="text-[11px] text-zinc-500">{item.sub}</span>
                      </button>
                    ))}
                </div>
              </div>

              <div>
                <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Jump to Topic
                </p>
                <div className="space-y-1">
                  {modules
                    .flatMap((m) =>
                      m.topics.map((t) => ({
                        ...t,
                        modTitle: m.title,
                        modCode: m.shortCode,
                        count: questions.filter((q) => q.topicId === t.id).length
                      }))
                    )
                    .filter(
                      (t) =>
                        !commandSearch.trim() ||
                        t.title.toLowerCase().includes(commandSearch.toLowerCase()) ||
                        t.modTitle.toLowerCase().includes(commandSearch.toLowerCase()) ||
                        t.modCode.toLowerCase().includes(commandSearch.toLowerCase())
                    )
                    .map((t) => {
                      const isBlockedForStudent = !!t.locked && !isAdmin;
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            if (isBlockedForStudent) {
                              showToast(
                                `"${t.title}" is currently locked by the instructor.`,
                                'error'
                              );
                              return;
                            }
                            setSelectedTopicId(t.id);
                            setCustomExamPoolIds(null);
                            setSessionQuestionIds(null);
                            setOptionOrders((prev) => ({
                              ...prev,
                              ...generateShuffledOptionOrders(
                                questions.filter((q) => q.topicId === t.id)
                              )
                            }));
                            setCurrentIndex(0);
                            setCommandPaletteOpen(false);
                            setCommandSearch('');
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                            isBlockedForStudent
                              ? 'opacity-60 cursor-not-allowed'
                              : darkMode
                              ? 'hover:bg-white/[0.07] cursor-pointer'
                              : 'hover:bg-black/[0.05] cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-mono text-[10px] font-semibold">
                              {t.modCode}
                            </span>
                            {t.locked && <Lock className="w-3 h-3 text-amber-400 shrink-0" />}
                            <span className="truncate font-medium">{t.title}</span>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-500">
                            {isBlockedForStudent ? 'Locked' : `${t.count} Qs`}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {customExamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xl flex items-center justify-center p-4">
          <div
            className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden apple-modal-enter ${
              darkMode ? 'bg-[#111116]/95 border-white/10' : 'bg-white/95 border-black/10'
            }`}
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <div>
                  <h3 className="font-bold text-base">Custom PG-DBDA Exam Builder</h3>
                  <p className="text-xs text-zinc-400">
                    Combine multiple modules into a randomized mock test
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCustomExamModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    1. Select Modules (Leave empty for All Unlocked Modules)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const selectableModIds = modules
                        .filter((m) => {
                          if (isAdmin) return true;
                          return m.topics.some((t) => !t.locked);
                        })
                        .map((m) => m.id);
                      setCustomExamSelectedMods(
                        customExamSelectedMods.length === selectableModIds.length
                          ? []
                          : selectableModIds
                      );
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    {customExamSelectedMods.length > 0 ? 'Clear All' : 'Select All Available'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {modules.map((m) => {
                    const checked = customExamSelectedMods.includes(m.id);
                    const totalTopics = m.topics.length;
                    const lockedTopics = m.topics.filter((t) => t.locked);
                    const unlockedTopics = m.topics.filter((t) => !t.locked);
                    const isFullyLockedForStudent = !isAdmin && totalTopics > 0 && unlockedTopics.length === 0;
                    const hasPartialLocks = lockedTopics.length > 0 && unlockedTopics.length > 0;

                    const accessibleTopicIds = new Set(
                      (isAdmin ? m.topics : unlockedTopics).map((t) => t.id)
                    );
                    const qCount = questions.filter((q) => accessibleTopicIds.has(q.topicId)).length;

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          if (isFullyLockedForStudent) {
                            showToast(
                              `All topics in "${m.title}" are currently locked by the instructor.`,
                              'error'
                            );
                            return;
                          }
                          setCustomExamSelectedMods((prev) =>
                            checked ? prev.filter((id) => id !== m.id) : [...prev, m.id]
                          );
                        }}
                        className={`p-3 rounded-2xl border text-left text-xs flex flex-col gap-1.5 transition ${
                          isFullyLockedForStudent
                            ? darkMode
                              ? 'border-amber-500/20 bg-white/[0.015] text-zinc-500 opacity-70 cursor-not-allowed'
                              : 'border-amber-200 bg-amber-50/40 text-zinc-400 opacity-75 cursor-not-allowed'
                            : checked
                            ? 'border-violet-500 bg-violet-500/15 text-violet-200 cursor-pointer'
                            : darkMode
                            ? 'border-white/10 bg-white/[0.02] text-zinc-300 hover:bg-white/[0.05] cursor-pointer'
                            : 'border-black/10 bg-black/[0.02] text-zinc-700 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 w-full">
                          <span className="truncate font-semibold flex items-center gap-1.5">
                            {isFullyLockedForStudent && (
                              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            )}
                            <span className="truncate">
                              [{m.shortCode}] {m.title}
                            </span>
                          </span>
                          {isFullyLockedForStudent ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-semibold shrink-0">
                              Locked
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] opacity-80 shrink-0">
                              {qCount}Q
                            </span>
                          )}
                        </div>

                        {hasPartialLocks && (
                          <div className="flex items-center gap-1 text-[10px] text-amber-400/90">
                            <Lock className="w-2.5 h-2.5 shrink-0" />
                            <span>
                              {lockedTopics.length} of {totalTopics} topics locked
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    2. Questions
                  </label>
                  <select
                    value={customExamCount}
                    onChange={(e) => setCustomExamCount(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                        : 'bg-slate-50 border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="10">10 Questions</option>
                    <option value="25">25 Questions</option>
                    <option value="50">50 Questions</option>
                    <option value="100">100 Questions</option>
                    <option value="all">All Matching</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    3. Difficulty
                  </label>
                  <select
                    value={customExamDifficulty}
                    onChange={(e) => setCustomExamDifficulty(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                        : 'bg-slate-50 border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="all">Mixed Levels</option>
                    <option value="easy">Easy Only</option>
                    <option value="moderate">Moderate Only</option>
                    <option value="hard">Hard Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                    4. Exam Timer
                  </label>
                  <select
                    value={customExamTimerMinutes}
                    onChange={(e) => setCustomExamTimerMinutes(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm outline-none ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                        : 'bg-slate-50 border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="auto">Auto (1 min / Q)</option>
                    <option value="10">10 Minutes</option>
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes (1 Hr)</option>
                    <option value="90">90 Minutes (1.5 Hrs)</option>
                    <option value="120">120 Minutes (2 Hrs)</option>
                    <option value="untimed">Untimed</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleStartCustomExam(false)}
                  className={`apple-press px-4 py-2.5 rounded-full border text-xs font-semibold cursor-pointer ${
                    darkMode
                      ? 'border-white/15 bg-white/[0.05] text-zinc-200 hover:bg-white/[0.1]'
                      : 'border-black/15 bg-black/[0.04] text-zinc-800'
                  }`}
                >
                  Launch in Practice Mode
                </button>
                <button
                  type="button"
                  onClick={() => handleStartCustomExam(true)}
                  className="apple-press px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start Timed Mock Exam</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {analyticsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xl flex items-center justify-center p-4">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden apple-modal-enter ${
              darkMode ? 'bg-[#111116]/95 border-white/10' : 'bg-white/95 border-black/10'
            }`}
          >
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-base">PG-DBDA Mastery & Performance Analytics</h3>
                  <p className="text-xs text-zinc-400">
                    Module-wise accuracy and difficulty readiness
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAnalyticsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <p className="text-[11px] text-zinc-400">Overall Accuracy</p>
                  <p className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    {stats.accuracy}%
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <p className="text-[11px] text-zinc-400">Attempted</p>
                  <p className="text-xl font-bold font-mono text-indigo-400 mt-1">
                    {stats.attempted}/{stats.total}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <p className="text-[11px] text-zinc-400">Best Streak</p>
                  <p className="text-xl font-bold font-mono text-orange-400 mt-1">
                    🔥 {bestStreak}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <p className="text-[11px] text-zinc-400">Bookmarked</p>
                  <p className="text-xl font-bold font-mono text-amber-400 mt-1">
                    {stats.bookmarked}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Module Readiness
                </h4>
                {modules.map((m) => {
                  const tIds = new Set(m.topics.map((t) => t.id));
                  const mQs = questions.filter((q) => tIds.has(q.topicId));
                  const mAttempted = mQs.filter(
                    (q) => progress[q.id]?.selectedIndex !== undefined
                  );
                  const mCorrect = mAttempted.filter((q) => progress[q.id]?.isCorrect);
                  const mAcc =
                    mAttempted.length > 0
                      ? Math.round((mCorrect.length / mAttempted.length) * 100)
                      : 0;
                  const completionPct =
                    mQs.length > 0 ? Math.round((mAttempted.length / mQs.length) * 100) : 0;

                  return (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold">
                          [{m.shortCode}] {m.title}
                        </span>
                        <span className="font-mono text-zinc-400">
                          {mAttempted.length}/{mQs.length} Solved •{' '}
                          <strong className="text-emerald-400">{mAcc}% Acc</strong>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700"
                          style={{ width: `${completionPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}