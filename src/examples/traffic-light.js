import {css, html, Wrec} from '../wrec';

/**
 * This web component emulates a U.S. traffic light
 * with red, yellow, and green lights.
 * The `state` attribute specifies the initial state.
 * To advance to the next state, click the component
 * or call the next() method on an instance.
 * To get the current state, access the `state` property of an instance.
 * @attr {string} state - initial traffic light state.
 * @prop {State} [state="stop"] - current traffic light state
 */
class TrafficLight extends Wrec {
  static properties = {
    state: {
      type: String,
      value: 'stop',
      values: ['stop', 'yield', 'go'],
      dispatch: true,
      usedBy: 'classes'
    }
  };

  static css = css`
    :host {
      display: block;
    }
    button {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      background-color: black;
      border-radius: 1.5rem;
      padding: 0.5rem;
    }
    div {
      --size: 3rem;
      border: none;
      border-radius: 50%;
      font-weight: bold;
      padding: 0.5rem;
      height: var(--size);
      width: var(--size);

      opacity: 0.4;
      &.on {
        opacity: 1;
      }
    }
    .stop {
      background-color: red;
    }
    .yield {
      background-color: yellow;
    }
    .go {
      background-color: lawngreen;
    }
  `;

  static html = html`
    <style></style>
    <button aria-label="traffic light" onClick="this.next()" type="button">
      <div class="this.classes('stop')"></div>
      <div class="this.classes('yield')"></div>
      <div class="this.classes('go')"></div>
    </button>
  `;

  classes(state) {
    return state + (this.state === state ? ' on' : '');
  }

  next() {
    const s = this.state;
    this.state = s === 'stop' ? 'yield' : s === 'yield' ? 'go' : 'stop';
  }
}

TrafficLight.define('traffic-light');
