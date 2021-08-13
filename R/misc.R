#' @noRd
#' @keywords internal
.url_alphabet <- c(
  LETTERS,
  letters,
  as.character(0:9),
  "-", "_"
)

#' @noRd
#' @keywords internal
.dict <- list(
  nolookalikes = strsplit(
    "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
    "",
    perl = TRUE,
    useBytes = TRUE
  )[[1]],
  nolookalikessafe = strsplit(
    "6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz",
    "",
    perl = TRUE,
    useBytes = TRUE
  )[[1]]
)

#' Predefined character sets
#'
#' Return a predefined character set port of the 'nanoid-dictionary'.
#' This function supports 2 patterns; "nolookalikes" or "nolookalikesSafe".
#'
#' @param pattern Choice one of `nolookalikes` or `nolookalikessafe`.
#' @return Character vectors.
#'
#' @examples
#' no_lookalikes("nolookalikes")
#' no_lookalikes("nolookalikessafe")
#' @export
no_lookalikes <- function(pattern = c(
                            "nolookalikes",
                            "nolookalikessafe"
                          )) {
  pattern <- match.arg(pattern)
  switch(pattern,
    nolookalikes = .dict[["nolookalikes"]],
    nolookalikessafe = .dict[["nolookalikessafe"]]
  )
}
