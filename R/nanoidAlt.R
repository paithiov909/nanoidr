#' Yet another R implementation of NanoID
#'
#' @param size expected output size.
#' @return strings output.
#'
#' @importFrom stringr str_split
#' @importFrom purrr map
#' @importFrom openssl rand_bytes
#' @export
nanoidAlt <- function(size = 21L) {
    url <- stringr::str_split('QLUint8ARdomValuesObj0h6345-79BCrypgJzHKTNYDSMkXPZ_FfG1WcqvwxEI2', "", simplify = TRUE)
    bytes <- purrr::map(as.integer(openssl::rand_bytes(size)), ~ bitwAnd(., 63))
    id <- purrr::map(bytes, function(elem){
        return(url[1, elem + 1]) # Rの配列は1オリジンなのでurl[1,0]を参照しないように1を足す
    })
    return(paste0(id, collapse = ""))
}



