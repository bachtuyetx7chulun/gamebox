export const getPayload = (payload: any, type: string) => {
  if (type === 'local') {
    const { email, name, picture, bio, active } = payload
    return {
      email,
      name,
      picture,
      bio,
      active,
      googleId: null,
      facebookId: null,
      type,
    }
  }

  if (type === 'google') {
    const { name, picture, bio, active, googleId } = payload
    return {
      email: null,
      name,
      picture,
      bio,
      active,
      googleId,
      facebookId: null,
      type,
    }
  }

  if (type === 'facebook') {
    return {}
  }
}

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
