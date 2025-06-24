import { useSelector } from 'react-redux'

export default function Dashboard() {
  const user = useSelector(state => state.auth.user)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user ? (
        <pre className="bg-gray-100 p-4 mt-4 rounded-md text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      ) : (
        <p className="text-red-500 mt-4">User not loaded</p>
      )}
    </div>
  )
}
