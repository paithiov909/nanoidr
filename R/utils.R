#' Pseudo crypto.getRandomValues Web API
#'
#' The original NanoID library generates random strings
#' with window.crypto.getRandomValues on client side environment,
#' however, the V8 environment provides no window.crypto object.
#' Because of this, {nanoidr} package replaces that function with
#' a simple wrapper of `openssl::rand_bytes()`.
#'
#' @param size integer (size of output).
#' @param seed only when fix.seed is true, will be used for `base::set.seed()`. Or not, will never be used.
#' @param fix.seed default is false.
#' @return list of bytes.
#'
#' @seealso \url{https://developer.mozilla.org/ja/docs/Web/API/Window/crypto}
#'
#' @import purrr
#' @importFrom stringi stri_rand_strings
#' @importFrom openssl rand_bytes
#' @export
getRandomValues <- function(size = 21L, seed = 1234L, fix.seed = FALSE) {
  if (fix.seed) {
    set.seed(seed)
  }
  buf <- openssl::rand_bytes(size)
  return(as.integer(buf))
}


#' An example of original random bytes generator for using in format()
#'
#' @param size integer passed to `sample(1:256, size, replace = TRUE)`
#' @return function.
#'
#' @export
randombytes <- function(size) {
  return(sample(1:256, size, replace = TRUE))
}
