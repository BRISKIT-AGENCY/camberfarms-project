/**
 * Checks that required fields exist in the request body
 * @param {Object} body - req.body
 * @returns {Boolean} true if valid, false if missing required fields
 */
export function validatePostBody(body) {
  // List of required fields
  const requiredFields = ['title', 'excerpt', 'slug']

  // Check each required field exists and is not empty
  for (const field of requiredFields) {
    if (!body[field]) {
      return false
    }
  }

  return true
}
