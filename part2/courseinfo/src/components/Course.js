const Header = ({ name }) => {
    return (
      <div>
        <h1>{ name }</h1>
      </div>
    )
  }
  
  
const Part = ({ part }) => {
    return (
      <div>
      <p>{part.name} {part.exercises}</p>
    </div>
    ) 
  }
  
  
const Content = ({ parts }) => {
    const part_list = parts.map((part) => <Part key = {part.id} part = {part}></Part>)
    return (
      <div>
        { part_list }
      </div>
    )
  }
  
const Total = ({ parts }) => {
    const exercises_list = parts.map((part) => part.exercises)
    const total = exercises_list.reduce((total, e) => total + e, 0)
    return (
      <div>total of { total } exercises</div>
    )
  }
  
  
const Course = ({ course }) => {
    return (
      <div>
        <Header name = { course.name }></Header>
        <Content parts = { course.parts }></Content>
        <Total parts = { course.parts }></Total>
      </div>
  
    )
  }

export default Course