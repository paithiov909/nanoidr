url <- stringr::str_split('QLUint8ARdomValuesObj0h6345-79BCrypgJzHKTNYDSMkXPZ_FfG1WcqvwxEI2', "", simplify = TRUE)
nanoid <- function(size = 21L) {
    bytes <- purrr::map(as.integer(openssl::rand_bytes(size)), ~ bitwAnd(., 63))
    id <- purrr::map(bytes, function(elem){
        return(url[1, elem + 1]) # Rの配列は1オリジンなのでurl[[0]]を参照しないように1を足す
    })
    return(paste0(id, collapse = ""))
}


