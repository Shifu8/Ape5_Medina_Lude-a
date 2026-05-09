export const iotAutomaton = {
  id: 'iot',
  name: 'IoT',
  regex: 'HDR (TEMP | HUM)* CRC',
  description:
    'AFND que reconoce mensajes de sensores IoT con encabezado HDR, una secuencia opcional de lecturas TEMP o HUM y un sufijo de verificación CRC.',
  pseudocode: `1. Iniciar en q0
2. Leer HDR y avanzar a q1
3. Entrar en la construcción de estrella con ε hacia q2
4. En q2, aceptar TEMP o HUM, regresar mediante ε para repetir
5. Salir de la estrella con ε hacia q5
6. Leer CRC y llegar a q6 final`,
  states: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6'],
  alphabet: ['HDR', 'TEMP', 'HUM', 'CRC', 'ε'],
  transitions: [
    { source: 'q0', symbol: 'HDR', target: 'q1' },
    { source: 'q1', symbol: 'ε', target: 'q2' },
    { source: 'q2', symbol: 'TEMP', target: 'q3' },
    { source: 'q2', symbol: 'HUM', target: 'q4' },
    { source: 'q3', symbol: 'ε', target: 'q2' },
    { source: 'q4', symbol: 'ε', target: 'q2' },
    { source: 'q2', symbol: 'ε', target: 'q5' },
    { source: 'q5', symbol: 'CRC', target: 'q6' }
  ],
  initialState: 'q0',
  finalStates: ['q6'],
  positions: {
    q0: { x: 0, y: 220 },
    q1: { x: 220, y: 220 },
    q2: { x: 460, y: 220 },
    q3: { x: 700, y: 140 },
    q4: { x: 700, y: 300 },
    q5: { x: 940, y: 220 },
    q6: { x: 1180, y: 220 }
  }
};

export const ecommerceAutomaton = {
  id: 'ecommerce',
  name: 'Ecommerce',
  regex: 'HOME SEARCH+ CART',
  description:
    'AFND que modela el flujo de navegación de un comercio electrónico: llegada a HOME, una o más búsquedas SEARCH y la finalización en CART.',
  pseudocode: `1. Iniciar en q0
2. Leer HOME y avanzar a q1
3. Leer SEARCH al menos una vez, llegar a q2
4. Desde q2, permanecer en SEARCH tantas veces como sea necesario
5. Finalmente leer CART y avanzar a q3 final`,
  states: ['q0', 'q1', 'q2', 'q3'],
  alphabet: ['HOME', 'SEARCH', 'CART'],
  transitions: [
    { source: 'q0', symbol: 'HOME', target: 'q1' },
    { source: 'q1', symbol: 'SEARCH', target: 'q2' },
    { source: 'q2', symbol: 'SEARCH', target: 'q2' },
    { source: 'q2', symbol: 'CART', target: 'q3' }
  ],
  initialState: 'q0',
  finalStates: ['q3'],
  positions: {
    q0: { x: 0, y: 220 },
    q1: { x: 260, y: 220 },
    q2: { x: 520, y: 220 },
    q3: { x: 780, y: 220 }
  }
};

export const slackAutomaton = {
  id: 'slack',
  name: 'Slack Bot',
  regex: '@bot (USER)? (!cmd | ?help)',
  description:
    'AFD determinista que reconoce un comando al bot de Slack con una etiqueta @bot, un usuario opcional y una acción de comando o ayuda.',
  pseudocode: `1. Iniciar en q0
2. Leer @bot y avanzar a q1
3. Leer USER opcionalmente para avanzar a q2
4. En q1 o q2, aceptar !cmd o ?help
5. Llegar a un estado final de respuesta`,
  states: ['q0', 'q1', 'q2', 'q3', 'q4'],
  alphabet: ['@bot', 'USER', '!cmd', '?help'],
  transitions: [
    { source: 'q0', symbol: '@bot', target: 'q1' },
    { source: 'q1', symbol: 'USER', target: 'q2' },
    { source: 'q1', symbol: '!cmd', target: 'q3' },
    { source: 'q1', symbol: '?help', target: 'q4' },
    { source: 'q2', symbol: '!cmd', target: 'q3' },
    { source: 'q2', symbol: '?help', target: 'q4' }
  ],
  initialState: 'q0',
  finalStates: ['q3', 'q4'],
  positions: {
    q0: { x: 0, y: 220 },
    q1: { x: 260, y: 220 },
    q2: { x: 520, y: 220 },
    q3: { x: 780, y: 160 },
    q4: { x: 780, y: 280 }
  }
};
