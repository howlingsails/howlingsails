const peopleContainer = document.getElementById('people-container');
const peopleList = document.getElementById('people-list');
const conversationArea = document.getElementById('conversation-area');
const selectedPersonName = document.getElementById('selected-person-name');
const personSwitcher = document.getElementById('person-switcher');

const addPersonInput = document.getElementById('add-person-input');
const questionSelect = document.getElementById('question-select');
const questionPreview = document.getElementById('question-preview');
const answerInput = document.getElementById('answer-input');
const conversationLog = document.getElementById('conversation-log');

let people = JSON.parse(localStorage.getItem('people')) || {};
let currentPerson = null;

const questions = {
  "self_discovery": [
    "My desires are a complex interplay of inner drives and mimetic influences. I recognize the power of imitation, yet I strive to forge my own path, to create my own values.",
    "My natural order is not one of passive acceptance, but of active self-overcoming. I embrace the challenges that life presents, transforming suffering into strength, and creating meaning from the depths of my being.",
    "I will not succumb to resentment or envy, but cultivate a spirit of affirmation, celebrating my own unique potential.",
    "Greatness is not a destination, but a continuous process of self-creation, a relentless pursuit of my highest self.",
    "Therefore, I will embody strength, creativity, and authenticity, and live a life that reflects my own will to power.",
    "Furthermore, I acknowledge my moral obligation to look ahead and work towards a better future for myself and society.",
    "I will shoulder the responsibility of my own potential, striving to contribute meaningfully to the world around me.",
    "I will be a force for good, cleaning my own room and acting with integrity, thus creating a ripple effect of positive change.",
    "My pursuit of personal greatness is inextricably linked to my commitment to the betterment of society."
  ],
  "building_connections": [
    "What are some things that truly excite you? What drives you in your daily life?",
    "What are some things that you find yourself longing for?",
    "Do you ever find yourself wanting something because you see others wanting it? How do you distinguish between your own desires and those influenced by others?",
    "What values are most important to you, and how do they shape your desires?",
    "What kind of future are you working towards? What does 'success' mean to you?",
    "What are the essential things you need to feel fulfilled? How do you differentiate between your needs and wants?",
    "What are some of your emotional needs?",
    "How do you prioritize your needs and wants when they conflict?",
    "What actions do you take to fulfill your needs? What brings you a feeling of fulfillment?",
    "Is it hard for you to express your needs? Why?",
    "What are some challenges you've overcome, and what did you learn from them?",
    "In what ways have you changed over the past few years?",
    "How do you strive to improve yourself? What does 'self-overcoming' mean to you?",
    "How do you find meaning in your experiences, both positive and negative?",
    "How do you view your responsibility to yourself and to society?"
  ],
  "exploring_cultures": [
    "What does 'culture' mean to you? How do you define it in your own life?",
    "Do you identify with any specific subcultures? What draws you to them?",
    "How does your family's culture differ from the broader culture you live in?",
    "Are there any cultural traditions you cherish or find challenging?",
    "What values were emphasized in your upbringing?",
    "What values do you hold most dear today?",
    "How do those values influence your decisions?",
    "How do you think your culture has shaped your values?",
    "Are there any cultural values you disagree with?",
    "How do different cultures approach concepts like family, community, and individual responsibility?",
    "What are the core values of the subcultures you identify with?",
    "How do those values differ from mainstream values?",
    "What are the driving motivations of people within those subcultures?",
    "What are your personal goals and aspirations?",
    "What are you hoping to achieve in your life?",
    "How do your cultural background and subcultures influence those goals?",
    "What drives you to do what you do?",
    "What gives you a sense of purpose?",
    "How do you define success?",
    "Where do you see common ground in our goals and aspirations?",
    "Where do our goals diverge, and why?"
  ],
  "self_discipline": [
    "If you could wave a magic wand and instantly improve one area of your life related to self-discipline, what would it be?",
    "What are three specific tasks or habits you consistently struggle to maintain, and what obstacles do you face?",
    "Imagine you had a perfectly tailored 'inner policeman' or coach on your shoulder, designed to help you overcome those three struggles. How would you describe their personality?",
    "What kind of language or tone of voice would this 'inner policeman' use to motivate you effectively?",
    "What are a few specific phrases or commands you'd want your 'inner policeman' to use when you're feeling tempted to stray from your goals?",
    "How would your 'inner policeman' hold you accountable? Would there be any 'consequences' for failing to follow through, and if so, what would they be?",
    "What do you think are the root causes of your struggles with self-discipline in those areas?",
    "Can you recall a time when you successfully overcame a similar challenge? What strategies did you use then?",
    "What external factors (environment, people, etc.) contribute to your struggles with self-discipline?",
    "If you were to achieve consistent self-discipline in these areas, how would your life be different? What would you gain?",
    "What would be the best reward system that your inner policeman could use to help you stay on track?",
    "Does the inner child play a role in your lack of self discipline? If so, how would your inner policeman address your inner child?"
  ],
  "philosophical_what_ifs": [
    "What if you discovered that all your current values were inherited or imposed upon you? How would you create your own values, your own 'will to power'?",
    "What if you were faced with immense suffering? Would you find a way to transform it into something meaningful, or would you succumb to resentment?",
    "What if you realized that most of your desires were mimetic, driven by what others desire? How would you distinguish your authentic desires from those influenced by imitation?",
    "What if you were the 'scapegoat' for a community's problems? How would you respond to being unjustly blamed?",
    "What if you knew with certainty that your life had no inherent meaning? How would you create meaning for yourself?",
    "What if you were faced with a choice that had no objectively 'right' answer? How would you navigate the anxiety of absolute freedom?",
    "What if you lost everything you considered valuable? How would you maintain your inner peace and virtue?",
    "What if you were faced with a situation completely outside of your control? How would you practice acceptance and focus on what you can control?",
    "What if you had to make a decision that would benefit the greatest number of people, but would cause significant harm to a small group? How would you weigh the consequences?",
    "What if you could accurately measure happiness? How would you structure society to maximize overall happiness?",
    "What if everyone acted according to the same principle you are about to act on? Would that principle be universally acceptable?",
    "What if you were faced with a situation where lying would produce a positive outcome, but telling the truth would cause harm? Which would you choose, and why?",
    "What if you realized that everything you thought you knew was based on unexamined assumptions? How would you begin the process of questioning your beliefs?",
    "What is 'the good life' to you? How does your definition align with or differ from traditional philosophical views?",
    "What if you could completely detach yourself from all desires and attachments? What would your experience of the world be like?",
    "What if you could truly understand the interconnectedness of all things? How would that change your actions and relationships?",
    "What if you knew that your actions had a ripple effect, influencing the lives of countless others? How would you take responsibility for your choices?",
    "What if you were presented with a chaotic situation in your life or the world at large? How would you 'clean your room' and bring order to it?",
    "What if our perceived reality is a simulation? How would that change your understanding of your life and choices?"
  ],
  "cultural_differences": [
    "Before we dive into broader comparisons, how would *you* define 'culture' in your own words? What elements make up your personal cultural identity?",
    "When you think of a culture vastly different from your own (e.g., a specific country, region, or even a subculture), what are the first few things that come to mind as being 'different'?",
    "What are some key differences you've observed between American culture and another culture you're familiar with (either through travel, media, or personal interaction)?",
    "How do you think your society or culture defines 'right' and 'wrong'? Where do those moral standards come from?",
    "Can you think of a specific moral value that is held strongly in your culture but might be viewed differently in another culture? How does that difference manifest?",
    "Do you think that morality is objective or relative to culture? Why?",
    "How do people in your culture typically express emotions or build relationships? Are there specific communication styles or social norms that are important?",
    "What are some common misunderstandings that can arise when people from different cultures interact? How can these be avoided?",
    "In what ways do you find it easy or challenging to connect with people from different cultural backgrounds?",
    "What subcultures do you identify with, and what are their defining characteristics? How do these subcultures differ from the mainstream culture?",
    "How do subcultures within a society challenge or reinforce the dominant cultural values?",
    "How does a subculture define its own version of right and wrong?",
    "From a philosophical standpoint, how do you see the relationship between individual freedom and cultural norms? Where do you draw the line between personal choice and societal expectations?",
    "How does the concept of 'cultural relativism' impact your understanding of different moral systems?",
    "How do you feel about the idea that the society that you are raised in, is the society that sets your morality?",
    "What are some social rituals or practices in your culture that might seem unusual or even shocking to someone from a different background?",
    "How do these rituals and practices contribute to the sense of community and shared identity?",
    "How do you think technology and globalization are impacting cultural differences? Are we becoming more similar or more diverse?",
    "How does social media influence the spread of cultural values and the formation of subcultures?",
    "How has historical context shaped the cultural values and beliefs of your society or subculture?",
    "How do past events influence present day cultural interactions?",
    "Despite cultural differences, what are some universal human values or experiences that connect us all?",
    "How can we foster greater understanding and empathy across cultural divides?"
  ],
  "deeper_connections": [
    "'Two Truths and a Wish': Each person shares two true statements about themselves and one wish for the future. The group tries to guess the wish.",
    "'What's Your Superpower?' If you could have any superpower, what would it be, and why? What would you use it for?",
    "'A Defining Moment': Share a moment in your life that significantly shaped who you are today.",
    "'The Road Not Taken': Is there a path you almost took in life, and what do you wonder about it now?",
    "'Your Personal Soundtrack': If your life were a movie, what would the soundtrack be? Share a song that resonates with you and why.",
    "'What Matters Most?' What are your top three core values, and how do they guide your decisions?",
    "'A Belief You've Changed': Share a belief you held strongly in the past that has changed over time. What caused the shift?",
    "'The Ideal Society': If you could design an ideal society, what would its core principles be?",
    "'What Brings You Joy?' What activities or experiences consistently bring you joy and fulfillment?",
    "'What Are You Grateful For?' Share something you are currently grateful for, and why.",
    "'Overcoming Obstacles': Share a time you faced a significant challenge and how you overcame it. What did you learn?",
    "'Dealing with Fear': What are some of your biggest fears, and how do you cope with them?",
    "'Finding Balance': How do you find balance in your life, and what strategies do you use to manage stress?",
    "'What's Your 'Go-To' for Comfort?' What do you do when you need comfort or support?",
    "'What is a time that you had to be very brave?' Explain the situation.",
    "'What Do You Need From Others?' What kind of support or connection do you need from others in your life?",
    "'What Do You Appreciate in Others?' What qualities do you value most in friendships and relationships?",
    "'A Shared Dream': What's a dream or goal you have that you'd love to share with the group and possibly work towards together?",
    "'What is a misconception people have about you?'",
    "'What is something you would like to learn from the group?'"
  ],
  "interesting_conversations": [
    "If you could have any technology exist in your lifetime, what would it be and why?",
    "What's one trend you're excited about, and one you're worried about?",
    "If you could travel to any point in the future or past, where would you go, and what would you want to experience?",
    "What do you think the world will be like in 50 years, and what role do you think you will play in it?",
    "What's the most inspiring thing you've seen or experienced recently?",
    "If you could learn any creative skill, what would it be, and why?",
    "What's a book, movie, or piece of art that profoundly impacted you, and why?",
    "What is a creative project that you would love to start if you had unlimited time and resources?",
    "What's something you're currently trying to learn or improve about yourself?",
    "What's a lesson you learned the hard way that you'd like to share?",
    "What's a habit you're trying to build, and what's been challenging about it?",
    "What is a skill that you have learned that has been the most useful in your life?",
    "What do you think is the meaning of life, or what gives your life meaning?",
    "What's a question you've been pondering lately?",
    "What do you think is the most important quality a person can have?",
    "If you could change one thing about the way society functions, what would it be and why?",
    "What's the most unusual or interesting thing you've ever found?",
    "If animals could talk, which animal would have the most interesting stories to tell?",
    "What's a conspiracy theory you find strangely compelling, even if you don't believe it?",
    "What is the most useless talent that you have?",
    "What's a social norm you find strange or unnecessary?",
    "What's something you've observed about human behavior that you find interesting?",
    "What do you think is the biggest misconception people have about your generation?"
  ]
};


// 1) Add a person
function addPerson() {
  const name = addPersonInput.value.trim();
  if (!name) return;
  if (!people[name]) {
    people[name] = { conversations: [] };
    localStorage.setItem('people', JSON.stringify(people));
    renderPeople();
  }
  addPersonInput.value = '';
}

// 2) Render the list of people
function renderPeople() {
  peopleList.innerHTML = '';
  for (let person in people) {
    const li = document.createElement('li');
    li.textContent = person;
    li.onclick = () => selectPerson(person);
    peopleList.appendChild(li);
  }
}

// 3) Select a person from the list
function selectPerson(person) {
  currentPerson = person;
  selectedPersonName.textContent = person;

  // Hide the people list, show the conversation area
  peopleContainer.style.display = 'none';
  conversationArea.style.display = 'block';

  // Show the top switcher with current person's name
  personSwitcher.style.display = 'inline-block';

  renderConversationLog();
  populateQuestionSelect();
}

// 4) Switch Person: hide conversation area, show people list again
function switchPerson() {
  conversationArea.style.display = 'none';
  peopleContainer.style.display = 'block';
  personSwitcher.style.display = 'none';
  currentPerson = null;
}

// 5) Populate the question dropdown
function populateQuestionSelect() {
  questionSelect.innerHTML = '';
  for (let type in questions) {
    const optGroup = document.createElement('optgroup');
    optGroup.label = type.replace('_', ' ');
    questions[type].forEach((question, index) => {
      const option = document.createElement('option');
      option.value = JSON.stringify({ type, index });
      const truncated = question.length > 60 ? question.substring(0, 60) + '...' : question;
      option.textContent = truncated;
      optGroup.appendChild(option);
    });
    questionSelect.appendChild(optGroup);
  }
  // Show first question in preview by default
  if (questionSelect.options.length > 0) {
    questionSelect.selectedIndex = 0;
    updateQuestionPreview();
  }
}

// 6) Update question preview when a new question is selected
function updateQuestionPreview() {
  const selected = JSON.parse(questionSelect.value);
  const fullQuestion = questions[selected.type][selected.index];
  questionPreview.value = fullQuestion;
}

// 7) Add conversation
function addConversation() {
  if (!currentPerson) return;
  const answer = answerInput.value.trim();
  if (!answer) return;

  const selected = JSON.parse(questionSelect.value);
  const question = questions[selected.type][selected.index];

  people[currentPerson].conversations.push({
    questionType: selected.type,
    question: question,
    answer: answer,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem('people', JSON.stringify(people));
  answerInput.value = '';
  renderConversationLog();
}

// 8) Render the conversation log for the selected person
function renderConversationLog() {
  conversationLog.innerHTML = '';
  if (!currentPerson || !people[currentPerson].conversations) return;

  const entries = people[currentPerson].conversations;
  if (!entries.length) return;

  entries.forEach((conv) => {
    const div = document.createElement('div');
    div.className = 'conversation-entry';
    div.innerHTML = `
      <strong>${conv.questionType.replace('_', ' ')}</strong>: ${conv.question}
      <br>
      <em>${conv.answer}</em>
      <br>
      <small>${conv.timestamp}</small>
    `;
    conversationLog.appendChild(div);
  });
}

// 9) Download all data as YAML
function downloadYAML() {
  const yamlText = jsyaml.dump(people);
  const blob = new Blob([yamlText], { type: 'text/yaml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'conversations.yaml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// On page load, render the existing people from localStorage
renderPeople();
