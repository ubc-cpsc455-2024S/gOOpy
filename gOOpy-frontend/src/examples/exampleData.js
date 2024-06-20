const testDate = new Date();

const exampleScene = {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    name: 'Test Name',
    lastEditDate: testDate.toDateString(),
    link: '',
};
const exampleScene2 = {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    name: 'KING GREGOR LORD OF CPSC 110',
    lastEditDate:
        'just a really long string to test what happens when it goes over',
    link: '',
};

const exampleScene3 = {
    image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    name: 'A Nice Landscape',
    lastEditDate: testDate.toDateString(),
    link: '',
};

export const exampleSceneList = [
    exampleScene,
    exampleScene2,
    exampleScene3,

    exampleScene,
    exampleScene2,
    exampleScene3,

    exampleScene,
    exampleScene2,
    exampleScene3,

    exampleScene,
    exampleScene2,
    exampleScene3,
];

export const exampleUser = {
    userID: 123,
    username: 'GregorK1969',
    userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Gregor_Kiczales_AOSD.jpg/800px-Gregor_Kiczales_AOSD.jpg',
    userAbout: 'Gregor Kiczales is an American computer scientist. He is currently a professor of computer science at the University of British Columbia in Vancouver, British Columbia, Canada. He is best known for developing the concept of aspect-oriented programming, and the AspectJ extension to the Java programming language, both of which he designed while working at Xerox PARC. He is also one of the co-authors of the specification for the Common Lisp Object System, and is the author of the book The Art of the Metaobject Protocol, along with Jim Des Rivières and Daniel G. Bobrow',
    userScenes: exampleSceneList,
}