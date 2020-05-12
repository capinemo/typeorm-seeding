import * as ora from 'ora'

/**
 * Terminates the program in an emergency
 */
export const panic = (spinner: ora.Ora, error: Error, message: string) => {
  spinner.fail(message)
  console.error(error)
  process.exit(1)
}
