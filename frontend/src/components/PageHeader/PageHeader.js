import './PageHeader.css'

const PageHeader = (props) => {
  const { title, children } = props
  return (
    <header className="Header">
      <h1 className="Header-title">{title}</h1>
      <div className="Header-space" />
      <div className="Header-actions">{children}</div>
    </header>
  )
}

export default PageHeader
