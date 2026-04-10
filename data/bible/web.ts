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

const JOHN_2: ChapterData = {
  translation: "web", book: "john", bookDisplay: "John", chapter: 2,
  sections: [
    {
      title: "The Wedding at Cana",
      verses: [
        { number: 1, text: "The third day, there was a wedding in Cana of Galilee. Jesus' mother was there." },
        { number: 2, text: "Jesus also was invited, with his disciples, to the wedding." },
        { number: 3, text: "When the wine ran out, Jesus' mother said to him, \"They have no wine.\"" },
        { number: 4, text: "Jesus said to her, \"Woman, what does that have to do with you and me? My hour has not yet come.\"" },
        { number: 5, text: "His mother said to the servants, \"Whatever he says to you, do it.\"" },
        { number: 6, text: "Now there were six water pots of stone set there after the Jewish manner of purifying, containing two or three metretes apiece." },
        { number: 7, text: "Jesus said to them, \"Fill the water pots with water.\" They filled them up to the brim." },
        { number: 8, text: "He said to them, \"Now draw some out, and take it to the ruler of the feast.\" So they took it." },
        { number: 9, text: "When the ruler of the feast tasted the water now become wine, and didn't know where it came from (but the servants who had drawn the water knew), the ruler of the feast called the bridegroom," },
        { number: 10, text: "and said to him, \"Everyone serves the good wine first, and when the guests have drunk freely, then that which is worse. You have kept the good wine until now!\"" },
        { number: 11, text: "This beginning of his signs Jesus did in Cana of Galilee, and revealed his glory; and his disciples believed in him." },
        { number: 12, text: "After this, he went down to Capernaum, he, and his mother, his brothers, and his disciples; and they stayed there a few days." },
      ],
    },
    {
      title: "Jesus Clears the Temple",
      verses: [
        { number: 13, text: "The Passover of the Jews was at hand, and Jesus went up to Jerusalem." },
        { number: 14, text: "He found in the temple those who sold oxen, sheep, and doves, and the changers of money sitting." },
        { number: 15, text: "He made a whip of cords, and threw all out of the temple, both the sheep and the oxen; and he poured out the changers' money and overthrew their tables." },
        { number: 16, text: "To those who sold the doves, he said, \"Take these things out of here! Don't make my Father's house a marketplace!\"" },
        { number: 17, text: "His disciples remembered that it was written, \"Zeal for your house will consume me.\"" },
        { number: 18, text: "The Jews therefore answered him, \"What sign do you show us, seeing that you do these things?\"" },
        { number: 19, text: "Jesus answered them, \"Destroy this temple, and in three days I will raise it up.\"" },
        { number: 20, text: "The Jews therefore said, \"It took forty-six years to build this temple! Will you raise it up in three days?\"" },
        { number: 21, text: "But he spoke of the temple of his body." },
        { number: 22, text: "When therefore he was raised from the dead, his disciples remembered that he said this, and they believed the Scripture, and the word which Jesus had said." },
        { number: 23, text: "Now when he was in Jerusalem at the Passover, during the feast, many believed in his name, observing his signs which he did." },
        { number: 24, text: "But Jesus didn't trust himself to them, because he knew everyone," },
        { number: 25, text: "and because he didn't need for anyone to testify concerning man; for he himself knew what was in man." },
      ],
    },
  ],
};

const JOHN_3: ChapterData = {
  translation: "web", book: "john", bookDisplay: "John", chapter: 3,
  sections: [
    {
      title: "Jesus Teaches Nicodemus",
      verses: [
        { number: 1, text: "Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews." },
        { number: 2, text: "The same came to him by night, and said to him, \"Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do, unless God is with him.\"" },
        { number: 3, text: "Jesus answered him, \"Most certainly I tell you, unless one is born anew, he can't see God's Kingdom.\"" },
        { number: 4, text: "Nicodemus said to him, \"How can a man be born when he is old? Can he enter a second time into his mother's womb, and be born?\"" },
        { number: 5, text: "Jesus answered, \"Most certainly I tell you, unless one is born of water and spirit, he can't enter into God's Kingdom." },
        { number: 6, text: "That which is born of the flesh is flesh. That which is born of the Spirit is spirit." },
        { number: 7, text: "Don't marvel that I said to you, 'You must be born anew.'" },
        { number: 8, text: "The wind blows where it wants to, and you hear its sound, but don't know where it comes from and where it is going. So is everyone who is born of the Spirit.\"" },
        { number: 9, text: "Nicodemus answered him, \"How can these things be?\"" },
        { number: 10, text: "Jesus answered him, \"Are you the teacher of Israel, and don't understand these things?" },
        { number: 11, text: "Most certainly I tell you, we speak that which we know, and testify of that which we have seen, and you don't receive our witness." },
        { number: 12, text: "If I told you earthly things and you don't believe, how will you believe if I tell you heavenly things?" },
        { number: 13, text: "No one has ascended into heaven, but he who descended out of heaven, the Son of Man, who is in heaven." },
        { number: 14, text: "As Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up," },
        { number: 15, text: "that whoever believes in him should not perish, but have eternal life." },
        { number: 16, text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life." },
        { number: 17, text: "For God didn't send his Son into the world to judge the world, but that the world should be saved through him." },
        { number: 18, text: "He who believes in him is not judged. He who doesn't believe has been judged already, because he has not believed in the name of the one and only Son of God." },
        { number: 19, text: "This is the judgment, that the light has come into the world, and men loved the darkness rather than the light; for their works were evil." },
        { number: 20, text: "For everyone who does evil hates the light, and doesn't come to the light, lest his works would be exposed." },
        { number: 21, text: "But he who does the truth comes to the light, that his works may be revealed, that they have been done in God.\"" },
      ],
    },
    {
      title: "John the Baptist Exalts Christ",
      verses: [
        { number: 22, text: "After these things, Jesus came with his disciples into the land of Judea. He stayed there with them, and baptized." },
        { number: 23, text: "John also was baptizing in Enon near Salim, because there was much water there. They came, and were baptized." },
        { number: 24, text: "For John was not yet thrown into prison." },
        { number: 25, text: "There arose therefore a questioning on the part of John's disciples with some Jews about purification." },
        { number: 26, text: "They came to John and said to him, \"Rabbi, he who was with you beyond the Jordan, to whom you have testified, behold, the same baptizes, and everyone is coming to him.\"" },
        { number: 27, text: "John answered, \"A man can receive nothing, unless it has been given him from heaven." },
        { number: 28, text: "You yourselves testify that I said, 'I am not the Christ,' but, 'I have been sent before him.'" },
        { number: 29, text: "He who has the bride is the bridegroom; but the friend of the bridegroom, who stands and hears him, rejoices greatly because of the bridegroom's voice. This, my joy, therefore is made full." },
        { number: 30, text: "He must increase, but I must decrease." },
        { number: 31, text: "He who comes from above is above all. He who is from the earth belongs to the earth, and speaks of the earth. He who comes from heaven is above all." },
        { number: 32, text: "What he has seen and heard, of that he testifies; and no one receives his witness." },
        { number: 33, text: "He who has received his witness has set his seal to this, that God is true." },
        { number: 34, text: "For he whom God has sent speaks the words of God; for God gives the Spirit without measure." },
        { number: 35, text: "The Father loves the Son, and has given all things into his hand." },
        { number: 36, text: "One who believes in the Son has eternal life, but one who disobeys the Son won't see life, but the wrath of God remains on him.\"" },
      ],
    },
  ],
};

const JOHN_4: ChapterData = {
  translation: "web", book: "john", bookDisplay: "John", chapter: 4,
  sections: [
    {
      title: "Jesus and the Samaritan Woman",
      verses: [
        { number: 1, text: "Therefore when the Lord knew that the Pharisees had heard that Jesus was making and baptizing more disciples than John" },
        { number: 2, text: "(although Jesus himself didn't baptize, but his disciples)," },
        { number: 3, text: "he left Judea and departed into Galilee." },
        { number: 4, text: "He needed to pass through Samaria." },
        { number: 5, text: "So he came to a city of Samaria, called Sychar, near the parcel of ground that Jacob gave to his son, Joseph." },
        { number: 6, text: "Jacob's well was there. Jesus therefore, being tired from his journey, sat down by the well. It was about the sixth hour." },
        { number: 7, text: "A woman of Samaria came to draw water. Jesus said to her, \"Give me a drink.\"" },
        { number: 8, text: "For his disciples had gone away into the city to buy food." },
        { number: 9, text: "The Samaritan woman therefore said to him, \"How is it that you, being a Jew, ask for a drink from me, a Samaritan woman?\" (For Jews have no dealings with Samaritans.)" },
        { number: 10, text: "Jesus answered her, \"If you knew the gift of God, and who it is who says to you, 'Give me a drink,' you would have asked him, and he would have given you living water.\"" },
        { number: 11, text: "The woman said to him, \"Sir, you have nothing to draw with, and the well is deep. From where then have you that living water?" },
        { number: 12, text: "Are you greater than our father, Jacob, who gave us the well, and drank from it himself, as did his children, and his livestock?\"" },
        { number: 13, text: "Jesus answered her, \"Everyone who drinks of this water will thirst again," },
        { number: 14, text: "but whoever drinks of the water that I will give him will never thirst again; but the water that I will give him will become in him a well of water springing up to eternal life.\"" },
        { number: 15, text: "The woman said to him, \"Sir, give me this water, so that I don't get thirsty, neither come all the way here to draw.\"" },
        { number: 16, text: "Jesus said to her, \"Go, call your husband, and come here.\"" },
        { number: 17, text: "The woman answered, \"I have no husband.\" Jesus said to her, \"You said well, 'I have no husband,'" },
        { number: 18, text: "for you have had five husbands; and he whom you now have is not your husband. This you have said truly.\"" },
        { number: 19, text: "The woman said to him, \"Sir, I perceive that you are a prophet." },
        { number: 20, text: "Our fathers worshiped in this mountain, and you Jews say that in Jerusalem is the place where people ought to worship.\"" },
        { number: 21, text: "Jesus said to her, \"Woman, believe me, the hour comes, when neither in this mountain, nor in Jerusalem, will you worship the Father." },
        { number: 22, text: "You worship that which you don't know. We worship that which we know; for salvation is from the Jews." },
        { number: 23, text: "But the hour comes, and now is, when the true worshippers will worship the Father in spirit and truth, for the Father seeks such to be his worshippers." },
        { number: 24, text: "God is spirit, and those who worship him must worship in spirit and truth.\"" },
        { number: 25, text: "The woman said to him, \"I know that Messiah comes,\" (he who is called Christ). \"When he has come, he will declare to us all things.\"" },
        { number: 26, text: "Jesus said to her, \"I am he, the one who speaks to you.\"" },
        { number: 27, text: "At this, his disciples came. They marveled that he was speaking with a woman; yet no one said, \"What are you looking for?\" or, \"Why do you speak with her?\"" },
        { number: 28, text: "So the woman left her water pot, and went away into the city, and said to the people," },
        { number: 29, text: "\"Come, see a man who told me everything that I did. Can this be the Christ?\"" },
        { number: 30, text: "They went out of the city, and were coming to him." },
      ],
    },
    {
      title: "The Harvest Is Plentiful",
      verses: [
        { number: 31, text: "In the meanwhile, the disciples urged him, saying, \"Rabbi, eat.\"" },
        { number: 32, text: "But he said to them, \"I have food to eat that you don't know about.\"" },
        { number: 33, text: "The disciples therefore said to one another, \"Has anyone brought him something to eat?\"" },
        { number: 34, text: "Jesus said to them, \"My food is to do the will of him who sent me, and to accomplish his work." },
        { number: 35, text: "Don't you say, 'There are yet four months until the harvest?' Behold, I tell you, lift up your eyes, and look at the fields, that they are white for harvest already." },
        { number: 36, text: "He who reaps receives wages, and gathers fruit to eternal life; that both he who sows and he who reaps may rejoice together." },
        { number: 37, text: "For in this the saying is true, 'One sows, and another reaps.'" },
        { number: 38, text: "I sent you to reap that for which you haven't labored. Others have labored, and you have entered into their labor.\"" },
        { number: 39, text: "From that city many of the Samaritans believed in him because of the word of the woman, who testified, \"He told me everything that I did.\"" },
        { number: 40, text: "So when the Samaritans came to him, they begged him to stay with them. He stayed there two days." },
        { number: 41, text: "Many more believed because of his word." },
        { number: 42, text: "They said to the woman, \"Now we believe, not because of your speaking; for we have heard for ourselves, and know that this is indeed the Christ, the Savior of the world.\"" },
      ],
    },
    {
      title: "Jesus Heals an Official's Son",
      verses: [
        { number: 43, text: "After the two days he went out from there and went into Galilee." },
        { number: 44, text: "For Jesus himself testified that a prophet has no honor in his own country." },
        { number: 45, text: "So when he came into Galilee, the Galileans received him, having seen all the things that he did in Jerusalem at the feast, for they also went to the feast." },
        { number: 46, text: "Jesus came therefore again to Cana of Galilee, where he made the water into wine. There was a certain nobleman whose son was sick at Capernaum." },
        { number: 47, text: "When he heard that Jesus had come out of Judea into Galilee, he went to him, and begged him that he would come down and heal his son, for he was at the point of death." },
        { number: 48, text: "Jesus therefore said to him, \"Unless you see signs and wonders, you will in no way believe.\"" },
        { number: 49, text: "The nobleman said to him, \"Sir, come down before my child dies.\"" },
        { number: 50, text: "Jesus said to him, \"Go your way. Your son lives.\" The man believed the word that Jesus spoke to him, and he went his way." },
        { number: 51, text: "As he was now going down, his servants met him and reported, saying \"Your child lives!\"" },
        { number: 52, text: "So he inquired of them the hour when he began to get better. They said therefore to him, \"Yesterday at the seventh hour, the fever left him.\"" },
        { number: 53, text: "So the father knew that it was at that hour in which Jesus said to him, \"Your son lives.\" He believed, as did his whole house." },
        { number: 54, text: "This is again the second sign that Jesus did, having come out of Judea into Galilee." },
      ],
    },
  ],
};

const PSALM_23: ChapterData = {
  translation: "web", book: "psalms", bookDisplay: "Psalms", chapter: 23,
  sections: [
    {
      title: "The LORD Is My Shepherd",
      verses: [
        { number: 1, text: "The LORD is my shepherd; I shall lack nothing." },
        { number: 2, text: "He makes me lie down in green pastures. He leads me beside still waters." },
        { number: 3, text: "He restores my soul. He guides me in the paths of righteousness for his name's sake." },
        { number: 4, text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me." },
        { number: 5, text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over." },
        { number: 6, text: "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in the LORD's house forever." },
      ],
    },
  ],
};

const ROMANS_8: ChapterData = {
  translation: "web", book: "romans", bookDisplay: "Romans", chapter: 8,
  sections: [
    {
      title: "Life Through the Spirit",
      verses: [
        { number: 1, text: "There is therefore now no condemnation to those who are in Christ Jesus, who don't walk according to the flesh, but according to the Spirit." },
        { number: 2, text: "For the law of the Spirit of life in Christ Jesus made me free from the law of sin and of death." },
        { number: 3, text: "For what the law couldn't do, in that it was weak through the flesh, God did, sending his own Son in the likeness of sinful flesh and for sin, he condemned sin in the flesh;" },
        { number: 4, text: "that the ordinance of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit." },
        { number: 5, text: "For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit, the things of the Spirit." },
        { number: 6, text: "For the mind of the flesh is death, but the mind of the Spirit is life and peace;" },
        { number: 7, text: "because the mind of the flesh is hostile toward God; for it is not subject to God's law, neither indeed can it be." },
        { number: 8, text: "Those who are in the flesh can't please God." },
        { number: 9, text: "But you are not in the flesh but in the Spirit, if it is so that the Spirit of God dwells in you. But if any man doesn't have the Spirit of Christ, he is not his." },
        { number: 10, text: "If Christ is in you, the body is dead because of sin, but the spirit is alive because of righteousness." },
        { number: 11, text: "But if the Spirit of him who raised up Jesus from the dead dwells in you, he who raised up Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you." },
        { number: 12, text: "So then, brothers, we are debtors, not to the flesh, to live after the flesh." },
        { number: 13, text: "For if you live after the flesh, you must die; but if by the Spirit you put to death the deeds of the body, you will live." },
        { number: 14, text: "For as many as are led by the Spirit of God, these are children of God." },
        { number: 15, text: "For you didn't receive the spirit of bondage again to fear, but you received the Spirit of adoption, by whom we cry, \"Abba! Father!\"" },
        { number: 16, text: "The Spirit himself testifies with our spirit that we are children of God;" },
        { number: 17, text: "and if children, then heirs; heirs of God, and joint heirs with Christ; if indeed we suffer with him, that we may also be glorified with him." },
        { number: 18, text: "For I consider that the sufferings of this present time are not worth comparing with the glory which is to be revealed toward us." },
        { number: 28, text: "We know that all things work together for good for those who love God, to those who are called according to his purpose." },
        { number: 29, text: "For whom he foreknew, he also predestined to be conformed to the image of his Son, that he might be the firstborn among many brothers." },
        { number: 38, text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers," },
        { number: 39, text: "nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord." },
      ],
    },
  ],
};

const ALL_CHAPTERS: ChapterData[] = [JOHN_1, JOHN_2, JOHN_3, JOHN_4, GENESIS_1, PSALM_1, PSALM_23, ROMANS_8];

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
