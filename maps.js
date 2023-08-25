/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🎁',
  'PLAYER': '💀',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'L': '❤️',
  'D': '🖤',
  'ONE': '🥇',
  'TWO': '🥈',
  'THREE': '🥉',

};

const maps = [];
maps.push({
  level: 0,
  map: [
    ['OXXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['-XXXXXXXXX'],
    ['IXXXXXXXXX']
  ]
}
);
maps.push({
  level: 1,
  map: [
    ['O--XXXXXXX'],
    ['X--XXXXXXX'],
    ['XX----XXXX'],
    ['X--XX-XXXX'],
    ['X-XXX--XXX'],
    ['X-XXXX-XXX'],
    ['XX--XX--XX'],
    ['XX--XXX-XX'],
    ['XXXX---IXX'],
    ['XXXXXXXXXX']
  ]
});
maps.push({
  level: 2,
  map: [
    ['I-----XXXX'],
    ['XXXXX-XXXX'],
    ['XX----XXXX'],
    ['XX-XXXXXXX'],
    ['XX-----XXX'],
    ['XXXXXX-XXX'],
    ['XX-----XXX'],
    ['XX-XXXXXXX'],
    ['XX-----OXX'],
    ['XXXXXXXXXX']
  ]
});
maps.push({
  level: 3,
  map: [
    ['I-----XXXX'],
    ['XXXXX---XX'],
    ['XXXXXXX-XX'],
    ['XX-XXX--XX'],
    ['XX-----XXX'],
    ['XX-XXXXXXX'],
    ['XX--XXXXXX'],
    ['XX-XXXXXXX'],
    ['XX-X---OXX'],
    ['XX---XXXXX']
  ]
});
