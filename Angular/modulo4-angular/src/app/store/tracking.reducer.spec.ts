import {
  trackingReducer,
  estadoInicial
} from './tracking.reducer';

import {
  registrarClick
} from './tracking.actions';

describe('trackingReducer', () => {

  it('debe incrementar contador', () => {

    const action = registrarClick({
      tag: 'boton'
    });

    const nuevoEstado = trackingReducer(
      estadoInicial,
      action
    );

    expect(
      nuevoEstado.tags['boton']
    ).toBe(1);

  });

});