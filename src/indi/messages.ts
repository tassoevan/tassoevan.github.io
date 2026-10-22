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
  dusty: ['Olha esse polvinho: tá pôdi, pôdi!', 'Atchim! Tá pôdi, pôdi!'],
  boopTasso: ['Boop!', 'Oi, bijuzinha!', 'Me chamou, meu biju?', 'Te amo'],
  boopIndi: ['Mor!', 'Morzinho 🤍', 'hihi', 'Te amo'],
} as const satisfies Record<string, readonly string[]>;

// Guide shown while breathing together: 4 seconds in, 4 seconds out.
export const BREATH = { in: 'Inspira devagar…', out: 'Solta devagar…' } as const;

// What the girls say when they show up. Each falls back to `any` when there is no line for the
// moment. Nicknames only: their real names stay off this public page.
export const KID_LINES = {
  jojo: {
    comfort: [
      'Mãe, tô aqui também 💜',
      'Braço direito chegando! 🖤',
      'Quer que eu pegue alguma coisa, mãe?',
    ],
    any: ['Oi, mãe! 💜', '🖤💜🖤', 'Tô de olho em vocês, hein.'],
  },
  nana: {
    acai: [
      'Mãe, mãe! O meu tem leite em pó? E granola? E banana? E…',
      'Eu quero açaí! E também quero contar uma coisa!',
    ],
    hug: ['Abraço de família! Posso contar uma coisa?', 'Eu também! Eu também!'],
    silly: ['Mãe, olha! Mãe! Tá olhando?', 'Eu danço melhor, quer ver?'],
    dusty: ['Pôdi, pôdi! kkkkkk', 'Tá pôdi, pôdi!'],
    any: [
      'Mãe, mãe, mãe! Sabe o que aconteceu?',
      'Posso contar uma coisa? São só três. Talvez quatro.',
      'Aí eu falei… e aí ela falou… e aí…',
    ],
  },
  lolo: {
    acai: ['Au au! (tradução: quero açaí)'],
    hug: ['Au au! 🐶💕'],
    silly: ['Au au au! 🐶'],
    dusty: ['Au! Pôdi, pôdi! 🐶'],
    any: ['Au au! 🐶', 'Au? (tradução: brinca comigo?)', 'Au au au! (tradução: oi!)'],
  },
} as const satisfies Record<
  string,
  Partial<Record<string, readonly string[]>> & { any: readonly string[] }
>;
