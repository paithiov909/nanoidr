library(usethis)
library(pkgdown)
library(hexSticker)

img <- file.path(getwd(),
    "man",
    "figures",
    "thinking.svg"
)

hexSticker::sticker(
    img,
    s_x = 1,
    s_width = .5,
    s_height = .5,
    p_size = 24,
    package = "nanoidr",
    p_color = "#8DACFF",
    h_fill = "#F6F6F6",
    h_color = "#FFCFC0",
    filename = "man/figures/logo-origin.png"
)

use_logo("man/figures/logo-origin.png")
build_favicons(overwrite = TRUE)

