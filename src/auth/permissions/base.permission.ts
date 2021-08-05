import { getTokenFromBearer, jwtDecode } from '@utils/jwt.util'
import { or, rule, shield } from 'graphql-shield'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const headers = ctx['req']['headers']
  const { access_token } = headers
  const token = getTokenFromBearer(access_token)
  const payload = jwtDecode(token)
  if (payload) {
    return true
  }
  return false
})

const isRole = (role: string) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rule()(async (parent, args, ctx, info) => {
    const headers = ctx['req']['headers']
    const { access_token } = headers
    const token = getTokenFromBearer(access_token)
    const payload = jwtDecode(token)

    if (payload && payload['role'] === role) {
      return true
    }
    return false
  })

export const permissions = shield({
  Query: {
    users: isRole('admin'),
    user: isRole('admin'),
    profile: or(isRole('user'), isRole('admin')),
    roles: isRole('admin'),
    role: isRole('admin'),
    games: isRole('admin'),
    game: isRole('admin'),
    gameusers: isRole('admin'),
    gameuser: isRole('admin'),
    gamerooms: isRole('admin'),
    gameroom: isRole('admin'),
    types: isRole('admin'),
    type: isRole('admin'),
  },
  Mutation: {
    updateUser: or(isRole('user'), isRole('admin')),
    removeUsers: isRole('admin'),
    removeUserById: isRole('admin'),
    createRole: isRole('admin'),
    updateGameroom: or(isRole('admin'), isRole('user')),
    removeRoleById: isRole('admin'),
    removeRoles: isRole('admin'),
    createGame: isRole('admin'),
    removeGameById: isRole('admin'),
    removeGames: isRole('admin'),
    removeGameuserById: isRole('admin'),
    removeGameusers: isRole('admin'),
    createGameroom: or(isRole('user'), isRole('admin')),
    removeGameroomById: or(isRole('user'), isRole('admin')),
    removeGamerooms: or(isRole('user'), isRole('admin')),
    createType: isRole('admin'),
    updateType: isRole('admin'),
    deleteType: isRole('admin'),
    activeType: isRole('admin'),
  },
})
