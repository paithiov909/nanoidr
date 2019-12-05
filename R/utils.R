#' Random integer generator
#'
#' @param seed
#' @param size
#' @return vector
#'
#' @import dqrng
#' @import purrr
#' @importFrom stringr str_split
#' @importFrom stringi stri_rand_strings
#' @export
getRandomValues <- function(seed = NULL, size = 128L) {
    if (typeof(seed) == "character") {
        len <- length(stringr::str_split(seed, ",", simplify = TRUE))
        seed <- purrr::reduce(floor(dqrng::dqrunif(len, min = 1, max = 9)), sum, init = 0)
    } else {
        seed <- purrr::reduce(floor(dqrng::dqrnorm(size, mean = 1, sd = 9)), sum, init = 0)
    }
    set.seed(seed)
    bytes <- stringi::stri_rand_strings(n = 1, length = size, pattern = "[0-9]")
    return(stringr::str_split(bytes, "", simplify = FALSE)[[1]])
}

#' An example of original random strings generator for fomrat()
#'
#' @param ...
#' @return function(size)
#'
#' @import purrr
#' @importFrom stringi stri_rand_strings
#' @export
randomString <- function(size, ...) {
    return(stringi::stri_rand_strings(
        n = 1,
        length = size,
        pattern = paste0("[", purrr::reduce(list("context", ...), ~ paste0(., collapse = ""), .init = paste0(letters, collapse = "")), "]")
    ))
}

