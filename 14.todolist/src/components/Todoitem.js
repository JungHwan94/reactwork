/*
const Todoitem = (props) => {
    return (
        <div className='Todoitem'>
            <input type='checkbox' />
            <span>{props.todo.content}</span> 
            <span>{new Date(props.todo.date).toLocaleDateString()}</span>
            <button>삭제</button>
        </div>
    )
}
*/

const Todoitem = ({id, isDone, content, date, onUpdate}) => {
  return (
      <div className='Todoitem'>
          <input type='checkbox' checked={isDone} onUpdate={() => {onUpdate(id)}}/>
          <span>{content}</span> 
          <span>{new Date(date).toLocaleDateString()}</span>
          <button>삭제💦</button>
      </div>
  )
}
export default Todoitem;