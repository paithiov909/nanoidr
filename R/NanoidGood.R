#' NanoID class
#' @description R6 class definition of NanoID-class.
#' @name NanoID-class
NanoID <- R6::R6Class(
  "NanoID",
  public = list(
    #' @field ctx V8 context.
    ctx = NULL,
    #' @description Constructor
    #' @param ctx V8 context.
    initialize = function(ctx) {
      self$ctx <- ctx
    },
    #' @description Format
    #' @details
    #' Customizable generator that you can specify your own bytes-array-creation method.
    #' You can specify any R function that recieves `size` as its argument
    #' and returns a bytes-array of wihch length is `size`.
    #' @param size length of output.
    #' @param dict choose one of c("url", "numbers", "lowercase", "uppercase", "nolookalikes") or give acceptable strings set as character.
    #' @param init.locales vocabulary sets of words. defaut sets are c("en", "ja").
    #' @param use_func function name that will be used for generating bytes array.
    #' @return strings output.
    format = function(size = 21L,
                      dict = c(
                        "url",
                        "numbers",
                        "lowercase",
                        "uppercase",
                        "nolookalikes"
                      ),
                      init.locales = c("en", "ja"),
                      use_func = "randombytes") {
      pre <- private$dictionary(dict)
      if (stringr::str_detect(pre[1], stringr::regex("nanoidr.dict.*"))) {
        dict <- V8::JS(pre[1])
      } else {
        dict <- pre[1]
      }
      self$ctx$assign("func_name", as.character(use_func))
      self$ctx$assign("locales", V8::JS(private$locales(init.locales)))
      self$ctx$eval("var func = nanoidr.methods.cformat(locales);")

      return(
        self$ctx$call(
          "func",
          V8::JS("doCall(func_name)"),
          dict,
          size
        )
      )
    },
    #' @description Generate
    #'
    #' @param size length of output.
    #' @param dict choose one of c("url", "numbers", "lowercase", "uppercase", "nolookalikes") or give acceptable strings set as character.
    #' @param init.locales vocabulary sets of obscene words. defaut sets are c("en", "ja").
    #' @return strings output.
    generate = function(size = 21L,
                        dict = c(
                          "url",
                          "numbers",
                          "lowercase",
                          "uppercase",
                          "nolookalikes"
                        ),
                        init.locales = c("en", "ja")) {
      pre <- private$dictionary(dict)
      if (stringr::str_detect(pre[1], stringr::regex("nanoidr.dict.*"))) {
        dict <- V8::JS(pre[1])
      } else {
        dict <- pre[1]
      }
      size <- as.integer(size)
      self$ctx$assign("locales", V8::JS(private$locales(init.locales)))
      self$ctx$eval("var func = nanoidr.methods.cgenerate(locales);")

      return(
        self$ctx$call("func", dict, size)
      )
    },
    #' @description Nonsecure
    #' @details
    #' Faster but non-secure version of NanoID generator (bigger collision probability).
    #'
    #' @param size length of output.
    #' @param init.locales vocabulary sets of obscene words. defaut sets are c("en", "ja").
    #' @return strings output.
    nonsecure = function(size = 21L,
                         init.locales = c("en", "ja")) {
      size <- as.integer(size)
      self$ctx$assign("locales", V8::JS(private$locales(init.locales)))
      self$ctx$eval("var func = nanoidr.methods.cnonsecure(locales);")

      return(
        self$ctx$call("func", size)
      )
    }
  ),
  private = list(
    dictionary = function(dict) {
      dplyr::case_when(
        stringr::str_detect(dict, "url") ~ "nanoidr.dict.url",
        stringr::str_detect(dict, "numbers") ~ "nanoidr.dict.numbers",
        stringr::str_detect(dict, "lowercase") ~ "nanoidr.dict.lowercase",
        stringr::str_detect(dict, "uppercase") ~ "nanoidr.dict.uppercase",
        stringr::str_detect(dict, "nolookalikes") ~ "nanoidr.dict.nolookalikes",
        TRUE ~ as.character(dict)
      )
    },
    locales = function(init.locales) {
      purrr::map_chr(init.locales, function(x) {
        paste0("nanoidr.locales", ".", x)
      })
    }
  )
)


#' Get ready to use NanoID
#'
#' Initilaize an R6 class object that has context for using NanoID
#' (y-gagar1n/nanoid-good) functions.
#'
#' The class object has methods below.
#' \itemize{
#'   \item format()
#'   \item generate()
#'   \item nonsecure()
#' }
#'
#' Especially, `format()` and `generate()` methods check every generated ID
#' through a vocabulary of obscene words specified in `dict` argument.
#' If any match is found, then ID is generated again and again
#' until it gets clean ID which is returned.
#'
#' @seealso \url{https://github.com/ai/nanoid/blob/master/README.md}
#' @seealso \url{https://github.com/y-gagar1n/nanoid-good/blob/master/README.md}
#'
#' @param ctx Your own V8 context if any.
#' @return R6 class object
#'
#' @import R6
#' @import V8
#' @import purrr
#' @importFrom dplyr case_when
#' @importFrom stringr str_detect
#' @importFrom stringr regex
#' @export
nanoid <- function(ctx = NULL) {
  if (is.null(ctx)) {
    #### New V8 context ####
    ctx <- V8::v8()
    #### Assign global objects ####
    ctx$eval(
      paste(" // Assign global object
                  var __global__ = this;")
    )
    ctx$eval(
      paste(" // Assign self.crypto
                __global__.self = {
                    crypto: {
                        getRandomValues (Uint8Array) {
                            return console.r.call(
                                'nanoidr::getRandomValues',
                                Uint8Array.length
                            );
                        }
                    }
                }
            ")
    )
    ctx$eval(
      paste(" // Wrapper of do.call(what = func_name, args = c(size = size))
                function doCall(func_name) {
                    return function(size) {
                        return console.r.call(
                            'do.call',
                            {
                                what: func_name,
                                args: { size: size }
                            }
                        );
                    }
                }
            ")
    )
    ctx$source(file.path(
      system.file(package = "nanoidr"),
      "js",
      "nanoidr.bundle.js"
    ))
  } else {
    ctx <- ctx
  }

  #### Return instance ####
  return(NanoID$new(ctx))
}
