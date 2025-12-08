import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newMail, setNewMail] = useState('')
  const [newGmail, setNewGmail] = useState('')
  const [newServer, setNewServer] = useState('')
  const [newAmmy, setNewAmmy] = useState('')
  const [newAny, setNewAny] = useState('')
  const [editName, setEditName] = useState('')
  const [editMail, setEditMail] = useState('')
  const [editGmail, setEditGmail] = useState('')
  const [editServer, setEditServer] = useState('')
  const [editAmmy, setEditAmmy] = useState('')
  const [editAny, setEditAny] = useState('')
  // const API_URL = import.meta.env.VITE_API_URL
  const API_URL = '/api'

  
  const [editingUser, setEditingUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadUsers = async () => {
    setLoading(true)
    const url = search
      ? `${API_URL}/users/?q=${encodeURIComponent(search)}`
      : `${API_URL}/users/`
    const res = await fetch(url)
    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }

const addUser = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify({                
        name: newName,
        mail: newMail,
        gmail: newGmail,
        server: newServer,
        ammy: newAmmy,
        any: newAny,
      })
    })

    if (response.ok) {
      setNewName('')
      setNewMail('')
      setNewGmail('')
      setNewServer('')
      setNewAmmy('')
      setNewAny('')
      loadUsers()                          
    } else {
      const error = await response.text()
      alert('Ошибка: ' + error)
    }
  } catch (err) {
    console.error(err)
    alert('Не удалось соединиться с сервером')
  }
}

const startEdit = (user) => {
  setEditingUser(user)
  setEditName(user.name)
  setEditMail(user.mail)
  setEditGmail(user.gmail)
  setEditServer(user.server)
  setEditAmmy(user.ammy)
  setEditAny(user.any)
  setShowModal(true)
}

const saveEdit = async (e) => {
  e.preventDefault()
  await fetch(`${API_URL}/users/${editingUser.id}/`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      name: editName, 
      mail: editMail, 
      gmail: editGmail,
      ammy: editAmmy,
      any: editAny, 
      server: editServer})
  })
  setShowModal(false)
  setEditingUser(null)
  loadUsers()
}

const confirmDelete = (user) => {
  setUserToDelete(user)
}

const executeDelete = async () => {
  await fetch(`${API_URL}/users/${userToDelete.id}/`, {method: 'DELETE'})
  setUserToDelete(null)
  loadUsers()
}

  useEffect(() => {
    loadUsers()
  }, [search])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-indigo-800">
          UserHub
        </h1>

        <form onSubmit={addUser} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              required
              placeholder="Имя пользователя"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
            <input
              // required
              // type="email"
              placeholder="Mail почта"
              value={newMail}
              onChange={e => setNewMail(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
            <input
              
              placeholder="Gmail почта"
              value={newGmail}
              onChange={e => setNewGmail(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
            <input
              
              placeholder="Server"
              value={newServer}
              onChange={e => setNewServer(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
            <input
              
              placeholder="Ammy"
              value={newAmmy}
              onChange={e => setNewAmmy(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
            <input
              
              placeholder="Any"
              value={newAny}
              onChange={e => setNewAny(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
            />
          </div>
          <button type="submit" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition">
            Добавить пользователя
          </button>
        </form>

        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-8 py-5 text-xl rounded-2xl border-2 border-gray-300 focus:border-indigo-600 focus:outline-none mb-8 bg-white"
        />

        {loading ? (
          <div className="text-center text-2xl">Загрузка...</div>
        ) : (
          <div className="grid gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-indigo-700">{user.name}</h3>
                <p className="text-gray-600 text-lg mt-2">{user.mail}</p>
                <p className="text-gray-600 text-lg mt-2">{user.gmail}</p>
                <p className="text-gray-600 text-lg mt-2">{user.server}</p>
                <p className="text-gray-600 text-lg mt-2">{user.ammy}</p>
                <p className="text-gray-600 text-lg mt-2">{user.any}</p>

                <div className= "flex gap-3 mt-6">
                  <button onClick={() => startEdit(user)}
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded py-3 rounded-lg font-medium'> 
                    Редактировать
                  </button>
                  <button onClick={() => confirmDelete(user)}
                    className='flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium'>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}


    {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-6">Редактировать пользователя</h2>
            <form onSubmit={saveEdit}>
              <input required placeholder="Имя" value={editName} onChange={e => setEditName(e.target.value)}
                     className="w-full px-6 py-4 border-2 rounded-xl mb-4 text-lg" />
              <input placeholder="Mail" value={editMail} onChange={e => setEditMail(e.target.value)}
                     className="w-full px-6 py-4 border-2 rounded-xl mb-4 text-lg" />
              <input placeholder="Gmail" value={editGmail} onChange={e => setEditGmail(e.target.value)}
                     className="w-full px-6 py-4 border-2 rounded-xl mb-4 text-lg" />
              <input placeholder="Server" value={editServer} onChange={e => setEditServer(e.target.value)}
                     className="w-full px-6 py-4 border-2 rounded-xl mb-6 text-lg" />
              <input placeholder="Ammy" value={editAmmy} onChange={e => setEditAmmy(e.target.value)}
                     className="w-full px-6 py-4 border-2 rounded-xl mb-6 text-lg" />
              <input placeholder="Any" value={editAny} onChange={e => setEditAny(e.target.value)}
                     className="w-full px-6 py-4 border-2 rounded-xl mb-6 text-lg" />
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold">
                  Сохранить
                </button>
                <button type="button" onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-xl font-bold">
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
  )}
  {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold mb-4">Удалить пользователя?</h3>
            <p className="text-lg mb-8">{userToDelete.name}<br/>{userToDelete.email}</p>
            <div className="flex gap-4">
              <button onClick={executeDelete}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold">
                Да, удалить
              </button>
              <button onClick={() => setUserToDelete(null)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-xl font-bold">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default App