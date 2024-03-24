#!/bin/bash

# Original script from https://gitlab.com/tilluteenused/docker_elg_syllabifier/-/blob/2022_08_24/morfi_ja_silbita.sh
#
# Prerequisites:
# - vmeta and et.dct for marking boundaries in compound words (precompiled; run scripts/compile-vmeta.sh to recompile)
# - silbitaja.hfst_oluw for marking syllable boundaries (precompiled; run scripts/compile-silbitaja.sh to recompile)
#
#
# Standard input:
# - UTF-8 encoded string
#
# Standard output:
# - Each word on a separate line, syllable boundaries marked with "-"

sed 's/[^[:alnum:]\n \-\–]//g' |                                      # Only preserve alphanumeric characters, newline characters, spaces, hyphens and en dashes
sed 's/\([^[:alnum:]]\)[-–]\([^[:alnum:]]\)/\1\2/g' |                 # Only preserve hyphens and en dashes that are surrounded by alphanumeric characters on both sides (e.g. in names)
tr -s ' ' '\n' |                                                      # Replace all spaces with newline characters and squeeze consecutive newline characters into a single one
grep '^[a-zA-Z0-9ŠšŽžÕõÄäÖöÜü\-\–]*$' |                               # Search for lines that contain only the aforementioned symbols
./vmeta -t -q --dontguesspropnames -s --fs --dontaddphonetics -p ./ | # Run vmeta to mark boundaries in compound words (see Vabamorf's documentation for flags' explanations)
sed 's/.*/\L&/' |                                                     # Convert all uppercase characters to lowercase
sed '/####/s/    ####//' |                                            # Look for lines containing "####" and replace the first instance of "    ####" with nothing
sed '/    /s/^[^ ]*    / /' |                                         # Look for lines containing "    " and replace the first instance of non-space characters followed by "    " with " "
sed 's/ \/\/_[^\/]*\/\///g' |                                         # Replace all instances of "//_...//" with nothing
sed 's/+0*//g' |                                                      # Replace all instances of "+0" (or however many 0's) with nothing
sed 's/\([aeiouõäöü]\)\(=\|<|\?\)\(is[tm]\)/\1.\3/g' |                # Replace all instances of "=" or "<" or "?" with "." when they're between a vowel and the string "ist" or "ism"
sed 's/=//g' |                                                        # Replace all instances of "=" with nothing
sed 's/$/ /' |                                                        # Add " " to the end of every line
sed 's/ \([^ ]*\) .* \1 / \1 /' |                                     # Replace "space + original string + space + combination of strings and spaces + space + last occurrence of original string + space" with "space + original string + space"
sed '/ ise_enes/s/ iseenes[^ ]* //' |                                 # Look for lines containing " ise_enes" and replace " iseenes" followed by any sequence of characters that are not spaces with nothing
tr -s ' ' |                                                           # Squeeze consecutive spaces into a single one
sed 's/^ *//' |                                                       # Replace leading spaces with nothing
sed 's/ *$//' |                                                       # Replace trailing spaces with nothing
sed 's/^\([^ ]*\)_\([^ _]*\) \1\2$/\1\2/' |                           # Replace lines like "string1_string2 string1string2" with "string1string2"
sed 's/^\([^ ]*\)\([^ _]*\) \1_\2$/\1\2/' |                           # Replace lines like "string1string2 string1_string2" with "string1string2"
sed 's/^\([^ ]*\)se_\([^ ]*\) \1s_e\2$/\1s_e\2/' |                    # Replace lines like "abcse_string abcs_estring" with "abcs_estring"
sed 's/^\([^ ]*\)s_e\([^ ]*\) \1se_\2$/\1s_e\2/' |                    # Replace lines like "abcs_estring abcse_string" with "abcs_estring"
sed 's/^\([^ ]*\)\([aeiu]\)_\([^ ]*\) \1_\2\3$/\1\2_\3/' |            # Replace lines like "abc[a|e|i|u]_string abc_[a|e|i|u]string" with "abc[a|e|i|u]_string"
sed 's/^\([^ ]*\)_\([aeiu]\)\([^ ]*\) \1\2_\3$/\1\2_\3/' |            # Replace lines like "abc_[a|e|i|u]string abc[a|e|i|u]_string" with "abc[a|e|i|u]_string"
sed 's/^\([^ ]*\)_sal\([^ ]*\) \1s_alu\2$/\1_sal\2/' |                # Replace lines like "string1_salstring2 string1s_alustring2" with "string1_salstring2"
sed 's/^\([^ ]*\)s_alu\([^ ]*\) \1salu_\2$/\1_sal\2/' |               # Replace lines like "string1s_alustring2 string1salu_string2" with "string1_salstring2"
sed 's/ .*$//' |                                                      # Replace everything after the first space (included) with nothing
hfst-lookup -q silbitaja.hfst_oluw |                                  # Run silbitaja.hfst_oluw to mark syllable boundaries (see HFST's documentation for flag's explanation)
cut -f 2 |                                                            # Only preserve values in the second column
sed 's/s\.tr/st\.r/g' |                                               # Replace all instances of "s.tr" with "st.r"
sed 's/[_.]/-/g' |                                                    # Replace all instances of "_" and "." with "-"
tr -s '\n'                                                            # Squeeze consecutive newline characters into a single one
