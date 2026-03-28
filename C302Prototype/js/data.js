// ALTLab Vocabulary Explorer – Mock Data
// Plains Cree (nêhiyawêwin) words across three semantic clusters.

const WORDS = {

  // ── WEATHER CLUSTER ─────────────────────────────────────────────────────────
  mispon: {
    id: 'mispon',
    cree: 'mispon',
    english: 'It is snowing',
    wordClassCode: 'VII-1n',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'kimiwan',       type: 'similar'  },
      { id: 'kisikaw',       type: 'opposite' },
      { id: 'kistinipayiw',  type: 'broader'  },
      { id: 'yikwaskwan',    type: 'similar'  },
      { id: 'misponisiw',    type: 'derived'  },
      { id: 'piponi_pisim',  type: 'derived'  },
      { id: 'cikastesimown', type: 'derived'  },
    ],
    forms: [
      { label: '3rd sg',            cree: 'mispon'      },
      { label: 'Obviative',         cree: 'misponiyiwa' },
      { label: 'Inanimate plural',  cree: 'misponiyiwa' },
    ],
    morphology: {
      stemParts:  ['mis-', 'pon'],
      grammarTags: ['VII', 'Snow-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'mispon-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Sleet / freezing rain',  badge: 'missing',      context: 'Expected in weather domain'  },
      { concept: 'Blizzard (heavy snow)',  badge: 'undocumented', context: 'Possible hyponym'            },
      { concept: 'Powder snow',            badge: 'undocumented', context: 'Register: dialectal'         },
    ],
  },

  kimiwan: {
    id: 'kimiwan',
    cree: 'kimiwan',
    english: 'It is raining',
    wordClassCode: 'VII-1n',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'mispon',       type: 'similar'  },
      { id: 'kisikaw',      type: 'opposite' },
      { id: 'kistinipayiw', type: 'broader'  },
    ],
    forms: [
      { label: '3rd sg',           cree: 'kimiwan'      },
      { label: 'Obviative',        cree: 'kimiwaniyiwa' },
      { label: 'Inanimate plural', cree: 'kimiwaniyiwa' },
    ],
    morphology: {
      stemParts:  ['ki-', 'miwan'],
      grammarTags: ['VII', 'Rain-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'kimiwan-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Drizzle',    badge: 'undocumented', context: 'Possible hyponym'   },
      { concept: 'Heavy rain', badge: 'undocumented', context: 'Possible hyponym'   },
    ],
  },

  waseskwan: {
    id: 'waseskwan',
    cree: 'wâsêskwan',
    english: 'It is a clear day, it is sunny',
    wordClassCode: 'VII-2n',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'kisikaw',  type: 'similar'  },
      { id: 'mispon',   type: 'opposite' },
      { id: 'kimiwan',  type: 'opposite' },
    ],
    forms: [
      { label: '3rd sg',           cree: 'wâsêskwan'      },
      { label: 'Obviative',        cree: 'wâsêskwaniyiwa' },
      { label: 'Inanimate plural', cree: 'wâsêskwaniyiwa' },
    ],
    morphology: {
      stemParts:  ['wâs-', 'êskwan'],
      grammarTags: ['VII', 'Light-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'wâsêskwan-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  yikwaskwan: {
    id: 'yikwaskwan',
    cree: 'yîkwaskwan',
    english: 'It is cloudy',
    wordClassCode: 'VII-2n',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'mispon',    type: 'similar'  },
      { id: 'kimiwan',   type: 'similar'  },
      { id: 'waseskwan', type: 'opposite' },
    ],
    forms: [
      { label: '3rd sg',           cree: 'yîkwaskwan'      },
      { label: 'Obviative',        cree: 'yîkwaskwaniyiwa' },
      { label: 'Inanimate plural', cree: 'yîkwaskwaniyiwa' },
    ],
    morphology: {
      stemParts:  ['yîk-', 'waskwan'],
      grammarTags: ['VII', 'Cloud-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'yîkwaskwan-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Overcast (fully cloudy)', badge: 'undocumented', context: 'Possible hyponym' },
    ],
  },

  kisowan: {
    id: 'kisowan',
    cree: 'kisowâw',
    english: 'It is warm',
    wordClassCode: 'VII-2v',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'tahkayaw', type: 'opposite' },
      { id: 'kisikaw',  type: 'broader'  },
    ],
    forms: [
      { label: '3rd sg',           cree: 'kisowâw'      },
      { label: 'Obviative',        cree: 'kisowâyiwa'   },
      { label: 'Inanimate plural', cree: 'kisowâyiwa'   },
    ],
    morphology: {
      stemParts:  ['kiso-', 'wâw'],
      grammarTags: ['VII', 'Heat-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'kisowâ-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  tahkayaw: {
    id: 'tahkayaw',
    cree: 'tahkâyâw',
    english: 'It is cold weather',
    wordClassCode: 'VII-3v',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'kisowan',  type: 'opposite' },
      { id: 'mispon',   type: 'similar'  },
    ],
    forms: [
      { label: '3rd sg',           cree: 'tahkâyâw'    },
      { label: 'Obviative',        cree: 'tahkâyâyiwa' },
      { label: 'Inanimate plural', cree: 'tahkâyâyiwa' },
    ],
    morphology: {
      stemParts:  ['tahkâ-', 'yâw'],
      grammarTags: ['VII', 'Cold-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'tahkâyâ-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Frost / freeze', badge: 'undocumented', context: 'Possible hyponym' },
    ],
  },

  kistinipayiw: {
    id: 'kistinipayiw',
    cree: 'kîstinipayiw',
    english: 'It is a sudden storm',
    wordClassCode: 'VII-1n',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'mispon',   type: 'derived'  },
      { id: 'kimiwan',  type: 'derived'  },
    ],
    forms: [
      { label: '3rd sg',           cree: 'kîstinipayiw'      },
      { label: 'Obviative',        cree: 'kîstinipayiyiwa'   },
      { label: 'Inanimate plural', cree: 'kîstinipayiyiwa'   },
    ],
    morphology: {
      stemParts:  ['kîstini-', 'payiw'],
      grammarTags: ['VII', 'Storm-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'kîstinipayiw-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  misponisiw: {
    id: 'misponisiw',
    cree: 'misponisiw',
    english: 'S/he has snow overtake him/her',
    wordClassCode: 'VAI-1',
    wordClassLabel: 'Verb (animate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'mispon', type: 'broader' },
    ],
    forms: [
      { label: '1st sg',    cree: 'nimisponisiw'  },
      { label: '2nd sg',    cree: 'kimisponisiw'  },
      { label: '3rd sg',    cree: 'misponisiw'    },
      { label: 'Obviative', cree: 'misponisiyiwa' },
    ],
    morphology: {
      stemParts:  ['mispon-', 'isiw'],
      grammarTags: ['VAI', 'Snow-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'misponisi-',
      classCode:  'VAI (Animate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  // Additional weather words (for Word Map, not in default saved folder)
  piponi_pisim: {
    id: 'piponi_pisim',
    cree: 'piponi-pîsim',
    english: 'Winter month',
    wordClassCode: 'NI-3',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'weather',
    relatedWords: [
      { id: 'mispon', type: 'broader' },
    ],
    forms: [
      { label: 'Singular', cree: 'piponi-pîsim'   },
      { label: 'Plural',   cree: 'piponi-pîsimak' },
      { label: 'Locative', cree: 'piponi-pîsimihk' },
    ],
    morphology: {
      stemParts:  ['piponi-', 'pîsim'],
      grammarTags: ['NI', 'Time-Theme'],
      person:     'sg',
      stem:       'piponi-pîsim-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  cikastesimown: {
    id: 'cikastesimown',
    cree: 'cikâstêsimown',
    english: 'Casting a shadow',
    wordClassCode: 'NI-2',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'weather',
    relatedWords: [
      { id: 'mispon',    type: 'broader'  },
      { id: 'waseskwan', type: 'opposite' },
    ],
    forms: [
      { label: 'Singular', cree: 'cikâstêsimown'   },
      { label: 'Plural',   cree: 'cikâstêsimowna'  },
      { label: 'Locative', cree: 'cikâstêsimownihk' },
    ],
    morphology: {
      stemParts:  ['cikâstê-', 'simown'],
      grammarTags: ['NI', 'Light-Theme'],
      person:     'sg',
      stem:       'cikâstêsimown-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  kisikaw: {
    id: 'kisikaw',
    cree: 'kîsikâw',
    english: 'It is day, it is daylight',
    wordClassCode: 'VII-1n',
    wordClassLabel: 'Verb (inanimate intransitive)',
    theme: 'weather',
    relatedWords: [
      { id: 'mispon',    type: 'opposite' },
      { id: 'waseskwan', type: 'similar'  },
      { id: 'kisowan',   type: 'derived'  },
    ],
    forms: [
      { label: '3rd sg',           cree: 'kîsikâw'      },
      { label: 'Obviative',        cree: 'kîsikâyiwa'   },
      { label: 'Inanimate plural', cree: 'kîsikâyiwa'   },
    ],
    morphology: {
      stemParts:  ['kîsikâ-', 'w'],
      grammarTags: ['VII', 'Day-Theme', 'Indicative'],
      person:     '3rd sg',
      stem:       'kîsikâ-',
      classCode:  'VII (Inanimate Intransitive)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  // ── KINSHIP CLUSTER ──────────────────────────────────────────────────────────
  nohkom: {
    id: 'nohkom',
    cree: 'nôhkom',
    english: 'My grandmother',
    wordClassCode: 'NA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'kinship',
    relatedWords: [
      { id: 'nimosôm', type: 'similar'  },
      { id: 'nikawiy', type: 'broader'  },
      { id: 'nimis',   type: 'derived'  },
    ],
    forms: [
      { label: '1st sg (my)',   cree: 'nôhkom'   },
      { label: '2nd sg (your)', cree: 'kôhkom'   },
      { label: '3rd sg (his/her)', cree: 'ohkoma' },
    ],
    morphology: {
      stemParts:  ['nôhk-', 'om'],
      grammarTags: ['NA', 'Kin-Dependent', 'Obv'],
      person:     '1st sg',
      stem:       'ohkom-',
      classCode:  'NA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  nimosom: {
    id: 'nimosom',
    cree: 'nimosôm',
    english: 'My grandfather',
    wordClassCode: 'NA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'kinship',
    relatedWords: [
      { id: 'nohkom',  type: 'similar'  },
      { id: 'nikawiy', type: 'broader'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nimosôm'  },
      { label: '2nd sg (your)',    cree: 'kimosôm'  },
      { label: '3rd sg (his/her)', cree: 'omosôma'  },
    ],
    morphology: {
      stemParts:  ['ni-', 'mosôm'],
      grammarTags: ['NA', 'Kin-Dependent'],
      person:     '1st sg',
      stem:       'mosôm-',
      classCode:  'NA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  nikawiy: {
    id: 'nikawiy',
    cree: 'nikâwiy',
    english: 'My mother',
    wordClassCode: 'NA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'kinship',
    relatedWords: [
      { id: 'notawiy', type: 'similar'  },
      { id: 'nohkom',  type: 'derived'  },
      { id: 'nimosom', type: 'derived'  },
      { id: 'nimis',   type: 'derived'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nikâwiy' },
      { label: '2nd sg (your)',    cree: 'kikâwiy' },
      { label: '3rd sg (his/her)', cree: 'okâwiya' },
    ],
    morphology: {
      stemParts:  ['ni-', 'kâwiy'],
      grammarTags: ['NA', 'Kin-Dependent'],
      person:     '1st sg',
      stem:       'kâwiy-',
      classCode:  'NA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  notawiy: {
    id: 'notawiy',
    cree: 'nôtawiy',
    english: 'My father',
    wordClassCode: 'NA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'kinship',
    relatedWords: [
      { id: 'nikawiy', type: 'similar'  },
      { id: 'nohkom',  type: 'derived'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nôtawiy' },
      { label: '2nd sg (your)',    cree: 'kôtawiy' },
      { label: '3rd sg (his/her)', cree: 'otawiya' },
    ],
    morphology: {
      stemParts:  ['nô-', 'tawiy'],
      grammarTags: ['NA', 'Kin-Dependent'],
      person:     '1st sg',
      stem:       'tawiy-',
      classCode:  'NA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  nimis: {
    id: 'nimis',
    cree: 'nimis',
    english: 'My older sister',
    wordClassCode: 'NA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'kinship',
    relatedWords: [
      { id: 'nistes',  type: 'similar'  },
      { id: 'nikawiy', type: 'broader'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nimis'  },
      { label: '2nd sg (your)',    cree: 'kimis'  },
      { label: '3rd sg (his/her)', cree: 'omisa'  },
    ],
    morphology: {
      stemParts:  ['ni-', 'mis'],
      grammarTags: ['NA', 'Kin-Dependent'],
      person:     '1st sg',
      stem:       'mis-',
      classCode:  'NA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  nistes: {
    id: 'nistes',
    cree: 'nistês',
    english: 'My older brother',
    wordClassCode: 'NA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'kinship',
    relatedWords: [
      { id: 'nimis',   type: 'similar'  },
      { id: 'nikawiy', type: 'broader'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nistês'  },
      { label: '2nd sg (your)',    cree: 'kistês'  },
      { label: '3rd sg (his/her)', cree: 'ostêsa'  },
    ],
    morphology: {
      stemParts:  ['ni-', 'stês'],
      grammarTags: ['NA', 'Kin-Dependent'],
      person:     '1st sg',
      stem:       'stês-',
      classCode:  'NA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  // ── BODY PARTS CLUSTER ───────────────────────────────────────────────────────
  miskat: {
    id: 'miskat',
    cree: 'miskât',
    english: 'His/her leg',
    wordClassCode: 'NDA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'body',
    relatedWords: [
      { id: 'misipit',    type: 'similar'  },
      { id: 'mistikwan',  type: 'similar'  },
      { id: 'miskisik',   type: 'similar'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'niskât'    },
      { label: '2nd sg (your)',    cree: 'kiskât'    },
      { label: '3rd sg (his/her)', cree: 'miskât'    },
      { label: 'Plural',           cree: 'miskâta'   },
    ],
    morphology: {
      stemParts:  ['mis-', 'kât'],
      grammarTags: ['NDA', 'Body-Dependent'],
      person:     '3rd sg',
      stem:       'kât-',
      classCode:  'NDA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Knee',  badge: 'undocumented', context: 'Expected body-part term' },
      { concept: 'Ankle', badge: 'undocumented', context: 'Expected body-part term' },
    ],
  },

  misipit: {
    id: 'misipit',
    cree: 'mipit',
    english: 'His/her tooth',
    wordClassCode: 'NDA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'body',
    relatedWords: [
      { id: 'miskat',    type: 'similar'  },
      { id: 'mistikwan', type: 'similar'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nipit'   },
      { label: '2nd sg (your)',    cree: 'kipit'   },
      { label: '3rd sg (his/her)', cree: 'mipit'   },
      { label: 'Plural',           cree: 'mipita'  },
    ],
    morphology: {
      stemParts:  ['mi-', 'pit'],
      grammarTags: ['NDA', 'Body-Dependent'],
      person:     '3rd sg',
      stem:       'pit-',
      classCode:  'NDA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  mistikwan: {
    id: 'mistikwan',
    cree: 'mistikwân',
    english: 'His/her head',
    wordClassCode: 'NDA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'body',
    relatedWords: [
      { id: 'miskisik', type: 'derived'  },
      { id: 'miskat',   type: 'similar'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nistikwân'   },
      { label: '2nd sg (your)',    cree: 'kistikwân'   },
      { label: '3rd sg (his/her)', cree: 'mistikwân'   },
      { label: 'Plural',           cree: 'mistikwâna'  },
    ],
    morphology: {
      stemParts:  ['mis-', 'tikwân'],
      grammarTags: ['NDA', 'Body-Dependent'],
      person:     '3rd sg',
      stem:       'tikwân-',
      classCode:  'NDA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Skull',  badge: 'undocumented', context: 'Possible derived term' },
    ],
  },

  miskisik: {
    id: 'miskisik',
    cree: 'miskisik',
    english: 'His/her eye',
    wordClassCode: 'NDA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'body',
    relatedWords: [
      { id: 'mistikwan', type: 'broader'  },
      { id: 'miskat',    type: 'similar'  },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'niskisik'   },
      { label: '2nd sg (your)',    cree: 'kiskisik'   },
      { label: '3rd sg (his/her)', cree: 'miskisik'   },
      { label: 'Plural',           cree: 'miskisikwa' },
    ],
    morphology: {
      stemParts:  ['mis-', 'kisik'],
      grammarTags: ['NDA', 'Body-Dependent'],
      person:     '3rd sg',
      stem:       'kisik-',
      classCode:  'NDA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Eyelid',   badge: 'undocumented', context: 'Expected body-part term' },
      { concept: 'Eyelash',  badge: 'undocumented', context: 'Expected body-part term' },
    ],
  },

  mikotawan: {
    id: 'mikotawan',
    cree: 'mikotâwân',
    english: 'His/her belly, his/her stomach',
    wordClassCode: 'NDA-3',
    wordClassLabel: 'Noun (animate, dependent)',
    theme: 'body',
    relatedWords: [
      { id: 'miskat',   type: 'similar' },
      { id: 'misipit',  type: 'similar' },
    ],
    forms: [
      { label: '1st sg (my)',      cree: 'nikotâwân'   },
      { label: '2nd sg (your)',    cree: 'kikotâwân'   },
      { label: '3rd sg (his/her)', cree: 'mikotâwân'   },
      { label: 'Plural',           cree: 'mikotâwâna'  },
    ],
    morphology: {
      stemParts:  ['mi-', 'kotâwân'],
      grammarTags: ['NDA', 'Body-Dependent'],
      person:     '3rd sg',
      stem:       'kotâwân-',
      classCode:  'NDA (Animate Noun, Dependent)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  // ── NATURE & LANDSCAPE CLUSTER ───────────────────────────────────────────────
  mistik: {
    id: 'mistik',
    cree: 'mistik',
    english: 'Tree; wood; stick',
    wordClassCode: 'NI-1',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'nature',
    relatedWords: [
      { id: 'sakaw',     type: 'broader'  },
      { id: 'askiy',     type: 'broader'  },
    ],
    forms: [
      { label: 'Singular', cree: 'mistik'    },
      { label: 'Plural',   cree: 'mistikwa'  },
      { label: 'Locative', cree: 'mistikohk' },
    ],
    morphology: {
      stemParts:  ['mist-', 'ik'],
      grammarTags: ['NI', 'Inanimate', 'Independent'],
      person:     'sg',
      stem:       'mistik-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Sapling (young tree)', badge: 'undocumented', context: 'Expected hyponym' },
    ],
  },

  sipiy: {
    id: 'sipiy',
    cree: 'sîpiy',
    english: 'River',
    wordClassCode: 'NI-2',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'nature',
    relatedWords: [
      { id: 'sakahikan', type: 'similar'  },
      { id: 'nipiy',     type: 'broader'  },
      { id: 'askiy',     type: 'broader'  },
    ],
    forms: [
      { label: 'Singular', cree: 'sîpiy'  },
      { label: 'Plural',   cree: 'sîpiya' },
      { label: 'Locative', cree: 'sîpîhk' },
    ],
    morphology: {
      stemParts:  ['sîp-', 'iy'],
      grammarTags: ['NI', 'Inanimate', 'Independent'],
      person:     'sg',
      stem:       'sîpiy-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Stream / creek', badge: 'undocumented', context: 'Possible hyponym' },
      { concept: 'Riverbank',      badge: 'undocumented', context: 'Expected locative term' },
    ],
  },

  sakahikan: {
    id: 'sakahikan',
    cree: 'sâkahikan',
    english: 'Lake',
    wordClassCode: 'NI-2',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'nature',
    relatedWords: [
      { id: 'sipiy',  type: 'similar'  },
      { id: 'nipiy',  type: 'broader'  },
      { id: 'amisk',  type: 'derived'  },
    ],
    forms: [
      { label: 'Singular', cree: 'sâkahikan'    },
      { label: 'Plural',   cree: 'sâkahikana'   },
      { label: 'Locative', cree: 'sâkahikanihk' },
    ],
    morphology: {
      stemParts:  ['sâk-', 'ahikan'],
      grammarTags: ['NI', 'Inanimate', 'Independent'],
      person:     'sg',
      stem:       'sâkahikan-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Pond / small lake', badge: 'undocumented', context: 'Possible hyponym' },
    ],
  },

  askiy: {
    id: 'askiy',
    cree: 'askiy',
    english: 'Land; earth; ground; the world',
    wordClassCode: 'NI-2',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'nature',
    relatedWords: [
      { id: 'mistik',    type: 'derived'  },
      { id: 'sakaw',     type: 'derived'  },
      { id: 'sipiy',     type: 'derived'  },
      { id: 'sakahikan', type: 'derived'  },
    ],
    forms: [
      { label: 'Singular', cree: 'askiy'  },
      { label: 'Plural',   cree: 'askiya' },
      { label: 'Locative', cree: 'askîhk' },
    ],
    morphology: {
      stemParts:  ['ask-', 'iy'],
      grammarTags: ['NI', 'Inanimate', 'Independent'],
      person:     'sg',
      stem:       'askiy-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Soil / dirt (fine earth)', badge: 'undocumented', context: 'Possible hyponym' },
    ],
  },

  nipiy: {
    id: 'nipiy',
    cree: 'nipiy',
    english: 'Water',
    wordClassCode: 'NI-2',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'nature',
    relatedWords: [
      { id: 'sipiy',     type: 'derived'  },
      { id: 'sakahikan', type: 'derived'  },
      { id: 'askiy',     type: 'similar'  },
    ],
    forms: [
      { label: 'Singular', cree: 'nipiy'  },
      { label: 'Plural',   cree: 'nipîya' },
      { label: 'Locative', cree: 'nipîhk' },
    ],
    morphology: {
      stemParts:  ['nip-', 'iy'],
      grammarTags: ['NI', 'Inanimate', 'Independent'],
      person:     'sg',
      stem:       'nipiy-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Ice',   badge: 'missing',      context: 'Expected in water domain' },
      { concept: 'Snow water / meltwater', badge: 'undocumented', context: 'Possible hyponym' },
    ],
  },

  sakaw: {
    id: 'sakaw',
    cree: 'sâkâw',
    english: 'Forest; bush; woodland',
    wordClassCode: 'NI-1',
    wordClassLabel: 'Noun (inanimate)',
    theme: 'nature',
    relatedWords: [
      { id: 'mistik', type: 'derived'  },
      { id: 'askiy',  type: 'broader'  },
    ],
    forms: [
      { label: 'Singular', cree: 'sâkâw'    },
      { label: 'Plural',   cree: 'sâkâwa'   },
      { label: 'Locative', cree: 'sâkâwihk' },
    ],
    morphology: {
      stemParts:  ['sâk-', 'âw'],
      grammarTags: ['NI', 'Inanimate', 'Independent'],
      person:     'sg',
      stem:       'sâkâw-',
      classCode:  'NI (Inanimate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Clearing / meadow (within forest)', badge: 'undocumented', context: 'Possible hyponym' },
    ],
  },

  pisim: {
    id: 'pisim',
    cree: 'pîsim',
    english: 'Sun; moon; month',
    wordClassCode: 'NA-1',
    wordClassLabel: 'Noun (animate)',
    theme: 'nature',
    relatedWords: [
      { id: 'kisikaw',   type: 'similar'  },
      { id: 'waseskwan', type: 'similar'  },
      { id: 'piponi_pisim', type: 'derived' },
    ],
    forms: [
      { label: 'Singular', cree: 'pîsim'    },
      { label: 'Plural',   cree: 'pîsimwak' },
      { label: 'Locative', cree: 'pîsimohk' },
    ],
    morphology: {
      stemParts:  ['pîs-', 'im'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'pîsim-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Eclipse',   badge: 'missing',      context: 'Expected in celestial domain' },
      { concept: 'Moonlight', badge: 'undocumented', context: 'Possible derived term'        },
    ],
  },

  // ── ANIMALS CLUSTER ──────────────────────────────────────────────────────────
  maskwa: {
    id: 'maskwa',
    cree: 'maskwa',
    english: 'Bear',
    wordClassCode: 'NA-2',
    wordClassLabel: 'Noun (animate)',
    theme: 'animals',
    relatedWords: [
      { id: 'mahihkan', type: 'similar'  },
      { id: 'moswa',    type: 'similar'  },
      { id: 'sakaw',    type: 'broader'  },
    ],
    forms: [
      { label: 'Singular',  cree: 'maskwa'   },
      { label: 'Plural',    cree: 'maskwak'  },
      { label: 'Obviative', cree: 'maskwa'   },
      { label: 'Locative',  cree: 'maskwahk' },
    ],
    morphology: {
      stemParts:  ['mask-', 'wa'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'maskw-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Black bear vs. grizzly bear distinction', badge: 'undocumented', context: 'Possible hyponyms' },
    ],
  },

  moswa: {
    id: 'moswa',
    cree: 'môswa',
    english: 'Moose',
    wordClassCode: 'NA-2',
    wordClassLabel: 'Noun (animate)',
    theme: 'animals',
    relatedWords: [
      { id: 'maskwa',   type: 'similar'  },
      { id: 'mahihkan', type: 'opposite' },
      { id: 'sakaw',    type: 'broader'  },
    ],
    forms: [
      { label: 'Singular',  cree: 'môswa'   },
      { label: 'Plural',    cree: 'môswak'  },
      { label: 'Obviative', cree: 'môswa'   },
      { label: 'Locative',  cree: 'môswahk' },
    ],
    morphology: {
      stemParts:  ['môs-', 'wa'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'môsw-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Bull moose (male)', badge: 'undocumented', context: 'Possible gender-specific term' },
      { concept: 'Cow moose (female)', badge: 'undocumented', context: 'Possible gender-specific term' },
    ],
  },

  mahihkan: {
    id: 'mahihkan',
    cree: 'mahihkan',
    english: 'Wolf',
    wordClassCode: 'NA-1',
    wordClassLabel: 'Noun (animate)',
    theme: 'animals',
    relatedWords: [
      { id: 'atim',   type: 'similar'  },
      { id: 'maskwa', type: 'similar'  },
      { id: 'moswa',  type: 'opposite' },
      { id: 'wapos',  type: 'opposite' },
    ],
    forms: [
      { label: 'Singular',  cree: 'mahihkan'    },
      { label: 'Plural',    cree: 'mahihkanak'  },
      { label: 'Obviative', cree: 'mahihkana'   },
      { label: 'Locative',  cree: 'mahihkanihk' },
    ],
    morphology: {
      stemParts:  ['mah-', 'ihkan'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'mahihkan-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Wolf pack (collective)', badge: 'undocumented', context: 'Expected collective term' },
    ],
  },

  wapos: {
    id: 'wapos',
    cree: 'wâpos',
    english: 'Rabbit; hare',
    wordClassCode: 'NA-1',
    wordClassLabel: 'Noun (animate)',
    theme: 'animals',
    relatedWords: [
      { id: 'amisk',    type: 'similar'  },
      { id: 'mahihkan', type: 'opposite' },
    ],
    forms: [
      { label: 'Singular',  cree: 'wâpos'   },
      { label: 'Plural',    cree: 'wâposak' },
      { label: 'Obviative', cree: 'wâposa'  },
      { label: 'Locative',  cree: 'wâposihk'},
    ],
    morphology: {
      stemParts:  ['wâp-', 'os'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'wâpos-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [],
  },

  amisk: {
    id: 'amisk',
    cree: 'amisk',
    english: 'Beaver',
    wordClassCode: 'NA-1',
    wordClassLabel: 'Noun (animate)',
    theme: 'animals',
    relatedWords: [
      { id: 'wapos',     type: 'similar'  },
      { id: 'sipiy',     type: 'broader'  },
      { id: 'sakahikan', type: 'broader'  },
    ],
    forms: [
      { label: 'Singular',  cree: 'amisk'    },
      { label: 'Plural',    cree: 'amiskwak' },
      { label: 'Obviative', cree: 'amiskwa'  },
      { label: 'Locative',  cree: 'amiskohk' },
    ],
    morphology: {
      stemParts:  ['amisk'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'amisk-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Beaver lodge', badge: 'undocumented', context: 'Expected derived term' },
      { concept: 'Beaver dam',   badge: 'undocumented', context: 'Expected derived term' },
    ],
  },

  atim: {
    id: 'atim',
    cree: 'atim',
    english: 'Dog',
    wordClassCode: 'NA-2',
    wordClassLabel: 'Noun (animate)',
    theme: 'animals',
    relatedWords: [
      { id: 'mahihkan', type: 'similar'  },
    ],
    forms: [
      { label: 'Singular',  cree: 'atim'    },
      { label: 'Plural',    cree: 'atimwak' },
      { label: 'Obviative', cree: 'atimwa'  },
      { label: 'Locative',  cree: 'atimohk' },
    ],
    morphology: {
      stemParts:  ['at-', 'im'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'atimw-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Puppy',   badge: 'undocumented', context: 'Expected hyponym' },
      { concept: 'Sled dog', badge: 'undocumented', context: 'Culturally significant term' },
    ],
  },

  piyesiw: {
    id: 'piyesiw',
    cree: 'piyêsiw',
    english: 'Bird; thunderbird',
    wordClassCode: 'NA-2',
    wordClassLabel: 'Noun (animate)',
    theme: 'animals',
    relatedWords: [
      { id: 'pisim', type: 'broader'  },
      { id: 'askiy', type: 'broader'  },
    ],
    forms: [
      { label: 'Singular',  cree: 'piyêsiw'   },
      { label: 'Plural',    cree: 'piyêsiwak' },
      { label: 'Obviative', cree: 'piyêsiwa'  },
      { label: 'Locative',  cree: 'piyêsiwihk'},
    ],
    morphology: {
      stemParts:  ['piyês-', 'iw'],
      grammarTags: ['NA', 'Animate', 'Independent'],
      person:     'sg',
      stem:       'piyêsiw-',
      classCode:  'NA (Animate Noun)',
      source:     'itwêwina 2024',
    },
    semanticGaps: [
      { concept: 'Eagle',  badge: 'missing',      context: 'Expected in bird domain' },
      { concept: 'Raven',  badge: 'undocumented', context: 'Culturally significant bird' },
    ],
  },
};

// ── THEME CATEGORIES ─────────────────────────────────────────────────────────
const THEMES = [
  { id: 'nature',   label: 'Nature & Landscape', icon: '🌲', count: 134 },
  { id: 'kinship',  label: 'Kinship',             icon: '👨‍👩‍👧', count: 32  },
  { id: 'weather',  label: 'Weather',             icon: '🌧️',  count: 64  },
  { id: 'animals',  label: 'Animals',             icon: '🐺',  count: 78  },
  { id: 'movement', label: 'Movement',            icon: '🚶',  count: 28  },
];

// ── DEFAULT FOLDERS (pre-populated for demo) ─────────────────────────────────
const DEFAULT_FOLDERS = [
  {
    id: 'folder-body',
    name: 'Body Parts',
    status: 'lesson-ready',
    icon: '🫀',
    color: '#E57373',
    wordIds: ['miskat', 'misipit', 'mistikwan', 'miskisik', 'mikotawan'],
  },
  {
    id: 'folder-weather',
    name: 'Weather Verbs',
    status: 'in-progress',
    icon: '🌦️',
    color: '#4FC3F7',
    wordIds: ['mispon', 'kimiwan', 'waseskwan', 'yikwaskwan', 'kisowan', 'tahkayaw', 'kistinipayiw', 'misponisiw'],
  },
  {
    id: 'folder-nature',
    name: 'Nature & Landscape',
    status: 'lesson-ready',
    icon: '🌲',
    color: '#81C784',
    wordIds: ['mistik', 'sipiy', 'sakahikan', 'askiy', 'nipiy', 'sakaw', 'pisim'],
  },
  {
    id: 'folder-animals',
    name: 'Animals',
    status: 'in-progress',
    icon: '🐺',
    color: '#A1887F',
    wordIds: ['maskwa', 'moswa', 'mahihkan', 'wapos', 'amisk', 'atim', 'piyesiw'],
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

// Return all words as a flat array
function getAllWords() {
  return Object.values(WORDS);
}

// Look up a word by id
function getWord(id) {
  return WORDS[id] || null;
}

// Normalize a string for diacritic-tolerant comparison
function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Search words by Cree or English (diacritic-tolerant substring match)
function searchWords(query) {
  const q = normalize(query.trim());
  if (!q) return [];
  return getAllWords().filter(w =>
    normalize(w.cree).includes(q) || normalize(w.english).includes(q)
  );
}

// Levenshtein edit distance between two strings
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// Find the closest word when a query returns no results.
// Returns the best-matching word string (Cree or English), or null if no
// match is within the distance threshold.
function findSpellingCorrection(query) {
  const q = normalize(query.trim());
  if (!q || q.length < 3) return null;
  const threshold = Math.max(2, Math.floor(q.length / 3));
  let best = null, bestDist = Infinity;
  getAllWords().forEach(w => {
    const distCree = levenshtein(q, normalize(w.cree));
    const distEng  = levenshtein(q, normalize(w.english));
    const dist = Math.min(distCree, distEng);
    if (dist < bestDist) {
      bestDist = dist;
      best = dist === distCree ? w.cree : w.english;
    }
  });
  return bestDist <= threshold ? best : null;
}

// Filter words by theme
function getWordsByTheme(themeId) {
  return getAllWords().filter(w => w.theme === themeId);
}

// Filter words by word class type ('noun' | 'verb')
function filterByClass(words, cls) {
  if (cls === 'verb')  return words.filter(w => w.wordClassLabel.toLowerCase().includes('verb'));
  if (cls === 'noun')  return words.filter(w => w.wordClassLabel.toLowerCase().includes('noun'));
  if (cls === 'related') return words; // placeholder
  return words;
}

// Build Word Map node list for a given word id
function getWordMapNodes(wordId) {
  const center = getWord(wordId);
  if (!center) return { center: null, nodes: [] };
  const nodes = center.relatedWords
    .map(r => {
      const w = getWord(r.id);
      return w ? { ...w, relType: r.type } : null;
    })
    .filter(Boolean);
  return { center, nodes };
}
