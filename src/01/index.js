const elBox = document.querySelector('#box');

const machine = {
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        CLICK: 'active',
      },
    },
    active: {
      on: {
        CLICK: 'inactive',
      },
    },
  },
};

let currentState = machine.initial;

const transition = (state, event) => machine.states[state].on?.[event] || state;

const send = (event) => {
  currentState = transition(currentState, event);
  elBox.dataset.state = currentState;
}

elBox.addEventListener('click', () => {
  send('CLICK');
});