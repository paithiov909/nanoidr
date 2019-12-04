#' Wrapper function of stringi::stri_rand_strings()
#'
#' @param size Length of random string.
#' @return function.
#'
#' @importFrom stringi stri_rand_strings
#' @export
randstr <- function(size) {
    function(size) { stringi::stri_rand_strings(n = 1, size = size) }
}
