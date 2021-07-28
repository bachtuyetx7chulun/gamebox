// TODO: Simple to use, get type user and return them
export const getPayload = (payload: any, type: string) => {
  if (type === 'local') {
    const { email } = payload
    return {
      email,
      googleId: null,
      facebookId: null,
      type,
    }
  }

  if (type === 'google') {
    const { googleId } = payload
    return {
      email: null,
      googleId,
      facebookId: null,
      type,
    }
  }

  if (type === 'facebook') {
    return {}
  }
}

// TODO: Check refresh token from header and database ? compare and then return true or false
export const compareRefreshToken = async (prisma: any, payload, refreshToken: string) => {
  const { email, googleId, facebookId } = payload
  if (email) {
    const userField = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return userField.refreshToken === refreshToken
  }

  if (googleId) {
    const userField = await prisma.user.findFirst({
      where: {
        googleId,
      },
    })

    return userField.refreshToken === refreshToken
  }

  if (facebookId) {
    const userField = await prisma.user.findFirst({
      where: {
        facebookId,
      },
    })

    return userField.refreshToken === refreshToken
  }

  return true
}

// TODO: Convert data and then parser to jwt format
export const jwtParser = async (jwtService: any, payload, secret: string, options?: any) => {
  const token = await jwtService.signAsync(
    {
      ...payload,
    },
    {
      expiresIn: '7d',
      secret: secret,
      ...options,
    },
  )
  return token
}

export const getTokenFromBearer = (bearerToken: string) => {
  return bearerToken.split(' ')[1]
}
