#' NanoID for R
#' @description
#'  An R port of NanoID that is a tiny, secure,
#'  URL-friendly, unique string ID generator for JavaScript.
#'
#'  The original NanoID library generates random strings using crypto API,
#'  which is replaced with openssl::rand_bytes in nanoidr package.
#' @docType package
#' @import bitops
#' @importFrom openssl rand_bytes
#' @name nanoidr
#' @keywords internal
"_PACKAGE"
