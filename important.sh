NUM=$1
while [ NUM>0 ]
do
    git add -A
    git commit -m "Small changes to output"
    git push
    NUM=NUM-1
done