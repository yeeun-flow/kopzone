import type { Player } from '@/src/types/player';

export const players: Player[] = [
  // ── Mohamed Salah ──────────────────────────────────────────────────────────
  {
    id: 'salah',
    footballDataId: 3754,
    name: 'MOHAMED SALAH',
    firstName: 'MOHAMED',
    lastName: 'SALAH',
    number: '11',
    position: 'RIGHT WINGER',
    positionGroup: 'FWD',
    nationality: 'Egypt',
    age: 33,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/3blc581757088735.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/o7y57t1718438615.jpg',
    highlightVideoId: 'V_p_Y6f927U',
    stats: { goals: 28, assists: 14, minutes: 2800, yellowCards: 2, redCards: 0 },
    radar: { pace: 91, shooting: 89, passing: 82, dribbling: 88, defending: 45, physical: 76 },
    metrics: [
      { label: 'Involvement Rate', val: '84%', width: '84%' },
      { label: 'Shot Accuracy', val: '62.4%', width: '62.4%' },
    ],
    recentForm: [
      { opp: 'vs ARSENAL (H)', res: 'W 2 - 1', ga: '1 / 1', xg: '0.82', rat: '8.5', color: 'bg-primary-red' },
      { opp: 'vs MAN CITY (A)', res: 'D 1 - 1', ga: '0 / 1', xg: '0.45', rat: '7.9', color: 'bg-surface-high' },
      { opp: 'vs CHELSEA (H)', res: 'W 4 - 1', ga: '2 / 0', xg: '1.14', rat: '9.2', color: 'bg-primary-red' },
    ],
  },

  // ── Virgil van Dijk ────────────────────────────────────────────────────────
  {
    id: 'van-dijk',
    footballDataId: 7869,
    name: 'VIRGIL VAN DIJK',
    firstName: 'VIRGIL',
    lastName: 'VAN DIJK',
    number: '4',
    position: 'CENTRE-BACK',
    positionGroup: 'DEF',
    nationality: 'Netherlands',
    age: 34,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/9cxf2q1757087742.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/9fe0tn1720452118.jpg',
    highlightVideoId: 'dQw4w9WgXcQ',
    stats: { goals: 4, assists: 2, minutes: 3060, yellowCards: 3, redCards: 0 },
    radar: { pace: 78, shooting: 62, passing: 80, dribbling: 60, defending: 94, physical: 92 },
    metrics: [
      { label: 'Aerial Duels Won', val: '78%', width: '78%' },
      { label: 'Clearances per 90', val: '5.8', width: '72%' },
    ],
    recentForm: [
      { opp: 'vs ARSENAL (H)', res: 'W 2 - 1', ga: '0 / 0', xg: '0.12', rat: '8.2', color: 'bg-primary-red' },
      { opp: 'vs MAN CITY (A)', res: 'D 1 - 1', ga: '0 / 0', xg: '0.08', rat: '7.5', color: 'bg-surface-high' },
      { opp: 'vs CHELSEA (H)', res: 'W 4 - 1', ga: '1 / 0', xg: '0.31', rat: '8.6', color: 'bg-primary-red' },
    ],
  },

  // ── Alexis Mac Allister ────────────────────────────────────────────────────
  {
    id: 'mac-allister',
    footballDataId: 45681,
    name: 'ALEXIS MAC ALLISTER',
    firstName: 'ALEXIS',
    lastName: 'MAC ALLISTER',
    number: '10',
    position: 'CENTRAL MIDFIELD',
    positionGroup: 'MID',
    nationality: 'Argentina',
    age: 27,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/96dmuf1757087513.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/9n5dnd1751999911.jpg',
    highlightVideoId: 'dQw4w9WgXcQ',
    stats: { goals: 9, assists: 11, minutes: 2700, yellowCards: 6, redCards: 0 },
    radar: { pace: 74, shooting: 76, passing: 88, dribbling: 82, defending: 78, physical: 80 },
    metrics: [
      { label: 'Pass Completion', val: '91%', width: '91%' },
      { label: 'Chances Created', val: '68', width: '75%' },
    ],
    recentForm: [
      { opp: 'vs ARSENAL (H)', res: 'W 2 - 1', ga: '1 / 0', xg: '0.44', rat: '8.0', color: 'bg-primary-red' },
      { opp: 'vs MAN CITY (A)', res: 'D 1 - 1', ga: '0 / 1', xg: '0.28', rat: '7.2', color: 'bg-surface-high' },
      { opp: 'vs CHELSEA (H)', res: 'W 4 - 1', ga: '0 / 2', xg: '0.55', rat: '8.4', color: 'bg-primary-red' },
    ],
  },

  // ── Florian Wirtz ──────────────────────────────────────────────────────────
  {
    id: 'wirtz',
    footballDataId: 19334,
    name: 'FLORIAN WIRTZ',
    firstName: 'FLORIAN',
    lastName: 'WIRTZ',
    number: '17',
    position: 'ATTACKING MIDFIELD',
    positionGroup: 'MID',
    nationality: 'Germany',
    age: 22,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/8t6bzo1757088899.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/m1o8hn1752010521.jpg',
    highlightVideoId: 'dQw4w9WgXcQ',
    stats: { goals: 14, assists: 18, minutes: 2600, yellowCards: 2, redCards: 0 },
    radar: { pace: 82, shooting: 82, passing: 90, dribbling: 91, defending: 48, physical: 70 },
    metrics: [
      { label: 'Key Passes per 90', val: '3.8', width: '88%' },
      { label: 'Dribble Success', val: '78%', width: '78%' },
    ],
    recentForm: [
      { opp: 'vs ARSENAL (H)', res: 'W 2 - 1', ga: '1 / 1', xg: '0.72', rat: '8.9', color: 'bg-primary-red' },
      { opp: 'vs MAN CITY (A)', res: 'D 1 - 1', ga: '0 / 0', xg: '0.38', rat: '7.6', color: 'bg-surface-high' },
      { opp: 'vs CHELSEA (H)', res: 'W 4 - 1', ga: '2 / 1', xg: '1.02', rat: '9.4', color: 'bg-primary-red' },
    ],
  },

  // ── Ryan Gravenberch ───────────────────────────────────────────────────────
  {
    id: 'gravenberch',
    footballDataId: 81793,
    name: 'RYAN GRAVENBERCH',
    firstName: 'RYAN',
    lastName: 'GRAVENBERCH',
    number: '38',
    position: 'DEFENSIVE MIDFIELD',
    positionGroup: 'MID',
    nationality: 'Netherlands',
    age: 23,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/4f7y1o1757088226.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/s2jcp81603836997.jpg',
    highlightVideoId: 'dQw4w9WgXcQ',
    stats: { goals: 5, assists: 8, minutes: 2850, yellowCards: 4, redCards: 0 },
    radar: { pace: 80, shooting: 70, passing: 85, dribbling: 80, defending: 82, physical: 85 },
    metrics: [
      { label: 'Ball Recoveries', val: '8.4/90', width: '82%' },
      { label: 'Progressive Carries', val: '6.1/90', width: '68%' },
    ],
    recentForm: [
      { opp: 'vs ARSENAL (H)', res: 'W 2 - 1', ga: '0 / 1', xg: '0.22', rat: '7.8', color: 'bg-primary-red' },
      { opp: 'vs MAN CITY (A)', res: 'D 1 - 1', ga: '0 / 0', xg: '0.15', rat: '7.4', color: 'bg-surface-high' },
      { opp: 'vs CHELSEA (H)', res: 'W 4 - 1', ga: '1 / 0', xg: '0.44', rat: '8.1', color: 'bg-primary-red' },
    ],
  },

  // ── Alisson ────────────────────────────────────────────────────────────────
  {
    id: 'alisson',
    footballDataId: 1795,
    name: 'ALISSON',
    firstName: 'ALISSON',
    lastName: 'BECKER',
    number: '1',
    position: 'GOALKEEPER',
    positionGroup: 'GK',
    nationality: 'Brazil',
    age: 33,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/8amq961757087569.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/yi6dt21746034945.jpg',
  },

  // ── Freddie Woodman ────────────────────────────────────────────────────────
  {
    id: 'woodman',
    footballDataId: 11629,
    name: 'FREDDIE WOODMAN',
    firstName: 'FREDDIE',
    lastName: 'WOODMAN',
    number: '13',
    position: 'GOALKEEPER',
    positionGroup: 'GK',
    nationality: 'England',
    age: 29,
  },

  // ── Giorgi Mamardashvili ───────────────────────────────────────────────────
  {
    id: 'mamardashvili',
    footballDataId: 84506,
    name: 'GIORGI MAMARDASHVILI',
    firstName: 'GIORGI',
    lastName: 'MAMARDASHVILI',
    number: '22',
    position: 'GOALKEEPER',
    positionGroup: 'GK',
    nationality: 'Georgia',
    age: 25,
  },

  // ── Armin Pecsi ───────────────────────────────────────────────────────────
  {
    id: 'pecsi',
    footballDataId: 182236,
    name: 'ARMIN PECSI',
    firstName: 'ARMIN',
    lastName: 'PECSI',
    position: 'GOALKEEPER',
    positionGroup: 'GK',
    nationality: 'Hungary',
    age: 21,
  },

  // ── Kornel Miściur ────────────────────────────────────────────────────────
  {
    id: 'misciur',
    footballDataId: 287947,
    name: 'KORNEL MIŚCIUR',
    firstName: 'KORNEL',
    lastName: 'MIŚCIUR',
    position: 'GOALKEEPER',
    positionGroup: 'GK',
    nationality: 'Poland',
    age: 18,
  },

  // ── Joe Gomez ─────────────────────────────────────────────────────────────
  {
    id: 'gomez',
    footballDataId: 7862,
    name: 'JOE GOMEZ',
    firstName: 'JOE',
    lastName: 'GOMEZ',
    number: '2',
    position: 'CENTRE-BACK',
    positionGroup: 'DEF',
    nationality: 'England',
    age: 28,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/nu8h0u1757088152.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/34whvi1510000137.jpg',
  },

  // ── Andrew Robertson ──────────────────────────────────────────────────────
  {
    id: 'robertson',
    footballDataId: 7868,
    name: 'ANDREW ROBERTSON',
    firstName: 'ANDREW',
    lastName: 'ROBERTSON',
    number: '26',
    position: 'LEFT-BACK',
    positionGroup: 'DEF',
    nationality: 'Scotland',
    age: 31,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/t0yil51757088652.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/mvmpbc1710165540.jpg',
  },

  // ── Ibrahima Konaté ───────────────────────────────────────────────────────
  {
    id: 'konate',
    footballDataId: 9542,
    name: 'IBRAHIMA KONATÉ',
    firstName: 'IBRAHIMA',
    lastName: 'KONATÉ',
    number: '5',
    position: 'CENTRE-BACK',
    positionGroup: 'DEF',
    nationality: 'France',
    age: 26,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/izock91757088476.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/f9phx81578228121.jpg',
  },

  // ── Conor Bradley ─────────────────────────────────────────────────────────
  {
    id: 'bradley',
    footballDataId: 175865,
    name: 'CONOR BRADLEY',
    firstName: 'CONOR',
    lastName: 'BRADLEY',
    number: '84',
    position: 'RIGHT-BACK',
    positionGroup: 'DEF',
    nationality: 'Northern Ireland',
    age: 22,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/yojnr41757087630.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/gt534v1658610550.jpg',
  },

  // ── Milos Kerkez ──────────────────────────────────────────────────────────
  {
    id: 'kerkez',
    footballDataId: 171141,
    name: 'MILOS KERKEZ',
    firstName: 'MILOS',
    lastName: 'KERKEZ',
    position: 'LEFT-BACK',
    positionGroup: 'DEF',
    nationality: 'Hungary',
    age: 22,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/otux671757089023.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/qb4g1z1664218495.jpg',
  },

  // ── Calvin Ramsay ─────────────────────────────────────────────────────────
  {
    id: 'ramsay',
    footballDataId: 124778,
    name: 'CALVIN RAMSAY',
    firstName: 'CALVIN',
    lastName: 'RAMSAY',
    number: '6',
    position: 'RIGHT-BACK',
    positionGroup: 'DEF',
    nationality: 'Scotland',
    age: 22,
  },

  // ── Stefan Bajcetic ───────────────────────────────────────────────────────
  {
    id: 'bajcetic',
    footballDataId: 186701,
    name: 'STEFAN BAJCETIC',
    firstName: 'STEFAN',
    lastName: 'BAJCETIC',
    number: '43',
    position: 'DEFENDER',
    positionGroup: 'DEF',
    nationality: 'Spain',
    age: 21,
  },

  // ── Wellity Lucky ─────────────────────────────────────────────────────────
  {
    id: 'lucky',
    footballDataId: 288621,
    name: 'WELLITY LUCKY',
    firstName: 'WELLITY',
    lastName: 'LUCKY',
    position: 'DEFENDER',
    positionGroup: 'DEF',
    nationality: 'England',
    age: 20,
  },

  // ── Carter Pinnington ─────────────────────────────────────────────────────
  {
    id: 'pinnington',
    footballDataId: 288622,
    name: 'CARTER PINNINGTON',
    firstName: 'CARTER',
    lastName: 'PINNINGTON',
    position: 'DEFENDER',
    positionGroup: 'DEF',
    nationality: 'England',
    age: 19,
  },

  // ── Amara Nallo ───────────────────────────────────────────────────────────
  {
    id: 'nallo',
    footballDataId: 248990,
    name: 'AMARA NALLO',
    firstName: 'AMARA',
    lastName: 'NALLO',
    position: 'CENTRE-BACK',
    positionGroup: 'DEF',
    nationality: 'England',
    age: 19,
  },

  // ── Giovanni Leoni ────────────────────────────────────────────────────────
  {
    id: 'leoni',
    footballDataId: 192563,
    name: 'GIOVANNI LEONI',
    firstName: 'GIOVANNI',
    lastName: 'LEONI',
    position: 'CENTRE-BACK',
    positionGroup: 'DEF',
    nationality: 'Italy',
    age: 19,
  },

  // ── Rhys Williams ─────────────────────────────────────────────────────────
  {
    id: 'rhys-williams',
    footballDataId: 135636,
    name: 'RHYS WILLIAMS',
    firstName: 'RHYS',
    lastName: 'WILLIAMS',
    position: 'CENTRE-BACK',
    positionGroup: 'DEF',
    nationality: 'England',
    age: 25,
  },

  // ── Wataru Endō ───────────────────────────────────────────────────────────
  {
    id: 'endo',
    footballDataId: 3269,
    name: 'WATARU ENDŌ',
    firstName: 'WATARU',
    lastName: 'ENDŌ',
    number: '3',
    position: 'DEFENSIVE MIDFIELD',
    positionGroup: 'MID',
    nationality: 'Japan',
    age: 33,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/eawsfp1757087920.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/4z056r1605710848.jpg',
  },

  // ── Dominik Szoboszlai ────────────────────────────────────────────────────
  {
    id: 'szoboszlai',
    footballDataId: 16347,
    name: 'DOMINIK SZOBOSZLAI',
    firstName: 'DOMINIK',
    lastName: 'SZOBOSZLAI',
    number: '8',
    position: 'CENTRAL MIDFIELD',
    positionGroup: 'MID',
    nationality: 'Hungary',
    age: 25,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/0n431m1757088795.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/1tnwli1746377031.jpg',
  },

  // ── Curtis Jones ──────────────────────────────────────────────────────────
  {
    id: 'jones',
    footballDataId: 7873,
    name: 'CURTIS JONES',
    firstName: 'CURTIS',
    lastName: 'JONES',
    number: '17',
    position: 'CENTRAL MIDFIELD',
    positionGroup: 'MID',
    nationality: 'England',
    age: 25,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/ghs3g51757088342.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/u5fyd21577016090.jpg',
  },

  // ── Jeremie Frimpong ──────────────────────────────────────────────────────
  {
    id: 'frimpong',
    footballDataId: 128954,
    name: 'JEREMIE FRIMPONG',
    firstName: 'JEREMIE',
    lastName: 'FRIMPONG',
    position: 'RIGHT WINGER',
    positionGroup: 'MID',
    nationality: 'Netherlands',
    age: 25,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/ehf7fi1757088020.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/4vfl5h1611865283.jpg',
  },

  // ── Kieran Morrison ───────────────────────────────────────────────────────
  {
    id: 'morrison',
    footballDataId: 274726,
    name: 'KIERAN MORRISON',
    firstName: 'KIERAN',
    lastName: 'MORRISON',
    position: 'MIDFIELDER',
    positionGroup: 'MID',
    nationality: 'Northern Ireland',
    age: 19,
  },

  // ── Tommy Pilling ─────────────────────────────────────────────────────────
  {
    id: 'pilling',
    footballDataId: 286622,
    name: 'TOMMY PILLING',
    firstName: 'TOMMY',
    lastName: 'PILLING',
    position: 'MIDFIELDER',
    positionGroup: 'MID',
    nationality: 'England',
    age: 21,
  },

  // ── Michael Laffey ────────────────────────────────────────────────────────
  {
    id: 'laffey',
    footballDataId: 288625,
    name: 'MICHAEL LAFFEY',
    firstName: 'MICHAEL',
    lastName: 'LAFFEY',
    position: 'MIDFIELDER',
    positionGroup: 'MID',
    nationality: 'England',
    age: 20,
  },

  // ── Trey Nyoni ────────────────────────────────────────────────────────────
  {
    id: 'nyoni',
    footballDataId: 230517,
    name: 'TREY NYONI',
    firstName: 'TREY',
    lastName: 'NYONI',
    position: 'ATTACKING MIDFIELD',
    positionGroup: 'MID',
    nationality: 'England',
    age: 18,
  },

  // ── Cody Gakpo ────────────────────────────────────────────────────────────
  {
    id: 'gakpo',
    footballDataId: 7459,
    name: 'CODY GAKPO',
    firstName: 'CODY',
    lastName: 'GAKPO',
    number: '18',
    position: 'LEFT WINGER',
    positionGroup: 'FWD',
    nationality: 'Netherlands',
    age: 26,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/lwkl5n1757088091.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/m9g2ki1669145821.jpg',
  },

  // ── Alexander Isak ────────────────────────────────────────────────────────
  {
    id: 'isak',
    footballDataId: 6486,
    name: 'ALEXANDER ISAK',
    firstName: 'ALEXANDER',
    lastName: 'ISAK',
    position: 'CENTRE-FORWARD',
    positionGroup: 'FWD',
    nationality: 'Sweden',
    age: 26,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/3qj7z41757088281.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/b3kj061532275016.jpg',
  },

  // ── Federico Chiesa ───────────────────────────────────────────────────────
  {
    id: 'chiesa',
    footballDataId: 1780,
    name: 'FEDERICO CHIESA',
    firstName: 'FEDERICO',
    lastName: 'CHIESA',
    position: 'RIGHT WINGER',
    positionGroup: 'FWD',
    nationality: 'Italy',
    age: 28,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/idecla1757087689.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/o6cg3u1746376297.jpg',
  },

  // ── Hugo Ekitike ──────────────────────────────────────────────────────────
  {
    id: 'ekitike',
    footballDataId: 152454,
    name: 'HUGO EKITIKE',
    firstName: 'HUGO',
    lastName: 'EKITIKE',
    position: 'CENTRE-FORWARD',
    positionGroup: 'FWD',
    nationality: 'France',
    age: 23,
    image: 'https://r2.thesportsdb.com/images/media/player/cutout/8za47v1757087851.png',
    heroImage: 'https://r2.thesportsdb.com/images/media/player/thumb/dtmlr71704447908.jpg',
  },

  // ── Kaide Gordon ──────────────────────────────────────────────────────────
  {
    id: 'gordon',
    footballDataId: 157176,
    name: 'KAIDE GORDON',
    firstName: 'KAIDE',
    lastName: 'GORDON',
    position: 'RIGHT WINGER',
    positionGroup: 'FWD',
    nationality: 'England',
    age: 21,
  },

  // ── Jayden Danns ──────────────────────────────────────────────────────────
  {
    id: 'danns',
    footballDataId: 247657,
    name: 'JAYDEN DANNS',
    firstName: 'JAYDEN',
    lastName: 'DANNS',
    position: 'CENTRE-FORWARD',
    positionGroup: 'FWD',
    nationality: 'England',
    age: 20,
  },

  // ── Rio Ngumoha ───────────────────────────────────────────────────────────
  {
    id: 'ngumoha',
    footballDataId: 273453,
    name: 'RIO NGUMOHA',
    firstName: 'RIO',
    lastName: 'NGUMOHA',
    position: 'FORWARD',
    positionGroup: 'FWD',
    nationality: 'England',
    age: 17,
  },

  // ── Keyrol Figueroa ───────────────────────────────────────────────────────
  {
    id: 'figueroa',
    footballDataId: 288617,
    name: 'KEYROL FIGUEROA',
    firstName: 'KEYROL',
    lastName: 'FIGUEROA',
    position: 'FORWARD',
    positionGroup: 'FWD',
    nationality: 'USA',
    age: 19,
  },
];
