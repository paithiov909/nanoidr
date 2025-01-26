#' Bitmask
#'
#' @param v Character vector.
#' @returns Numeric.
#'
#' @keywords internal
bitmask <- function(v) {
  mask <- bitFlip(length(v), 8L)
  return(ifelse(
    is.na(mask),
    bitFlip(0, 8L),
    mask
  ))
}

#' NanoID generator
#'
#' An R implementation of NanoID.
#'
#' @param step Integer.
#' @param alphabet Character vector.
#' @param func Function.
#' @returns Character vector.
#'
#' @keywords internal
nanoid_impl <- function(step, alphabet, func) {
  get_random <- ifelse(
    is.null(func),
    rand_bytes,
    func
  )
  if (!is.null(alphabet)) {
    mask <- bitmask(alphabet)
  } else {
    alphabet <- .url_alphabet
    mask <- 63L
  }
  # trick that equivalent to `Math.ceil` (i.e. `ceiling`)
  step <- bitwNot((1.6 * mask * step) / length(alphabet)) * (-1L)
  bytes <- bitAnd(as.integer(get_random(step)), mask)
  return(subset(alphabet[bytes], !is.na(alphabet[bytes])))
}

#' Generate NanoID
#'
#' @param size Integer.
#' @param alphabet Character vector.
#' @param func Function.
#' @returns String.
#'
#' @export
nanoid <- function(size = 21L, alphabet = NULL, func = NULL) {
  id <- nanoid_impl(size, alphabet, func)
  return(paste0(sample(id, size), collapse = ""))
}
