import { createMachine, interpret } from 'xstate';

const elApp = document.querySelector('#app');
const elOffButton = document.querySelector('#offButton');
const elOnButton = document.querySelector('#onButton');
const elModeButton = document.querySelector('#modeButton');

const displayMachine = createMachine({
  initial: 'hidden',
  states: {
    hidden: {
      on: {
        TURN_ON: 'visible',
      },
    },
    visible: {
      type: 'parallel',
      states: {
        mode: {
          initial: 'light',
          states: {
            light: {
              on: {
                'SWITCH': {
                  target: 'dark'
                }
              }
            },
            dark: {
              on: {
                'SWITCH': {
                  target: 'light'
                }
              }
            }
          }
        },
        brightness: {
          initial: 'bright',
          states: {
            bright: {
              after: {
                TIMEOUT: {
                  target: 'dim'
                }
              }
            },
            dim: {
              on: {
                'SWITCH': {
                  target: 'bright'
                }
              }
            }
          }
        }
      },
      on: {
        'TURN_OFF': {
          target: 'hidden'
        }
      },
    },
  },
}, {
  delays: {
    TIMEOUT: 5000,
  }
});

const displayService = interpret(displayMachine)
  .onTransition((state) => {
    elApp.dataset.state = state.toStrings().join(' ');
  })
  .start();

elOnButton.addEventListener('click', () => {
  displayService.send('TURN_ON');
});

elOffButton.addEventListener('click', () => {
  displayService.send('TURN_OFF');
});

elModeButton.addEventListener('click', () => {
  displayService.send('SWITCH');
});
