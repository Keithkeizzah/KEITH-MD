class CarbonError extends Error {
  constructor(error) {
    super()
    this.name = "CarbonError";
    this.message = error;
  }
}
module.exports = { CarbonError };