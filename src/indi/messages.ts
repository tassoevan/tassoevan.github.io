// Notes drawn from the jar. Add as many as you like; the page signs them as "seu mor".
export const NOTES: readonly string[] = [
  'Te amo.',
  'Bijuzinha, hoje você não precisa dar conta de tudo. Só de você. E isso já é bastante.',
  'Lembrete oficial: você é a coisa mais linda deste sofá. Eu conferi duas vezes.',
  'Dia difícil não é falha sua. É só um dia difícil. Ele passa, e eu fico.',
  'Se a dor apertar, me chama. Nem que seja só pra reclamar. Principalmente pra reclamar.',
  'Esqueceu o que ia fazer? Normal. Eu esqueço o que ia dizer toda vez que olho pra você.',
  'Já bebeu água hoje? Este bilhete é um oferecimento do seu morzinho. 💧',
  'Descansar também é fazer alguma coisa. Pode parar um pouquinho, meu biju.',
  'Obrigado por ser você, inteirinha, nos dias bons e nos difíceis.',
  'Te amo. (Sim, de novo. Vou continuar repetindo.)',
];

// Speech bubbles. Each reaction picks one line at random.
export const LINES = {
  morning: ['Bom dia, bijuzinha! ☀️', 'Bom dia, meu biju!'],
  afternoon: ['Boa tarde, bijuzinha!', 'Oi, meu biju! Vem cá.'],
  night: ['Boa noite, bijuzinha 🌙', 'Oi, meu biju. Hora de ficar quentinha.'],
  hug: [
    'Vem cá, bijuzinha 🤍',
    'Abraço de urso carregando… 100%!',
    'Fica aqui um pouquinho comigo.',
    'Abraço apertado, mas com cuidado.',
  ],
  pout: ['Ih… beicinho detectado 🥺', 'Que carinha é essa, bijuzinha?'],
  comfort: [
    'Ô, meu biju… vem cá 🤍',
    'Pode ficar dengosa à vontade. Eu tô aqui.',
    'Beicinho lindo, mas abraço resolve melhor.',
  ],
  acai: ['Açaí pra dois! 💜', 'Hora do açaí, bijuzinha!', 'Pode roubar do meu, eu deixo.'],
  tea: [
    'Chazinho quentinho pro meu biju ☕',
    'Cuidado que tá quente!',
    'Um gole de cada vez, sem pressa.',
  ],
  blanketOn: [
    'Modo burrito ativado 🌯',
    'Quentinho aqui, né?',
    'Pode descansar, eu fico de guarda.',
  ],
  blanketOff: ['Bom dia, burrito! ☀️', 'Desembrulhando a bijuzinha…'],
  hoodieOn: [
    'Pode ficar com ele, fica mais bonito em você 🩷',
    'Moletom emprestado. Pra sempre, né?',
  ],
  hoodieOff: ['Devolveu? Não acredito! 😅', 'Tá quentinho ainda, tem cheirinho de biju.'],
  note: ['Tenho um bilhete pra você 💌', 'Correio do mor!'],
  dance: ['Passinho do morzinho 🕺', 'Olha o que eu ensaiei!'],
  jump: ['Boing! Boing!', 'Energia emprestada pra você!'],
  spin: ['Uiii, fiquei tonto…', 'Giro de alegria!'],
  trip: ['Ops…', 'Foi de propósito. Juro.'],
  boopTasso: ['Boop!', 'Oi, bijuzinha!', 'Me chamou, meu biju?', 'Te amo'],
  boopIndi: ['Mor!', 'Morzinho 🤍', 'hihi', 'Te amo'],
} as const satisfies Record<string, readonly string[]>;

// Guide shown while breathing together: 4 seconds in, 4 seconds out.
export const BREATH = { in: 'Inspira devagar…', out: 'Solta devagar…' } as const;
