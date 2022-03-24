NUM=$1
while [ NUM>0 ]
do
    touch temporarytestcases.txt
    git add -A
    git commit -m "Small changes to output"
    git push
    rm -rf temporarytestcases.txt
    git add -A
    git commit -m "Small changes to output"
    git push
    NUM=NUM-1
done