// Author: Kevin Dubon
// Hogwarts School of AI and Automation - Sorting Hat Quiz
// Deterministic sorting algorithm based on personality questions

const HOUSES = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

const QUESTIONS = [
  {
    id: 1,
    question: "Your automation just broke in production at 2 AM. What's your first move?",
    options: [
      { text: "Jump in headfirst and fix it live. Sleep is for the weak.", house: "Gryffindor" },
      { text: "Check the logs, trace the root cause methodically, THEN fix it.", house: "Ravenclaw" },
      { text: "Wake up the team. Nobody suffers alone on my watch.", house: "Hufflepuff" },
      { text: "Already had a rollback plan. Execute it, fix properly in the morning.", house: "Slytherin" }
    ]
  },
  {
    id: 2,
    question: "You discover a competitor's entire workflow is built on a terrible architecture. You...",
    options: [
      { text: "Feel the urge to rebuild it from scratch, better, just to prove a point.", house: "Gryffindor" },
      { text: "Study it to understand WHY it's bad. Every disaster is a lesson.", house: "Ravenclaw" },
      { text: "Reach out and offer to help them fix it. Rising tides lift all boats.", house: "Hufflepuff" },
      { text: "Take notes on what NOT to do. Their weakness is your advantage.", house: "Slytherin" }
    ]
  },
  {
    id: 3,
    question: "You're given unlimited budget for one automation tool. You pick...",
    options: [
      { text: "The newest, most cutting-edge thing nobody's tried yet. Fortune favors the bold.", house: "Gryffindor" },
      { text: "Whatever has the best documentation and most elegant architecture.", house: "Ravenclaw" },
      { text: "The one that's easiest for the whole team to learn and collaborate on.", house: "Hufflepuff" },
      { text: "The one that gives you the most control and competitive advantage.", house: "Slytherin" }
    ]
  },
  {
    id: 4,
    question: "A client asks you to automate something that's technically possible but ethically gray. You...",
    options: [
      { text: "Speak up immediately. If it feels wrong, it IS wrong.", house: "Gryffindor" },
      { text: "Research the implications thoroughly before giving your informed opinion.", house: "Ravenclaw" },
      { text: "Think about who might be harmed and advocate for them.", house: "Hufflepuff" },
      { text: "Find a way to achieve their goal that's both effective AND defensible.", house: "Slytherin" }
    ]
  },
  {
    id: 5,
    question: "What's your guilty pleasure when it comes to building automations?",
    options: [
      { text: "Over-engineering something just because it's fun to push limits.", house: "Gryffindor" },
      { text: "Spending three hours optimizing something that saves 30 seconds.", house: "Ravenclaw" },
      { text: "Building elaborate onboarding flows so nobody feels lost.", house: "Hufflepuff" },
      { text: "Making dashboards that make YOUR metrics look incredible.", house: "Slytherin" }
    ]
  }
];

const SORTING_SPEECHES = {
  Gryffindor: `Ah, YES! I see it clearly now... a spirit that charges headfirst into the unknown,
that would rather break things spectacularly than play it safe. You've got the kind of reckless
courage that builds empires -- or burns them down. Either way, it'll be ENTERTAINING.

Better be... GRYFFINDOR!

Welcome to the house of the bold, the brave, and the beautifully reckless. Your common room
password is "move_fast_break_things" -- and yes, we're aware of the irony.`,

  Slytherin: `Interesting... VERY interesting. I see ambition coiled like a spring, a mind that's
already three moves ahead while everyone else is still reading the documentation. You don't just
want to build automations -- you want to build an EMPIRE of automations.

Better be... SLYTHERIN!

Welcome to the house of the cunning, the ambitious, and the strategically brilliant. Your common
room is behind the firewall, naturally. The password is "sudo_make_me_a_sandwich" -- because
a Slytherin never asks when they can command.`,

  Ravenclaw: `Oh my, what a magnificent mind we have here! I can practically hear the gears turning,
the insatiable hunger to understand not just HOW things work, but WHY. You probably read API
documentation for fun, don't you? Don't be embarrassed -- that's a COMPLIMENT in this house.

Better be... RAVENCLAW!

Welcome to the house of the wise, the curious, and the pathologically thorough. Your common room
doesn't have a password -- it has a riddle that requires you to explain the difference between
REST and GraphQL. In haiku form.`,

  Hufflepuff: `Now HERE'S something special. I see loyalty that runs deeper than a database index,
a soul that builds not for glory but because the TEAM needs it. You're the one who writes the
documentation everyone else skips, aren't you? The world doesn't deserve you, but it desperately
NEEDS you.

Better be... HUFFLEPUFF!

Welcome to the house of the loyal, the dedicated, and the criminally underappreciated. Your common
room password is "please_and_thank_you" -- because a Hufflepuff never forgets their manners, even
with machines.`
};

// --- Sorting Algorithm ---

function tallyAnswers(answers) {
  const scores = { Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 };

  for (const answer of answers) {
    const question = QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) continue;

    const option = question.options[answer.optionIndex];
    if (!option) continue;

    scores[option.house] += 1;
  }

  return scores;
}

function sortStudent(answers) {
  const scores = tallyAnswers(answers);

  // Find the max score
  const maxScore = Math.max(...Object.values(scores));

  // Get all houses with max score (handle ties)
  const topHouses = HOUSES.filter(h => scores[h] === maxScore);

  // Tiebreaker: use the answer to the LAST question (most recent instinct)
  let house;
  if (topHouses.length === 1) {
    house = topHouses[0];
  } else {
    const lastAnswer = answers[answers.length - 1];
    const lastQuestion = QUESTIONS.find(q => q.id === lastAnswer.questionId);
    const lastOption = lastQuestion.options[lastAnswer.optionIndex];
    house = topHouses.includes(lastOption.house) ? lastOption.house : topHouses[0];
  }

  return {
    house,
    scores,
    speech: SORTING_SPEECHES[house]
  };
}

// --- Experience Level Assessment ---

const EXPERIENCE_QUESTIONS = [
  {
    question: "Have you ever written code or built an automation before?",
    options: [
      { text: "What's code? I'm here to learn from absolute zero.", level: "muggle" },
      { text: "I've dabbled -- maybe some Zapier, IFTTT, or spreadsheet formulas.", level: "squib" },
      { text: "I code regularly but I'm new to AI-powered automation.", level: "halfblood" },
      { text: "I build automations professionally. Show me the advanced stuff.", level: "pureblood" }
    ]
  }
];

const HUMOR_QUESTION = {
  question: "How spicy do you like your humor?",
  options: [
    { text: "Keep it clean and encouraging. I bruise easily.", level: "mild" },
    { text: "I can take a joke. Roast me a little, but buy me dinner first.", level: "medium" },
    { text: "Absolutely destroy me. I learn through emotional damage.", level: "savage" },
    { text: "Turn this into a stand-up comedy show. I want to WHEEZE while learning.", level: "unhinged" }
  ]
};

// --- CLI Interface ---

if (require.main === module) {
  const [,, command] = process.argv;

  if (command === 'questions') {
    console.log(JSON.stringify({ sorting: QUESTIONS, experience: EXPERIENCE_QUESTIONS, humor: HUMOR_QUESTION }, null, 2));
  } else if (command === 'sort') {
    // Example: node sorting-hat-quiz.js sort 0,1,2,3,0
    const answers = process.argv[3].split(',').map((optIdx, i) => ({
      questionId: i + 1,
      optionIndex: parseInt(optIdx)
    }));
    console.log(JSON.stringify(sortStudent(answers), null, 2));
  } else {
    console.log('Sorting Hat Quiz');
    console.log('Commands: questions, sort <comma-separated-option-indices>');
  }
}

module.exports = {
  QUESTIONS,
  EXPERIENCE_QUESTIONS,
  HUMOR_QUESTION,
  SORTING_SPEECHES,
  HOUSES,
  sortStudent,
  tallyAnswers
};
