export const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@mtech.com',
    password: 'admin123',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
  },
  {
    id: 2,
    email: 'demo@mtech.com',
    password: 'demo123',
    first_name: 'Demo',
    last_name: 'User',
    role: 'user',
  },
  {
    id: 3,
    email: 'jane@mtech.com',
    password: 'password',
    first_name: 'Jane',
    last_name: 'Doe',
    role: 'user',
  },
]

export function authenticateMockUser(email, password) {
  const match = MOCK_USERS.find(
    user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  )

  if (!match) return null

  const { password: _, ...user } = match

  return {
    token: `mock-token-${user.id}-${Date.now()}`,
    user,
  }
}

export function getMockUserList() {
  return MOCK_USERS.map(({ password: _, ...user }) => user)
}
