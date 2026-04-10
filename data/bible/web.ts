export type Verse = {
  number: number;
  text: string;
};

export type Section = {
  title?: string;
  verses: Verse[];
};

export type ChapterData = {
  translation: string;
  book: string;
  bookDisplay: string;
  chapter: number;
  sections: Section[];
};

export type BookMeta = {
  id: string;
  display: string;
  chapters: number;
};

export const BOOKS: BookMeta[] = [
  { id: "genesis", display: "Genesis", chapters: 50 },
  { id: "psalm", display: "Psalms", chapters: 150 },
  { id: "john", display: "John", chapters: 21 },
];

const JOHN_1: ChapterData = {
  translation: "web",
  book: "john",
  bookDisplay: "John",
  chapter: 1,
  sections: [
    {
      title: "The Word Became Flesh",
      verses: [
        { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
        { number: 2, text: "The same was in the beginning with God." },
        { number: 3, text: "All things were made through him. Without him was not anything made that has been made." },
        { number: 4, text: "In him was life, and the life was the light of men." },
        { number: 5, text: "The light shines in the darkness, and the darkness hasn't overcome it." },
        { number: 6, text: "There came a man, sent from God, whose name was John." },
        { number: 7, text: "The same came as a witness, that he might testify about the light, that all might believe through him." },
        { number: 8, text: "He was not the light, but was sent that he might testify about the light." },
        { number: 9, text: "The true light that enlightens everyone was coming into the world." },
        { number: 10, text: "He was in the world, and the world was made through him, and the world didn't recognize him." },
        { number: 11, text: "He came to his own, and those who were his own didn't receive him." },
        { number: 12, text: "But as many as received him, to them he gave the right to become God's children, to those who believe in his name:" },
        { number: 13, text: "who were born not of blood, nor of the will of the flesh, nor of the will of man, but of God." },
        { number: 14, text: "The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth." },
        { number: 15, text: "John testified about him. He cried out, saying, \"This was he of whom I said, 'He who comes after me has surpassed me, for he was before me.'\"" },
        { number: 16, text: "From his fullness we all received grace upon grace." },
        { number: 17, text: "For the law was given through Moses. Grace and truth were realized through Jesus Christ." },
        { number: 18, text: "No one has seen God at any time. The one and only Son, who is in the bosom of the Father, he has declared him." },
      ],
    },
    {
      title: "The Testimony of John the Baptist",
      verses: [
        { number: 19, text: "This is John's testimony, when the Jews sent priests and Levites from Jerusalem to ask him, \"Who are you?\"" },
        { number: 20, text: "He declared, and didn't deny, but he declared, \"I am not the Christ.\"" },
        { number: 21, text: "They asked him, \"What then? Are you Elijah?\" He said, \"I am not.\" \"Are you the prophet?\" He answered, \"No.\"" },
        { number: 22, text: "They said therefore to him, \"Who are you? Give us an answer to take back to those who sent us. What do you say about yourself?\"" },
        { number: 23, text: "He said, \"I am the voice of one crying in the wilderness, 'Make straight the way of the Lord,' as Isaiah the prophet said.\"" },
        { number: 24, text: "The ones who had been sent were from the Pharisees." },
        { number: 25, text: "They asked him, \"Why then do you baptize if you are not the Christ, nor Elijah, nor the prophet?\"" },
        { number: 26, text: "John answered them, \"I baptize in water, but among you stands one whom you don't know." },
        { number: 27, text: "He is the one who comes after me, who is preferred before me, whose sandal strap I'm not worthy to loosen.\"" },
        { number: 28, text: "These things were done in Bethany beyond the Jordan, where John was baptizing." },
      ],
    },
    {
      title: "The Lamb of God",
      verses: [
        { number: 29, text: "The next day, he saw Jesus coming to him, and said, \"Behold, the Lamb of God, who takes away the sin of the world!" },
        { number: 30, text: "This is he of whom I said, 'After me comes a man who is preferred before me, for he was before me.'\"" },
        { number: 31, text: "I didn't know him, but for this reason I came baptizing in water: that he would be revealed to Israel." },
        { number: 32, text: "John testified, saying, \"I have seen the Spirit descending like a dove out of heaven, and it remained on him." },
        { number: 33, text: "I didn't recognize him, but he who sent me to baptize in water said to me, 'On whomever you will see the Spirit descending and remaining on him is he who baptizes in the Holy Spirit.'\"" },
        { number: 34, text: "I have seen, and have testified that this is the Son of God." },
      ],
    },
    {
      title: "Jesus Calls His First Disciples",
      verses: [
        { number: 35, text: "Again, the next day, John was standing with two of his disciples," },
        { number: 36, text: "and he looked at Jesus as he walked, and said, \"Behold, the Lamb of God!\"" },
        { number: 37, text: "The two disciples heard him speak, and they followed Jesus." },
        { number: 38, text: "Jesus turned and saw them following, and said to them, \"What are you looking for?\" They said to him, \"Rabbi\" (which is to say, being interpreted, Teacher), \"where are you staying?\"" },
        { number: 39, text: "He said to them, \"Come and see.\" They came and saw where he was staying, and they stayed with him that day. It was about the tenth hour." },
        { number: 40, text: "One of the two who heard John and followed him was Andrew, Simon Peter's brother." },
        { number: 41, text: "He first found his own brother, Simon, and said to him, \"We have found the Messiah!\" (which is, being interpreted, Christ)." },
        { number: 42, text: "He brought him to Jesus. Jesus looked at him and said, \"You are Simon the son of Jonah. You shall be called Cephas\" (which is by interpretation, Peter)." },
        { number: 43, text: "On the next day, he was determined to go out into Galilee, and he found Philip. Jesus said to him, \"Follow me.\"" },
        { number: 44, text: "Now Philip was from Bethsaida, of the city of Andrew and Peter." },
        { number: 45, text: "Philip found Nathanael, and said to him, \"We have found him of whom Moses in the law and also the prophets wrote: Jesus of Nazareth, the son of Joseph.\"" },
        { number: 46, text: "Nathanael said to him, \"Can any good thing come out of Nazareth?\" Philip said to him, \"Come and see.\"" },
        { number: 47, text: "Jesus saw Nathanael coming to him, and said about him, \"Behold, an Israelite indeed, in whom is no deceit!\"" },
        { number: 48, text: "Nathanael said to him, \"How do you know me?\" Jesus answered him, \"Before Philip called you, when you were under the fig tree, I saw you.\"" },
        { number: 49, text: "Nathanael answered him, \"Rabbi, you are the Son of God! You are King of Israel!\"" },
        { number: 50, text: "Jesus answered him, \"Because I told you, 'I saw you underneath the fig tree,' do you believe? You will see greater things than these!\"" },
        { number: 51, text: "He said to him, \"Most certainly, I tell you all, hereafter you will see heaven opened, and the angels of God ascending and descending on the Son of Man.\"" },
      ],
    },
  ],
};

const GENESIS_1: ChapterData = {
  translation: "web",
  book: "genesis",
  bookDisplay: "Genesis",
  chapter: 1,
  sections: [
    {
      title: "The Creation",
      verses: [
        { number: 1, text: "In the beginning, God created the heavens and the earth." },
        { number: 2, text: "The earth was formless and empty. Darkness was on the surface of the deep and God's Spirit was hovering over the surface of the waters." },
        { number: 3, text: "God said, \"Let there be light,\" and there was light." },
        { number: 4, text: "God saw the light, and saw that it was good. God divided the light from the darkness." },
        { number: 5, text: "God called the light \"day\", and the darkness he called \"night\". There was evening and there was morning, the first day." },
        { number: 6, text: "God said, \"Let there be an expanse in the middle of the waters, and let it divide the waters from the waters.\"" },
        { number: 7, text: "God made the expanse, and divided the waters which were under the expanse from the waters which were above the expanse; and it was so." },
        { number: 8, text: "God called the expanse \"sky\". There was evening and there was morning, the second day." },
        { number: 9, text: "God said, \"Let the waters under the sky be gathered together to one place, and let the dry land appear;\" and it was so." },
        { number: 10, text: "God called the dry land \"earth\", and the gathering together of the waters he called \"seas\". God saw that it was good." },
        { number: 11, text: "God said, \"Let the earth yield grass, herbs yielding seeds, and fruit trees bearing fruit after their kind, with their seeds in it, on the earth;\" and it was so." },
        { number: 12, text: "The earth yielded grass, herbs yielding seed after their kind, and trees bearing fruit, with their seeds in it, after their kind; and God saw that it was good." },
        { number: 13, text: "There was evening and there was morning, the third day." },
        { number: 14, text: "God said, \"Let there be lights in the expanse of the sky to divide the day from the night; and let them be for signs to mark seasons, days, and years;" },
        { number: 15, text: "and let them be for lights in the expanse of the sky to give light on the earth;\" and it was so." },
        { number: 16, text: "God made the two great lights: the greater light to rule the day, and the lesser light to rule the night. He also made the stars." },
        { number: 17, text: "God set them in the expanse of the sky to give light to the earth," },
        { number: 18, text: "and to rule over the day and over the night, and to divide the light from the darkness. God saw that it was good." },
        { number: 19, text: "There was evening and there was morning, the fourth day." },
        { number: 20, text: "God said, \"Let the waters abound with living creatures, and let birds fly above the earth in the open expanse of the sky.\"" },
        { number: 21, text: "God created the large sea creatures and every living creature that moves, with which the waters swarmed, after their kind, and every winged bird after its kind. God saw that it was good." },
        { number: 22, text: "God blessed them, saying, \"Be fruitful, and multiply, and fill the waters in the seas, and let birds multiply on the earth.\"" },
        { number: 23, text: "There was evening and there was morning, the fifth day." },
        { number: 24, text: "God said, \"Let the earth produce living creatures after their kind, livestock, creeping things, and animals of the earth after their kind;\" and it was so." },
        { number: 25, text: "God made the animals of the earth after their kind, and the livestock after their kind, and everything that creeps on the ground after its kind. God saw that it was good." },
        { number: 26, text: "God said, \"Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the birds of the sky, and over the livestock, and over all the earth, and over every creeping thing that creeps on the earth.\"" },
        { number: 27, text: "God created man in his own image. In God's image he created him; male and female he created them." },
        { number: 28, text: "God blessed them. God said to them, \"Be fruitful, multiply, fill the earth, and subdue it. Have dominion over the fish of the sea, over the birds of the sky, and over every living thing that moves on the earth.\"" },
        { number: 29, text: "God said, \"Behold, I have given you every herb yielding seed, which is on the surface of all the earth, and every tree, which bears fruit yielding seed. It will be your food." },
        { number: 30, text: "To every animal of the earth, and to every bird of the sky, and to everything that creeps on the earth, in which there is life, I have given every green herb for food;\" and it was so." },
        { number: 31, text: "God saw everything that he had made, and, behold, it was very good. There was evening and there was morning, the sixth day." },
      ],
    },
  ],
};

const PSALM_1: ChapterData = {
  translation: "web",
  book: "psalm",
  bookDisplay: "Psalms",
  chapter: 1,
  sections: [
    {
      title: "The Way of the Righteous and the Wicked",
      verses: [
        { number: 1, text: "Blessed is the man who doesn't walk in the counsel of the wicked, nor stand on the path of sinners, nor sit in the seat of scoffers;" },
        { number: 2, text: "but his delight is in the LORD's law. On his law he meditates day and night." },
        { number: 3, text: "He will be like a tree planted by the streams of water, that produces its fruit in its season, whose leaf also does not wither. Whatever he does shall prosper." },
        { number: 4, text: "The wicked are not so, but are like the chaff which the wind drives away." },
        { number: 5, text: "Therefore the wicked shall not stand in the judgment, nor sinners in the congregation of the righteous." },
        { number: 6, text: "For the LORD knows the way of the righteous, but the way of the wicked shall perish." },
      ],
    },
  ],
};

const ALL_CHAPTERS: ChapterData[] = [JOHN_1, GENESIS_1, PSALM_1];

export function getChapter(
  book: string,
  chapter: number
): ChapterData | null {
  return (
    ALL_CHAPTERS.find(
      (c) => c.book === book.toLowerCase() && c.chapter === chapter
    ) ?? null
  );
}

export function getAdjacentChapters(book: string, chapter: number) {
  const bookMeta = BOOKS.find((b) => b.id === book.toLowerCase());
  const prev = chapter > 1 ? chapter - 1 : null;
  const next =
    bookMeta && chapter < bookMeta.chapters ? chapter + 1 : null;

  const hasPrev = prev !== null && getChapter(book, prev) !== null;
  const hasNext = next !== null && getChapter(book, next) !== null;

  return { prev: hasPrev ? prev : null, next: hasNext ? next : null };
}
