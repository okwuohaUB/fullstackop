const Total = () =>{
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  return(
    <div>
      <h2>Total Exercises: {exercises1 + exercises2 + exercises3}</h2>
    </div>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      Course: {course.name} <br /><br />

      Parts1: {course.parts[0].name} <br />
      Excecises: {course.parts[0].exercises} <br /><br />

      Parts2: {course.parts[1].name} <br />
      Excecises: {course.parts[1].exercises} <br /><br />

      Parts3: {course.parts[2].name} <br />
      Excecises: {course.parts[2].exercises} <br /><br />

      <Total />
    </div>
  )
}

export default App