const getChapterOptions = (chapterNums: number): Array<Object>=> {
    const chaptersList: Array<Object> = [];
    for (let num = 1; num <= chapterNums; num++) {
        let chapter = {
            id: num,
            text: `Chapter ${num}`,
            value: `Chapter ${num}`
        };
        chaptersList.push(chapter);
    }
    return chaptersList;
};

export default getChapterOptions;