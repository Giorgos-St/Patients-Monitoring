import { useState } from 'react'
import { login } from '../../api/public/auth'
import { setAuthHeader } from '../../api'
import { useUser } from '../../context/userContext'

const LoginPage = () => {
  const { setUser } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    setError('')
    setIsSubmitting(true)

    try {
      const data = await login({ username, password })

      const user = {
        user_id: data.user_id,
        username: data.username,
        email: data.email,
        role: data.role,
      }

      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('user', JSON.stringify(user))
      setAuthHeader(data.access_token)
      setUser(user)
    } catch {
      setError('Login failed. Please check your username and password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pageContentFull">
      <div style={{ maxWidth: 400, margin: '4rem auto', padding: '0 1rem' }}>
        <div style={{ color: 'var(--text-h)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.5rem' }}>Login</div>

        <div>
          <div style={{ display: 'block', marginBottom: '1rem' }}>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              required
              autoComplete="username"
              style={{
                display: 'block',
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.5rem 0.75rem',
                border: '1px solid var(--border)',
                borderRadius: 6,
                background: 'var(--bg)',
                color: 'var(--text-h)',
              }}
            />
          </div>

          <div style={{ display: 'block', marginBottom: '1rem' }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              required
              autoComplete="current-password"
              style={{
                display: 'block',
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.5rem 0.75rem',
                border: '1px solid var(--border)',
                borderRadius: 6,
                background: 'var(--bg)',
                color: 'var(--text-h)',
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#e53e3e', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.6rem 1rem',
              border: 'none',
              borderRadius: 6,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
