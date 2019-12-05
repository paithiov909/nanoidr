# nanoidr

[![GitHub last commit](https://img.shields.io/github/last-commit/paithiov909/nanoidr)](#) [![GitHub license](https://img.shields.io/github/license/paithiov909/nanoidr)](https://github.com/paithiov909/nanoidr/blob/master/LICENSE)

> NanoID on V8 for R

## What is {nanoidr}?

[ai/nanoid](https://github.com/ai/nanoid) is a tiny (137 bytes), secure, URL-friendly, unique string ID generator for JavaScript. The {nanoidr} package is a simple R wrapper of NanoID library running on [V8 for R](https://github.com/jeroen/V8).

## Related repositories

- [ai/nanoid](https://github.com/ai/nanoid) NanoID
- [CyberAP/nanoid-dictionary](https://github.com/CyberAP/nanoid-dictionary) Predefined character sets to use with nanoid.
- [y-gagar1n/nanoid-good](https://github.com/y-gagar1n/nanoid-good) Obscene words filter for nanoid.
- [jeroen/V8](https://github.com/jeroen/V8) Embedded JavaScript Engine for R.

## Installation

``` R
remotes::install_github("paithiov909/nanoidr")
```

## How to use

### Common use case

``` R
> library(nanoidr)
> nano <- nanoidr::nanoid()
> nano$generate() # the simplest use case
[1] "COQSwRLy0Z"
> nano$generate(size = 13L, dict = "numbers") # generate from built in pattern
[1] "7679073380816"
> nano$generate(size = 16L, dict = "You can use any strings as dictionary!!")
[1] " n yo csn !anos "
> nano$generate(size = 16L, dict = "マルチバイト文字を使っても動作します", init.locales = "ja")
[1] "てマチマトっイル文マっ使を字作バ"
> nano$nonsecure(size = 27L) # use faster but non-secure version
[1] "iJl1of5I2evR6MsHpPAdv7FhqbE"
```

### Use custom random bytes generator

``` R
> library(dqrng)
> myRndBytesFunc <- function(size) {
+   sapply(1:size, function(i){ floor(dqrng::dqrnorm(1, 3, i)) })
+ }
> nano$format(size = 38L, use_func = "myRndBytesFunc")
[1] "HfCpfcRYo8lL9w4Cmqb4ZwCRyyUKggU1Yj5ark"
```
