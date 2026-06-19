import { Question, Quiz, Badge, DailyChallenge, UserProfile, QuizAttempt, QuestionType } from "../types";

// Default preset quizzes
const DEFAULT_QUIZZES: Quiz[] = [
  {
    id: "preset-web-dev",
    title: "Frontend Wizards (CSS & JS)",
    category: "Web Development",
    description: "Test your skills on modern CSS Grid, Flexbox, ES2022 features, and tricky JS closures.",
    duration: 120,
    xpReward: 150,
    isAiGenerated: false,
    rating: 4.8,
    questions: [
      {
        id: "q-web-1",
        type: QuestionType.MC,
        text: "Which of the following is true about dynamic CSS container queries (@container)?",
        options: [
          "They query the viewport sizing instead of the parent container.",
          "They style an element based on the size of its nearest query container ancestor.",
          "They only support width and height, never inline-size.",
          "They require a JavaScript polyfill for basic operations in modern browsers."
        ],
        correctAnswer: "They style an element based on the size of its nearest query container ancestor."
      },
      {
        id: "q-web-2",
        type: QuestionType.MC,
        text: "What is the primary benefit of JavaScript closures?",
        options: [
          "They allocate more RAM dynamically to prevent garbage collection errors.",
          "They allow a function to gain access to variables in its outer scope even after that outer function returns.",
          "They automatically convert synchronous callbacks to Web Workers.",
          "They prevent variables from being stored on the stack frame."
        ],
        correctAnswer: "They allow a function to gain access to variables in its outer scope even after that outer function returns."
      },
      {
        id: "q-web-3",
        type: QuestionType.TF,
        text: "CSS Custom Properties (Variables) are strictly compiled at build time by CSS compilers like Sass or PostCSS and cannot be altered at runtime via JS.",
        options: ["True", "False"],
        correctAnswer: "False"
      },
      {
        id: "q-web-4",
        type: QuestionType.MC,
        text: "How does React 19 handle DOM elements compared to prior versions?",
        options: [
          "It deprecates the virtual DOM completely in favor of compiled bindings.",
          "It natively supports Document Metadata, stylesheets, and custom elements with automatic hydration.",
          "It forces all event handlers to stream via Node.js server pipelines.",
          "It removes standard React state hooks like useState."
        ],
        correctAnswer: "It natively supports Document Metadata, stylesheets, and custom elements with automatic hydration."
      },
      {
        id: "q-web-5",
        type: QuestionType.TF,
        text: "Using 'async def' in serverless script runtimes is the recommended way to invoke React Server Components natively.",
        options: ["True", "False"],
        correctAnswer: "False"
      }
    ]
  },
  {
    id: "preset-cosmos",
    title: "Cosmos Odyssey",
    category: "Space Exploration",
    description: "Embark on an astronomical trip through the cosmic horizon, planetary orbits, and deep sky nebula.",
    duration: 150,
    xpReward: 200,
    isAiGenerated: false,
    rating: 4.9,
    questions: [
      {
        id: "q-cos-1",
        type: QuestionType.MC,
        text: "What lies at the absolute center of our Milky Way galaxy?",
        options: [
          "A dormant magnetar cluster",
          "Sagittarius A*, a supermassive black hole",
          "The remnant core of the Andromeda collision",
          "A hyperdense Dyson Sphere"
        ],
        correctAnswer: "Sagittarius A*, a supermassive black hole"
      },
      {
        id: "q-cos-2",
        type: QuestionType.MC,
        text: "Which planet in our solar system has the most extreme temperature fluctuations between day and night?",
        options: [
          "Venus",
          "Mercury",
          "Mars",
          "Saturn"
        ],
        correctAnswer: "Mercury"
      },
      {
        id: "q-cos-3",
        type: QuestionType.TF,
        text: "The Webb Space Telescope sees primordial celestial structures primarily by measuring high-frequency Gamma Ray bursts.",
        options: ["True", "False"],
        correctAnswer: "False"
      },
      {
        id: "q-cos-4",
        type: QuestionType.MC,
        text: "How far is light able to travel within an average astronomical year (Julian year)?",
        options: [
          "Approximately 9.46 trillion kilometers",
          "Approximately 150 million kilometers (1 AU)",
          "Over 300 million meters exactly",
          "4.2 light-years to Proxima Centauri"
        ],
        correctAnswer: "Approximately 9.46 trillion kilometers"
      }
    ]
  },
  {
    id: "preset-mythology",
    title: "Mythological Realms",
    category: "Ancient History",
    description: "Explore the fascinating legends of Greek, Roman, Egyptian, and Norse pantheons.",
    duration: 90,
    xpReward: 120,
    isAiGenerated: false,
    rating: 4.5,
    questions: [
      {
        id: "q-myth-1",
        type: QuestionType.MC,
        text: "Who is the Norse god of trickery, shape-shifting, and dual loyalties?",
        options: [
          "Odinn",
          "Thor",
          "Loki",
          "Baldur"
        ],
        correctAnswer: "Loki"
      },
      {
        id: "q-myth-2",
        type: QuestionType.TF,
        text: "In classical Greek myth, Hercules had to execute 12 intense labors commanded by King Eurystheus.",
        options: ["True", "False"],
        correctAnswer: "True"
      },
      {
        id: "q-myth-3",
        type: QuestionType.MC,
        text: "Which Egyptian deity holds the scales of truth to weigh the hearts of deceased mortals?",
        options: [
          "Osiris",
          "Anubis",
          "Horus",
          "Ra"
        ],
        correctAnswer: "Anubis"
      }
    ]
  },
  {
    id: "preset-quantum",
    title: "Quantum Mechanics",
    category: "Physics & Chemistry",
    description: "Dive deep into wave-particle duality, superposition, Schrödinger's equations, and qubits.",
    duration: 180,
    xpReward: 250,
    isAiGenerated: false,
    rating: 5.0,
    questions: [
      {
        id: "q-phys-1",
        type: QuestionType.MC,
        text: "What fundamental quantum phenomenon states that two particles remain synchronously correlated regardless of spatial distance?",
        options: [
          "Quantum Decoherence",
          "Quantum Entanglement",
          "Heisenberg Uncertainty",
          "Planck Emission Spectrum"
        ],
        correctAnswer: "Quantum Entanglement"
      },
      {
        id: "q-phys-2",
        type: QuestionType.TF,
        text: "Schrödinger's Cat is an actual experimental physical design with optical glass that proves quantum sub-atomic states exist in absolute vacuum.",
        options: ["True", "False"],
        correctAnswer: "False"
      },
      {
        id: "q-phys-3",
        type: QuestionType.MC,
        text: "Which unit represents the absolute smallest packet of electromagnetic energy in quantum mechanics?",
        options: [
          "A Qubit",
          "A Photon (Quantum)",
          "An Electron-Volt",
          "A Baryon"
        ],
        correctAnswer: "A Photon (Quantum)"
      },
      {
        id: "q-phys-4",
        type: QuestionType.MC,
        text: "The principle asserting that it is experimentally impossible to simultaneously resolve both the exact velocity and position of a sub-atomic particle is attributed to:",
        options: [
          "Albert Einstein",
          "Niels Bohr",
          "Werner Heisenberg",
          "Max Planck"
        ],
        correctAnswer: "Werner Heisenberg"
      }
    ]
  }
];

const DEFAULT_BADGES: Badge[] = [
  {
    id: "badge-first",
    name: "First Blood",
    description: "Completed your first Qyzz challenge successfully.",
    icon: "Trophy",
    requirement: "Complete 1 Quiz"
  },
  {
    id: "badge-perfect",
    name: "Perfect Zenith",
    description: "Achieved a flawless 100% score on any custom or preset quiz.",
    icon: "Target",
    requirement: "100% Quiz Score"
  },
  {
    id: "badge-streak",
    name: "Flamekeeper",
    description: "Kept the learning flame alive! Attained a streak of 3 matches.",
    icon: "Flame",
    requirement: "Reach 3 Streaks"
  },
  {
    id: "badge-creator",
    name: "Archon Creator",
    description: "Engineered a custom or AI-generated quiz using the workspace.",
    icon: "Sparkles",
    requirement: "Create 1 Custom Quiz"
  },
  {
    id: "badge-conqueror",
    name: "Elite Scholar",
    description: "Amassed over 500 cumulative action points (XP).",
    icon: "Award",
    requirement: "Accumulate 500 XP"
  }
];

const DEFAULT_CHALLENGES: DailyChallenge[] = [
  {
    id: "challenge-1",
    text: "Rise & Rank: Play at least 1 deep quiz challenge",
    target: 1,
    current: 0,
    xpReward: 50,
    completed: false,
    type: "play_quiz"
  },
  {
    id: "challenge-2",
    text: "Zenith Score: Achieve a score of 80% or higher",
    target: 80,
    current: 0,
    xpReward: 75,
    completed: false,
    type: "get_score"
  },
  {
    id: "challenge-3",
    text: "XP Accumulator: Grab a total of 150 XP today",
    target: 150,
    current: 0,
    xpReward: 100,
    completed: false,
    type: "earn_xp"
  }
];

// Helper to initialize Local Storage
const initStorage = () => {
  if (!localStorage.getItem("qyzz_quizzes")) {
    localStorage.setItem("qyzz_quizzes", JSON.stringify(DEFAULT_QUIZZES));
  }
  if (!localStorage.getItem("qyzz_badges")) {
    localStorage.setItem("qyzz_badges", JSON.stringify(DEFAULT_BADGES));
  }
  if (!localStorage.getItem("qyzz_challenges")) {
    localStorage.setItem("qyzz_challenges", JSON.stringify(DEFAULT_CHALLENGES));
  }
  if (!localStorage.getItem("qyzz_attempts")) {
    localStorage.setItem("qyzz_attempts", JSON.stringify([]));
  }
  if (!localStorage.getItem("qyzz_users")) {
    // Initial user roster for leaderboards
    const defaultUsers: UserProfile[] = [
      {
        uid: "user-1",
        username: "QuantumEinstein",
        email: "einstein@physics.org",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
        xp: 1250,
        level: 8,
        streak: 5,
        highestScore: 100,
        quizzesPlayed: 14,
        completedQuizIds: ["preset-cosmos", "preset-quantum"],
        unlockedBadgeIds: ["badge-first", "badge-perfect", "badge-streak", "badge-conqueror"],
        createdAt: new Date().toISOString()
      },
      {
        uid: "user-2",
        username: "AdaLovelaceJS",
        email: "ada@lovelace.io",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
        xp: 980,
        level: 6,
        streak: 3,
        highestScore: 95,
        quizzesPlayed: 9,
        completedQuizIds: ["preset-web-dev"],
        unlockedBadgeIds: ["badge-first", "badge-streak", "badge-conqueror"],
        createdAt: new Date().toISOString()
      },
      {
        uid: "user-3",
        username: "CurieRadium",
        email: "marie@curie.fr",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120",
        xp: 620,
        level: 4,
        streak: 2,
        highestScore: 100,
        quizzesPlayed: 5,
        completedQuizIds: ["preset-quantum"],
        unlockedBadgeIds: ["badge-first", "badge-perfect"],
        createdAt: new Date().toISOString()
      },
      {
        uid: "user-4",
        username: "CosmosSage",
        email: "sagan@cosmos.edu",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120",
        xp: 410,
        level: 3,
        streak: 1,
        highestScore: 85,
        quizzesPlayed: 3,
        completedQuizIds: ["preset-cosmos"],
        unlockedBadgeIds: ["badge-first"],
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem("qyzz_users", JSON.stringify(defaultUsers));
  }
};

initStorage();

export const mockDb = {
  // --- AUTH OPERATIONS ---
  getCurrentUser(): UserProfile | null {
    const userJson = localStorage.getItem("qyzz_current_user");
    if (!userJson) return null;
    return JSON.parse(userJson);
  },

  signup(username: string, email: string, passwordString: string): UserProfile {
    const users: UserProfile[] = JSON.parse(localStorage.getItem("qyzz_users") || "[]");
    
    // Check if user already exists
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error("This email is already registered on Qyzz.");
    }

    const newUser: UserProfile = {
      uid: "user-" + Math.random().toString(36).substring(2, 9),
      username: username || email.split("@")[0],
      email: email.toLowerCase(),
      avatarUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(username || email)}`,
      xp: 0,
      level: 1,
      streak: 1,
      highestScore: 0,
      quizzesPlayed: 0,
      completedQuizIds: [],
      unlockedBadgeIds: [],
      createdAt: new Date().toISOString(),
      isAdmin: email.toLowerCase().includes("admin") || email.toLowerCase() === "ajithasabural@gmail.com" // Admin check based on email
    };

    users.push(newUser);
    localStorage.setItem("qyzz_users", JSON.stringify(users));
    localStorage.setItem("qyzz_current_user", JSON.stringify(newUser));
    return newUser;
  },

  login(email: string, passwordString: string): UserProfile {
    const users: UserProfile[] = JSON.parse(localStorage.getItem("qyzz_users") || "[]");
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error("Invalid email or security password.");
    }

    // Daily active streak increment simulation logic
    const todayStr = new Date().toDateString();
    if (user.lastActiveDate && user.lastActiveDate !== todayStr) {
      const lastActive = new Date(user.lastActiveDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActive.toDateString() === yesterday.toDateString()) {
        user.streak += 1;
      } else if (lastActive.toDateString() !== todayStr) {
        user.streak = 1; //reset
      }
    }
    user.lastActiveDate = todayStr;
    
    // Check elements
    localStorage.setItem("qyzz_current_user", JSON.stringify(user));
    // Save updated users back
    const idx = users.findIndex(u => u.uid === user.uid);
    if (idx !== -1) users[idx] = user;
    localStorage.setItem("qyzz_users", JSON.stringify(users));

    return user;
  },

  simulateGoogleSignIn(): UserProfile {
    // Return a beautiful generated Google credential user
    const randomSuffix = Math.floor(Math.random() * 900) + 100;
    const username = `G_Learner_${randomSuffix}`;
    const email = `learner${randomSuffix}@gmail.com`;
    return this.signup(username, email, "google-simulated-auth");
  },

  logout() {
    localStorage.removeItem("qyzz_current_user");
  },

  forgotPassword(email: string) {
    // Send simulated email response
    return `An educational reset link has been dispatched to ${email}. Check your inbox!`;
  },

  // --- QUIZZES SERVICES ---
  getQuizzes(): Quiz[] {
    return JSON.parse(localStorage.getItem("qyzz_quizzes") || "[]");
  },

  createQuiz(quiz: Omit<Quiz, "id" | "rating">): Quiz {
    const quizzes = this.getQuizzes();
    const newQuiz: Quiz = {
      ...quiz,
      id: "quiz-" + Math.random().toString(36).substring(2, 9),
      rating: 5.0
    };
    quizzes.push(newQuiz);
    localStorage.setItem("qyzz_quizzes", JSON.stringify(quizzes));

    // Award direct "Archon Creator" badge if they haven't earned it yet
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.unlockBadge(currentUser.uid, "badge-creator");
    }

    return newQuiz;
  },

  deleteQuiz(quizId: string) {
    let quizzes = this.getQuizzes();
    quizzes = quizzes.filter(q => q.id !== quizId);
    localStorage.setItem("qyzz_quizzes", JSON.stringify(quizzes));
  },

  // --- ATTEMPTS & PROGRESS ---
  getAttempts(userId: string): QuizAttempt[] {
    const attempts: QuizAttempt[] = JSON.parse(localStorage.getItem("qyzz_attempts") || "[]");
    return attempts.filter(a => a.userId === userId);
  },

  addAttempt(userId: string, data: Omit<QuizAttempt, "id" | "userId" | "completedAt">): QuizAttempt {
    const attempts: QuizAttempt[] = JSON.parse(localStorage.getItem("qyzz_attempts") || "[]");
    const newAttempt: QuizAttempt = {
      ...data,
      id: "attempt-" + Math.random().toString(36).substring(2, 9),
      userId,
      completedAt: new Date().toISOString()
    };
    attempts.push(newAttempt);
    localStorage.setItem("qyzz_attempts", JSON.stringify(attempts));

    // Update User Profile state (XP, Level, Badges, etc)
    const users: UserProfile[] = JSON.parse(localStorage.getItem("qyzz_users") || "[]");
    const uIndex = users.findIndex(u => u.uid === userId);
    if (uIndex !== -1) {
      const user = users[uIndex];
      user.quizzesPlayed += 1;
      
      if (!user.completedQuizIds.includes(data.quizId)) {
        user.completedQuizIds.push(data.quizId);
      }

      user.xp += data.xpEarned;
      if (data.accuracy > user.highestScore) {
        user.highestScore = data.accuracy;
      }

      // Track Leveling: 100 XP per level
      const newLevel = Math.max(1, Math.floor(user.xp / 100) + 1);
      if (newLevel > user.level) {
        user.level = newLevel;
      }

      // Check Badges Unlocked
      if (user.quizzesPlayed >= 1 && !user.unlockedBadgeIds.includes("badge-first")) {
        user.unlockedBadgeIds.push("badge-first");
      }
      if (data.accuracy === 100 && !user.unlockedBadgeIds.includes("badge-perfect")) {
        user.unlockedBadgeIds.push("badge-perfect");
      }
      if (user.streak >= 3 && !user.unlockedBadgeIds.includes("badge-streak")) {
        user.unlockedBadgeIds.push("badge-streak");
      }
      if (user.xp >= 500 && !user.unlockedBadgeIds.includes("badge-conqueror")) {
        user.unlockedBadgeIds.push("badge-conqueror");
      }

      users[uIndex] = user;
      localStorage.setItem("qyzz_users", JSON.stringify(users));

      // Sync active state if currently logged in
      const current = this.getCurrentUser();
      if (current && current.uid === userId) {
        localStorage.setItem("qyzz_current_user", JSON.stringify(user));
      }
    }

    // Tick Daily Challenges Progress
    this.updateDailyChallengeProgress("play_quiz", 1);
    this.updateDailyChallengeProgress("earn_xp", data.xpEarned);
    if (data.accuracy >= 80) {
      this.updateDailyChallengeProgress("get_score", data.accuracy);
    }

    return newAttempt;
  },

  getLeaderboard(): UserProfile[] {
    const users: UserProfile[] = JSON.parse(localStorage.getItem("qyzz_users") || "[]");
    // Sort descending by cumulative earned XP
    return users.sort((a, b) => b.xp - a.xp);
  },

  // --- ACHIEVEMENTS & DAILY CHALLENGES ---
  getDailyChallenges(): DailyChallenge[] {
    return JSON.parse(localStorage.getItem("qyzz_challenges") || "[]");
  },

  updateDailyChallengeProgress(type: "play_quiz" | "get_score" | "earn_xp", amount: number) {
    const challenges = this.getDailyChallenges();
    const currentActiveUser = this.getCurrentUser();
    if (!currentActiveUser) return;

    let updated = false;

    const modified = challenges.map(ch => {
      if (ch.type === type && !ch.completed) {
        let proposed = ch.current;
        if (type === "get_score") {
          proposed = Math.max(ch.current, amount);
        } else {
          proposed += amount;
        }

        const completedNow = proposed >= ch.target;
        if (completedNow && !ch.completed) {
          // Direct reward user XP !
          this.awardDirectXp(currentActiveUser.uid, ch.xpReward);
          updated = true;
        }

        return {
          ...ch,
          current: Math.min(proposed, ch.target * 2), // Cap overflow slightly
          completed: ch.completed || completedNow
        };
      }
      return ch;
    });

    localStorage.setItem("qyzz_challenges", JSON.stringify(modified));
  },

  unlockBadge(userId: string, badgeId: string) {
    const users: UserProfile[] = JSON.parse(localStorage.getItem("qyzz_users") || "[]");
    const idx = users.findIndex(u => u.uid === userId);
    if (idx !== -1) {
      const user = users[idx];
      if (!user.unlockedBadgeIds.includes(badgeId)) {
        user.unlockedBadgeIds.push(badgeId);
        users[idx] = user;
        localStorage.setItem("qyzz_users", JSON.stringify(users));

        const current = this.getCurrentUser();
        if (current && current.uid === userId) {
          localStorage.setItem("qyzz_current_user", JSON.stringify(user));
        }
      }
    }
  },

  getBadges(): Badge[] {
    return JSON.parse(localStorage.getItem("qyzz_badges") || "[]");
  },

  awardDirectXp(userId: string, amount: number) {
    const users: UserProfile[] = JSON.parse(localStorage.getItem("qyzz_users") || "[]");
    const idx = users.findIndex(u => u.uid === userId);
    if (idx !== -1) {
      const user = users[idx];
      user.xp += amount;
      
      const newLevel = Math.max(1, Math.floor(user.xp / 100) + 1);
      if (newLevel > user.level) {
        user.level = newLevel;
      }
      
      users[idx] = user;
      localStorage.setItem("qyzz_users", JSON.stringify(users));

      const current = this.getCurrentUser();
      if (current && current.uid === userId) {
        localStorage.setItem("qyzz_current_user", JSON.stringify(user));
      }
    }
  }
};
