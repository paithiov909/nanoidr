#' Pseudo window.crypto.getRandomValues() function
#'
#' The original ai/nanoid generates random strings
#' with window.crypto.getRandomValues() on client side environment,
#' however, the V8 environment has no crypto object.
#' Because of this, this package replaces that function with
#' an original random value generator.
#'
#' @param seed string.
#' @param size integer (size of output).
#' @return list of integers.
#'
#' @seealso \url{https://developer.mozilla.org/ja/docs/Web/API/Window/crypto}
#'
#' @import dqrng
#' @import purrr
#' @importFrom stringr str_split
#' @importFrom stringi stri_rand_strings
#' @export
getRandomValues <- function(seed = NULL, size = 64L) {
    if (typeof(seed) == "character") {
        range <- length(stringr::str_split(seed, "", simplify = TRUE))
        seed <- purrr::reduce(dqrng::dqrunif(range, min = -128L, max = 128L), ~ sum(floor(.)), init = 0)
    } else {
        seed <- purrr::reduce(dqrng::dqrunif(size, min = -128L, max = 128L), ~ sum(floor(.)), init = 0)
    }
    dqrng::dqset.seed(seed)
    bytes <- purrr::map(1:size, ~ abs(floor(dqrng::dqrunif(1, min = -128L, max = 128L))))
    return(bytes)
}

#' An example of original random bytes generator for using in fomrat()
#'
#' @param size integer passed to `sample(1:64, size, replace = TRUE)`
#' @return function.
#'
#' @export
randombytes <- function(size) {
    return(sample(1:64, size, replace = TRUE))
}

