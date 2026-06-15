# Work gallery photos

Drop your real Instagram / studio photos in **this folder** to replace the
generated placeholder art in the Work section — the layout stays exactly the
same.

## How it works

Each tile loads an image from this folder named `01.jpg` through `12.jpg`.
If a file is missing, that tile falls back to the generated placeholder, so
you can add photos one at a time.

## Naming

| Tile | File          | Shape in the grid |
|------|---------------|-------------------|
| 1    | `01.jpg`      | tall              |
| 2    | `02.jpg`      | standard          |
| 3    | `03.jpg`      | large square      |
| 4    | `04.jpg`      | standard          |
| 5    | `05.jpg`      | standard          |
| 6    | `06.jpg`      | wide              |
| 7    | `07.jpg`      | tall              |
| 8    | `08.jpg`      | large square      |
| 9    | `09.jpg`      | standard          |
| 10   | `10.jpg`      | standard          |
| 11   | `11.jpg`      | standard          |
| 12   | `12.jpg`      | tall              |

Tips:
- Use `.jpg` files (that's what the tiles look for).
- Portrait-oriented shots look best in the tall tiles (1, 7, 12).
- Aim for ~1200px on the long edge to keep the page fast.

Once the files are committed to `main`, the site redeploys automatically and
the real photos appear in place of the placeholders.
