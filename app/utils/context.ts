import { Request } from 'express'
import { AuthenticationError } from 'apollo-server-express'

export default (): void => { }

export const context = async (data: any): Promise<any> => {
  const req: Request = data.req

  // Get the user token from the headers.
  const token: any = `${req.headers.authorization ?? ''}`.split('Bearer ')[1] ?? null

  if (token === null) throw new AuthenticationError('No token!')

  // Implement user retrieval with the token
  const user: any = {}

  if (user === null) throw new AuthenticationError('No user found!')

  // add the user to the context
  return { user }
}
