describe("Output Verification", {

    nano <- nanoidr::nanoid()

    describe("Check NanoID$generate()", {
        it("no arguments", {
            res <- nano$generate()
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            expect_type(res, "character")
            expect_equivalent(len, 21L)
        })
        it("size=32L, dict=\"numbers\"", {
            res <- nano$generate(size = 32L, dict = "numbers")
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            validation <- stringr::str_detect(res, "[:alpha:]", negate = TRUE)
            expect_type(res, "character")
            expect_equivalent(len, 32L)
            expect_equal(validation, TRUE)
        })
        it("size=32L, dict=\"uppercase\"", {
            res <- nano$generate(size = 32L, dict = "uppercase")
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            validation <- stringr::str_detect(res, "[:lowercase:]", negate = TRUE)
            expect_type(res, "character")
            expect_equivalent(len, 32L)
            expect_equal(validation, TRUE)
        })
    })

    describe("Check NanoID$nonsecure()", {
        it("no arguments", {
            res <- nano$nonsecure()
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            expect_type(res, "character")
            expect_equivalent(len, 21L)
        })
        it("size=32L", {
            res <- nano$nonsecure(size = 32L)
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            expect_type(res, "character")
            expect_equivalent(len, 32L)
        })
    })

    describe("Check NanoID$format()", {
        it("no arguments", {
            res <- nano$format()
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            expect_type(res, "character")
            expect_equivalent(len, 21L)
        })
        it("size=32L, dict=\"numbers\", use_func=\"myFunc\"", {
            res <- nano$format(size = 32L, dict = "numbers", use_func = "myFunc")
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            validation <- stringr::str_detect(res, "[:alpha:]", negate = TRUE)
            expect_type(res, "character")
            expect_equivalent(len, 32L)
            expect_equal(validation, TRUE)
        })
        it("size=32L, dict=\"uppercase\", use_func=\"myFunc\"", {
            res <- nano$format(size = 32L, dict = "uppercase", use_func = "myFunc")
            len <- length(stringr::str_split(res, "", simplify = TRUE))
            validation <- stringr::str_detect(res, "[:lowercase:]", negate = TRUE)
            expect_type(res, "character")
            expect_equivalent(len, 32L)
            expect_equal(validation, TRUE)
        })
    })

})
