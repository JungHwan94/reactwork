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

const Todoitem = ({isDone, content, date}) => {
  return (
      <div className='Todoitem'>
          <input type='checkbox' />
          <span>{content}</span> 
          <span>{new Date(date).toLocaleDateString()}</span>
          <button>삭제💦</button>
      </div>
  )
}
export default Todoitem;