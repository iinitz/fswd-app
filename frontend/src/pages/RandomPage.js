import React, {
  Fragment, useCallback, useEffect, useState,
} from 'react'
import { useLazyQuery } from '@apollo/client'

import Loading from '../components/Loading'
import Divider from '../components/Divider'
import Card from '../components/Card'
import { PROJECTS_QUERY } from '../graphql/projectsQuery'

const PageHeader = React.lazy(() => import('../components/PageHeader'))
const GridContainer = React.lazy(() => import('../components/GridContainer'))
const ProjectCard = React.lazy(() => import('../components/ProjectCard'))

const TIMER = 1500
const FIBO = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377].map((fib) => (TIMER / fib))
const RandomPage = () => {
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('projects') ?? null))
  const [index, setIndex] = useState(-1)
  const [selectedProject, setSelectedProject] = useState(null)
  const [loadProjects, {
    loading, error, data, called, refetch,
  }] = useLazyQuery(PROJECTS_QUERY)
  useEffect(
    () => {
      if (projects === null && !called) {
        loadProjects()
      }
    },
    [called, loadProjects, projects],
  )
  useEffect(
    () => {
      if (data?.projects) {
        const filteredProjects = data?.projects?.filter((project) => (project.members.length > 0))
        localStorage.setItem('projects', JSON.stringify(filteredProjects))
        setProjects(filteredProjects)
        setSelectedProject(null)
        setIndex(-1)
      }
    },
    [data?.projects],
  )
  const random = useCallback(
    () => {
      const randomIndex = Math.floor(Math.random() * projects.length)
      setSelectedProject(null)
      setIndex(randomIndex)
      return randomIndex
    },
    [projects],
  )
  const handleRandom = useCallback(
    () => {
      setTimeout(() => {
        random()
        setTimeout(() => {
          random()
          setTimeout(() => {
            random()
            setTimeout(() => {
              random()
              setTimeout(() => {
                random()
                setTimeout(() => {
                  random()
                  setTimeout(() => {
                    random()
                    setTimeout(() => {
                      random()
                      setTimeout(() => {
                        random()
                        setTimeout(() => {
                          random()
                          setTimeout(() => {
                            random()
                            setTimeout(() => {
                              random()
                              setTimeout(() => {
                                random()
                                setTimeout(() => {
                                  random()
                                  setTimeout(() => {
                                    const randomIndex = random()
                                    setSelectedProject(projects[randomIndex])
                                    setProjects((prev) => {
                                      const newProjects = ([...prev.slice(0, randomIndex), ...prev.slice(randomIndex + 1, prev.length)])
                                      localStorage.setItem('projects', JSON.stringify(newProjects))
                                      return newProjects
                                    })
                                  }, FIBO[0])
                                }, FIBO[1])
                              }, FIBO[2])
                            }, FIBO[3])
                          }, FIBO[4])
                        }, FIBO[5])
                      }, FIBO[6])
                    }, FIBO[7])
                  }, FIBO[8])
                }, FIBO[9])
              }, FIBO[10])
            }, FIBO[11])
          }, FIBO[12])
        }, FIBO[13])
      }, FIBO[14])
    },
    [projects, random],
  )
  const handleReset = useCallback(
    () => {
      const refetchQuery = async () => {
        const res = await refetch()
        if (res?.data?.projects) {
          const filteredProjects = res?.data?.projects?.filter((project) => (project.members.length > 0))
          localStorage.setItem('projects', JSON.stringify(filteredProjects))
          setProjects(filteredProjects)
          setSelectedProject(null)
          setIndex(-1)
        }
      }
      if (!called) {
        loadProjects()
      } else {
        refetchQuery()
      }
    },
    [called, loadProjects, refetch],
  )
  const handleNext = useCallback(
    () => {
      setSelectedProject(null)
      setIndex(-1)
    },
    [],
  )
  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      <PageHeader title="Random project">
        {projects.length > 0 ? (
          <button className="Button Button-border Button-margin-right" type="button" onClick={handleNext} disabled={selectedProject === null}>Next</button>
        ) : null}
        <button className="Button Button-border" type="button" onClick={handleReset}>Reset</button>
      </PageHeader>
      <GridContainer>
        <div />
        {selectedProject ? (
          <ProjectCard {...selectedProject} />
        ) : (
          <Card
            header={index === -1 ? `Random project (${projects.length} projects left)` : projects?.[index]?.name}
            actions={(
              <Fragment>
                <div className="Space" />
                <button className="Button Button-border" type="button" onClick={handleRandom} disabled={projects.length === 0 || index !== -1}>Random</button>
              </Fragment>
            )}
          />
        )}
        <div />
      </GridContainer>
      <Divider />
      <GridContainer>
        {projects?.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </GridContainer>
    </div>
  )
}

export default RandomPage
