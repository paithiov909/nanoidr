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
#' @importFrom stringr str_detect
#' @export
nanoidr <- function(ctx = NULL)
{
    if (is.null(ctx)) {
        ctx <- V8::v8()
        ctx$eval("var __global__ = this; __global__.self = {
                 crypto: {
                    getRandomValues (Uint8Array) {
                        return console.r.call('nanoidr::getRandomValues', Uint8Array.toString());
                    }
                 }
        }")
        ctx$source(file.path(
            system.file(package = "nanoidr"),
            "js",
            "nanoidr.bundle.js"
        ))
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
            format = function(size = 10L,
                              dict = c("url",
                                       "numbers",
                                       "lowercase",
                                       "uppercase",
                                       "nolookalikes"),
                              init.locales = c("en", "ja"),
                              func_name = "randomString") {

                pre <- private$dictionary(dict)
                if (stringr::str_detect(pre[1], stringr::regex("nanoidr.dict.*"))) {
                    dict <- V8::JS(pre[1])
                } else {
                    dict <- pre[1]
                }
                size <- as.integer(size)

                self$ctx$assign("rfunc_name", func_name)
                self$ctx$assign("locales", private$locales(init.locales))
                self$ctx$eval("var func = nanoidr.methods.cformat(locales);")

                return(
                    self$ctx$call(
                        "func",
                        self$ctx$get("
                            function(size) {
                                console.r.call('do.call', { name: rfunc_name, size: size })
                            }
                        "),
                        V8::JS(dict[1]),
                        size
                    )
                )
            },
            generate = function(dict = c("url",
                                         "numbers",
                                         "lowercase",
                                         "uppercase",
                                         "nolookalikes"),
                                size = 10L,
                                init.locales = c("en", "ja")) {

                pre <- private$dictionary(dict)
                if (stringr::str_detect(pre[1], stringr::regex("nanoidr.dict.*"))) {
                    dict <- V8::JS(pre[1])
                } else {
                    dict <- pre[1]
                }
                size <- as.integer(size)

                self$ctx$assign("locales", private$locales(init.locales))
                self$ctx$eval("var func = nanoidr.methods.cgenerate(locales);")

                return(
                    self$ctx$call("func", dict, size)
                )
            },
            nonsecure = function(size = 10L,
                                 init.locales = c("en", "ja")) {

                size <- as.integer(size)

                self$ctx$assign("locales", private$locales(init.locales))
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
                purrr::map_chr(init.locales, function(x) { paste0("nanoidr.locales", ".", x)} )
            }
        )
    )


    return(NanoID$new(ctx))


}





