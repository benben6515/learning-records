import React from 'react';
import ReactDOM from 'react-dom/client';

interface AppProps {
  color: string;
}

interface AppState {
  counter: number;
}

// function component -------------------------
// const App = (props: AppProps): JSX.Element => {
//   return (
//     <div>
//       {props.color}
//     </div>
//   )
// }

// class component -------------------------
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { counter: 0 }
  }

  onIncrement():void {
    this.setState({ counter: this.state.counter + 1 })
  }

  onDecrement():void {
    this.setState({ counter: this.state.counter - 1 })
  }

  render() {
    return (
      <div>
        <button onClick={this.onIncrement}>increment</button>
        <button onClick={this.onDecrement}>decrement</button>
        {this.state.counter}
      </div>
    )
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App color="red" />
  </React.StrictMode>
);
