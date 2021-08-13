test_that("nanoid works", {
  res <- nanoid(100L)
  expect_equal(nchar(res), 100L)
})
