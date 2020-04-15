#' Get ready to use NanoID
#'
#' @param ctx Your own V8 context if any.
#'
#' @return R6 class object having methods below.
#' \itemize{
#'   \item format()
#'   \item generate()
#'   \item nonsecure()
#' }
#'
#' @seealso \url{https://github.com/ai/nanoid/blob/master/README.md}
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

  #### Class definiton ####
  NanoID <- R6::R6Class(
    "NanoID",
    public = list(
      ctx = NULL,
      initialize = function(ctx) {
        self$ctx <- ctx
      },
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

  #### Return instance ####
  return(NanoID$new(ctx))
}
