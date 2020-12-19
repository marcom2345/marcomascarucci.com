while read in; do
  newname=$(echo "$in" | sed 's/jpg/bak/')
  mv "$in" "$newname"
  convert "$newname" -quality 80 "$in"
done

