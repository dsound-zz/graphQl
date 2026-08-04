import { gql, type TypedDocumentNode } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import './App.css'

interface Item {
  id: string
  name: string
  quantity: number
}

interface GetItemsData {
  items: Item[]
}

const GET_ITEMS: TypedDocumentNode<GetItemsData> = gql`
  query GetItems {
    items {
      id
      name
      quantity
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_ITEMS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <ul>
      {data?.items.map((item) => (
        <li key={item.id}>
          {item.name} — {item.quantity}
        </li>
      ))}
    </ul>
  )
}

export default App
