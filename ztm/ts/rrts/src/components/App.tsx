import React from 'react'
import { connect } from 'react-redux'
import { fetchTodos, deleteTodo } from '../actions'
import { Todo  } from '../ts/interfaces'
import { StoreState,  } from '../reducers'

interface  AppProps {
  todos: Todo[]
  fetchTodos: Function
  deleteTodo: typeof deleteTodo
}

interface AppState {
  fetching: boolean
}
export class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { fetching: false }
  }
  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false })
    }
  }
  onButtonClick = (): void => {
    this.props.fetchTodos()
    this.setState({ fetching: true })
  }

  onDeleteClick = (id: number): void => {
    this.props.deleteTodo(id)
  }

  renderList = (): JSX.Element[] => {
    return (
      this.props.todos.map((todo: Todo) => {
        return <li key={todo.id} onClick={() => this.onDeleteClick(todo.id)}>{todo.title}</li>
      })
    )
  }

  render() {
    return (
      <div>
        <h3> Todos </h3>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? (<p>loading</p>) : null }
        <ul>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos }
}

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App)
