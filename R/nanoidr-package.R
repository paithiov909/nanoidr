#' NanoID for R
#' @description
#' An R port of NanoID that is a tiny, secure,
#' URL-friendly, unique string ID generator for JavaScript.
#'
#' The original NanoID library generates random strings using crypto API,
#' which is replaced with openssl::rand_bytes in nanoidr package.
#' @import bitops
#' @importFrom openssl rand_bytes
#' @keywords internal
"_PACKAGE"
