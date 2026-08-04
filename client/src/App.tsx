import { useState } from "react"
import { gql, type TypedDocumentNode } from "@apollo/client"
import { useMutation, useQuery } from "@apollo/client/react"
import './App.css'

interface Item {
  id: string
  name: string
  quantity: number
}

interface GetItemsData {
  items: Item[]
}

interface CreateItemData {
  createItem: Item
}

interface CreateItemVars {
  input: {
    name: string
    quantity: number
  }
}

interface UpdateItemData {
  updateItem: Item
}

interface UpdateItemVars {
  id: string
  input: {
    name: string
    quantity: number
  }
}

interface DeleteItemData {
  deleteItem: boolean
}

interface DeleteItemVars {
  id: string
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

const CREATE_ITEM: TypedDocumentNode<CreateItemData, CreateItemVars> = gql`
  mutation CreateItem($input: ItemInput!) {
    createItem(input: $input) {
      id
      name
      quantity
    }
  }
`

const UPDATE_ITEM: TypedDocumentNode<UpdateItemData, UpdateItemVars> = gql`
  mutation UpdateItem($id: ID!, $input: ItemInput!) {
    updateItem(id: $id, input: $input) {
      id
      name
      quantity
    }
  }
`

const DELETE_ITEM: TypedDocumentNode<DeleteItemData, DeleteItemVars> = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`

function App() {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const { loading, error, data } = useQuery(GET_ITEMS)

  const [createItem] = useMutation(CREATE_ITEM, {
    refetchQueries: [GET_ITEMS],
  })

  const [updateItem] = useMutation(UPDATE_ITEM, {
    refetchQueries: [GET_ITEMS],
  })

  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: [GET_ITEMS],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createItem({
      variables: {
        input: { name, quantity: Number(quantity) },
      },
    })
    setName("")
    setQuantity("")
  }

  const startEdit = (item: Item) => {
    setEditingId(item.id)
    setName(item.name)
    setQuantity(String(item.quantity))
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    updateItem({
      variables: {
        id: editingId,
        input: { name, quantity: Number(quantity) },
      },
    })
    setEditingId(null)
    setName("")
    setQuantity("")
  }

  const handleDelete = (id: string) => {
    deleteItem({ variables: { id } })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <ul>
        {data?.items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity}
            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <form onSubmit={editingId ? handleUpdate : handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </>
  )
}

export default App
