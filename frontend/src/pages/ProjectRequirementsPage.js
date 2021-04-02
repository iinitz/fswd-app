import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MarkdownGithub from 'react-markdown-github'

import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'

const ProjectRequirementsPage = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  useEffect(
    () => {
      const getData = async () => {
        setLoading(true)
        const res = await fetch('https://raw.githubusercontent.com/iinitz/fswd-project/main/e-commerce.md?token=ANA3OKF4NNQIAKVRPABWALDAOAM5Y')
        const text = await res.text()
        setData(text)
        setLoading(false)
      }
      getData()
    },
    [],
  )
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      <PageHeader title="Requirements">
        <Link to={{ pathname: 'https://github.com/iinitz/fswd-project/blob/main/e-commerce.md' }} target="_blank">View on Github</Link>
      </PageHeader>
      <MarkdownGithub source={data} />
    </div>
  )
}

export default ProjectRequirementsPage
