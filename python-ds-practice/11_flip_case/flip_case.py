def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    new_phrase = ""
    for char in phrase:
        if to_swap.lower() == char.lower():
            if to_swap.islower():
                if char.islower():
                    new_phrase += char.upper()
                else:
                    new_phrase += char.lower()
            elif to_swap.isupper():
                if char.islower():
                    new_phrase += char.upper()
                else:
                    new_phrase += char.lower()
        else: 
            new_phrase += char
    return new_phrase