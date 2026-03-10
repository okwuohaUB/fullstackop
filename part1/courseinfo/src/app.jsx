import { useState } from "react"


const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

debugger;

const App = () => {

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, SetAll] = useState([])
    const [total, setTotal] = useState(0)

    const handleLeftClicks = () => {

       SetAll(allClicks.concat('L'))
       const updatedLeft = left + 1
       setLeft(updatedLeft)
       setTotal(updatedLeft + right)
    }


    const handleRightClicks = () => {

        SetAll(allClicks.concat('R'))
        const updatedRight = right + 1
        setRight(updatedRight)
        setTotal(updatedRight + left)
    }

    
    return (
        <div>

            {left}
           
            <Button onClick={handleLeftClicks} text='left' />
            <Button onClick={handleRightClicks} text='right' />
            {right}
            <p>
                {allClicks.join(' ')}
            </p>
            <p>
                total {total}
            </p>

            <History allClicks={allClicks} />
        </div>
    )

}

export default App