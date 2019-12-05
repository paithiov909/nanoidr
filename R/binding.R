#' NanoID class object
#'
#' R6 class object that have context for using NanoID
#' (y-gagar1n/nanoid-good) functions.
#'
#' The class object has methods below.
#' \itemize{
#'   \item format()
#'   \item generate()
#'   \item nosecure()
#' }
#'
#' format() and generate() methods check every generated ID through a vocabulary of obscene words specified in `dict` argument.
#' If any match is found, then ID is generated again and again until it gets clean ID which is returned.
#'
#' @seealso \url{https://github.com/y-gagar1n/nanoid-good/blob/master/README.md}
#'
#' @name NanoID
NULL


#' Format
#'
#' Customizable generator that you can specify your own strings-creation method.
#' You can specify any R function that recieves `size` as its argument
#' and returns an bytes array of wihch length is `size`.
#'
#' @param size length of output.
#' @param dict choose one of c("url", "numbers", "lowercase", "uppercase", "nolookalikes") or give acceptable strings set as character.
#' @param init.locales vocabulary sets of words. defaut sets are c("en", "ja").
#' @param use_func function name that will be used for generating bytes set.
#' @return Random strings output.
#'
#' @name NanoID$format()
NULL


#' Generate
#'
#' @param size length of output.
#' @param dict choose one of c("url", "numbers", "lowercase", "uppercase", "nolookalikes") or give acceptable strings set as character.
#' @param init.locales vocabulary sets of obscene words. defaut sets are c("en", "ja").
#' @return strings output.
#'
#' @name NanoID$generate()
NULL


#' Nonsecure
#'
#' Faster, but non-secure version of NanoID generator (bigger collision probability).
#'
#' @param size length of output.
#' @param init.locales vocabulary sets of obscene words. defaut sets are c("en", "ja").
#' @return strings output.
#'
#' @name NanoID$nonsecure()
NULL



