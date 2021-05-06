def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """
    # res = []
    # if isinstance(num, int) and num >= 0:
    #     for times in range(num):
    #         res.append(phrase)
    #     res = "".join(res)
    #     return res
    # return None

    if not isinstance(num, int) or num < 0:
        return None
    
    return phrase * num