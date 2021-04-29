def print_upper_words(words):
    """ For a list of words, print out each word on a separate line, but in all uppercase."""
    for word in words:
        print(word.upper())
# this should print "HELLO", "HEY", "YO", and "YES"
print_upper_words(["hello", "hey", "goodbye", "yo", "yes"])

def print_upper_words2(words):
    """ For a list of words, print out each word on a separate line, 
    but in all uppercase. And words that start with the letter 'e' """
    for word in words:
        if word.startswith('e') or word.startswith('E'):
            print (word.upper())

print_upper_words2(["hello", "hey", "Ellie","goodbye", "esther", "yes"])

def print_upper_words3(words, must_start_with):
    """ Make your function more general: you should be able to pass in a set 
    of letters, and it only prints words that start with one of those letters. """
    for word in words:
        for letter in must_start_with:
            if word.startswith(letter) or word.startswith(letter.upper()):
                print(word.upper())

print_upper_words3(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h", "y"})