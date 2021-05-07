"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
        """Machine for finding random words from dictionary.
    
        >>> wf = WordFinder("simple.txt")
        3 words read

        >>> wf.random() in ["cat", "dog", "porcupine"]
        True

        >>> wf.random() in ["cat", "dog", "porcupine"]
        True

        >>> wf.random() in ["cat", "dog", "porcupine"]
        True
        """
        def __init__(self,filename):
            """Read file and return the number of words"""
            self.words = self.read_file(filename)

            print(f"{len(self.words)} words read")

        def read_file(self, filename):
            """Read file and return a list of words."""
            with open(filename, "r") as file:
                return [word.strip() for word in file]


        def random(self):
            """Return random word."""
            return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    """Specialized WordFinder that excludes blank lines/comments.
    
    >>> swf = SpecialWordFinder("complex.txt")
    3 words read

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def read_file(self, filename):
        """Parse dict_file -> list of words, skipping blanks/comments."""
        with open(filename, "r") as file:
            return [w.strip() for w in file
                    if w.strip() and not w.startswith("#")]