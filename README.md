
<!-- README.md is generated from README.Rmd. Please edit that file -->

# nanoidr <a href="https://paithiov909.github.io/nanoidr/" rel="noopener"><img src="man/figures/logo.png" align="right" height="139" /></a>

<!-- badges: start -->

[![GitHub last
commit](https://img.shields.io/github/last-commit/paithiov909/nanoidr)](#)
[![nanoidr status badge](https://paithiov909.r-universe.dev/badges/nanoidr)](https://paithiov909.r-universe.dev)
[![GitHub
license](https://img.shields.io/github/license/paithiov909/nanoidr)](https://github.com/paithiov909/nanoidr/blob/master/LICENSE)
<!-- badges: end -->

[ai/nanoid](https://github.com/ai/nanoid) is a tiny, secure,
URL-friendly, unique string ID generator for JavaScript. The nanoidr
package is an R port of NanoID.

The original NanoID library generates random strings using crypto API,
which is replaced with `openssl::rand_bytes` in nanoidr package. See
also [Generating Secure Random Numbers in
R](https://cran.r-project.org/web/packages/openssl/vignettes/secure_rng.html)
for more details about `openssl::rand_bytes`.

## Installation

``` r
remotes::install_github("paithiov909/nanoidr")
```

## Usage

``` r
## Basic usage.
nanoidr::nanoid()
#> [1] "NYDFZXD0izQRJ4EVYRQP-"
## You can use your own random number generator.
nanoidr::nanoid(29, func = function(size) {
  runif(size, 0, 255)
})
#> [1] "J-UfZP7ThuHKx5QZaIEr0vJF97G0K"
```

## Alternatives

Seeking more alternatives?

For random string generation, `stringi::stri_rand_strings` function or
the [richfitz/ids](https://github.com/richfitz/ids) package may help
you.

## License

MIT license.

Icon made by [Those Icons](https://www.flaticon.com/authors/those-icons)
from [www.flaticon.com](https://www.flaticon.com/).
