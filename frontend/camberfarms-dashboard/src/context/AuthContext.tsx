import Cookies from 'js-cookie'
import {
	createContext,
	useEffect,
	useReducer,
	useState,
	type Dispatch,
	type ReactNode,
} from 'react'
// import { setAuthToken } from '../api/axios'

export interface User {
	id: number
	profilePhoto: string
	email: string
	role: string
}

interface AuthState {
	user: User | null
	token: string | null
}

type AuthAction =
	| { type: 'LOGIN'; user: User; token: string }
	| { type: 'LOGOUT' }
	| { type: 'CHANGE_PROFILE'; url: string }

interface AuthContextType extends AuthState {
	dispatch: Dispatch<AuthAction>
	authIsReady: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

function reducer(state: AuthState, action: AuthAction): AuthState {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.user,
				token: action.token,
			}

		case 'CHANGE_PROFILE':
			return {
				user: { ...state.user!, profilePhoto: action.url },
				token: state.token,
			}

		case 'LOGOUT':
			return {
				user: null,
				token: null,
			}

		default:
			return state
	}
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, {
		user: null,
		token: null,
	})

	const [authIsReady, setAuthIsReady] = useState(false)

	useEffect(() => {
		function loadUser() {
			const token = Cookies.get('token')

			if (!token) {
				// setAuthToken(null)
				dispatch({ type: 'LOGOUT' })
				localStorage.removeItem('user')
				setAuthIsReady(true)
				return
			}
			const user = JSON.parse(localStorage.getItem('user')!)

			// setAuthToken(token)
			dispatch({
				type: 'LOGIN',
				user,
				token,
			})
			setAuthIsReady(true)
		}
		// async function loadUser() {
		// 	try {
		// 		const res = await api.get<User>('edit-profile/')
		// 	} catch (err) {
		// 		console.error(err)
		// 		localStorage.removeItem('token')
		// 		setAuthToken(null)
		// 		dispatch({ type: 'LOGOUT' })
		// 	} finally {
		// 	}

		loadUser()
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatch, authIsReady }}>
			{children}
		</AuthContext.Provider>
	)
}
