#!/bin/bash

# Documentation:
# This script syncs the web foundation from another folder.

set -e  # Exit immediately if a command exits with non-zero status

SOURCE=$1

rm -rf _includes/kankoda
rm -rf _layouts/blog.html
rm -rf _layouts/default.html
rm -rf _layouts/page.html
rm -rf _layouts/plain.html
rm -rf _layouts/post.html
rm -rf _sass/kankoda
rm -rf assets/kankoda
rm -rf js

cp -r $SOURCE/_includes/kankoda _includes
cp -r $SOURCE/_layouts/blog.html _layouts/blog.html
cp -r $SOURCE/_layouts/default.html _layouts/default.html
cp -r $SOURCE/_layouts/page.html _layouts/page.html
cp -r $SOURCE/_layouts/plain.html _layouts/plain.html
cp -r $SOURCE/_layouts/post.html _layouts/post.html
cp -r $SOURCE/_sass/kankoda _sass
cp -r $SOURCE/assets/kankoda assets
cp -r $SOURCE/js
