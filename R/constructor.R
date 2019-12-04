#' Ready to Use Nano ID
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
#' @import R6
#' @import V8
#' @import purrr
#' @importFrom dplyr case_when
#' @importFrom stringr str_match
#' @importFrom stringr fixed
#' @export
nanoidr <- function(ctx = NULL)
{
    if (is.null(ctx)) {
        ctx <- V8::v8(typed_arrays = TRUE)
        ctx$source(file.path(
            system.file(package = "nanoidr"),
            "js",
            "nanoid.bundle.js"
        ))
        ctx$eval("function random(func, args) {
            return curry(console.r.call)(func, ...args);
        }")
    } else {
        ctx <- ctx
    }

    NanoID <- R6::R6Class(
        "NanoID",
        public = list(
            ctx = NULL,
            initialize = function(ctx) {
                self$ctx <- ctx
            },
            format = function(func = NULL,
                              dict = c("url",
                                       "numbers",
                                       "lowercase",
                                       "uppercase",
                                       "nolookalikes"),
                              size = NULL,
                              init.locales = c("en", "ja"),
                              ...) {
                #### Assign values ####
                if (typeof(func) == "NULL") {
                    self$ctx$assign("func", "nanoidr::randstr")
                } else {
                    self$ctx$assign("func", as.character(func)) # func {String}
                    self$ctx$assign("args", ...) # args {Array}
                }
                self$ctx$assign("dict", private$dictionary(dict[1])) # dict {String}
                self$ctx$assign("size", as.numeric(size)) # size {Number}
                self$ctx$assign("locales", private$locales(init.locales)) # locales {String[]}

                #### Queue funcions ####
                return(self$ctx$get("nanoidr.methods.format(locales)(random(func, args))(dict, size);"))
            },
            generate = function(dict = c("url",
                                         "numbers",
                                         "lowercase",
                                         "uppercase",
                                         "nolookalikes"),
                                size = NULL,
                                init.locales = c("en", "ja")) {
                #### Assign values ####
                self$ctx$assign("dict", private$dictionary(dict[1])) # dict {String}
                self$ctx$assign("size", as.numeric(size)) # size {Number}
                self$ctx$assign("locales", private$locales(init.locales)) # locales {String[]}

                #### Queue funcions ####
                return(self$ctx$get("nanoidr.methods.generate(locales)(dict, size);"))
            },
            nonsecure = function(dict = c("url",
                                          "numbers",
                                          "lowercase",
                                          "uppercase",
                                          "nolookalikes"),
                                 size = NULL,
                                 init.locales = c("en", "ja")) {
                #### Assign values ####
                self$ctx$assign("dict", private$dictionary(dict[1])) # dict {String}
                self$ctx$assign("size", as.numeric(size)) # size {Number}
                self$ctx$assign("locales", private$locales(init.locales)) # locales {String[]}

                #### Queue funcions ####
                return(self$ctx$get("nanoidr.methods.nonsecure(locales)(dict, size);"))
            }
        ),
        private = list(
            dictionary = function(dict) {
                dplyr::case_when(
                    stringr::str_match(dict, stringr::fixed("url")) ~ "nanoidr.dict.url",
                    stringr::str_match(dict, stringr::fixed("numbers")) ~ "nanoidr.dict.numbers",
                    stringr::str_match(dict, stringr::fixed("lowercase")) ~ "nanoidr.dict.lowercase",
                    stringr::str_match(dict, stringr::fixed("uppercase")) ~ "nanoidr.dict.uppercase",
                    stringr::str_match(dict, stringr::fixed("nolookalikes")) ~ "nanoidr.dict.nolookalikes",
                    TRUE ~ as.character(dict)
                )
            },
            locales = function(init.locales) {
                purrr::map(init.locales, ~ paste0("nanoidr.locales", ".", .))
            }
        )
    )


    return(NanoID$new(ctx))


}





