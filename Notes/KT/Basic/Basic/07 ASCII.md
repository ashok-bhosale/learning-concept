ASCII and Unicode are both **character encoding standards** that define how text is represented in computers. They assign **numerical values to characters**, allowing computers to store, process, and display text.

**ASCII (American Standard Code for Information Interchange)**

- **History:** Developed in the early 1960s, ASCII was one of the first widely used character encoding standards.
- **Character Set:** It uses 7 bits to represent characters, providing a total of *128 possible* characters. This includes:
    - Uppercase and lowercase English letters (A-Z, a-z)
    - Digits (0-9)
    - Punctuation marks and symbols (!, @, #, $, %, etc.)
    - Control characters (for formatting and device control)
- **Limitations:** ASCII's limited character set is its major drawback. It can only represent English characters and a few common symbols, making it insufficient for languages with different alphabets or a large number of characters.

**Unicode**

- **History:** **Developed in the late 1980s to address the limitations of ASCII,** Unicode aims to represent all characters from all writing systems in the world.
- **Character Set:** Unicode uses a much larger number of bits (up to **32 bits**) to represent characters, allowing for over a million different characters. This includes:
    - Characters from almost all living and historical languages
    - Symbols, emojis, and other special characters
- ***Encodings*:** Unicode has different encoding forms, the most common being:
    - **UTF-8:** A variable-width encoding that uses 1 to 4 bytes to represent characters. It is backward compatible with ASCII (the first 128 characters are the same as ASCII) and is the dominant encoding on the web.
    - **UTF-16:** Uses 2 or 4 bytes per character.
    - **UTF-32:** Uses 4 bytes per character.

Use case:- Globalization=> Creating software used across global supporting various language
**Key Differences and Comparison**

| Feature                    | ASCII                                        | Unicode                                                |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| **Character Set**          | 128 characters                               | Over 1 million characters                              |
| **Languages**              | Primarily English                            | All modern and many historical languages               |
| **Bits Used**              | 7 bits (or 8 bits with extended ASCII)       | Up to 32 bits (variable in UTF-8)                      |
| **Backward Compatibility** | N/A                                          | UTF-8 is backward compatible with ASCII                |
| **Common Use**             | Older systems and some specific applications | Modern systems, web pages, international communication |

**In Summary**

ASCII was a pioneering standard that served its purpose for representing basic English text. However, with the globalization of communication and the need to support diverse languages, Unicode has become the universal standard for character encoding. Its vast character set and efficient encodings like UTF-8 make it the foundation for text representation in modern computing.