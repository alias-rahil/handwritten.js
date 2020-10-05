for file in *.jpeg ; do convert $file ${file%jpeg}"ppm" ; potrace -s ${file%jpeg}"ppm" -o ${file%jpeg}"svg" ; done
rm *ppm
for file in *.svg ; do sed -i '1,3d' $file ; done
