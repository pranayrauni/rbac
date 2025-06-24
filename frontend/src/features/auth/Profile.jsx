import { useSelector } from 'react-redux'

export default function Profile() {
  const user = useSelector(state => state.auth.user)

  if (!user) return <p className="p-4">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">User Profile</h2>

      <div className="space-y-1">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Enterprise:</strong> {user.enterprise || 'N/A'}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium mt-4">Roles</h3>
        <ul className="list-disc list-inside text-gray-600">
          {user.roles?.map(role => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mt-4">Permissions</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {user.permissions?.map(perm => (
            <span key={perm} className="bg-gray-200 px-2 py-1 rounded">{perm}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
