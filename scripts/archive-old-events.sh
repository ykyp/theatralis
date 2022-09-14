#!/usr/bin/env bash
for file in ./events/*;
do
  now=$(date +'%Y-%m-%d')
  endDate=`grep -n "endDate" "./events/${file##*/}" | cut -d ' ' -f 2`
  if [[ "$now" > "$endDate" ]];
    then
        echo "Moving ${file##*/} to Archive..."
        mv "./events/${file##*/}" ./archive
    fi
done
