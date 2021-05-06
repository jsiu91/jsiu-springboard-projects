def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = 'aeiou'
    rev_vowels = []
    count = 0

    for v in s:
        if v in vowels:
            rev_vowels.append(v)

    rev_vowels = rev_vowels[::-1] 

    string = list(s)
    for i in range(len(string)):
        if string[i] in vowels:
            string[i] = rev_vowels[count]
            count += 1
    
    return "".join(string)
