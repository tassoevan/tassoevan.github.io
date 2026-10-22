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
  'Se hoje o corpo pedir sofá, o sofá é seu. Eu levo o açaí.',
  'Meu moletom rosa sente sua falta. Mentira, ele prefere você. Eu também.',
  'Você não é preguiçosa. Você é corajosa num corpo que às vezes dói. É diferente.',
  'Tarefas de hoje: 1. Existir. 2. Deixar eu cuidar de você. Pronto, tudo feito. ✅',
  'Se a cabeça estiver com mil abas abertas, tudo bem. Eu fico na aba do "te amo".',
  'Bijuzinha, eu escolheria você em todos os dias, inclusive nos difíceis. Principalmente neles.',
  'As meninas têm a melhor mãe do mundo. Eu tenho a melhor namorada. Coincidência? Acho que não.',
  'Pausa pra respirar fundo. Eu espero. 🤍',
  'Hoje vale beicinho, dengo, manta e drama. Tudo liberado pelo mor.',
  'Se der vontade de chorar, chora. Depois a gente pede açaí.',
  'Seu sorriso é meu lugar preferido. O beicinho também é lindo, mas o sorriso ganha.',
  'Não precisa responder nada. Só queria lembrar: te amo.',
  'Meu biju, você é muito mais do que os dias ruins.',
  'Oferecimento: Moletom Rosa™, Abraço de Urso™ e Seu Mor™. Válido pra sempre.',
  'Te amo. Mesmo. De verdade. Muito. Hoje e amanhã também.',
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
  comfortNote: ['E tem mais uma coisa… 💌', 'Guardei isso pra um dia assim. 💌'],
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
  eyebrows: ['Hmm… conheço essa sobrancelha 😳', 'Recado recebido! 😳', 'Ih… lá vem ela. 😳'],
  peteco: ['Peteco! Peteco! 🔫', 'Mãos ao alto! Peteco! Peteco! 🔫'],
  petecoReply: [
    'Tô rendido! 🙌',
    'Calma! Eu lavo a louça! 🙌',
    'Socorro, ela tá armada… de fofura! 🙌',
  ],
  mathReply: ['Não entendi nada, mas fala mais 😍', 'Ai, que homem inteligente 😍', 'Continua… 😍'],
  cyclops: ['Oi, ciclopinho 🥰', 'Tão pertinho que virou ciclope 🥰'],
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

// Invitations to tap the characters, until she discovers she can.
export const TAP_HINT_LINES = {
  tasso: ['Psiu! Toca em mim 👆', 'Ei, bijuzinha… toca aqui 👆'],
  indi: ['Ei! Toca em mim também 👆', 'Psiu! Aqui, ó 👆'],
} as const;

// Tasso's nerdy math facts. Keep them true: each one here has been checked.
export const MATH_FACTS: readonly string[] = [
  'Sabia que 0,999… com noves infinitos é exatamente igual a 1? Não é quase: é igual.',
  'Num grupo de só 23 pessoas, a chance de duas fazerem aniversário no mesmo dia já passa de 50%.',
  'Existem infinitos números primos. Euclides provou isso há mais de 2 mil anos.',
  'Existem tantos números pares quanto números naturais. O infinito é esquisito assim.',
  'Em teoria, uma folha de 0,1 mm dobrada 42 vezes ficaria mais grossa que a distância daqui até a Lua.',
  'e elevado a iπ, mais 1, dá 0. Uma fórmula só, com cinco dos números mais importantes da matemática.',
  'Um baralho bem embaralhado quase certamente está numa ordem que nunca existiu: são 52! ordens possíveis.',
  'O hexágono do favo de mel divide o plano em partes iguais com o menor perímetro possível. Provaram isso em 1999.',
  'Diz a lenda que Gauss, ainda criança, somou de 1 a 100 de cabeça: dá 5050.',
  'De todas as figuras com o mesmo perímetro, o círculo é a que tem a maior área.',
];
