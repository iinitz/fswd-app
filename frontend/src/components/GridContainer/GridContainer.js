import './GridContainer.css'

const GridContainer = (props) => {
  const { children } = props
  return (
    <div className="GridContainer">
      {children}
    </div>
  )
}

export default GridContainer
