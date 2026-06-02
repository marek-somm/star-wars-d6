# Kodex extraction report

- Source: `Kodex.pdf`
- PDF pages: 512
- PDF outline entries: 727
- Extracted layout blocks: 11113
- JSON objects: 721
- Search chunks: 8604
- Anchor matches by title: 721
- Anchor fallbacks: 6

## Object type counts

- rule: 435
- force_power: 80
- alien_species: 49
- character_template: 36
- creature: 32
- chapter: 22
- droid: 17
- equipment: 16
- vehicle: 14
- planet: 11
- section: 5
- starship: 4

## Content block type counts

- paragraph: 7124
- heading: 1412
- table_or_stat_block: 808
- stat_block: 773
- list: 766
- example: 199
- numbered_entry: 42
- note: 1

## Important caveats

- This is an automated extraction from a layout PDF, not a manually curated canonical rules database.
- Multi-column pages, sidebars, tables, and stat blocks can contain reading-order errors.
- The extraction preserves `source.page`, `source.block`, and `bbox` for review and correction.
- Parsed `fields` are available for stat-like blocks, but nested weapon lists and complex tables may still need manual normalization.
- Recommended next step: validate one or two chapters manually, then add domain-specific parsers for Force powers, equipment, vehicles, starships, aliens, creatures, and templates.