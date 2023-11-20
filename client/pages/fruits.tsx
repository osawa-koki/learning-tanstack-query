import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Alert, Spinner, Table } from 'react-bootstrap'
import setting from '../setting'

export default function FruitsPage (): React.JSX.Element {
  const { data: fruits, isLoading, isError }: UseQueryResult<Fruit[]> = useQuery({
    queryKey: ['fruits'],
    queryFn: async () => {
      const response = await fetch(`${setting.apiPath}/api/fruits`)
      return await response.json()
    }
  })

  if (isLoading || fruits == null) {
    return <Spinner animation="border" />
  }

  if (isError) {
    return <Alert variant="danger">Failed to load.</Alert>
  }

  return (
    <div>
      <h1>Fruits</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruit) => (
            <tr key={fruit.id}>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
              <td>{fruit.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
