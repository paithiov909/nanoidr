library(testthat)
library(nanoidr)
library(stringr)
library(openssl)

myFunc <- function(size){
    buf <- openssl::rand_bytes(size)
    return(as.integer(buf))
}

test_check("nanoidr")
