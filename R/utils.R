#' Pseudo crypto.getRandomValues Web API
#'
#' The original NanoID library generates random strings
#' with window.crypto.getRandomValues on client side environment,
#' however, the V8 environment provides no crypto object.
#' Because of this, {nanoidr} package replaces that function with
#' a simple wrapper of openssl::rand_bytes().
#'
#' @param size integer (size of output).
#' @param seed only when fix.seed is true, will be used for set.seed(). Or not, will be used just for dqrng::dqset.seed().
#' @param fix.seed default is false.
#' @return list of bytes.
#'
#' @seealso \url{https://developer.mozilla.org/ja/docs/Web/API/Window/crypto}
#'
#' @import dqrng
#' @import purrr
#' @importFrom stringi stri_rand_strings
#' @importFrom openssl rand_bytes
#' @export
getRandomValues <- function(size = 21L, seed = 1234L, fix.seed = FALSE) {
    if (fix.seed) {
        set.seed(seed)
    } else {
        dqrng::dqset.seed(seed)
        rnd <- purrr::reduce(dqrng::dqrunif(size, min = -128L, max = 128L), ~ sum(floor(.)), init = 0)
        set.seed(rnd)
    }
    buf <- openssl::rand_bytes(size)
    return(as.integer(buf))
}


#' An example of original random bytes generator for using in fomrat()
#'
#' @param size integer passed to `sample(1:256, size, replace = TRUE)`
#' @return function.
#'
#' @export
randombytes <- function(size) {
    return(sample(1:256, size, replace = TRUE))
}




