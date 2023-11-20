import {
  type InvalidateQueryFilters,
  type QueryClient,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'
import { BsFillTrash3Fill } from 'react-icons/bs'
import setting from '../setting'

export default function FruitsPage (): React.JSX.Element {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  const [isWaiting, setIsWaiting] = useState(false)

  const createButtonDisabled = useMemo(() => {
    return name === '' || comment === ''
  }, [name, comment])

  const { data: fruits, isLoading, isError }: UseQueryResult<Fruit[]> = useQuery({
    queryKey: ['fruits'],
    queryFn: async () => {
      const response = await fetch(`${setting.apiPath}/api/fruits`)
      return await response.json()
    }
  })

  const queryClient: QueryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: async () => {
      if (fruits == null) return
      setIsWaiting(true)
      const maxPosition = fruits.reduce((max, fruit) => Math.max(max, fruit.position), 0)
      await fetch(`${setting.apiPath}/api/fruits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, comment, position: maxPosition + 1 })
      })
      setName('')
      setComment('')
      setIsWaiting(false)
    },
    onSettled: async () => {
      const filters: InvalidateQueryFilters = {
        queryKey: ['fruits']
      }
      await queryClient.invalidateQueries(filters)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${setting.apiPath}/api/fruits/${id}`, {
        method: 'DELETE'
      })
    },
    onSettled: async () => {
      const filters: InvalidateQueryFilters = {
        queryKey: ['fruits']
      }
      await queryClient.invalidateQueries(filters)
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((fruit) => (
            <tr key={fruit.id}>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
              <td>{fruit.comment}</td>
              <td>
                <BsFillTrash3Fill onClick={() => {
                  if (!window.confirm(`Delete ${fruit.name}?`)) return
                  deleteMutation.mutate(fruit.id)
                }} className='text-danger' role='button' />
              </td>
            </tr>
          ))}
          <tr>
            <td>##</td>
            <td>
              <Form.Control type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
            </td>
            <td>
              <Form.Control type="text" value={comment} onChange={(event) => { setComment(event.target.value) }} />
            </td>
            <td>
              <Button onClick={() => {
                createMutation.mutate()
              }} disabled={createButtonDisabled || isWaiting} role='button'>Add</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
