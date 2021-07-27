import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const machine = createMachine({
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        'mousedown': 'active',
      },
    },
    active: {
      on: {
        'mouseup': 'inactive',
      },
    },
  },
});

const service = interpret(machine)

service.start()

service.onTransition(state => {
  elBox.dataset.state = state.value
})

elBox.addEventListener('mousedown', (event) => {
  service.send(event)
  console.log(event);
  // service.send({
  //   type: 'mouse_down'
  // })
});

elBox.addEventListener('mouseup', (event) => {
  service.send(event)
  // service.send({
  //   type: 'mouse_up'
  // })
});
